import React, { useEffect, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as selectors from '../selectors';
import Stretchings from './Stretchings';
import { Pager } from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import users, { LoginNew, Login } from '../../users';

const StretchingsHome = () => {

    const stretchingsSearch = useSelector(selectors.getStretchingsSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const [value, setValue] = useState(0);

    const userLogged = useSelector(users.selectors.getUser);

    const hamstrings = "Isquiotibiales";
    const buttocks = "Gluteos";
    const calf = "Gemelos";
    const adductors = "Adductores";
    const shoulder = "Hombro";
    const quadriceps = "Cuadriceps";
    const back = "Espalda";
    const pectoral = "Pectoral";
    const crotch = "Ingle";
    const triceps = "Triceps";
    console.log("subida " + page);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!stretchingsSearch) {
            console.log("HOLA");
            dispatch(actions.findAllStretchingsPage({ page: page }, () => console.log("ADIOS")));
        }
    }, [page, stretchingsSearch, dispatch]);

    const previousFindAllStretchingsResultPage = (dispatch) => {
        console.log("bajo " + page);
        setPage(page - 1);
        console.log("bajada " + page);
        dispatch(actions.previousFindAllStretchingsResultPage(page));
    }

    const nextFindAllStretchingsResultPage = (dispatch) => {
        console.log("subo " + page);
        setPage(page + 1);
        dispatch(actions.nextFindAllStretchingsResultPage(page));
    }

    const handleSetTypeStretching = (tabValue, handleChange, stretchingType, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findStretchingsByTypePage({ page: page, stretchingType: stretchingType }));
        history(`/stretchings/home/type/${stretchingType}/${tabValue}`);
    }

    const handleSetAllStretching = (dispatch) => {
        dispatch(actions.findAllStretchingsPage({ page: page }));
        history(`/stretchings/home`);
    }

    return (
        <div className=''>

            <Box
                sx={{
                    maxWidth: { xs: 320, sm: 430 },
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
                    <Tab sx={{ color: '#40FF00', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetAllStretching(dispatch)} label="All" />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(1, handleChange, hamstrings, dispatch)} label={<FormattedMessage id="project.stretchings.fields.hamstrings" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(2, handleChange, buttocks, dispatch)} label={<FormattedMessage id="project.stretchings.fields.buttocks" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(3, handleChange, calf, dispatch)} label={<FormattedMessage id="project.stretchings.fields.calf" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(4, handleChange, adductors, dispatch)} label={<FormattedMessage id="project.stretchings.fields.adductors" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(5, handleChange, shoulder, dispatch)} label={<FormattedMessage id="project.stretchings.fields.shoulder" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(6, handleChange, quadriceps, dispatch)} label={<FormattedMessage id="project.stretchings.fields.quadriceps" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(7, handleChange, back, dispatch)} label={<FormattedMessage id="project.stretchings.fields.back" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(8, handleChange, pectoral, dispatch)} label={<FormattedMessage id="project.stretchings.fields.pectoral" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(9, handleChange, crotch, dispatch)} label={<FormattedMessage id="project.stretchings.fields.crotch" />} />
                    <Tab sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(10, handleChange, triceps, dispatch)} label={<FormattedMessage id="project.stretchings.fields.triceps" />} />
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
                    onClick={() => {
                        if(userLogged.role === "ADMIN") {
                            history(`/stretchings/addStretching`)
                        }
                        }}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
                <Pager
                    back={{
                        enabled: stretchingsSearch && stretchingsSearch.criteria && stretchingsSearch.criteria.page >= 1,
                        onClick: () => previousFindAllStretchingsResultPage(dispatch)
                    }}
                    next={{
                        enabled: stretchingsSearch && stretchingsSearch.result && stretchingsSearch.result.existMoreItems,

                        onClick: () => nextFindAllStretchingsResultPage(dispatch),
                    }} />
            </Box>
            {stretchingsSearch && stretchingsSearch.result && (
                <Stretchings stretchings={stretchingsSearch.result.items} />
            )}
        </div>
    );

}

export default StretchingsHome;