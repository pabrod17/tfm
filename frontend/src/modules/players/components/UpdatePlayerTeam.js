import React, { useEffect, useState, createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as selectorsTeams from '../../teams/selectors';
import {useParams} from 'react-router-dom';

import * as actionsTeams from '../../teams/actions';
import * as actionsTrainings from '../../trainings/actions';
import * as actionsGames from '../../games/actions';
import * as actionsLesion from '../../lesion/actions';
import * as actionsStretching from '../../stretchings/actions';
import * as actionsNote from '../../notes/actions';

import perfil2 from './perfil2.jpeg'; //1920x1200
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Team from '../../teams/components/Team';

const UpdatePlayerTeam = () => {

    const player = useSelector(selectors.getPlayer);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();

    const { exerciseType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);
    const [showTable, setShowTable] = useState(true);
    const [rowSelectionModelTeam, setRowSelectionModelTeam] = React.useState([]);
    const [teamId, setTeamId] = useState(null);
    const [teamIds, setTeamIds] = useState(null);
    const [rowsTeams, setRowsTeams] = useState([]);
    const [columnsTeams, setColumnsTeams] = useState([]);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;
    let filteredTeams = [];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

      const teamUser = useSelector(selectorsTeams.getTeam);
      const teamssListAll = useSelector(selectorsTeams.getAllTeams);

      useEffect(() => {
        if (!teamUser) {
            dispatch(actionsTeams.findTeamByPlayer(id, () => history(`/players/update/${id}/team/${1}`)));
            dispatch(actions.findPlayerById(id, () => history(`/players/update/${id}/team/${1}`)));
        }
    }, [dispatch, teamUser, history, id]);
    
    useEffect(() => {
        if (!teamssListAll.teams) {
            dispatch(actionsTeams.findAllTeams(() => history(`/players/update/${id}/team/${1}`)));
        } else {
            filteredTeams = teamssListAll.teams;

            console.log("MOSTROOOO: ", teamssListAll.teams)
            console.log("MOSTROOOO 222222: ", teamUser)
            filteredTeams = teamssListAll.teams.filter(team => team.id !== teamUser.id);

            const columnsTeams2 = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: <FormattedMessage id="project.teams.fields.name" />, width: 160 },
                { field: 'arena', headerName: <FormattedMessage id="project.teams.fields.arena" />, width: 160 },
                { field: 'owner', headerName: <FormattedMessage id="project.teams.fields.owner" />, width: 160 },
                { field: 'description', headerName: <FormattedMessage id="project.exercises.fields.description" />, width: 160 },
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



      useEffect(() => {
        if (!player) {
            dispatch(actions.findPlayerById(id, () => history(`/players/update/${id}/team/${1}`)));
        }
    }, [dispatch, player, history, id]);



      const handleSubmit = event => {

        event.preventDefault();
            
        dispatch(actions.changePlayerToTeam(teamId, id, () => window.location.reload('true')));
        window.location.reload('true')
        }

        const handleUpdatePlayer = (dispatch) => {
            dispatch(actions.findPlayerById(id, () => history(`/players/update/${id}`)));
        }
        const handleUpdatePlayerTeams = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findPlayerById(id, () => {
                dispatch(actionsTeams.findTeamById(player.teamId, () => history(`/players/update/${id}/team/${tabValue}`)));
            }));
            history(`/players/update/${id}/team/${tabValue}`);
        }
        const handleUpdatePlayerGames = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findPlayerById(id, () => {
                dispatch(actionsGames.findGamesByPlayerId(id, () => history(`/players/update/${id}/game/${tabValue}`)));
            }));
            history(`/players/update/${id}/game/${tabValue}`);
        }
        const handleUpdateTeamTrainings = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findPlayerById(id, () => {
                dispatch(actionsTrainings.findTrainingsByPlayerId(id, () => history(`/players/update/${id}/training/${tabValue}`)));
            }));
            history(`/players/update/${id}/training/${tabValue}`);
        }
        const handleUpdatePlayerLesion = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findPlayerById(id, () => {
                dispatch(actionsLesion.findLesionByPlayer(id, () => history(`/players/update/${id}/lesion/${tabValue}`)));
            }));
            history(`/players/update/${id}/lesion/${tabValue}`);
        }
        const handleUpdatePlayerStretchings = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findPlayerById(id, () => {
                dispatch(actionsStretching.findStretchingsByPlayerId(id, () => history(`/players/update/${id}/stretching/${tabValue}`)));
            }));
            history(`/players/update/${id}/stretching/${tabValue}`);
        }
        const handleUpdatePlayerNotes = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findPlayerById(id, () => {
                dispatch(actionsNote.findNotesByPlayer(id, () => history(`/players/update/${id}/note/${tabValue}`)));
            }));
            history(`/players/update/${id}/note/${tabValue}`);
        }



    return(

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
        borderRadius: 4,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '80px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>

<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
                            bgcolor:"red",
                            boxShadow: 6,
                            borderRadius: 3,
							borderColor: "black",
							boxShadow: "0 10px 50px rgb(0, 0, 0)"
                        }}
        >
          <Tab value={0} sx={{ color: '#fbff00', fontSize: "30px", padding:"20px"}} onClick={() => handleUpdatePlayer(dispatch)} label="General"  />
          <Tab value={1} sx={{ color: '#6024af', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerTeams(1, dispatch)} label="Teams"  />
          <Tab value={2} sx={{ color: '#760606', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerGames(2, dispatch)} label="Games"/>
          <Tab value={3} sx={{ color: '#d17403', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTeamTrainings(3, dispatch)} label="Trainings"/>
          <Tab value={4} sx={{ color: '#01dde1', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerLesion(4, dispatch)} label="Lesion"/>
          <Tab value={5} sx={{ color: '#e900d5', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerStretchings(5, dispatch)} label="Stretchings"/>
          <Tab value={6} sx={{ color: '#39ec02', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerNotes(6, dispatch)} label="Notes"/>
        </Tabs>
      </Box>
      <input type="checkbox" class="theme-checkbox" onClick={() => setShowTable(!showTable)} />

</Box>



<Box
                display="flex"
                alignItems="center"
                p={1}
                sx={{
                    flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                }}
            >
                {showTable && (




                    <Box
                        display="flex"
                        alignItems="center"
                        p={1}
                        sx={{
                            border: '2px solid grey',
                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
                            borderRadius: "20px",
                            flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
                            flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                            borderColor: "black",
                            boxShadow: "0 10px 50px rgb(0, 0, 0)"
                        }}
                    >
                        <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
                        <Grid container ml={5} mr={5} mb={1} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            <Grid item xs={12} md={12}>
                                <Typography
                                    sx={{ flex: '1 1 100%', mt: 3.5, color: "#00bfff", m: 2 }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Team Selection
                                </Typography>
                                <div style={{ width: '100%', }}>
                                    <DataGrid
                                        sx={{
                                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
                                            borderRadius: "20px",
                                            boxShadow: 12,
                                            m: 2,
                                            color: "white",
                                            borderColor: "black",
                                            boxShadow: "0 10px 50px rgb(0, 0, 0)"
                                        }}
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
                                        rowSelectionModel={rowSelectionModelTeam}
                                        onRowSelectionModelChange={(newRowSelectionModelTeam) => {
                                            if (newRowSelectionModelTeam.length <= 1) {
                                                setRowSelectionModelTeam(newRowSelectionModelTeam);
                                                console.log(" 111111: ", newRowSelectionModelTeam)
                                                setTeamId((prevTeamId) => {
                                                    console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelTeam);
                                                    return newRowSelectionModelTeam;
                                                });
                                            } else {
                                                setRowSelectionModelTeam(newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1]);
                                                console.log(" 22222: ", newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1])
                                                setTeamId((prevTeamId) => {
                                                    console.log(" seasonnnn SEGIMDPOPPPPP: ", newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1]);
                                                    return newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1];
                                                });
                                            }
        
                                        }}
                                    />
                                </div>

                            </Grid>
                        </Grid>


                        <button className="post_season" type='submit' onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

                    </Box>
                )}

                <Team team={teamUser} playerId={id} />

            </Box>
</Box>
    );
}

export default UpdatePlayerTeam;