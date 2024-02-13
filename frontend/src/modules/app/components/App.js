import React, {useEffect, useState, createContext} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './Header';
import SideBar from './SideBar';
import TopBar from './TopBar';

import Body from './Body';
import Home from './Home';

import Footer from './Footer';
import users, { LoginNew, Login } from '../../users';
import './Hero.css';
import canastaRed from './canastaRed.jpg';
import { ColorModeContext, useMode } from '../../../theme';
import { Box } from '@mui/system';
import { Light, Dark } from '../../../theme';
import { ThemeProvider, createMuiTheme, Paper, Switch } from '@material-ui/core';
import Topbar from './TopBar';
import { AppBar, Toolbar } from '@mui/material';
import Cajita from './Cajita';
import {useSelector} from 'react-redux';



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
// color para react pro sidebar: #0c1e35
// otro color: #0b2948
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

      const userName = useSelector(users.selectors.getUserName);


    return (
            <ThemeProvider theme={theme}>

            
        
        <Paper style={paperStyle}>
            {/* <Switch checked={isDark} onChange={e=>setIsDark(!isDark)}/> */}
            <Router>
            {userName ? <div>
                <Box sx={{ display: 'flex' }}>

                <SideBar/> 
                <div>

                        {/* <AppBar >
                            hola
                        
                        </AppBar>
                        <TopBar/> */}
                    </div>
                {/* <Topbar/>  */}

                {/* <Header/> */}
                    <Body 
                        isDark={isDark} setIsDark={setIsDark}
                        />
                    </Box>

                </div> : <div>
                    <Login></Login>


                </div>}

                
            </Router>
            {/* <Footer/> */}
        </Paper>
        </ThemeProvider>
    );

}
    
export default App;