import React, { useEffect, useState, createContext } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import {Errors} from '../../common';
import Plays from './Plays';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PlaysHomeByType = () => {
    const {id} = useParams();
    const plays = useSelector(selectors.getPlays);
    const dispatch = useDispatch();
    const history = useNavigate();
    const { lesionType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!plays) {
            dispatch(actions.findPlaysByUserId( () => history(`/plays/home`)));
        }
    }, [dispatch, plays, history]);


    const handleSetTypePlay = (tabValue, handleChange, playType, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findPlaysByType(playType));
        history(`/plays/home/type/${playType}/${tabValue}`);
    }

    const handleSetAllPlays = (dispatch) => {
        dispatch(actions.findPlaysByUserId(() => history('/plays/home')));
    }

    return(
        <div>
<Box
                sx={{
                    maxWidth: { xs: 320, sm: 310 },
                    bgcolor: 'background.dark',
                    boxShadow: 1,
                    borderRadius: 4,
                    margin: 'auto',  // Centra horizontalmente
                    marginTop: '33.5px', // Ajusta la distancia desde la parte superior según sea necesario
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab sx={{ color: '#40FF00', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetAllPlays (dispatch)} label="All" />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypePlay(1, handleChange, "Ataque", dispatch)} label={<FormattedMessage id="project.plays.fields.attack" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypePlay(2, handleChange, "Defensa", dispatch)} label={<FormattedMessage id="project.plays.fields.defense" />} />
                </Tabs>
            </Box>
            <Box
                sx={{
                    maxWidth: { xs: 320, sm: 480 },
                    margin: 'auto',  // Centra horizontalmente
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>
                <IconButton >
                    <AddCircleOutlineIcon sx={{
                        margin: 'auto',  // Centra horizontalmente
                        textAlign: 'center', // Centra el contenido dentro del Box
                        fontSize: "46.9px",
                        bgcolor: "linear-gradient(147deg,#ffffff ,#4400f9,#000000 35% 70%,#660bd8,#ffffff)",
                        color: "white"
                    }}
                        onClick={() => history(`/plays/addPlay`)}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
            </Box>
                <Plays plays={plays.plays} id={id}/>
        </div>

    );

}

export default PlaysHomeByType;