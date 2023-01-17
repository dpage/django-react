import React, {useState} from "react";
import {render} from 'react-dom';
import ButtonAppBar from './AppBar';
import LeadList from './LeadList';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {anonUser} from "./Authentication";
import {AppContext} from "./AppContext";
import Welcome from "./Welcome";
import {Route, Routes, Router, BrowserRouter} from 'react-router-dom';


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
  const [user, setUser] = useState(anonUser);
  const [darkMode, setDarkMode] = useState(defaultDark);
  const [error, setError] = useState("");


  // Toggle the theme
  const changeTheme = () => {
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  }


  return (
    <AppContext.Provider value={{user, darkMode, error, setUser, setError}}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline/>

          <ButtonAppBar onChangeTheme={changeTheme}/>
          <Box align="center" sx={{flexGrow: 1}} style={{marginLeft: 20, marginRight: 20}}>
            <Grid container align="left" maxWidth="xl" spacing={1} wrap="wrap">
              <Grid item xs={12}>
                <Routes>
                  <Route exact path="/" element={<Welcome />} />
                  <Route exact path="/lead-list" element={<LeadList />} />
                </Routes>
              </Grid>
            </Grid>
          </Box>

      </ThemeProvider>
    </AppContext.Provider>
  )
}

const container = document.getElementById("app");
render(<React.StrictMode>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
</React.StrictMode>, container);
