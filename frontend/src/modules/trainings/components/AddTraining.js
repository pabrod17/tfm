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




import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

	const seasonsList = seasons.seasons;

	if (!seasonsList) {
		dispatch(actionsSeasons.findAllSeasons());
		return "Loading...";
	}

	const handleSubmit = event => {

		event.preventDefault();

		if (form.checkValidity()) {
			if (teamId == null) {
				dispatch(actions.addTrainingWithSeason(seasonId, trainingDate, durationMinutes,
					description.trim(), objective.trim(),
					() => reloadWindow(),
					errors => setBackendErrors(errors),
				));
			} else if (seasonId == null) {
				dispatch(actions.addTrainingWithTeam(teamId, trainingDate, durationMinutes,
					description.trim(), objective.trim(),
					() => reloadWindow(),
					errors => setBackendErrors(errors),
				));
			} else {
				dispatch(actions.addTraining(teamId, seasonId, trainingDate, durationMinutes,
					description.trim(), objective.trim(),
					() => reloadWindow(),
					errors => setBackendErrors(errors),
				));
			}
		} else {
			setBackendErrors(null);
			form.classList.add('was-validated');
		}
	}
	const reloadWindow = () => {
		history('/trainings/addTraining');
		window.location.reload('true');
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
		{
			field: 'age',
			headerName: 'Age',
			type: 'number',
			width: 90,
		},
		{
			field: 'fullName',
			headerName: 'Full name',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			valueGetter: (params) =>
				`${params.row.firstName || ''} ${params.row.lastName || ''}`,
		},
	];

	const rows = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
		{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
	];





	return (
		<Box
			my={4}
			display="flex"
			alignItems="center"
			gap={4}
			p={5}
			m={10}
			sx={{
				border: '2px solid grey',
				background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
			}}
		>

			<Grid container margin={5} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={6} md={6} >
					<img src={bigBall} alt="Person" class="card__image_training_update_create"></img>

					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
							background: "linear-gradient(-45deg, #f12711 0%, #f5af19 60% )",
							borderRadius: "20px",
							boxShadow: 12
						}}
						noValidate
						autoComplete="off"
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>

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
								<h4 class="margin_training_form"
								><FormattedMessage id="project.global.fields.date"/></h4>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DemoContainer components={['DatePicker']}>
													<DatePicker
														value={trainingDate}
														onChange={(trainingDate) => setTrainingDate(trainingDate)}
													/>     
													 </DemoContainer>
									</LocalizationProvider>
									<h4 class="margin_training_form"
								><FormattedMessage id="project.statistics.fields.duration"/></h4>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DemoContainer components={['DatePicker']}>
												<TimePicker label="Basic time picker" />
													 </DemoContainer>
									</LocalizationProvider>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
											borderRadius: "20px",
										}}
									/>

									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.trainings.fields.objective"/>}//Objetivo
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
											borderRadius: "20px",
										}}
									/>

									<Button variant="contained" color="success">
										Success
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
				<Grid item xs={6} md={6} >
					<Typography
						sx={{ flex: '1 1 100%', mt: 10, color:"white" }}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						Team Selection
					</Typography>
					<div style={{ height: 400, width: '100%', }}>
						<DataGrid
							sx={{
								background: "linear-gradient(-45deg, #f12711 0%, #f5af19 100% )",
								borderRadius: "20px",
								boxShadow: 12
							}}
							rows={rows}
							columns={columns}
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
									console.log("qwqwqw 2222: ", newRowSelectionModelTeam)
									setRowSelectionModelTeam(newRowSelectionModelTeam);
								}
								console.log("qwqwqw: ", rowSelectionModelTeam)
							}}
						/>
					</div>
					<Grid item >
						<Typography
							sx={{ flex: '1 1 100%', mt: 3.5, color:"white" }}
							variant="h6"
							id="tableTitle"
							component="div"
						>
							Season Selection
						</Typography>
						<div style={{ height: 400, width: '100%' }}>
							<DataGrid
								sx={{
									background: "linear-gradient(-45deg, #f12711 0%, #f5af19 100% )",
									borderRadius: "20px",
									boxShadow: 12
								}}
								rows={rows}
								columns={columns}
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
		</Box>










































		// <div>
		//     <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
		//     <div className="card bg-light border-dark centrado-update-add">
		//         <h5 className="card-header">
		//         <FormattedMessage id="project.trainings.fields.addTraining"/>
		//         </h5>
		//         <div className="card-body">
		//             <form ref={node => form = node} 
		//                 className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
		//                 <div className="form-group row">
		//                 <label htmlFor="trainingDate" className="col-md-4 col-form-label">
		//                 <FormattedMessage id="project.global.fields.date"/>
		//                 </label>
		//                 <div className="col-md-8">
		//                     <input type="date" id="trainingDate" className="form-control"
		//                         value={trainingDate}
		//                         onChange={e => setTrainingDate(e.target.value)}
		//                         autoFocus
		//                         required/>
		//                     <div className="invalid-feedback">
		//                         <FormattedMessage id='project.global.validator.required'/>
		//                     </div>
		//                 </div>
		//             </div>
		//                 <div className="form-group row">
		//                     <label htmlFor="firstName" className="col-md-12 col-form-label">
		//                     <FormattedMessage id="project.statistics.fields.duration"/>
		//                     </label>
		//                     <div className="col-md-12">
		//                         <textarea  type="text" id="durationMinutes" className="form-control"
		//                             value={durationMinutes}
		//                             onChange={e => setDurationMinutes(e.target.value)}
		//                             autoFocus
		//                             required/>
		//                         <div className="invalid-feedback">
		//                             <FormattedMessage id='project.global.validator.required'/>
		//                         </div>
		//                     </div>
		//                 </div>
		//                 <div className="form-group row">
		//                     <label htmlFor="firstName" className="col-md-12 col-form-label">
		//                     <FormattedMessage id="project.exercises.fields.description"/>
		//                     </label>
		//                     <div className="col-md-12">
		//                         <textarea  type="text" id="description" className="form-control"
		//                             value={description}
		//                             onChange={e => setDescription(e.target.value)}
		//                             autoFocus
		//                             required/>
		//                         <div className="invalid-feedback">
		//                             <FormattedMessage id='project.global.validator.required'/>
		//                         </div>
		//                     </div>
		//                 </div>
		//                 <div className="form-group row">
		//                     <label htmlFor="firstName" className="col-md-12 col-form-label">
		//                     <FormattedMessage id="project.trainings.fields.objective"/>
		//                     </label>
		//                     <div className="col-md-12">
		//                         <textarea type="text" id="objective" className="form-control"
		//                             value={objective}
		//                             onChange={e => setObjective(e.target.value)}
		//                             autoFocus
		//                             required/>
		//                         <div className="invalid-feedback">
		//                             <FormattedMessage id='project.global.validator.required'/>
		//                         </div>
		//                     </div>
		//                 </div>
		//                 <div class="dropdown">
		//                 <button class="btn-player draw-border"><FormattedMessage id="project.teams.fields.team"/></button>
		//                             <div class="dropdown-content">
		//                             {teamsList.map(team => 
		//                                         <a type="button" onClick={() => setTeamId(team.id)}> 
		//                                             {team.id} : {"  "}{team.teamName}
		//                                         </a>)}
		//                             </div>
		//                 </div>
		//                 <div class="dropdown">
		//                 <button class="btn-player draw-border"><FormattedMessage id="project.seasons.fields.season"/></button>
		//                             <div class="dropdown-content">
		//                             {seasonsList.map(season => 
		//                                         <a type="button" onClick={() => setSeasonId(season.id)}> 
		//                                             {season.id} : {"  "}{season.calendario}
		//                                         </a>)}
		//                             </div>
		//                 </div>
		//                 <div className="form-group row">
		//                     <div className="offset-md-8 col-md-1">
		//                         <button type="submit" className="btn btn-primary">
		//                             <FormattedMessage id="project.global.buttons.save"/>
		//                         </button>
		//                     </div>
		//                 </div>
		//             </form>
		//         </div>
		//     </div>
		// </div>
	);
}

export default AddTraining;