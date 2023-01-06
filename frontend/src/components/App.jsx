import React, {Component} from "react";
import {render} from 'react-dom';
import ButtonAppBar from './AppBar';
import LeadList from './LeadList';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


class AppClass extends Component {
  render() {
    return (
      <div>
        <CssBaseline/>
        <ButtonAppBar/>
        <Box align="center" sx={{ flexGrow: 1 }} style={{ marginLeft: 20, marginRight: 20 }}>
        <Grid container align="left" maxWidth="xl" spacing={2}>
          <Grid item xs={12}>
            <h1>Lead List</h1>
          </Grid>
          <Grid item xs={12}>
            <LeadList/>
          </Grid>
        </Grid>
        </Box>
      </div>
    );
  };
}

// "Runner" class, as we can't use the useMediaQuery hook in a class based component
function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <AppClass/>
    </ThemeProvider>
  )
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);
