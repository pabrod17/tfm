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

const Topbar = ({ isDark, setIsDark}) => {

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row-reverse',
      borderRadius: 1,
      width: "100%",
      color:"white",
      marginLeft:-2

    }}
  >      {/* SEARCH BAR */}

      {/* ICONS */}

        <IconButton sx={{ color: "white" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <Switch checked={isDark} onChange={e=>setIsDark(!isDark)}/>

    </Box>
  );
};

export default Topbar;
