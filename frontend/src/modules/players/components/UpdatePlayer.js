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

const UpdatePlayer = () => {

    const player = useSelector(selectors.getPlayer);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();

    const [position, setPosition] = useState(null);
    const [playerName, setPlayerName] = useState(null);
    const [primaryLastName, setPrimaryLastName] = useState(null);
    const [secondLastName, setSecondLastName] = useState(null);

    const [dni, setDni] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    const [trends, setTrends] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [dniError, setDniError] = useState(false);

    const [value, setValue] = useState(0);
    let form;
    const handleChange2 = (event, newValue) => {
        setValue(newValue);
    };
    const teamUser = useSelector(selectorsTeams.getTeam);



    useEffect(() => {
        if (!player) {
            dispatch(actions.findPlayerById(id, () => history(`/players/update/${id}`)));
        } else {
            setPosition(player.position);
            setPlayerName(player.playerName);
            setPrimaryLastName(player.primaryLastName);
            setSecondLastName(player.secondLastName);
            setDni(player.dni);
            setEmail(player.email);
            setPhoneNumber(player.phoneNumber);
            setTrends(player.trends);
        }
    }, [dispatch, player, history, id]);
    useEffect(() => {
        if (!teamUser) {
            dispatch(actionsTeams.findTeamByPlayer(id, () => history(`/players/update/${id}`)));
        }
    }, [dispatch, teamUser, history, id]);

    const handleChange = (event) => {
        setPosition(event.target.value);
      };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    
        // Expresión regular para validar el formato de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Verifica si el email cumple con el patrón
        setEmailError(!emailPattern.test(inputEmail));
      };

    const handlePhoneNumberChange = (e) => {
        const inputPhoneNumber = e.target.value;
        setPhoneNumber(inputPhoneNumber);

        // Expresión regular para validar un número de teléfono de 9 cifras
        const phoneNumberPattern = /^\d{9}$/;

        // Verifica si el número de teléfono cumple con el patrón
        setPhoneNumberError(!phoneNumberPattern.test(inputPhoneNumber));
    };

    const handleDniChange = (e) => {
        const inputDni = e.target.value.toUpperCase(); // Convertimos a mayúsculas para asegurar la letra final
    
        // Expresión regular para validar un número de DNI español
        const dniPattern = /^\d{8}[A-Z]$/;
    
        // Verifica si el número de DNI cumple con el patrón
        setDniError(!dniPattern.test(inputDni));
        setDni(inputDni);
      };


      useEffect(() => {
        if (!player) {
            dispatch(actions.findPlayerById(id, () => history(`/players/update/${id}`)));
        } else {
            setPlayerName(player.playerName);
            setPrimaryLastName(player.primaryLastName);
            setSecondLastName(player.secondLastName);

            setPosition(player.position);

            setDni(player.dni);
            setEmail(player.email);
            setPhoneNumber(player.phoneNumber);
            setTrends(player.trends);
        }
    }, [dispatch, player, history, id]);



      const handleSubmit = event => {

        event.preventDefault();
            
            dispatch(actions.updatePlayer(player.id, playerName.trim(), 
            primaryLastName.trim(), secondLastName.trim(), position, trends.trim(),
            phoneNumber.trim(), email.trim(), dni.trim(),
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        }
        const reloadWindow = () =>{
            history(`/players/home`);
            window.location.reload('true');
        }

        const teams = useSelector(selectorsTeams.getAllTeams);
        const teamsList = teams.teams;

        if(!teamsList) {
            dispatch(actionsTeams.findAllTeams());
            return "Loading...";
        }

        const pointGuard = "Base";
        const shootingGuard = "Escolta";
        const smallForward = "Alero";
        const powerForward = "AlaPivot";
        const center = "Pivot";


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
        borderRadius: 2.68,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '53.6px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box

    }}>

