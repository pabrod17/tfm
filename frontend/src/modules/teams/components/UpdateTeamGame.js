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
import * as selectorsGames from '../../games/selectors';
import * as actionsGames from '../../games/actions';
import * as actionsTrainings from '../../trainings/actions';
import * as actionsStatistics from '../../statistics/actions';
import Exercises from '../../exercises/components/Exercises';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ExercisesByTraining from '../../exercises/components/ExercisesByTraining';
import ExercisesByGame from '../../exercises/components/ExercisesByGame';
import TeamsBySeason from '../../teams/components/TeamsBySeason';
import TrainingsBySeason from '../../trainings/components/TrainingsBySeason';
import GamesBySeason from '../../games/components/GamesBySeason';
import GamesByTeam from '../../games/components/GamesByTeam';
import * as actionsSeasons from '../../seasons/actions';
import * as actionsPlays from '../../plays/actions';
import * as actionsPlayers from '../../players/actions';

const UpdateTeamGame = () => {
    const team = useSelector(selectors.getTeam);
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

    const gamesList = useSelector(selectorsGames.getGamesByTeamId);

    useEffect(() => {
        if (!gamesList) {
            dispatch(actionsGames.findGamesByTeamId(id, () => history(`/teams/update/${id}/game/${5}`)));
            dispatch(actions.findTeamById(id, () => history(`/teams/update/${id}/game/${5}`)));
        }
    }, [dispatch, gamesList, history, id]);


    const handleUpdateTeam = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findTeamById(id, () => history(`/teams/update/${id}`)));
    }
    const handleUpdateTeamPlays = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findTeamById(id, () => {
            dispatch(actionsPlays.findPlaysByTeamId(id, () => history(`/teams/update/${id}/play/${tabValue}`)));
        }));
        history(`/teams/update/${id}/play/${tabValue}`);
    }
    const handleUpdateTeamPlayers = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findTeamById(id, () => {
            dispatch(actionsPlayers.findAPlayersOfTeam(id, () => history(`/teams/update/${id}/player/${tabValue}`)));
        }));
        history(`/teams/update/${id}/player/${tabValue}`);
    }
    const handleUpdateTeamSeasons = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findTeamById(id, () => {
            dispatch(actionsSeasons.findSeasonsToTeam(id, () => history(`/teams/update/${id}/season/${tabValue}`)));
        }));
        history(`/teams/update/${id}/season/${tabValue}`);
    }
    const handleUpdateTeamTrainings = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findTeamById(id, () => {
            dispatch(actionsTrainings.findTrainingsByTeamId(id, () => history(`/teams/update/${id}/training/${tabValue}`)));
        }));
        history(`/teams/update/${id}/training/${tabValue}`);
    }
    const handleUpdateTeamGames = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findTeamById(id, () => {
            dispatch(actionsGames.findGamesByTeamId(id, () => history(`/teams/update/${id}/game/${tabValue}`)));
        }));
        history(`/teams/update/${id}/game/${tabValue}`);
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
                            background: "radial-gradient(circle, #cf3e05 -50%, #000000 100%)",
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
                        <Tab value={0} sx={{ color: '#fbff00', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateTeam(0, dispatch)} label="General" />
                        <Tab value={1} sx={{ color: '#41AF24', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateTeamPlays(1, dispatch)} label={<FormattedMessage id="project.plays.fields.plays"/>}/>
                        <Tab value={2} sx={{ color: '#03e0e7', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateTeamPlayers(2, dispatch)} label={<FormattedMessage id="project.players.fields.players"/>}/>
                        <Tab value={3} sx={{ color: '#130c0c', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateTeamSeasons(3, dispatch)} label={<FormattedMessage id="project.seasons.fields.seasons"/>}/>
                        <Tab value={4} sx={{ color: '#e101e1', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateTeamTrainings(4, dispatch)} label={<FormattedMessage id="project.trainings.fields.trainings"/>}/>
                        <Tab value={5} sx={{ color: '#ff0000', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateTeamGames(5, dispatch)} label={<FormattedMessage id="project.games.fields.games"/>}/>
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

                <GamesByTeam games={gamesList} teamId={id} />

            </Box>

        </Box>

    );
}

export default UpdateTeamGame;