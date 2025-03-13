import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from '../../assets/questionnaire.png'
import { useAuth } from '../../utils/auth/authContext';


const Topbar = ({ onMenuClick, userName = "Ruther Frith Solloso" }) => {
  // State for user menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();
  
  // Handle menu open and close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleProfile = () => {
    // Add profile navigation logic here
    handleMenuClose();
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        gridArea: 'topbar', 
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: '#fff', // Material Blue color - change as needed
      }}
    >
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={onMenuClick}
        >
          <MenuIcon sx={{ color: '#DC623C'}}/>
        </IconButton>
        
        
        {/* User Menu Button */}
        <Button
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={handleMenuOpen}
          endIcon={<ExpandMoreIcon sx={{ color: '#DC623C'}}/>}
        >
          <Avatar/>

        </Button>
        
        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}

        >
          <MenuItem onClick={handleProfile}>
            <AccountCircleIcon sx={{ mr: 1 }} /> {userName}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;