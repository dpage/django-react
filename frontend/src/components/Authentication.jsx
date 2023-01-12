import * as React from 'react';
import {forwardRef, useContext, useEffect, useImperativeHandle} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import {AppContext} from "./AppContext";
import {stringAvatar} from "../utils";
import Cookies from "universal-cookie";


export const anonUser = {
  username: '',
  fullname: 'Anonymous User',
  avatarProps: stringAvatar('Anonymous User'),
  email: '',
  password: '',
  isAuthenticated: false
};


const cookies = new Cookies();


export const LoginDialog = forwardRef((props, ref) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const appContext = useContext(AppContext);


  // Handle show password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // Close the dialog
  const handleClose = () => {
    setUsername('');
    setPassword('');
    appContext.setError('');

    props.setShowLoginDialog(false);
  };


  // Did we get a good response from our request?
  const isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };


  // Retrieve any session details, or clear them if necessary
  const doGetSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          appContext.setUser({
            username: data.username,
            fullname: data.fullname,
            avatarProps: stringAvatar(data.fullname),
            email: data.email,
            password: '',
            isAuthenticated: true
          });
          appContext.setError('');
        } else {
          appContext.setUser(anonUser);
          appContext.setError('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // Attempt a login
  const handleLogin = (event) => {
    event.preventDefault();
    doLogin(username, password, handleClose);
  };

  const doLogin = (username, password, cbSuccess) => {
    fetch("/api/login/", {
      method: "POST", headers: {
        "Content-Type": "application/json", "X-CSRFToken": cookies.get("csrftoken"),
      }, credentials: "same-origin", body: JSON.stringify({username: username, password: password}),
    })
      .then(isResponseOk)
      .then(() => {
        doGetSession();
        cbSuccess();
      })
      .catch((err) => {
        console.log(err);
        appContext.setError('Incorrect username or password.');
      });
  };


  const doLogout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        appContext.setUser(anonUser);
        appContext.setError('');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Allow access to doLogout from elsewhere
  useImperativeHandle(ref, () => ({
    handleLogout: () => {
      doLogout();
    }
  }));


  // Get the session data (if present)... but just once.
  useEffect(() => {
    doGetSession();
  }, []);


  return (<>
    <Dialog open={props.open}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>

          <DialogContentText>
            Please enter your username and password to login.
          </DialogContentText>

          <TextField
            id="username"
            label="Username"
            aria-label="username"
            margin="dense"
            value={username}
            fullWidth
            autoFocus
            required={true}
            error={appContext.error != ''}
            onInput={e => setUsername(e.target.value)}
          />

          <TextField
            id="password"
            label="Password"
            aria-label="password"
            margin="dense"
            value={password}
            fullWidth
            required={true}
            error={appContext.error != ''}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (<InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                />
                {showPassword ? <VisibilityOff/> : <Visibility/>}
              </InputAdornment>),
            }}
            onInput={e => setPassword(e.target.value)}
          />

          {appContext.error && <Alert severity="error">{appContext.error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button aria-label='cancel' onClick={handleClose}>Cancel</Button>
        <Button aria-label='login' disabled={username == '' || password == ''} onClick={handleLogin}>Login</Button>
      </DialogActions>
    </Dialog>
  </>);
});
