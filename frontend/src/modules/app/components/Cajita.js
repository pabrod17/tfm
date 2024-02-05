import React, {useEffect, useState, createContext} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './Header';
import SideBar from './SideBar';
import TopBar from './TopBar';

import Body from './Body';
import Home from './Home';

import Footer from './Footer';
import users from '../../users';
import './Hero.css';
import canastaRed from './canastaRed.jpg';
import { ColorModeContext, useMode } from '../../../theme';
import Box from '@material-ui/core/Box';
import { Light, Dark } from '../../../theme';
import { ThemeProvider, createMuiTheme, Paper, Switch } from '@material-ui/core';
import Topbar from './TopBar';
import { AppBar, Toolbar } from '@mui/material';



const Cajita = () => {
    return (
        <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
        //   justifyContent: 'center' ,
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          width: "100%",

        }}
      >
                hola
                    </Box>
        </div>
                

    );

}
    
export default Cajita;