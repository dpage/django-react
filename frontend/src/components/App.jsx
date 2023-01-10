import React, {Component} from "react";
import {render} from 'react-dom';
import ButtonAppBar from './AppBar';
import LeadList from './LeadList';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Cookies from "universal-cookie";

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.clearError = this.clearError.bind(this);

    let defaultDark = false;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      defaultDark = true;
    }

    let darkMode = JSON.parse(localStorage.getItem('darkMode')) ?? defaultDark;

    this.state = {
      username: "",
      fullname: "Anonymous User",
      avatarProps: this.stringAvatar('Anonymous User'),
      email: "",
      password: "",
      error: "",
      isAuthenticated: false,
      darkMode: darkMode,
    };
  }

  stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  stringAvatar(name) {
    let children = '';
    if (!name.includes(' ')) {
      children = name[0].toUpperCase();
    } else {
      children = name.split(' ')[0][0].toUpperCase() + name.split(' ')[1][0].toUpperCase();
    }

    return {
      sx: {
        bgcolor: this.stringToColor(name),
      },
      children: children,
    };
  }

  componentDidMount = () => {
    this.getSession();
  }

  getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.isAuthenticated) {
        this.setState({
          isAuthenticated: true,
          username: data.username,
          fullname: data.fullname,
          avatarProps: this.stringAvatar(data.fullname),
          email: data.email,
          error: ''
        });
      } else {
        this.setState({
          isAuthenticated: false,
          username: '',
          fullname: 'Anonymous User',
          avatarProps: this.stringAvatar('Anonymous User'),
          email: '',
          error: ''
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleUserNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  clearError() {
    this.setState({error: ''});
  }

  login(username, password) {
    fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({username: username, password: password}),
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.getSession();
    })
    .catch((err) => {
      console.log(err);
      this.setState({error: "Incorrect username or password."});
    });
  }

  logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({
        isAuthenticated: false,
        username: '',
        fullname: 'Anonymous User',
        avatarProps: this.stringAvatar('Anonymous User'),
        email: '',
        error: ''
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };


  changeTheme = () => {
    const darkMode = this.state.darkMode;
    this.setState({darkMode: !darkMode});
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  }

  render() {
    return (
      <ThemeProvider theme={this.state.darkMode ? darkTheme : lightTheme}>
        <CssBaseline/>
        <ButtonAppBar appState={this.state} handleLogin={this.login} handleLogout={this.logout} clearError={this.clearError} onChangeTheme={this.changeTheme} />
        <Box align="center" sx={{flexGrow: 1}} style={{marginLeft: 20, marginRight: 20}}>
          <Grid container align="left" maxWidth="xl" spacing={1} wrap="wrap">
            {!this.state.isAuthenticated ?
              <Grid item xs={12}>
                <h1>Login</h1>
                <Alert severity="error">Please login to see the lead list.</Alert>
              </Grid>
            :
              <>
                <Grid item xs={12}>
                  <h1>Lead List</h1>
                </Grid>
                <Grid item xs={12}>
                  <LeadList/>
                </Grid>
              </>
            }
          </Grid>
        </Box>
      </ThemeProvider>
    )
  };
}

const container = document.getElementById("app");
render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  container
);
