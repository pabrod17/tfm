import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createMuiTheme, Paper, Switch, Container } from '@material-ui/core';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import users from '../../users';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Sidebar from "../../app/components/SideBar";
import StarsIcon from '@material-ui/icons/Stars';
import { FormattedMessage } from 'react-intl';

const Topbar = ({toggleBackgroundImage, isDark, setIsDark}) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    toggleBackgroundImage(6)
    dispatch(users.actions.logout());
  };
  const handleProfile = () => {
    setAnchorEl(null);
    history(`/users/update-profile`);
  };
  const handlePassword = () => {
    setAnchorEl(null);
    history(`/users/change-password`);
  };

  return (
    <Container fixed dir="rtl"       style={{ marginRight: 0, height: '50px', position: 'absolute', right: 0 }}

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
          <PersonOutlinedIcon sx={{ fontSize: 23 }} />
          {/* Para cuando cambie los tamaños para ver la web con 100% de zoom */}
            {/* <PersonOutlinedIcon sx={{ fontSize: '0.9375em' }} /> */}
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
        <MenuItem onClick={handleProfile}><FormattedMessage id="project.users.profile.title"/></MenuItem>
        <MenuItem onClick={handlePassword}><FormattedMessage id="project.global.fields.password"/></MenuItem>
        <MenuItem onClick={handleLogout}><FormattedMessage id="project.app.Header.logout"/></MenuItem>
      </Menu>

        {/* <IconButton sx={{ color: "white" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <PersonOutlinedIcon />
        </IconButton> */}
        {/* <IconButton sx={{ color: "white"}}>
          <LocalHospitalIcon sx={{ fontSize: 30 }} />
        </IconButton> */}
        {/* <Switch checked={isDark} onChange={e=>setIsDark(!isDark)}/> */}
        <IconButton sx={{ color: "white", marginRight:"-5px"}}>
          <StarsIcon color="primary" fontSize="medium" onClick={() => toggleBackgroundImage(1)} />
        </IconButton>
        <IconButton sx={{ color: "white"}}>
          <StarsIcon color="secondary" fontSize="medium" onClick={() => toggleBackgroundImage(2)} />
        </IconButton>
        <IconButton sx={{ color: "white"}}>
          <StarsIcon color="action" fontSize="medium" onClick={() => toggleBackgroundImage(3)} />
        </IconButton>
        <IconButton sx={{ color: "yellow"}}>
          <StarsIcon color="yellow" fontSize="medium" onClick={() => toggleBackgroundImage(4)} />
        </IconButton>
        <IconButton sx={{ color: "green"}}>
          <StarsIcon color="green" fontSize="medium" onClick={() => toggleBackgroundImage(5)} />
        </IconButton>
        <IconButton sx={{ color: "#803300"}}>
          <StarsIcon color="green" fontSize="medium" onClick={() => toggleBackgroundImage(6)} />
        </IconButton>
    </Container>

  );
};

export default Topbar;
