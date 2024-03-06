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
import { ThemeProvider, createMuiTheme, Paper, Switch, Grid } from '@material-ui/core';
import Topbar from './TopBar';
import { AppBar, Toolbar } from '@mui/material';
import Cajita from './Cajita';
import {useSelector} from 'react-redux';
import linea_roja_grande from './fondoCanasta2.jpg';



const App = () => {
    const [isDark, setIsDark] = useState(true);


    const theme = createMuiTheme({
        palette: {
          type: isDark ? "dark" : "light",
          background: {
              paper: isDark ? "#1a2035" : "#fff",
          },
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

        // backgroundImage: `url(${linea_roja_grande})`,
        backgroundRepeat: 'no-repeat', // Evita la repetición de la imagen de fondo
        backgroundAttachment: 'fixed', // Fija la imagen de fondo
        backgroundSize: 'cover',
        width: 'auto',  // Ajusta el ancho según tus necedsidades
        height: 'auto', // Ajusta la altura según tus necesidades
        // background: `linear-gradient(to right, #0f0c29, #302b63, #24243e)`, // Define aquí tus colores
        // background: `linear-gradient(to left, #870000, #190a05)`, // Define aquí tus colores
        // background: `linear-gradient(to right, #141e30, #243b55)`, // Define aquí tus colores

        // background: `linear-gradient(to right, #33001b, #ff0084)`, // Define aquí tus colores
        // background: `linear-gradient(97deg,#000000,#a11ebe,#f79817)`, // Define aquí tus colores
        background: `linear-gradient(147deg,#ffffff ,#4400f9,#000000 35% 70%,#660bd8,#ffffff)`, // Define aquí tus colores


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

                        {/* <AppBar >
                            hola
                        
                        </AppBar>
                        <TopBar/> */}
                
                
                {/* <Topbar/>  */}

                {/* <Header/> */}
                <Box
        display="flex"
        flexDirection="column"  // Asegúrate de que sea una columna
        alignItems="center"
        width="100%"  // O ajusta el ancho según tus necesidades
>            

                    <Body 
                        isDark={isDark} setIsDark={setIsDark}
                        />
                    </Box>
                    <Topbar sx={{ position: 'absolute', right: 0 }} isDark={isDark} setIsDark={setIsDark}/>

                    </Box>

                </div> : 
                <div className='hero-container'>
                <Login></Login>
                </div>
            }
{/* mirar como hacer para poner el login y al lado la imagen!! */}
                
            </Router>
            {/* <Footer/> */}
        </Paper>
        </ThemeProvider>
    );

}
    
export default App;