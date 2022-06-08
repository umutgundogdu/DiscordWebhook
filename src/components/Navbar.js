import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// material icons
import GitHubIcon from '@mui/icons-material/GitHub';

function Navbar() {
    return(
        <AppBar color="primary" position="static">
        <Toolbar>
          <Link underline="none" color="inherit" href="https://github.com/umutgundogdu">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <GitHubIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Discord Webhook Message Sender
          </Typography>
        </Toolbar>
      </AppBar>
    );
}


export default Navbar;