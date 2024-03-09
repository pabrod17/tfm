import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import userr from './user.png';
import { Grid } from "@material-ui/core";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as actionsLesion from '../../lesion/actions';
import * as actionTraining from '../..//trainings/actions';
import * as actionGames from '../..//games/actions';
import * as actionStretchings from '../..//stretchings/actions';
import * as actionExercises from '../..//exercises/actions';
import * as actionsTeams from '../../teams/actions';
import * as actionsSeasons from '../../seasons/actions';
import { FormattedMessage } from 'react-intl';




const Sidebar = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch();
  const history = useNavigate();

  const Item = ({title, to, icon, selected, setSelected, dispatch }) => {
    const theme = useTheme();
    return (
      <MenuItem
        active={selected === title}
        style={{
        }}
        onClick={() => {
          setSelected(title);
          handleMenuOption(to, dispatch);  // Llama a la función handleMenuOption
        }}      icon={icon}
      >
        <Typography>{title}</Typography>
        {/* <Link to={to}  */}
      </MenuItem>
    );
  };

  const handleMenuOption = (to, dispatch) => {
    if(to ===  "/lesion/home") {
      dispatch(actionsLesion.findAllLesionPage({page: 0}));
      history(`/lesion/home`);
    } else
    if(to === "/trainings/home") {
      dispatch(actionTraining.findTrainingsByUserId(() => history('/trainings/home')));
    }
    else
    if(to === "/games/home") {
      dispatch(actionGames.findGamesByUserId(() => history('/games/home')));
    }
    else
    if(to === "/stretchings/home") {
      dispatch(actionStretchings.findAllStretchingsPage({page: 0}));
      history(`/stretchings/home`);
    }
    else
    if(to === "/exercises/home") {
      dispatch(actionExercises.findAllExercisesPage({page: 0}));
      history(`/exercises/home`);
    }
    else
    if(to === "/teams/all") {
      history('/teams/all');
    }
    else
    if(to === "/seasons/all") {
      history('/seasons/all');
    }
    //Hacer algo con los teams y seasons!!!!!!


}

  return (
    <Grid item>

    <Box 
      sx={{
        "& .pro-sidebar-inner": {
        //Para poner la sidebar transparent: backgroundColor: "transparent"
          backgroundColor: "transparent",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6fa !important",
        },
        "& .MuiDrawer-paper": {
          backgroundColor: "#1a2035",

        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} 

      >
        <Menu iconShape="square"       
        style={{
        // color: "#00FF1F",
        //Para poner la sidebar transparent, comentar la siguiente linea:
        // backgroundColor: '#000000',
        height:"100vh",
        boxShadow:"#00FF1F"
        }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#00FF1F",

            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <Typography variant="h3" >
                  TeamHub
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="30px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={userr}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" >
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
              color={"blue"}
            >
              <FormattedMessage id="project.sidebar.fields.club"/>
            </Typography>
            <Item
              title="Teams"
              to="/teams/all"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Item
              title="Seasons"
              to="/seasons/all"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
              color={"red"}
            >
              <FormattedMessage id="project.sidebar.fields.events"/>
            </Typography>
            <Item
              title="Games"
              to="/games/home"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />
            <Item
              title="Tranings"
              to="/trainings/home"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
              color={"pink"}
            >
              <FormattedMessage id="project.sidebar.fields.physicalHealth"/>
            </Typography>
            <Item
              title="Lesion"
              to="/lesion/home"
              onClick={() => handleMenuOption()}
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              dispatch={dispatch}
            />
            <Item
              title="Exercise"
              to="/exercises/home"
              icon={<CalendarTodayOutlinedIcon />}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Stretching"
              to="/stretchings/home"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
              color={"orange"}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    </Grid>

  );
};

export default Sidebar;
