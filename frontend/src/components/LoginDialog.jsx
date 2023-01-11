import * as React from 'react';
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

export default function LoginDialog(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Close the dialog
  const handleClose = () => {
    setUsername('');
    setPassword('');
    props.clearError();

    props.setShowLoginDialog();
  };

  // Handle show password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Attempt a login
  const login = (event) => {
    event.preventDefault();
    props.handleLogin(username, password, handleClose);
  }

  return (<>
      <Dialog open={open}>
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
              error={props.appState.error != ''}
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
              error={props.appState.error != ''}
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

            {props.appState.error && <Alert severity="error">{props.appState.error}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button aria-label='cancel' onClick={handleClose}>Cancel</Button>
          <Button aria-label='login' disabled={username == '' || password == ''} onClick={login}>Login</Button>
        </DialogActions>
      </Dialog>
    </>);
}