<Box sx={{boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)" }}>
        <Tabs value={value} onChange={handleChange2} aria-label="basic tabs example"  
                        sx={{
                            background: "linear-gradient(45deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
                            bgcolor:"red",
							boxShadow: 4.02,
							borderRadius: 2.01,
                            borderColor: "black",
							boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                              },
                        }}
                        TabIndicatorProps={{ sx: { display: 'none' } }}
        >
          <Tab sx={{ color: '#fbff00', fontSize: "22.11px", padding:"13.4px"}} onClick={() => handleUpdatePlayer(dispatch)} label="General"  />
          <Tab sx={{ color: '#6024af', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdatePlayerTeams(1, dispatch)} label={<FormattedMessage id="project.teams.fields.teams"/>}/>
          <Tab sx={{ color: '#760606', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdatePlayerGames(2, dispatch)} label={<FormattedMessage id="project.games.fields.games"/>}/>
          <Tab sx={{ color: '#d17403', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdatePlayerTrainings(3, dispatch)} label={<FormattedMessage id="project.trainings.fields.trainings"/>}/>
          <Tab sx={{ color: '#01dde1', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdatePlayerLesion(4, dispatch)} label={<FormattedMessage id="project.lesion.fields.lesion"/>}/>
          <Tab sx={{ color: '#e900d5', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdatePlayerStretchings(5, dispatch)} label={<FormattedMessage id="project.stretchings.fields.stretchings"/>}/>
          <Tab sx={{ color: '#39ec02', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdatePlayerNotes(6, dispatch)} label={<FormattedMessage id="project.notes.fields.notes"/>}/>
        </Tabs>
      </Box>
</Box>



<Box
			my={2.68}
			display="flex"
			alignItems="center"
            p={3.35}
			sx={{
                maxWidth: { sm: 1095.45},
				border: '2px solid grey',
                background: "linear-gradient(45deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
                borderRadius: "13.4px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                borderColor:"black",
                boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
			}}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container margin={3.35} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item md={12}>
                <img src={perfil2} alt="Person" class="card__image_player_update_create"></img>

                </Grid>


				<Grid item md={12} >

					<Box
						component="form"
						sx={{
                            borderRadius: "13.4px",
                            borderColor:"black",
                            boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
						}}
						autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
						noValidate
						autoComplete="off"
					>
						<Grid container spacing={2}>

                        <Grid item xs={12} md={6}>

								{/* <div className='form_add_training_general'> */}
								<Box
                                
									component="form"
									sx={{
										'& .MuiTextField-root': { mb: 1.34, width: '100%' },
										margin: '33.5px', // Centra el formulario en la pantalla

									}}
									noValidate
									autoComplete="off"
								>
    <div>
	  <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
				fontSize:"13.4px",
                top:"-5px",
                marginTop:"-15px"
              }}

            ><FormattedMessage id="project.players.fields.position" /></InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={position}
          label={<FormattedMessage id="project.players.fields.position" />}
          onChange={handleChange}
		  sx={{
			color: "white",
			border: '1.34px solid grey',
			borderRadius: "13.4px",
			borderColor:"black",
			boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
			marginBottom:"33.5px",
			height:"40px"

		  }}
		  inputProps={{
			MenuProps: {
			  MenuListProps: {
				sx: {
				  backgroundColor: 'rgb(58 60 84)',
				  color: "white"
				}
			  }
			}
		  }}

        >
		<MenuItem value={pointGuard}><FormattedMessage id="project.players.fields.pointGuard" /></MenuItem>
        <MenuItem value={shootingGuard}><FormattedMessage id="project.players.fields.shootingGuard" /></MenuItem>
        <MenuItem value={smallForward}><FormattedMessage id="project.players.fields.smallForward" /></MenuItem>
        <MenuItem value={powerForward}><FormattedMessage id="project.players.fields.powerForward" /></MenuItem>
        <MenuItem value={center}><FormattedMessage id="project.players.fields.center" /></MenuItem>
        </Select>
        </div>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.playerName" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={3.4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={playerName}
										onChange={(e) => setPlayerName(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.primaryLastName" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={3.4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={primaryLastName}
										onChange={(e) => setPrimaryLastName(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.secondLastName" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={3.4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={secondLastName}
										onChange={(e) => setSecondLastName(e.target.value)}
									/>
								</Box>
							</Grid>
                        <Grid item xs={12} md={6}>

								{/* <div className='form_add_training_general'> */}
								<Box
                                
									component="form"
									sx={{
										'& .MuiTextField-root': { mb: 1.34, width: '100%' },
										margin: '33.5px', // Centra el formulario en la pantalla

									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.email" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={1.8}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={email}
										onChange={handleEmailChange}
                                        error={emailError} // Activa el estado de error en TextField
                                        helperText={emailError ? "Email no válido" : ""} // Muestra un mensaje de ayuda si hay un error
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.phoneNumber" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={1.8}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        error={phoneNumberError} // Activa el estado de error en TextField
                                        helperText={phoneNumberError ? "Número de teléfono no válido" : ""} // Muestra un mensaje de ayuda si hay un error
                                      />
                                    <TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.dni" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={1.8}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={dni}
                                        onChange={handleDniChange}
                                        error={dniError} // Activa el estado de error en TextField
                                        helperText={dniError ? "Número de DNI no válido" : ""} // Muestra un mensaje de ayuda si hay un error
									/>
                                    									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.trends" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={7}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
                                            marginTop:"14.74px"
										}}
										value={trends}
										onChange={(e) => setTrends(e.target.value)}
									/>

								</Box>
							</Grid>






						</Grid>
					</Box>  </Grid>
			</Grid>
			<button className="post_player" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
</Box>
    );
}

export default UpdatePlayer;