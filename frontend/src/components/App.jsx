import React, {Component} from "react";
import {render} from 'react-dom';
import ButtonAppBar from './AppBar';
import LeadList from './LeadList';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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

    let defaultDark = false;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      defaultDark = true;
    }

    let darkMode = JSON.parse(localStorage.getItem('darkMode')) ?? defaultDark;

    this.state = {
      darkMode: darkMode,
    };
  }

  changeTheme = () => {
    const darkMode = this.state.darkMode;
    this.setState({darkMode: !darkMode});
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  }

  render() {
    return (
      <>
        <ThemeProvider theme={this.state.darkMode ? darkTheme : lightTheme}>
          <CssBaseline/>
          <ButtonAppBar darkMode={this.state.darkMode} onChangeTheme={this.changeTheme}/>
          <Box align="center" sx={{flexGrow: 1}} style={{marginLeft: 20, marginRight: 20}}>
            <Grid container align="left" maxWidth="xl" spacing={1} wrap="wrap">
              <Grid item xs={12}>
                <h1>Lead List</h1>
              </Grid>
              <Grid item xs={12}>
                <LeadList/>
              </Grid>
              <Grid item xs={12}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend urna posuere lacinia placerat.
                  Integer tellus enim, tempor id nibh at, bibendum commodo purus. Nunc vel sem a quam pulvinar congue.
                  Duis in purus arcu. Aliquam posuere, quam at rhoncus tempor, eros risus sollicitudin sapien, non
                  lobortis augue neque at sem. Sed elementum nibh et sapien facilisis volutpat. Quisque rutrum
                  ullamcorper condimentum. Etiam malesuada dolor at ante pharetra finibus. Suspendisse lacus massa,
                  cursus sit amet auctor id, ullamcorper ullamcorper massa.</p>
              </Grid>
              <Grid item xs={6}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend urna posuere lacinia placerat.
                  Integer tellus enim, tempor id nibh at, bibendum commodo purus. Nunc vel sem a quam pulvinar congue.
                  Duis in purus arcu. Aliquam posuere, quam at rhoncus tempor, eros risus sollicitudin sapien, non
                  lobortis augue neque at sem. Sed elementum nibh et sapien facilisis volutpat. Quisque rutrum
                  ullamcorper condimentum. Etiam malesuada dolor at ante pharetra finibus. Suspendisse lacus massa,
                  cursus sit amet auctor id, ullamcorper ullamcorper massa.</p>
              </Grid>
              <Grid item xs={6}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend urna posuere lacinia placerat.
                  Integer tellus enim, tempor id nibh at, bibendum commodo purus. Nunc vel sem a quam pulvinar congue.
                  Duis in purus arcu. Aliquam posuere, quam at rhoncus tempor, eros risus sollicitudin sapien, non
                  lobortis augue neque at sem. Sed elementum nibh et sapien facilisis volutpat. Quisque rutrum
                  ullamcorper condimentum. Etiam malesuada dolor at ante pharetra finibus. Suspendisse lacus massa,
                  cursus sit amet auctor id, ullamcorper ullamcorper massa.</p>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </>
    )
  };
}

const container = document.getElementById("app");
render(<App/>, container);
