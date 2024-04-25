// The MIT License (MIT)

// Copyright (c) 2020-present Mohamed Azouaoui

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { useState } from "react";
import {useSelector} from 'react-redux';
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

import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { TbStretching2 } from "react-icons/tb";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

import PeopleIcon from '@mui/icons-material/People';


import userr from './user.png';
import { Grid } from "@material-ui/core";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as actionsLesion from '../../lesion/actions';
import * as actionTraining from '../..//trainings/actions';
import * as actionGames from '../..//games/actions';
import * as actionSeasons from '../..//seasons/actions';
import * as actionStretchings from '../..//stretchings/actions';
import * as actionExercises from '../..//exercises/actions';
import * as actionsTeams from '../../teams/actions';
import * as actionPlays from '../../plays/actions';
import * as actionsSeasons from '../../seasons/actions';
import * as actionStatistics from '../..//statistics/actions';
import * as actionEvents from '../../events/actions';
import * as actionsPlayers from '../../players/actions';
import * as actionsUsers from '../../users/actions';
import { FormattedMessage } from 'react-intl';
import users, { LoginNew, Login } from '../../users';


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Inicio");
  const dispatch = useDispatch();
  const history = useNavigate();
  const [selectedItem, setSelectedItem] = useState("/");

  const userLogged = useSelector(users.selectors.getUser);

  const Item = ({title, to, icon, selected, setSelected, dispatch }) => {
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
        <Typography
        sx={{
          ml:"-120px",
        }}
        fontSize={11}
                      color={"white"}
        
        >{title}</Typography>
        {/* <Link to={to}  */}
      </MenuItem>
    );
  };


  const handleMenuOption = (to, dispatch) => {
    if(to ===  "/") {
      setSelectedItem(to);
      history(`/`);
    } else
    if(to ===  "/lesion/home") {
      setSelectedItem(to);
      dispatch(actionsLesion.findAllLesionPage({page: 0}));
      history(`/lesion/home`);
    } else
    if(to === "/trainings/home") {
      setSelectedItem(to);
      dispatch(actionTraining.findTrainingsByUserId(() => history('/trainings/home')));
    }
    else
    if(to === "/games/home") {
      setSelectedItem(to);
      dispatch(actionGames.findGamesByUserId(() => history('/games/home')));
    }
    else
    if(to === "/stretchings/home") {
      setSelectedItem(to);
      dispatch(actionStretchings.findAllStretchingsPage({page: 0}));
      history(`/stretchings/home`);
    }
    else
    if(to === "/exercises/home") {
      setSelectedItem(to);
      dispatch(actionExercises.findAllExercisesPage({page: 0}));
      history(`/exercises/home`);
    }
    else
    if(to === "/teams/all") {
      setSelectedItem(to);
      dispatch(actionsTeams.findAllTeams(() => history('/teams/home')));
      history('/teams/home');
    }
    else
    if(to === "/seasons/home") {
      setSelectedItem(to);
      dispatch(actionSeasons.findAllSeasons(() => history('/seasons/home')));
      history('/seasons/home');
    }
    else
    if(to === "/statistics/home") {
      setSelectedItem(to);
      dispatch(actionGames.findGamesByUserId(() => history('/statistics/home')));
    }
    else
    if(to === "/plays/home") {
      setSelectedItem(to);
      dispatch(actionPlays.findPlaysByUserId(() => history('/plays/home')));
    }
    else
    if(to === "/board/home") {
      setSelectedItem(to);
      history('/board/home');
    }
    else
    if(to === "/plays/animator/home") {
      setSelectedItem(to);
      history('/plays/animator/home');
    }
    else
    if(to === "/calendar/home") {
      setSelectedItem(to);
      dispatch(actionEvents.findEventsByUserId(() => history('/calendar/home')));
    }
    else
    if(to === "/players/home") {
      setSelectedItem(to);
      dispatch(actionsPlayers.findPlayersByUserId(() => history('/players/home')));
    }
    else
    if(to === "/users/coach") {
      setSelectedItem(to);
      history('/users/coach');
      dispatch(actionsUsers.findUsersByCoachId(() => history('/users/coach')));
    }
    else
    if(to === "/users/admin") {
      setSelectedItem(to);
      history('/users/admin');
      dispatch(actionsUsers.findUsersByAdminId(() => history('/users/admin')));
    }
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
          marginBottom: "-10px !important",

        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6fa !important",
        },
        "& .pro-menu-item": {
          // height:"40px",
          width:"60%",
        },
        "& .pro-item-content": {
          // height:"40px",
          marginRight:"-150%",
        },
        "& .MuiDrawer-paper": {
          backgroundColor: "#1a2035",

        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} collapsedWidth={130}

      >
        <Menu iconShape="square"       
        style={{
        // color: "#00FF1F",
        //Para poner la sidebar transparent, comentar la siguiente linea:
        // backgroundColor: '#000000',
        height:"100%",
        boxShadow:"#00FF1F"
        }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: "#00FF1F",
              margin: "10px 0 20px 0",

            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
                textAlign="center"
                
              >
                <Typography variant="h4" sx={{
                  color: "#ce7c16",
                  marginBottom:"-10px"
                }} >
                  TeamHub
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* {!isCollapsed && (
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
          )} */}

