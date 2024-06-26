import React, { useEffect, useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Errors } from '../../common';
import * as actions from '../actions';
import { useParams } from 'react-router-dom';
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
import * as selectorsPlays from '../../plays/selectors';
import * as actionsStatistics from '../../statistics/actions';
import Exercises from '../../exercises/components/Exercises';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ExercisesByTraining from '../../exercises/components/ExercisesByTraining';
import ExercisesByGame from '../../exercises/components/ExercisesByGame';
import TeamsBySeason from '../../teams/components/TeamsBySeason';
import TrainingsBySeason from '../../trainings/components/TrainingsBySeason';
import GamesBySeason from '../../games/components/GamesBySeason';
import * as selectors from '../selectors';
import * as actionsSeasons from '../../seasons/actions';
import * as actionsPlays from '../../plays/actions';
import * as actionsPlayers from '../../players/actions';
import * as actionsTrainings from '../../trainings/actions';
import * as actionsGames from '../../games/actions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo22 from './logo3.jpeg';
import PlaysByTeam from '../../plays/components/PlaysByTeam';


const UpdateTeamPlay = () => {
    const team = useSelector(selectors.getTeam);
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);
    const { exerciseType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);
    const [showTable, setShowTable] = useState(true);
    const [playIds, setPlayIds] = useState(null);
    const [rowsPlays, setRowsPlays] = useState([]);
    const [columnsPlays, setColumnsPlays] = useState([]);
    
    console.log("dentro PARA exercises: ", tabValue)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let filteredTeams = [];
    let form;

    const playsList = useSelector(selectorsPlays.getPlaysByTeamId);
    const playsListAll = useSelector(selectorsPlays.getPlays);

    useEffect(() => {
        if (!playsList) {
            dispatch(actionsPlays.findPlaysByTeamId(id, () => history(`/teams/update/${id}/play/${1}`)));
            dispatch(actions.findTeamById(id, () => history(`/teams/update/${id}/play/${1}`)));
        }
    }, [dispatch, playsList, history, id]);

    useEffect(() => {
        if (!playsListAll.plays) {
            dispatch(actionsPlays.findPlaysByUserId(() => history(`/teams/update/${id}/play/${1}`)));
        } else {

            console.log("AQUIIII: ", playsList)
            console.log("AQUIIII 222: ", playsListAll)
            filteredTeams = playsListAll.plays;
            filteredTeams = playsListAll.plays.filter(team => {
                return !playsList || !playsList.some(ex => ex.id === team.id);
            });

            const columnsPlays2 = [
                { field: 'id', headerName: 'ID', width: 46.9 },
                { field: 'title', headerName: <FormattedMessage id="project.notes.fields.title" />, width: 107.2 },
                { field: 'type', headerName: <FormattedMessage id="project.exercises.fields.typeOnly" />, width: 107.2,
                renderCell: (params) => (
                    <div style={{ backgroundColor: 
                        params.row.type === 'Ataque' ? '#0011ff' : // Azul oscuro  
                        params.row.type === 'Defensa' ? '#096129' : // Verde esmeralda
                        'green', // Por defecto
                        borderRadius: '5px',
                        padding: '5px'                    }}>
                    {params.value}
                    </div>
                ), },
                { field: 'gesture', headerName: <FormattedMessage id="project.plays.fields.gesture" />, width: 107.2 },
                { field: 'description', headerName: <FormattedMessage id="project.exercises.fields.description" />, width: 260 },
            ];
            setColumnsPlays(columnsPlays2);

            if (filteredTeams) {
                const newRowsPlays = filteredTeams.map(play => ({
                    id: play.id,
                    title: play.title,
                    type: play.playType,
                    gesture: play.gesture,
                    description: play.description,
                }));
                setRowsPlays(newRowsPlays);
            }

        }
    }, [dispatch, playsListAll, history]);




    const handleSubmit = event => {

        event.preventDefault();

        dispatch(actionsPlays.addPlayToTeam(id, playIds,
            errors => setBackendErrors(errors),
        ));
        window.location.reload();
    }



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
					borderRadius: 2.68,
					margin: 'auto',  // Centra horizontalmente
					marginTop: '53.6px', // Ajusta la distancia desde la parte superior según sea necesario
					textAlign: 'center', // Centra el contenido dentro del Box
				}}>

                <Box sx={{boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                        sx={{
                            background: "radial-gradient(circle, #cf3e05 -50%, #000000 100%)",
                            bgcolor:"red",
							boxShadow: 4.02,
							borderRadius: 2.01,
                            mb:1.34,
                            borderColor:"black",
							boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                              },
                        }}
                    >
                        <Tab value={0} sx={{ color: '#fbff00', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateTeam(0, dispatch)} label="General" />
                        <Tab value={1} sx={{ color: '#41AF24', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateTeamPlays(1, dispatch)} label={<FormattedMessage id="project.plays.fields.plays"/>}/>
                        <Tab value={2} sx={{ color: '#03e0e7', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateTeamPlayers(2, dispatch)} label={<FormattedMessage id="project.players.fields.players"/>}/>
                        <Tab value={3} sx={{ color: '#130c0c', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateTeamSeasons(3, dispatch)} label={<FormattedMessage id="project.seasons.fields.seasons"/>}/>
                        <Tab value={4} sx={{ color: '#e101e1', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateTeamTrainings(4, dispatch)} label={<FormattedMessage id="project.trainings.fields.trainings"/>}/>
                        <Tab value={5} sx={{ color: '#ff0000', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateTeamGames(5, dispatch)} label={<FormattedMessage id="project.games.fields.games"/>}/>
                    </Tabs>
                </Box>

                <input type="checkbox" class="theme-checkbox" onClick={() => setShowTable(!showTable)} />

</Box>
<Box
    display="flex"
    alignItems="center"
    p={1}
    mt={-0.5}
    sx={{
        flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
    }}
>
    {showTable && (




        <Box
            display="flex"
            alignItems="center"
            p={0.67}
            sx={{
                border: '1.34px solid grey',
                background: "radial-gradient(circle, #ff4800 -10%, #000000 100%)",
                borderRadius: "13.4px",
                flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
                flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                borderColor:"black",
                boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
            }}
        >
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <Grid container ml={3.35} mr={3.35} mb={1} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid item xs={12} md={12}>
                    <Typography
							sx={{ 
                                flex: '1 1 100%', mt: 2.35, color: "#00bfff", m:1.34, fontSize:"12px", fontWeight:"bold" }}
							variant="h8"
							id="tableTitle"
							component="div"
                    >
                        {<FormattedMessage id="project.global.buttons.play_selection"/>}
                    </Typography>
                    <div style={{ width: '100%', }}>
                        <DataGrid
                            sx={{
                                background: "radial-gradient(circle, #ff4800 -10%, #000000 100%)",
                                borderRadius: "20px",
                                boxShadow: 13.4,
                                m:1.34,
                                borderColor:"black",
                                boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)",
                                color:"white"
                            }}
                            density="compact"
                            rows={rowsPlays}
                            columns={columnsPlays}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={(newRowSelectionModelTeam) => {
                                setPlayIds((prevTeamId) => {
                                    console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelTeam);
                                    return newRowSelectionModelTeam;
                                });
                            }}
                        />
                    </div>

                </Grid>
            </Grid>


            <button className="post_team" type='submit' onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

        </Box>
    )}

                <PlaysByTeam plays={playsList} teamId={id} />

            </Box>

        </Box>

    );
}

export default UpdateTeamPlay;