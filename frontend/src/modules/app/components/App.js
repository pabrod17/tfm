import React, {useEffect, useState, createContext} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { ThemeProvider } from 'next-themes';

import Header from './Header';
import SideBar from './SideBar';

import Body from './Body';
import Home from './Home';

import Footer from './Footer';
import users from '../../users';
import './Hero.css';
import canastaRed from './canastaRed.jpg';
import { Button, createTheme, CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from '../../../theme';
import { Box } from '@mui/system';

const App = () => {
    const [theme, colorMode] = useMode();

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(users.actions.tryLoginFromServiceToken(
            () => dispatch(users.actions.logout())));
    
    });

    return (
        <div>
            <Router>
                <div>
                <Box sx={{ display: 'flex' }}>

                <Header/>
                {/* <SideBar/> */}
                    <Body/>
                    </Box>

                </div>
            </Router>
            {/* <Footer/> */}
        </div>
    );

}
    
export default App;