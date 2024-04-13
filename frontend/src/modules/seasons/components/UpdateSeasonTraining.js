import React, { useEffect, useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Errors } from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import bigBall from '../../seasons/components/red5.jpeg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import * as selectorsTrainings from '../../trainings/selectors';
import * as actionsTrainings from '../../trainings/actions';
import * as actionsGames from '../../games/actions';
import * as actionsStatistics from '../../statistics/actions';
import Exercises from '../../exercises/components/Exercises';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ExercisesByTraining from '../../exercises/components/ExercisesByTraining';
import ExercisesByGame from '../../exercises/components/ExercisesByGame';
import TeamsBySeason from '../../teams/components/TeamsBySeason';
import TrainingsBySeason from '../../trainings/components/TrainingsBySeason';

const UpdateSeasonTraining = () => {
    const season = useSelector(selectors.getSeason);
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);
    const { exerciseType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

    console.log("dentro PARA exercises: ", tabValue)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let form;

    const trainingsList = useSelector(selectorsTrainings.getTrainingsBySeasonId);

    useEffect(() => {
        if (!trainingsList) {
            dispatch(actionsTrainings.findTrainingsBySeasonId(id, () => history(`/seasons/update/${id}/training/${2}`)));
            dispatch(actions.findSeasonById(id, () => history(`/seasons/update/${id}/training/${2}`)));
        }
    }, [dispatch, trainingsList, history, id]);







    const handleUpdateSeason = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findSeasonById(id, () => history(`/seasons/update/${id}`)));
    }
    const handleUpdateSeasonTeams = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findSeasonById(id, () => history(`/seasons/update/${id}/team/${tabValue}`)));
    }
    const handleUpdateSeasonTrainings = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findSeasonById(id, () => {
            dispatch(actionsTrainings.findTrainingsBySeasonId(id, () => history(`/seasons/update/${id}/training/${tabValue}`)));
        }));
        history(`/seasons/update/${id}/training/${tabValue}`);
    }
    const handleUpdateSeasonGames = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findSeasonById(id, () => {
            dispatch(actionsGames.findGamesBySeasonId(id, () => history(`/seasons/update/${id}/game/${tabValue}`)));
        }));
        history(`/seasons/update/${id}/game/${tabValue}`);
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            p={1}
            sx={{
                flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
            }}
        >
            <Box
                sx={{
                    bgcolor: 'background.dark',
                    boxShadow: 1,
                    borderRadius: 4,
                    margin: 'auto',  // Centra horizontalmente
                    marginTop: '80px', // Ajusta la distancia desde la parte superior según sea necesario
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>

                <Box sx={{boxShadow:"0 10px 50px rgb(0, 0, 0)" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                        sx={{
                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
                            bgcolor: "red",
                            boxShadow: 6,
                            borderRadius: 3,
                            mb: 2,
                            borderColor: "black",
                            boxShadow: "0 10px 50px rgb(0, 0, 0)",
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                              },
                        }}
                    >
                        <Tab value={0} sx={{ color: '#40FF00', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateSeason(0, dispatch)} label="General" />
                        <Tab value={1} sx={{ color: '#e70707', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateSeasonTeams(1, dispatch)} label="Teams" />
                        <Tab value={2} sx={{ color: '#FF6C00', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateSeasonTrainings(2, dispatch)} label="Trainings" />
                        <Tab value={3} sx={{ color: '#F7FF00', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateSeasonGames(3, dispatch)} label="Games" />
                    </Tabs>
                </Box>

            </Box>
            <Box
                display="flex"
                alignItems="center"
                p={1}
                sx={{
                    flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                }}
            >

                <TrainingsBySeason trainings={trainingsList} seasonId={id} />

            </Box>

        </Box>

    );
}

export default UpdateSeasonTraining;