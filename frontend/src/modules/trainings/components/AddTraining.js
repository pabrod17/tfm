/*
1- Training home: Cards normales
	- Filtro por fecha: filter by range
	- FrontCard: Como nombre -> objetivo, fecha
	- BackCard: Duracion en minutos(igual se puede hacer otra forma o algun componente), Descripcion
2- AddTraingin:
	- Form: Fecha, duracion minutos, descripcion, objetivo
	- Debajo del form o al lado meter dos tablas para seleccionar o team o season o las dos opciones.

3- UpdateTraining:
	- Tabs arriba: "General", "Stretchings", "Exercises". Cada tab un boton de save.
		- General: Form normal (fecha, duracion, descripcion, objetivo)
		- Stretchings y Exercises: Dos tablas una arriba con los items no seleccionados para ese training,
		y una tabla debajo sin poder seleccionar nada para ver los items elegidos. 
		(O igual esta segunda tabla
			no es necesaria, y podemos hacer que salga la lista de items con sus cards normal pero debajo
			de la primera tabla)
*/



/**
 * VOY A CAMBIAR EL SIGNIFICADO DE LA DURACION! 
 * 	AHORA SERA LA HORA DEL ENTRENAMIENTO Y SE PASA COMO STRING
 */







import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { Errors } from '../../common';
import * as actions from '../actions';
import * as selectorsTeams from '../../teams/selectors';
import * as actionsTeams from '../../teams/actions';
import * as selectorsSeasons from '../../seasons/selectors';
import * as actionsSeasons from '../../seasons/actions';
import { styled } from '@mui/material/styles';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { shadows } from '@mui/system';
import bigBall from '../../trainings/components/bigBall.jpg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const AddTraining = () => {
	const dispatch = useDispatch();
	const history = useNavigate();
	const [teamId, setTeamId] = useState(null);
	const [seasonId, setSeasonId] = useState(null);
	const [trainingDate, setTrainingDate] = useState(null);
	const [durationMinutes, setDurationMinutes] = useState(0);
	const [description, setDescription] = useState("");
	const [objective, setObjective] = useState("");
	const [backendErrors, setBackendErrors] = useState(null);
	const [rowSelectionModelTeam, setRowSelectionModelTeam] = React.useState([]);
	const [rowSelectionModelSeason, setRowSelectionModelSeason] = React.useState([]);
	let form;

	const teams = useSelector(selectorsTeams.getAllTeams);
	const seasons = useSelector(selectorsSeasons.getAllSeasons);

	const teamsList = teams.teams;

	if (!teamsList) {
		dispatch(actionsTeams.findAllTeams());
		return "Loading...";
	}

	const columnsTeams = [
		{ field: 'id', headerName: 'ID', width: 46.9 },
		{ field: 'name', headerName: <FormattedMessage id="project.teams.fields.name"/>, width: 107.2 },
		{ field: 'arena', headerName: <FormattedMessage id="project.teams.fields.arena"/>, width: 107.2 },
		{ field: 'owner', headerName: <FormattedMessage id="project.teams.fields.owner"/>, width: 107.2 }
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

	const seasonsList = seasons.seasons;

	if (!seasonsList) {
		dispatch(actionsSeasons.findAllSeasons(() => history(`/trainings/addTraining`)));
		return "Loading...";
	}

	const columnsSeasons = [
		{ field: 'id', headerName: 'ID', width: 46.9 },
		{ field: 'name', headerName: <FormattedMessage id="project.seasons.fields.name"/>, width: 107.2 },
		{ field: 'startDate', headerName: <FormattedMessage id='project.seasons.fields.startDate'/>, width: 107.2 },
		{ field: 'endDate', headerName: <FormattedMessage id='project.seasons.fields.endDate'/>, width: 107.2 },
	];

	const rowsSeasons = [
	];

	if (seasonsList) {
		seasonsList.map(season => {
        // Formatear fechas
        const startDate = new Date(season.startDate);
        const endDate = new Date(season.endDate);
        // Obtener día, mes y año en el formato deseado
        const formattedStartDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
			rowsSeasons.push({
				id: season.id,
				name: season.seasonName,
				startDate: formattedStartDate,
				endDate: formattedEndDate
			});
		})
	}



	

	const handleSubmit = event => {

		event.preventDefault();

			if (teamId == null) {
				dispatch(actions.addTrainingWithSeason(seasonId[0], dateConversor(trainingDate), timeConversor(durationMinutes),
					description.trim(), objective.trim(),
					() => reloadWindow(),
					errors => setBackendErrors(errors),
				));
			} else if (seasonId==null) {
				dispatch(actions.addTrainingWithTeam(teamId[0], dateConversor(trainingDate), timeConversor(durationMinutes),
					description.trim(), objective.trim(),
					() => reloadWindow(),
					errors => setBackendErrors(errors),
				));
			} else {
				dispatch(actions.addTraining(teamId[0], seasonId[0], dateConversor(trainingDate), timeConversor(durationMinutes),
					description.trim(), objective.trim(),
					() => reloadWindow(),
					errors => setBackendErrors(errors),
				));
			}
	}
	const reloadWindow = () => {
		history('/trainings/home');
		window.location.reload('true');
	}

	function dateConversor(trainingDate) {
		const dateObj = new Date(trainingDate);
		const year = dateObj.getFullYear();
		const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
		const day = dateObj.getDate().toString().padStart(2, '0');
		const hours = dateObj.getHours().toString().padStart(2, '0');
		const minutes = dateObj.getMinutes().toString().padStart(2, '0');
	
		const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
		console.log("SANCANDOOOO FECHA:; ", formattedDate)

		return formattedDate;
	}
	
	//hago esta conversion para luego poder pasar el valor de la bd previo cuando se actualice: 
		//defaultValue={dayjs('2022-04-17T15:30')}
	function timeConversor(durationMinutes) {
				const dateObj = new Date(durationMinutes.$d);
				const year = dateObj.getFullYear();
				const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
				const day = String(dateObj.getDate()).padStart(2, '0'); 
				const hours = String(dateObj.getHours()).padStart(2, '0'); 
				const minutes = String(dateObj.getMinutes()).padStart(2, '0'); 
				const finalTime = `${year}-${month}-${day}T${hours}:${minutes}`;
				return finalTime;
	}




	return (
		<Box
			my={4}
			display="flex"
			alignItems="center"
			p={3.35}
			m={6.7}
			sx={{
                maxWidth: { sm: 1020 },
				border: '1.34px solid grey',
				background: "linear-gradient(-45deg, #41295a 0%, #2F0743 70% )",
				borderRadius: "13.4px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
				borderColor:"black",
				boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)"
			}}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container margin={3.35} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item md={12} >
					<img src={bigBall} alt="Person" class="card__image_training_update_create"></img>

					<Box
						component="form"
						sx={{
							background: "linear-gradient(-45deg, #f5af19 0%, #f12711 100% )",
							borderRadius: "13.4px",
							borderColor:"black",
                            boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)"
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
									<h6 class="margin_training_form margin_training_form_top_botton"
									><FormattedMessage id="project.global.fields.date" /></h6>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
										<DemoContainer components={['DateTimePicker']}>
											<DateTimePicker
												sx={{
													border: '1.34px solid grey',
													background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
													borderRadius: "13.4px",
													colorAdjust: "#00bfff",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
													borderColor:"black",
                                                    boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
													height:"47px"

												}}
												autoFocus
												required
												onChange={(newDate) =>
													{
														setTrainingDate(newDate)
														console.log("formattedDate:", newDate.$d.toISOString());
													
													
													}
													
												
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<h6 class="margin_training_form margin_training_form_top_botton"
									><FormattedMessage id="project.statistics.fields.duration" /></h6>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
										<DemoContainer components={['TimePicker']}>
											<TimePicker
											    id="time-picker"

												sx={{
													border: '1.34px solid grey',
													background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
													borderRadius: "13.4px",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
													borderColor:"black",
                                                    boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
													height:"47px",
												}}

												onChange={(durationMinutes) => {
													setDurationMinutes(durationMinutes)
													console.log("holaaa222; ", durationMinutes)
												}}
												/>
												
										</DemoContainer>
									</LocalizationProvider>


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
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.4, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
										}}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>

									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.trainings.fields.objective" />}//Objetivo
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.4, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
										}}
										value={objective}
										onChange={(e) => setObjective(e.target.value)}
									/>


								</Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
				<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
						<Typography
							sx={{ 
                                flex: '1 1 100%', mt: 2.35, color: "#00bfff", m:1.34 }}
							variant="h8"
							id="tableTitle"
							component="div"
						>
							<FormattedMessage id="project.global.buttons.team_selection" />
						</Typography>
						<div style={{ height: 274, width: '100%', }}>
							<DataGrid
								sx={{
									background: "linear-gradient(-45deg, #f12711 0%, #f5af19 100% )",
									borderRadius: "13.4px",
									m:1.34,
									mr:0,
									borderColor:"black",
									boxShadow:"0 6.7px 33.50px rgb(0, 0, 0)",
									fontSize:"10px",
								}}
								density="compact"
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
					</Grid>

					<Grid item xs={12} md={6}>
						<Typography
							sx={{ 
                                flex: '1 1 100%', mt: 2.35, color: "#00bfff", m:1.34 }}
							variant="h8"
							id="tableTitle"
							component="div"
						>
							<FormattedMessage id="project.global.buttons.season_selection" />
						</Typography>
						<div style={{ height: 274, width: '100%', }}>
							<DataGrid
								sx={{
									background: "linear-gradient(-45deg, #f12711 0%, #f5af19 100% )",
									borderRadius: "13.4px",
									m:1.34,
									mr:0,
									borderColor:"black",
									boxShadow:"0 6.7px 33.50px rgb(0, 0, 0)",
									fontSize:"10px",
								}}
								density="compact"
								rows={rowsSeasons}
								columns={columnsSeasons}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
								pageSizeOptions={[5, 10]}
								checkboxSelection
								rowSelectionModel={rowSelectionModelSeason}
								onRowSelectionModelChange={(newRowSelectionModelSeason) => {
									if (newRowSelectionModelSeason.length <= 1) {
										setRowSelectionModelSeason(newRowSelectionModelSeason);
										console.log(" 111111: ", newRowSelectionModelSeason)
										setSeasonId((prevSeasonId) => {
											console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelSeason);
											return newRowSelectionModelSeason;
										});
									} else {
										setRowSelectionModelSeason(newRowSelectionModelSeason[newRowSelectionModelSeason.length - 1]);
										console.log(" 22222: ", newRowSelectionModelSeason[newRowSelectionModelSeason.length - 1])
										setSeasonId((prevSeasonId) => {
											console.log(" seasonnnn SEGIMDPOPPPPP: ", newRowSelectionModelSeason[newRowSelectionModelSeason.length - 1]);
											return newRowSelectionModelSeason[newRowSelectionModelSeason.length - 1];
										});
									}

								}}
							/>
						</div>
					</Grid>

				</Grid>

			</Grid>
			<button className="post_training" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
	);
}

export default AddTraining;