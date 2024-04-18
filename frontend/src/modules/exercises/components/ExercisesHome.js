import React, { useEffect, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as selectors from '../selectors';
import Exercises from './Exercises';
import { Pager } from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import users, { LoginNew, Login } from '../../users';

const ExercisesHome = () => {
    const exercisesSearch = useSelector(selectors.getExercisesSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const [value, setValue] = useState(0);

    const userLogged = useSelector(users.selectors.getUser);

    const tactic = "Tactico";
    const technique = "Tecnica";
    const physical = "Fisico";
    const globalized = "Global";
    const specific = "Especifico";
    const psychological = "Psicologico";
    const strategy = "Estrategia";
    const preMatch = "PrePartido";
    console.log("subida " + page);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!exercisesSearch) {
            console.log("HOLA");
            dispatch(actions.findAllExercisesPage({ page: page }, () => console.log("ADIOS")));
        }
    }, [page, exercisesSearch, dispatch]);

    const previousFindAllExercisesResultPage = (dispatch) => {
        console.log("bajo " + page);
        setPage(page - 1);
        console.log("bajada " + page);

        dispatch(actions.previousFindAllExercisesResultPage(page));
    }

    const nextFindAllExercisesResultPage = (dispatch) => {
        console.log("subo " + page);
        setPage(page + 1);

        dispatch(actions.nextFindAllExercisesResultPage(page));
    }


    const handleSetTypeExercise = (tabValue, handleChange, exerciseType, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findExercisesByTypePage({ page: page, exerciseType: exerciseType }));
        history(`/exercises/home/type/${exerciseType}/${tabValue}`);
    }

    const handleSetAllExercise = (dispatch) => {
        dispatch(actions.findAllExercisesPage({ page: page }));
        history(`/exercises/home`);
    }

    return (

        <div className=''>

            <Box
                sx={{
                    maxWidth: { xs: 320, sm: 480 },
                    bgcolor: 'background.dark',
                    boxShadow: 1,
                    borderRadius: 4,
                    margin: 'auto',  // Centra horizontalmente
                    marginTop: '50px', // Ajusta la distancia desde la parte superior según sea necesario
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab sx={{ color: '#40FF00', fontSize: "20px" }} onClick={() => handleSetAllExercise(dispatch)} label="All" />
                    <Tab sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeExercise(1, handleChange, tactic, dispatch)} label={<FormattedMessage id="project.exercises.fields.tactic"/>} />
                    <Tab sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeExercise(2, handleChange, technique, dispatch)} label={<FormattedMessage id="project.exercises.fields.technique"/>} />
                    <Tab sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeExercise(3, handleChange, physical, dispatch)} label={<FormattedMessage id="project.exercises.fields.physical"/>} />
                    <Tab sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeExercise(4, handleChange, globalized, dispatch)} label={<FormattedMessage id="project.exercises.fields.globalized"/>} />
                    <Tab sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeExercise(5, handleChange, specific, dispatch)} label={<FormattedMessage id="project.exercises.fields.specific"/>} />
                    <Tab sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeExercise(6, handleChange, psychological, dispatch)} label={<FormattedMessage id="project.exercises.fields.psychological"/>} />
                    <Tab sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeExercise(7, handleChange, strategy, dispatch)} label={<FormattedMessage id="project.exercises.fields.strategy"/>} />
                    <Tab sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeExercise(8, handleChange, preMatch, dispatch)} label={<FormattedMessage id="project.exercises.fields.preMatch"/>} />
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
                        fontSize: "70px",
                        bgcolor: "linear-gradient(147deg,#ffffff ,#4400f9,#000000 35% 70%,#660bd8,#ffffff)",
                        color: "white"
                    }}
                        onClick={() => {
                            if(userLogged.role === "ADMIN") {
                                history(`/exercises/addExercise`)
                            }
                            }}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
                <Pager
                    back={{
                        enabled: exercisesSearch && exercisesSearch.criteria && exercisesSearch.criteria.page >= 1,
                        onClick: () => previousFindAllExercisesResultPage(dispatch)
                    }}
                    next={{
                        enabled: exercisesSearch && exercisesSearch.result && exercisesSearch.result.existMoreItems,

                        onClick: () => nextFindAllExercisesResultPage(dispatch)
                    }} />
            </Box>
            {exercisesSearch && exercisesSearch.result && (
                <Exercises exercises={exercisesSearch.result.items} />
            )}
        </div>

    );
}

export default ExercisesHome;