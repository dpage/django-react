import React, {useEffect, useState} from "react";
import {render} from 'react-dom';
import ButtonAppBar from './AppBar';
import LeadList from './LeadList';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Cookies from "universal-cookie";
import {stringAvatar} from "../utils";
import {AppContext} from "./AppContext";

const cookies = new Cookies();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


// Figure out the default dark mode.
let osDark = false;
let defaultDark = false;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  osDark = true;
}
defaultDark = JSON.parse(localStorage.getItem('darkMode')) ?? osDark;


export function App() {
  const anonUser = {
    username: '',
    fullname: 'Anonymous User',
    avatarProps: stringAvatar('Anonymous User'),
    email: '',
    password: '',
    isAuthenticated: false
  };

  const [user, setUser] = useState(anonUser);
  const [darkMode, setDarkMode] = useState(defaultDark);
  const [error, setError] = useState("");

  // Retrieve any session details, or clear them if necessary
  const getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          setUser({
            username: data.username,
            fullname: data.fullname,
            avatarProps: stringAvatar(data.fullname),
            email: data.email,
            password: '',
            isAuthenticated: true
          });
          setError('');
        } else {
          setUser(anonUser);
          setError('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Did we get a good response from our request?
  const isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  // Clear any previous errors
  const clearError = () => {
    setError('');
  }

  // Attempt to login
  const login = (username, password, cbSuccess) => {
    fetch("/api/login/", {
      method: "POST", headers: {
        "Content-Type": "application/json", "X-CSRFToken": cookies.get("csrftoken"),
      }, credentials: "same-origin", body: JSON.stringify({username: username, password: password}),
    })
      .then(isResponseOk)
      .then(() => {
        getSession();
        cbSuccess();
      })
      .catch((err) => {
        console.log(err);
        setError('Incorrect username or password.');
      });
  }

  // Clear the session out
  const logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setUser(anonUser);
        setError('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Toggle the theme
  const changeTheme = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  }

  // See if we can get session data
  useEffect(() => {
    getSession()
  }, []);

  return (<AppContext.Provider value={{user, darkMode, error}}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline/>
        <ButtonAppBar appState={user} handleLogin={login} handleLogout={logout} clearError={clearError}
                      onChangeTheme={changeTheme}/>
        <Box align="center" sx={{flexGrow: 1}} style={{marginLeft: 20, marginRight: 20}}>
          <Grid container align="left" maxWidth="xl" spacing={1} wrap="wrap">
            {!user.isAuthenticated ? <Grid item xs={12}>
              <h1>Login</h1>
              <Alert severity="error">Please login to see the lead list.</Alert>
            </Grid> : <>
              <Grid item xs={12}>
                <h1>Lead List</h1>
              </Grid>
              <Grid item xs={12}>
                <LeadList/>
              </Grid>
            </>}
          </Grid>
        </Box>
      </ThemeProvider>
    </AppContext.Provider>)
}

const container = document.getElementById("app");
render(<React.StrictMode>
  <App/>
</React.StrictMode>, container);
