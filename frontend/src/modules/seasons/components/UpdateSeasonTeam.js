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
import * as selectorsTeams from '../../teams/selectors';
import * as actionsTeams from '../../teams/actions';
import * as actionsTrainings from '../../trainings/actions';
import * as actionsGames from '../../games/actions';
import * as actionsStatistics from '../../statistics/actions';
import Exercises from '../../exercises/components/Exercises';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ExercisesByTraining from '../../exercises/components/ExercisesByTraining';
import ExercisesByGame from '../../exercises/components/ExercisesByGame';
import TeamsBySeason from '../../teams/components/TeamsBySeason';

const UpdateSeasonTeam = () => {
    const season = useSelector(selectors.getSeason);
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);
    const { exerciseType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);
    const [showTable, setShowTable] = useState(true);
    const [teamIds, setTeamIds] = useState(null);
    const [rowsTeams, setRowsTeams] = useState([]);
    const [columnsTeams, setColumnsTeams] = useState([]);

    console.log("dentro PARA exercises: ", tabValue)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let filteredTeams = [];
    let form;

    const teamsList = useSelector(selectorsTeams.getTeamsBySeasonId);
    const teamssListAll = useSelector(selectorsTeams.getAllTeams);

    useEffect(() => {
        if (!teamsList) {
            dispatch(actionsTeams.findTeamsToSeason(id, () => history(`/seasons/update/${id}/team/${1}`)));
            dispatch(actions.findSeasonById(id, () => history(`/seasons/update/${id}/team/${1}`)));
        }
    }, [dispatch, teamsList, history, id]);

    useEffect(() => {
        if (!teamssListAll.teams) {
            dispatch(actionsTeams.findAllTeams(() => history(`/seasons/update/${id}/team/${1}`)));
        } else {

            console.log("AQUIIII: ", teamsList)
            console.log("AQUIIII 222: ", teamssListAll)
            filteredTeams = teamssListAll.teams;
            filteredTeams = teamssListAll.teams.filter(team => {
                return !teamsList || !teamsList.some(ex => ex.id === team.id);
            });

            const columnsTeams2 = [
                { field: 'id', headerName: 'ID', width: 46.9 },
                { field: 'name', headerName: <FormattedMessage id="project.teams.fields.name" />, width: 107.2 },
                { field: 'arena', headerName: <FormattedMessage id="project.teams.fields.arena" />, width: 107.2 },
                { field: 'owner', headerName: <FormattedMessage id="project.teams.fields.owner" />, width: 107.2 },
                { field: 'description', headerName: <FormattedMessage id="project.exercises.fields.description" />, width: 260 },
            ];
            setColumnsTeams(columnsTeams2);

            if (filteredTeams) {
                const newRowsTeams = filteredTeams.map(team => ({
                    id: team.id,
                    name: team.teamName,
                    arena: team.arenaName,
                    owner: team.ownerName,
                    description: team.description,
                }));
                setRowsTeams(newRowsTeams);
            }

        }
    }, [dispatch, teamssListAll, history]);










    const handleSubmit = event => {

        event.preventDefault();

        dispatch(actionsTeams.addTeamToSeason(id, teamIds,
            errors => setBackendErrors(errors),
        ));
        window.location.reload();
    }
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
					borderRadius: 2.68,
					margin: 'auto',  // Centra horizontalmente
					marginTop: '53.6px', // Ajusta la distancia desde la parte superior según sea necesario
					textAlign: 'center', // Centra el contenido dentro del Box
				}}>
                <Box sx={{boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                        sx={{
                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
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
                        <Tab value={0} sx={{ color: '#40FF00', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateSeason(0, dispatch)} label="General" />
                        <Tab value={1} sx={{ color: '#e70707', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateSeasonTeams(1, dispatch)} label={<FormattedMessage id="project.teams.fields.teams"/>}/>
                        <Tab value={2} sx={{ color: '#FF6C00', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateSeasonTrainings(2, dispatch)} label={<FormattedMessage id="project.trainings.fields.trainings"/>}/>
                        <Tab value={3} sx={{ color: '#F7FF00', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateSeasonGames(3, dispatch)} label={<FormattedMessage id="project.games.fields.games"/>}/>
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
                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
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
                        {<FormattedMessage id="project.global.buttons.team_selection"/>}
                                </Typography>
                                <div style={{ width: '100%', }}>
                                    <DataGrid
                                        sx={{
                                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
                                            borderRadius: "20px",
                                            boxShadow: 13.4,
                                            m:1.34,
                                            borderColor:"black",
                                            boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)",
                                            color:"white"
                                        }}
                                        density="compact"
                                        rows={rowsTeams}
                                        columns={columnsTeams}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
                                        pageSizeOptions={[5, 10]}
                                        checkboxSelection
                                        onRowSelectionModelChange={(newRowSelectionModelTeam) => {
                                            setTeamIds((prevTeamId) => {
                                                console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelTeam);
                                                return newRowSelectionModelTeam;
                                            });
                                        }}
                                    />
                                </div>

                            </Grid>
                        </Grid>


                        <button className="post_season" type='submit' onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

                    </Box>
                )}

                <TeamsBySeason teams={teamsList} seasonId={id} />

            </Box>

        </Box>

    );
}

export default UpdateSeasonTeam;