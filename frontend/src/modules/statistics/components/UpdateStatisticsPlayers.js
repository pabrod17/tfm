import React, { useEffect, useState, createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actionsGame from '../../games/actions';
import * as selectorsGame from '../../games/selectors';
import {useParams} from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import bigBall from '../../trainings/components/bigBall.jpg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import * as selectorsPlayers from '../../players/selectors';
import * as actionsPlayers from '../../players/actions';
import ExercisesByTraining from '../../exercises/components/ExercisesByTraining';
import StretchingsByTraining from '../../stretchings/components/StretchingsByTraining';
import * as actionsGames from '../../games/actions';
import StretchingsByGame from '../../stretchings/components/StretchingsByGame';
import * as actionsStatistics from '../../statistics/actions';
import PlayersByGame from '../../players/components/PlayersByGame';

import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import PlayersByGameStatistics from '../../players/components/PlayersByGameStatistics';


const UpdateStatisticsPlayers = () => {
    const game = useSelector(selectorsGame.getOneGame);

    const {gameId} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);
    const { stretchingType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);
    const [showTable, setShowTable] = useState(true);
	const [playerIds, setPlayerIds] = useState(null);
    const [rowsPlayers, setRowsPlayers] = useState([]);
    const [columnsStretchings, setColumnsPlayers] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let filteredPlayers = [];
    let form;

    const playerList = useSelector(selectorsPlayers.getPlayersByGameId);
    const playerListAll = useSelector(selectorsPlayers.getAllPlayers);
    const teamssListAll = useSelector(selectorsTeams.getAllTeams);

    useEffect(() => {
        console.log("PRIMEROOOOOO, ", playerList)
        if (!playerList) {
            console.log("PRIMEROOOOOO 111111, ", playerList)
            dispatch(actionsPlayers.findPlayersByGame(gameId, () => history(`/statistics/update/game/${gameId}/players/${1}`)));
            dispatch(actionsGame.findGameById(gameId, () => history(`/statistics/update/game/${gameId}/players/${1}`)));
            dispatch(actionsTeams.findAllTeams());
        }
    }, [dispatch, playerList, history, gameId]);

    useEffect(() => {
        if (!teamssListAll.teams) {
            dispatch(actionsTeams.findAllTeams(() => history(`/statistics/update/game/${gameId}/players/${1}`)));
        } else {
        if (!playerListAll.players) {
            dispatch(actionsPlayers.findPlayersByUserId(() => history(`/statistics/update/game/${gameId}/players/${1}`)));
        } else {
            filteredPlayers = playerListAll.players;
                filteredPlayers = playerListAll.players.filter(player => {
                    return !playerList || !playerList.some(ex => ex.id === player.id);
                });
        
        
            const columnsPlayers2 = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: <FormattedMessage id="project.players.fields.playerName"/>, width: 160 },
                { field: 'primaryLastName', headerName: <FormattedMessage id="project.players.fields.primaryLastName" />, width: 160},
                { field: 'position', headerName: <FormattedMessage id="project.players.fields.position" />, width: 160,
                renderCell: (params) => (
                    <div style={{ backgroundColor: 
                        params.row.position === 'Base' ? '#DD2476' : // Azul oscuro
                        params.row.position === 'Escolta' ? '#FF512F' : // Verde esmeralda
                        params.row.position === 'Alero' ? '#8E2DE2' : // Amarillo
                        params.row.position === 'AlaPivot' ? '#FF6B6B' : // Blanco
                        params.row.position === 'Pivot' ? '#000000' : // Gris claro
                        'green', // Por defecto
                        borderRadius: '5px',
                        padding: '5px'
                    }}>
                    {params.value}
                    </div>
                ), },
                { field: 'injured', headerName: <FormattedMessage id="project.lesion.fields.injured" />, width: 160,
                renderCell: (params) => (
                    <div style={{ backgroundColor: 
                        params.row.injured ? '#0f9b0f' : // Azul oscuro
                        !params.row.injured ? '#FF0000' : // Verde esmeralda
                        'green', // Por defecto
                        borderRadius: '5px',
                        padding: '5px'
                    }}>
                    {params.value}
                    </div>
                ), },
                { field: 'teamName', headerName: <FormattedMessage id="project.teams.fields.team" />, width: 160},
                { field: 'email', headerName: <FormattedMessage id="project.players.fields.email" />, width: 160},

            ];
            setColumnsPlayers(columnsPlayers2);

        
            if (filteredPlayers) {
                const newRowsPlayers = filteredPlayers.map(player => ({
                    id: player.id,
                    name: player.playerName,
                    primaryLastName: player.primaryLastName,
                    position: player.position,
                    injured: player.injured,
                    teamName: teamssListAll.teams.find(team => team.id === player.teamId)?.teamName || '',
                    email: player.email,

                }));
                // Actualizar el estado de rowsStretchings
                setRowsPlayers(newRowsPlayers);
            }
        
        }
    }
}   , [dispatch, playerListAll, teamssListAll, history]);








    const handleSubmit = event => {

        event.preventDefault();
    
        dispatch(actionsGames.addPlayerToGame(gameId, playerIds,
            errors => setBackendErrors(errors),
            ));
            window.location.reload();
        }

        const handleUpdateGameStatistics = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actionsGames.findGameById(gameId, () => {
                // dispatch(actionsStretchings.findStretchingsByGameId(id, () => history(`/games/update/${id}/statistics/${tabValue}`)));
            }));
            history(`/statistics/update/game/${gameId}`);
        }
    
        const handleUpdatePlayerStatistics = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actionsGames.findGameById(gameId, () => {
                dispatch(actionsPlayers.findPlayersByGame(gameId, () => history(`/statistics/update/game/${gameId}/players/${tabValue}`)));
            }));
            history(`/statistics/update/game/${gameId}/players/${tabValue}`);
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
        boxShadow: 1,
        borderRadius: 4,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '80px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>

<Box sx={{boxShadow:"0 10px 50px rgb(0, 0, 0)" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
                            bgcolor:"red",
                            boxShadow: 6,
                            borderRadius: 3,
                            mb:2,
                            borderColor:"black",
                            boxShadow:"0 10px 50px rgb(0, 0, 0)"
                        }}
        >
            <Tab value={0} sx={{ color: '#40FF00', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateGameStatistics(0, dispatch)} label={<FormattedMessage id="project.games.fields.game"/>} />
		    <Tab value={1} sx={{ color: '#ff0000', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdatePlayerStatistics(1, dispatch)} label={<FormattedMessage id="project.players.fields.players"/>} />
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
            <PlayersByGameStatistics players={playerList} gameId={gameId} />

            </Box>



</Box>
);
}

export default UpdateStatisticsPlayers;