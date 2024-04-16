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
import * as selectorsGames from '../../games/selectors';
import GamesByPlayer from '../../games/components/GamesByPlayer';
import * as selectorsTrainings from '../../trainings/selectors';
import TrainingsByPlayer from '../../trainings/components/TrainingsByPlayer';
import * as selectorsLesion from '../../lesion/selectors';
import LesionsByPlayer from '../../lesion/components/LesionsByPlayer';

const UpdatePlayerLesion = () => {

    const player = useSelector(selectors.getPlayer);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();

    const { exerciseType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);
    const [backendErrors, setBackendErrors] = useState(null);
    const [showTable, setShowTable] = useState(true);
    const [rowsLesion, setRowsLesion] = useState([]);
    const [columnsLesion, setColumnsLesion] = useState([]);
    const [lesionIds, setLesionIds] = useState(null);

    let form;
    let filteredLesion = [];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const lesionList = useSelector(selectorsLesion.getLesionsByPlayerId);
    const lesionListAll = useSelector(selectorsLesion.getAllLesion);


      useEffect(() => {
        if (!lesionList) {
            dispatch(actionsLesion.findLesionByPlayer(id, () => history(`/players/update/${id}/lesion/${4}`)));
            dispatch(actions.findPlayerById(id, () => history(`/players/update/${id}/lesion/${4}`)));
        }
    }, [dispatch, lesionList, history, id]);
    useEffect(() => {
            if (!lesionListAll.lesions) {
                dispatch(actionsLesion.findAllLesion(() => history(`/players/update/${id}/lesion/${4}`)));
            } else {

                filteredLesion = lesionListAll.lesions;
                filteredLesion = lesionListAll.lesions.filter(lesion => {
                    return !lesionList || !lesionList.some(ex => ex.id === lesion.id);
                });

                const columnsLesion2 = [
                    { field: 'id', headerName: 'ID', width: 70 },
                    { field: 'name', headerName: <FormattedMessage id="project.players.fields.name" />, width: 160 },
                    { field: 'type', headerName: <FormattedMessage id="project.exercises.fields.typeOnly" />, width: 160,
                    renderCell: (params) => (
                        <div style={{ backgroundColor: 
                            params.row.type === 'Muscular' ? '#ff0000' : // Azul oscuro  
                            params.row.type === 'Tendinosa' ? '#e4a803' : // Verde esmeralda
                            params.row.type === 'Articular' ? '#0125f4' : // Verde esmeralda
                            params.row.type === 'ColumnaVertebral' ? '#10be50' : // Verde esmeralda
                            params.row.type === 'Psicologica' ? '#b10aa9' : // Verde esmeralda
                            'green', // Por defecto
                            borderRadius: '5px',
                            padding: '5px'                    }}>
                        {params.value}
                        </div>
                    ), },
                    { field: 'medication', headerName: <FormattedMessage id="project.lesion.fields.medication" />, width: 300 },
                    { field: 'description', headerName: <FormattedMessage id="project.exercises.fields.description" />, width: 300 },
                ];
                setColumnsLesion(columnsLesion2);

                if (filteredLesion) {
                    const newRowsLesion = filteredLesion.map(lesion => ({
                        id: lesion.id,
                        name: lesion.lesionName,
                        type: lesion.lesionType,
                        medication: lesion.medication,
                        description: lesion.description,
                    }));
                    setRowsLesion(newRowsLesion);
                }

            }
        }, [dispatch, lesionListAll, history]);




        const handleUpdatePlayer = (dispatch) => {
            dispatch(actions.findPlayerById(id, () => history(`/players/update/${id}`)));
        }
        const handleUpdatePlayerTeams = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actionsTeams.findTeamByPlayer(id, () =>  console.log("hola")));
            dispatch(actions.findPlayerById(id, () => {
                dispatch(actionsTeams.findTeamByPlayer(id, () => history(`/players/update/${id}/team/${tabValue}`)));
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
        const handleUpdatePlayerTrainings = (tabValue, dispatch) => {
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

        const handleSubmit = event => {

            event.preventDefault();
    
            dispatch(actionsLesion.addLesionToPlayer(id, lesionIds,
                errors => setBackendErrors(errors),
            ));
            window.location.reload();
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

<Box sx={{boxShadow:"0 10px 50px rgb(0, 0, 0)" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(45deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
                            bgcolor:"red",
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
          <Tab value={0} sx={{ color: '#fbff00', fontSize: "30px", padding:"20px"}} onClick={() => handleUpdatePlayer(dispatch)} label="General"  />
          <Tab value={1} sx={{ color: '#6024af', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerTeams(1, dispatch)} label={<FormattedMessage id="project.teams.fields.teams"/>}/>
          <Tab value={2} sx={{ color: '#760606', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerGames(2, dispatch)} label={<FormattedMessage id="project.games.fields.games"/>}/>
          <Tab value={3} sx={{ color: '#d17403', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerTrainings(3, dispatch)} label={<FormattedMessage id="project.trainings.fields.trainings"/>}/>
          <Tab value={4} sx={{ color: '#01dde1', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerLesion(4, dispatch)} label={<FormattedMessage id="project.lesion.fields.lesion"/>}/>
          <Tab value={5} sx={{ color: '#e900d5', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerStretchings(5, dispatch)} label={<FormattedMessage id="project.stretchings.fields.stretchings"/>}/>
          <Tab value={6} sx={{ color: '#39ec02', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdatePlayerNotes(6, dispatch)} label={<FormattedMessage id="project.notes.fields.notes"/>}/>
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
                background: "linear-gradient(45deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
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
                        {<FormattedMessage id="project.global.buttons.lesion_selection"/>}
                    </Typography>
                    <div style={{ width: '100%', }}>
                        <DataGrid
                            sx={{
                                background: "linear-gradient(45deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
                                borderRadius: "20px",
                                boxShadow: 12,
                                m: 2,
                                color: "white",
                                borderColor: "black",
                                boxShadow: "0 10px 50px rgb(0, 0, 0)"
                            }}
                            rows={rowsLesion}
                            columns={columnsLesion}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={(newRowSelectionModelTeam) => {
                                setLesionIds((prevTeamId) => {
                                    console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelTeam);
                                    return newRowSelectionModelTeam;
                                });
                            }}
                        />
                    </div>

                </Grid>
            </Grid>


            <button className="post_player" type='submit' onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

        </Box>
    )}
                <LesionsByPlayer lesions={lesionList} playerId={id} />

            </Box>
</Box>
    );
}

export default UpdatePlayerLesion;