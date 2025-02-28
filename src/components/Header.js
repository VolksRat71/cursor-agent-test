import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

/**
 * Header component for the dashboard
 * Displays the application title with an icon
 */
const Header = () => {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <VideocamIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div">
          Video Ad Campaign Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2">
          {new Date().toLocaleDateString()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
