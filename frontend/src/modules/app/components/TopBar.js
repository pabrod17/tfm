import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createMuiTheme, Paper, Switch } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import users from '../../users';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Topbar = ({ isDark, setIsDark}) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    dispatch(users.actions.logout());
  };
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row-reverse',
      borderRadius: 1,
      width: "100%",
      color:"white",

    }}
  >      {/* SEARCH BAR */}

      {/* ICONS */}
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconButton sx={{ color: "white", size:"big" }}>
          <PersonOutlinedIcon sx={{ fontSize: 30 }} />
        </IconButton>      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

        {/* <IconButton sx={{ color: "white" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <PersonOutlinedIcon />
        </IconButton> */}
        <IconButton sx={{ color: "white"}}>
          <LocalHospitalIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Switch checked={isDark} onChange={e=>setIsDark(!isDark)}/>

    </Box>
  );
};

export default Topbar;
