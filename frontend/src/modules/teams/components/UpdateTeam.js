import React, { useEffect, useState, createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {useParams} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as actionsSeasons from '../../seasons/actions';
import * as actionsPlays from '../../plays/actions';
import * as actionsPlayers from '../../players/actions';
import * as actionsTrainings from '../../trainings/actions';
import * as actionsGames from '../../games/actions';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo22 from './logo3.jpeg';

const UpdateTeam = () => {

   const team = useSelector(selectors.getTeam);
   const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [arenaName, setArenaName] = useState("");
    const [ownerName, setOwnerName] = useState("");
	const [description, setDescription] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    const [value, setValue] = useState(0);
    let form;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!team) {
            dispatch(actions.findTeamById(id, () => history(`/teams/update/${id}`)));
        } else {
            setTeamName(team.teamName);
            setArenaName(team.arenaName);
            setOwnerName(team.ownerName);
            setDescription(team.description);
        }
    }, [dispatch, team, history, id]);

    const handleSubmit = event => {
    
        event.preventDefault();
        
        dispatch(actions.updateTeam(
            team.id,
            teamName.trim(),
            arenaName.trim(),
            ownerName.trim(),
            description.trim(),
         () => reloadWindow(),
            errors => setBackendErrors(errors),
        ));
    }

    const reloadWindow = () =>{
        history('/teams/home');
        window.location.reload('true');
    }

    const handleUpdateTeam = (dispatch) => {
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
        borderColor:"black",
        boxShadow:"0 10px 50px rgb(0, 0, 0)"
    }}>

<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "radial-gradient(circle, #cf3e05 -50%, #000000 100%)",
                            bgcolor:"red",
                            boxShadow: 6,
                            borderRadius: 3,
							borderColor: "black",
							boxShadow: "0 10px 50px rgb(0, 0, 0)",
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                              },
                        }}
        >
          <Tab sx={{ color: '#fbff00', fontSize: "30px", padding:"20px"}} onClick={() => handleUpdateTeam(dispatch)} label="General"  />
          <Tab sx={{ color: '#41AF24', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTeamPlays(1, dispatch)} label={<FormattedMessage id="project.plays.fields.plays"/>}/>
          <Tab sx={{ color: '#03e0e7', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTeamPlayers(2, dispatch)} label={<FormattedMessage id="project.players.fields.players"/>}/>
          <Tab sx={{ color: '#130c0c', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTeamSeasons(3, dispatch)} label={<FormattedMessage id="project.seasons.fields.seasons"/>}/>
          <Tab sx={{ color: '#e101e1', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTeamTrainings(4, dispatch)} label={<FormattedMessage id="project.trainings.fields.trainings"/>}/>
          <Tab sx={{ color: '#ff0000', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTeamGames(5, dispatch)} label={<FormattedMessage id="project.games.fields.games"/>}/>
        </Tabs>
      </Box>
</Box>



<Box
			my={4}
			display="flex"
			alignItems="center"
			gap={4}
			p={5}
			sx={{
				border: '2px solid grey',
                background: "radial-gradient(circle, #ff4800 -10%, #000000 100%)",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                borderColor:"black",
                boxShadow:"0 10px 50px rgb(0, 0, 0)",
                width:"1000px"
            }}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container margin={5} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={12} md={12} >
					<img src={logo22} alt="Person" class="card__image_team_update_create"></img>

					<Box
						component="form"
						sx={{
							borderRadius: "20px",
							borderColor:"black",
                            boxShadow:"0 10px 50px rgb(0, 0, 0)"
						}}
						autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
						noValidate
						autoComplete="off"
					>
						<Grid container spacing={2}>
                            <Grid item xs={12} md={12}>

								{/* <div className='form_add_training_general'> */}
								<Box
									component="form"
									sx={{
										'& .MuiTextField-root': { mb: 2, width: '100%' },
										margin: '50px', // Centra el formulario en la pantalla
									}}
									noValidate
									autoComplete="off"
								>
                                    <TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.seasons.fields.name" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={2}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={teamName}
										onChange={(e) => setTeamName(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.teams.fields.arena" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={2}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={arenaName}
										onChange={(e) => setArenaName(e.target.value)}
									/>

									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.teams.fields.owner" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={2}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={ownerName}
										onChange={(e) => setOwnerName(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
                                            borderColor:"black",
                                            boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
			</Grid>
			<button className="post_team" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box></Box>
    );
}

export default UpdateTeam;