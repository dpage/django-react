import * as React from 'react';
import {useContext, useRef, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {LoginDialog} from './Authentication';
import {AppContext} from "./AppContext";
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@mui/material";

function ResponsiveAppBar({onChangeTheme}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const appContext = useContext(AppContext);
  const logoutRef = useRef();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const onLogin = () => {
    setAnchorElUser(null);
    setShowLoginDialog(true);
  }


  return (<>
      <LoginDialog open={showLoginDialog} setShowLoginDialog={setShowLoginDialog} ref={logoutRef} />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop title */}
            <StorageTwoToneIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: {xs: 'none', md: 'flex'},
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Leads App
            </Typography>

            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              {/* Hamburger button */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon/>
              </IconButton>

              {/* Mobile menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom', horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top', horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                }}
              >
                <MenuItem key="home" onClick={handleCloseNavMenu}>
                  <Typography style={{ color: 'inherit', textDecoration: 'inherit'}} textAlign="center" component={RouterLink} to="/">Home</Typography>
                </MenuItem>
                <MenuItem key="lead-list" onClick={handleCloseNavMenu}>
                  <Typography style={{ color: 'inherit', textDecoration: 'inherit'}} color="inherit" textAlign="center" component={RouterLink} to="/lead-list">Lead List</Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* Mobile title */}
            <StorageTwoToneIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Leads App
            </Typography>

            {/* Desktop menu */}
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              <Button
                component={RouterLink}
                to="/"
                key="home"
                onClick={handleCloseNavMenu}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                Home
              </Button>
              <Button
                component={RouterLink}
                to="/lead-list"
                key="lead-list"
                onClick={handleCloseNavMenu}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                Lead List
              </Button>
            </Box>

            {/* User icon & menu */}
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="User Options">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar {...appContext.user.avatarProps} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top', horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top', horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* Login/Logout */}
                <MenuItem disabled={appContext.user.isAuthenticated} aria-label='login'
                          onClick={onLogin}>Login</MenuItem>
                <MenuItem disabled={!appContext.user.isAuthenticated} aria-label='logout'
                          onClick={() => handleCloseUserMenu() & logoutRef.current.handleLogout()}>Logout</MenuItem>
              </Menu>

              {/* Darkmode toggler */}
              <IconButton sx={{ml: 1}} onClick={onChangeTheme}>
                {appContext.darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>);
}

export default ResponsiveAppBar;
