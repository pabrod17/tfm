import React, {useEffect, useState, createContext} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './Header';
import SideBar from './SideBar';

import Body from './Body';
import Home from './Home';

import Footer from './Footer';
import users from '../../users';
import './Hero.css';
import canastaRed from './canastaRed.jpg';
import { ColorModeContext, useMode } from '../../../theme';
import { Box } from '@mui/system';
import { Light, Dark } from '../../../theme';
import { ThemeProvider, createMuiTheme, Paper, Switch } from '@material-ui/core';



const App = () => {
    const [isDark, setIsDark] = useState(true);


    const theme = createMuiTheme({
        palette: {
          type: isDark ? "dark" : "light",
          background: {
              paper: isDark ? "#1a2035" : "#fff",
          }

        },
      });


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(users.actions.tryLoginFromServiceToken(
            () => dispatch(users.actions.logout())));
    
    });
    const paperStyle = {
        backgroundSize: 'cover',
        width: 'auto',  // Ajusta el ancho según tus necesidades
        height: 'auto', // Ajusta la altura según tus necesidades
      };
    return (
            <ThemeProvider theme={theme}>

            
        
        <Paper style={paperStyle}>
            <Switch checked={isDark} onChange={e=>setIsDark(!isDark)}
                />
            <Router>
                <div>
                <Box sx={{ display: 'flex' }}>
                <SideBar/> 

                {/* <Header/> */}
                    <Body/>
                    </Box>

                </div>
            </Router>
            {/* <Footer/> */}
        </Paper>
        </ThemeProvider>
    );

}
    
export default App;