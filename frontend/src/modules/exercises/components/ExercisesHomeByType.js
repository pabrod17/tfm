import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import * as selectors from '../selectors';
import Exercises from './Exercises';
import { Pager } from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, IconButton, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ExercisesHomeByType = () => {
    const exercisesSearch = useSelector(selectors.getExercisesSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const { exerciseType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

    const tactic = "Tactico";
    const technique = "Tecnica";
    const physical = "Fisico";
    const globalized = "Global";
    const specific = "Especifico";
    const psychological = "Psicologico";
    const strategy = "Estrategia";
    const preMatch = "PrePartido";

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!exercisesSearch) {
            console.log("HOLA");
            dispatch(actions.findExercisesByTypePage({ page: page, exerciseType: exerciseType }));
        }
    }, [page, exercisesSearch, dispatch, exerciseType]);

    const previousFindExercisesByTypeResultPage = (exerciseType, dispatch) => {
        setPage(page - 1);
        dispatch(actions.previousFindExercisesByTypeResultPage(exerciseType, page));
    }

    const nextFindExercisesByTypeResultPage = (exerciseType, dispatch) => {
        setPage(page + 1);
        dispatch(actions.nextFindExercisesByTypeResultPage(exerciseType, page));
    }

    const handleSetTypeExercise = (exerciseType, dispatch) => {
        dispatch(actions.findExercisesByTypePage({ page: page, exerciseType: exerciseType }));
        history(`/exercises/home/type/${exerciseType}/${value}`);
    }

    const handleSetAllExercise = (dispatch) => {
        dispatch(actions.findAllExercisesPage({ page: page }));
        history(`/exercises/home`);
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
                    <Tab value={0} sx={{ color: '#40FF00', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetAllExercise(dispatch)} label="All" />
                    <Tab value={1} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeExercise(tactic, dispatch)} label={<FormattedMessage id="project.exercises.fields.tactic"/>} />
                    <Tab value={2} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeExercise(technique, dispatch)} label={<FormattedMessage id="project.exercises.fields.technique"/>} />
                    <Tab value={3} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeExercise(physical, dispatch)} label={<FormattedMessage id="project.exercises.fields.physical"/>} />
                    <Tab value={4} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeExercise(globalized, dispatch)} label={<FormattedMessage id="project.exercises.fields.globalized"/>} />
                    <Tab value={5} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeExercise(specific, dispatch)} label={<FormattedMessage id="project.exercises.fields.specific"/>} />
                    <Tab value={6} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeExercise(psychological, dispatch)} label={<FormattedMessage id="project.exercises.fields.psychological"/>} />
                    <Tab value={7} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeExercise(strategy, dispatch)} label={<FormattedMessage id="project.exercises.fields.strategy"/>} />
                    <Tab value={8} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeExercise(preMatch, dispatch)} label={<FormattedMessage id="project.exercises.fields.preMatch"/>} />
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
                        onClick={() => history(`/exercises/addExercise`)}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
                <Pager
                    back={{
                        enabled: exercisesSearch && exercisesSearch.criteria && exercisesSearch.criteria.page >= 1,
                        onClick: () => previousFindExercisesByTypeResultPage(exerciseType, dispatch)
                    }}
                    next={{
                        enabled: exercisesSearch && exercisesSearch.result && exercisesSearch.result.existMoreItems,

                        onClick: () => nextFindExercisesByTypeResultPage(exerciseType, dispatch)
                    }} />
            </Box>

            <div>
                {exercisesSearch && exercisesSearch.result && (
                    <Exercises exercises={exercisesSearch.result.items} />
                )}
            </div>
        </div>
    );
}

export default ExercisesHomeByType;