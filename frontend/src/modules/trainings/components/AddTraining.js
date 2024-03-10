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
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { shadows } from '@mui/system';

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
			height="45vw"
			width="80vw"  // Ocupa el 100% del ancho de la pantalla
			my={4}
			display="flex"
			alignItems="center"
			gap={4}
			p={5}
			m={10}
			sx={{
				border: '2px solid grey',
				background: "linear-gradient(-45deg, #290c28 0%, #302b63 100% )",
				borderRadius: "20px",
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={6} md={6} >
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<div>
							<TextField
								required
								id="outlined-required"
								label="Required"
								defaultValue="Hello World"
							/>
							<TextField
								disabled
								id="outlined-disabled"
								label="Disabled"
								defaultValue="Hello World"
							/>
							<TextField
								id="outlined-password-input"
								label="Password"
								type="password"
								autoComplete="current-password"
							/>
							<TextField
								id="outlined-read-only-input"
								label="Read Only"
								defaultValue="Hello World"
								InputProps={{
									readOnly: true,
								}}
							/>
							<TextField
								id="outlined-number"
								label="Number"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField id="outlined-search" label="Search field" type="search" />
							<TextField
								id="outlined-helperText"
								label="Helper text"
								defaultValue="Default Value"
								helperText="Some important text"
							/>
						</div>
						<div>
							<TextField
								required
								id="filled-required"
								label="Required"
								defaultValue="Hello World"
								variant="filled"
							/>
							<TextField
								disabled
								id="filled-disabled"
								label="Disabled"
								defaultValue="Hello World"
								variant="filled"
							/>
							<TextField
								id="filled-password-input"
								label="Password"
								type="password"
								autoComplete="current-password"
								variant="filled"
							/>
							<TextField
								id="filled-read-only-input"
								label="Read Only"
								defaultValue="Hello World"
								InputProps={{
									readOnly: true,
								}}
								variant="filled"
							/>
							<TextField
								id="filled-number"
								label="Number"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								variant="filled"
							/>
							<TextField
								id="filled-search"
								label="Search field"
								type="search"
								variant="filled"
							/>
							<TextField
								id="filled-helperText"
								label="Helper text"
								defaultValue="Default Value"
								helperText="Some important text"
								variant="filled"
							/>
						</div>
						<div>
							<TextField
								required
								id="standard-required"
								label="Required"
								defaultValue="Hello World"
								variant="standard"
							/>
							<TextField
								disabled
								id="standard-disabled"
								label="Disabled"
								defaultValue="Hello World"
								variant="standard"
							/>
							<TextField
								id="standard-password-input"
								label="Password"
								type="password"
								autoComplete="current-password"
								variant="standard"
							/>
							<TextField
								id="standard-read-only-input"
								label="Read Only"
								defaultValue="Hello World"
								InputProps={{
									readOnly: true,
								}}
								variant="standard"
							/>
							<TextField
								id="standard-number"
								label="Number"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								variant="standard"
							/>
							<TextField
								id="standard-search"
								label="Search field"
								type="search"
								variant="standard"
							/>
							<TextField
								id="standard-helperText"
								label="Helper text"
								defaultValue="Default Value"
								helperText="Some important text"
								variant="standard"
							/>
						</div>
						<Button variant="contained" color="success">
							Success
						</Button>
					</Box>  </Grid>
				<Grid item xs={6} md={6} >
					<Typography
						sx={{ flex: '1 1 100%' }}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						Team Selection
					</Typography>
					<div style={{ height: 400, width: '100%' }}>
						<DataGrid
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
						sx={{ flex: '1 1 100%', mt: 3.5 }}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						Season Selection
					</Typography>
					<div style={{ height: 400, width: '100%' }}>
						<DataGrid
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
									  });								} else {
									setRowSelectionModelSeason(newRowSelectionModelSeason[newRowSelectionModelSeason.length-1]);
									console.log(" 22222: ", newRowSelectionModelSeason[newRowSelectionModelSeason.length-1])
									setSeasonId((prevSeasonId) => {
										console.log(" seasonnnn SEGIMDPOPPPPP: ", newRowSelectionModelSeason[newRowSelectionModelSeason.length-1]);
										return newRowSelectionModelSeason[newRowSelectionModelSeason.length-1];
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