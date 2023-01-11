import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

export default function LoginDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState(props?.value ?? '');
  const [password, setPassword] = React.useState(props?.value ?? '');

  // Respond to the open dialog event
  const handleOpen = () => {
    // Close the calling menu
    props.setAnchorElUser(null);

    setUsername('');
    setPassword('');
    props.clearError();

    setOpen(true);
  };

    // Respond to the open dialog event
  const handleLogout = () => {
    // Close the calling menu
    props.setAnchorElUser(null);

    props.handleLogout();
  };

  // Close the dialog
  const handleClose = () => {
    setUsername('');
    setPassword('');
    props.clearError();

    setOpen(false);
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

  return (
    <>
      {!props.appState.isAuthenticated ?
        <MenuItem aria-label='login' onClick={handleOpen}>Login</MenuItem>
        :
        <MenuItem aria-label='logout' onClick={handleLogout}>Logout</MenuItem>
      }
      <Dialog open={open} onClose={handleClose}>
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
              fullWidth
              autoFocus
              required={true}
              error={props.appState.error != ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              onInput={e => setUsername(e.target.value)}
            />

            <TextField
              id="password"
              label="Password"
              aria-label="password"
              margin="dense"
              fullWidth
              required={true}
              error={props.appState.error != ''}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    />
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
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
    </>
  );
}