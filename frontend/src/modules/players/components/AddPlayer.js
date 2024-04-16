import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

import {Errors} from '../../common';
import * as actions from '../actions';
import {useParams} from 'react-router-dom';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import * as selectorsTeams from '../../teams/selectors';
import * as actionsTeams from '../../teams/actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import perfil2 from './perfil2.jpeg'; //1920x1200


const AddPlayer = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();

    const [position, setPosition] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [primaryLastName, setPrimaryLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");

    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    const [trends, setTrends] = useState("");
    const [rowSelectionModelTeam, setRowSelectionModelTeam] = React.useState([]);
    const [teamId, setTeamId] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [dniError, setDniError] = useState(false);


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

    let form;

    const handleChange = (event) => {
        setPosition(event.target.value);
      };

      const teams = useSelector(selectorsTeams.getAllTeams);
      const teamsList = teams.teams;
  
  
      if (!teamsList) {
          dispatch(actionsTeams.findAllTeams());
          return "Loading...";
      }
  
      const columnsTeams = [
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'name', headerName: <FormattedMessage id="project.teams.fields.name"/>, width: 160 },
          { field: 'arena', headerName: <FormattedMessage id="project.teams.fields.arena"/>, width: 160 },
          { field: 'owner', headerName: <FormattedMessage id="project.teams.fields.owner"/>, width: 160 }
      ];
  
      const rowsTeams = [
      ];
  
      if (teamsList) {
          teamsList.map(team => {
              rowsTeams.push({
                  id: team.id,
                  name: team.teamName,
                  arena: team.arenaName,
                  owner: team.ownerName
              });
          })
      }



    const handleSubmit = event => {

        event.preventDefault();
    
            
            dispatch(actions.addPlayer(teamId, playerName.trim(), 
            primaryLastName.trim(), secondLastName.trim(), position, trends.trim(),
            phoneNumber.trim(), email.trim(), dni.trim(),
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        }
        const reloadWindow = () =>{
            history(`/players/addPlayer`);
            window.location.reload('true');
        }

        const pointGuard = "Base";
        const shootingGuard = "Escolta";
        const smallForward = "Alero";
        const powerForward = "AlaPivot";
        const center = "Pivot";

        return(

<Box
			my={4}
			display="flex"
			alignItems="center"
			gap={4}
			p={5}
			m={10}
			sx={{
                maxWidth: { sm: 1635 },
				border: '2px solid grey',
                background: "linear-gradient(45deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
				borderColor:"black",
				boxShadow:"0 10px 50px rgb(0, 0, 0)"
			}}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container margin={5} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item md={12}>
                <img src={perfil2} alt="Person" class="card__image_player_update_create"></img>

                </Grid>


				<Grid item md={12} >

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

                        <Grid item xs={12} md={6}>

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
<FormControl sx={{ m: 1, minWidth: 150 }}>
	  <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
				fontSize:"20px"
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
			border: '2px solid grey',
			borderRadius: "20px",
			borderColor:"black",
			boxShadow:"0 10px 10px rgb(0, 0, 0)",
			marginBottom:"50px"

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
      </FormControl>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.playerName" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={playerName}
										onChange={(e) => setPlayerName(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.primaryLastName" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={primaryLastName}
										onChange={(e) => setPrimaryLastName(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.secondLastName" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
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
										'& .MuiTextField-root': { mb: 2, width: '100%' },
										margin: '50px', // Centra el formulario en la pantalla

									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.email" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={2}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={email}
										onChange={handleEmailChange}
                                        error={emailError} // Activa el estado de error en TextField
                                        helperText={emailError ? "Email no válido" : ""} // Muestra un mensaje de ayuda si hay un error
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.phoneNumber" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={2}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        error={phoneNumberError} // Activa el estado de error en TextField
                                        helperText={phoneNumberError ? "Número de teléfono no válido" : ""} // Muestra un mensaje de ayuda si hay un error
                                      />
                                    <TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.dni" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={2}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={dni}
                                        onChange={handleDniChange}
                                        error={dniError} // Activa el estado de error en TextField
                                        helperText={dniError ? "Número de DNI no válido" : ""} // Muestra un mensaje de ayuda si hay un error
									/>
                                    									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.players.fields.trends" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={9}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)",
                                            marginTop:"22px"
										}}
										value={trends}
										onChange={(e) => setTrends(e.target.value)}
									/>

								</Box>
							</Grid>






						</Grid>
					</Box>  </Grid>






				<Grid container spacing={2}>
							<Grid item xs={12} md={12}>
                            <Box
								>
						<Typography
							sx={{ 
                                flex: '1 1 100%', mt: 3.5, color: "#00bfff", m:2 }}
							variant="h6"
							id="tableTitle"
							component="div"
						>
							{<FormattedMessage id="project.global.buttons.team_selection"/>}
						</Typography>
						<div style={{ height: 400, width: '100%', }}>
							<DataGrid
								sx={{
									borderRadius: "20px",
									m:2,
									borderColor:"black",
									boxShadow:"0 10px 50px rgb(0, 0, 0)",
                                    color:"white"
								}}
								rows={rowsTeams}
								columns={columnsTeams}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
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
                        </Box>

					</Grid>
				</Grid>

			</Grid>
			<button className="post_player" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
        );
}

export default AddPlayer;