<Box paddingLeft={isCollapsed ? undefined : "2%"}>
            
          {(userLogged.role === "COACH" || userLogged.role === "ADMIN") && (
            <>
            <Item
              title={<FormattedMessage id="project.global.buttons.home"/>}
              to="/"
              icon={<HomeOutlinedIcon style={{ fontSize: "20.1px",
              color: selectedItem === "/" ? "#6fa" : "" }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Typography
              variant="h6"
              sx={{ m: "0px 0 0px 20px", fontSize:"15px" }}
              color={"#0044ff"}
            >
              <FormattedMessage id="project.sidebar.fields.club"/>
            </Typography>
            <Item
              title={<FormattedMessage id="project.teams.fields.teams"/>}
              to="/teams/all"
              icon={<PiMicrosoftTeamsLogoFill style={{ fontSize: "20.1px",
              color: selectedItem === "/teams/all" ? "#6fa" : "" }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Item
              title={<FormattedMessage id="project.seasons.fields.seasons"/>}
              to="/seasons/home"
              icon={<FolderSharedIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/seasons/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Item
              title={<FormattedMessage id="project.players.fields.players"/>}
              to="/players/home"
              icon={<SportsKabaddiIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/players/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Typography
              variant="h8"
              sx={{ m: "0px 0 0px 20px" }}
              color={"red"}
            >
              <FormattedMessage id="project.sidebar.fields.events"/>
            </Typography>
            <Item
              title={<FormattedMessage id="project.games.fields.games"/>}
              to="/games/home"
              icon={<SportsBasketballIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/games/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />
            <Item
              title={<FormattedMessage id="project.trainings.fields.trainings"/>}
              to="/trainings/home"
              icon={<SportsHandballIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/trainings/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Typography
              variant="h8"
              sx={{ m: "0px 0 0px 20px", fontSize:"15px" }}
              color={"pink"}
            >
              <FormattedMessage id="project.sidebar.fields.physicalHealth"/>
            </Typography>
            <Item
              title={<FormattedMessage id="project.lesion.fields.lesion"/>}
              to="/lesion/home"
              onClick={() => handleMenuOption()}
              icon={<LocalHospitalIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/lesion/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              dispatch={dispatch}
              />
            <Item
              title={<FormattedMessage id="project.exercises.fields.exercises"/>}
              to="/exercises/home"
              icon={<FitnessCenterIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/exercises/home" ? "#6fa" : ""
              }} />}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={<FormattedMessage id="project.stretchings.fields.stretchings"/>}
              to="/stretchings/home"
              icon={<TbStretching2 style={{ fontSize: "20.1px",
              color: selectedItem === "/stretchings/home" ? "#6fa" : "" }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Typography
              variant="h8"
              sx={{ m: "0px 0 0px 20px", fontSize:"15px" }}
              color={"green"}
              
            >
              <FormattedMessage id="project.plays.fields.plays"/>
            </Typography>
            <Item
              title={<FormattedMessage id="project.global.buttons.general"/>}
              to="/plays/home"
              icon={<SportsEsportsIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/plays/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />
            <Item
              title={<FormattedMessage id="project.global.buttons.board"/>}
              to="/board/home"
              icon={<DashboardIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/board/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />
            <Item
              title={<FormattedMessage id="project.global.buttons.animation"/>}
              to="/plays/animator/home"
              icon={<TipsAndUpdatesIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/plays/animator/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            <Typography
              variant="h8"
              sx={{ m: "0px 0 0px 20px", fontSize:"15px" }}
              color={"orange"}
            >
              <FormattedMessage id="project.global.buttons.charts"/>
            </Typography>
            <Item
              title={<FormattedMessage id="project.global.buttons.statistics"/>}
              to="/statistics/home"
              icon={<BarChartOutlinedIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/statistics/home" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />

            </>
            )}
            
            {(userLogged.role === "ADMIN" ||userLogged.role === "COACH" || userLogged.role === "USER") && (
              <>
                <Typography
                variant="h8"
                sx={{ m: "0px 0 0px 20px", fontSize:"15px" }}
                color={"yellow"}
              >
                <FormattedMessage id="project.global.buttons.calendar"/>
              </Typography>
                <Item
                title={<FormattedMessage id="project.global.buttons.calendar"/>}
                to="/calendar/home"
                icon={<InsertInvitationIcon sx={{
                  fontSize:"20.1px",
                  color: selectedItem === "/calendar/home" ? "#6fa" : ""
                }} />}
                selected={selected}
                setSelected={setSelected}
                onClick={() => handleMenuOption()}
                dispatch={dispatch}
                />
              </>
            )}
            {(userLogged.role === "COACH") && (
              <>
            <Typography
              variant="h8"
              sx={{ m: "0px 0 0px 20px", fontSize:"15px" }}
              color={"#00ccff"}
            >
              <FormattedMessage id="project.global.buttons.users"/>
            </Typography>
            <Item
              title={<FormattedMessage id="project.global.buttons.users"/>}
              to="/users/coach"
              icon={<PeopleIcon sx={{
                fontSize:"20.1px",
                color: selectedItem === "/users/coach" ? "#6fa" : ""
              }} />}
              selected={selected}
              setSelected={setSelected}
              onClick={() => handleMenuOption()}
              dispatch={dispatch}
            />
            </>
            )}
        {userLogged.role === "ADMIN" && (
          <>
            <Typography
            variant="h8"
            sx={{ m: "0px 0 0px 20px", fontSize:"15px" }}
            color={"#00ccff"}
          >
            <FormattedMessage id="project.global.buttons.users"/>
          </Typography>
          <Item
          title={<FormattedMessage id="project.global.buttons.users"/>}
          to="/users/admin"
          icon={<PeopleIcon sx={{
            fontSize:"20.1px",
            color: selectedItem === "/users/admin" ? "#6fa" : ""
          }} />}
          selected={selected}
          setSelected={setSelected}
          onClick={() => handleMenuOption()}
          dispatch={dispatch}
        />
        </>
        )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    </Grid>


  );
};

export default Sidebar;
