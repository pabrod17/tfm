import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {Errors} from '../../common';
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
import naranja from '../../games/components/ballunsplash.jpeg';

const AddGame = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [teamId , setTeamId ] = useState(null);
    const [seasonId , setSeasonId ] = useState(null);
    const [gameDate , setGameDate ] = useState(null);
    const [rival , setRival ] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    const [description, setDescription] = useState("");
	const [rowSelectionModelTeam, setRowSelectionModelTeam] = React.useState([]);
	const [rowSelectionModelSeason, setRowSelectionModelSeason] = React.useState([]);
    let form;

    const teams = useSelector(selectorsTeams.getAllTeams);
    const seasons = useSelector(selectorsSeasons.getAllSeasons);

    const teamsList = teams.teams;

    if(!teamsList) {
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

    const seasonsList = seasons.seasons;

	if (!seasonsList) {
		dispatch(actionsSeasons.findAllSeasons(() => history(`/trainings/addTraining`)));
		return "Loading...";
	}

    const columnsSeasons = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'name', headerName: <FormattedMessage id="project.seasons.fields.name"/>, width: 160 },
		{ field: 'startDate', headerName: <FormattedMessage id='project.seasons.fields.startDate'/>, width: 160 },
		{ field: 'endDate', headerName: <FormattedMessage id='project.seasons.fields.endDate'/>, width: 160 },
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
    
            if(teamId == null) {
                dispatch(actions.addGameWithSeason(seasonId, dateConversor(gameDate), rival.trim(), description.trim(),
                () => reloadWindow(),
                errors => setBackendErrors(errors),
                ));
            } else if(seasonId==null){
                dispatch(actions.addGameWithTeam(teamId, dateConversor(gameDate), rival.trim(), description.trim(),
                () => reloadWindow(),
                errors => setBackendErrors(errors),
                ));
            // } else {
            //     dispatch(actions.addGame(teamId, seasonId,dateConversor(gameDate), rival.trim(), description.trim(),
            //     () => reloadWindow(),
            //     errors => setBackendErrors(errors),
            //     ));
            // }
			}
        }
        const reloadWindow = () =>{
            history('/games/addGame');
            window.location.reload('true');
        }

        function dateConversor(gameDate) {
            const dateObj2 = new Date(gameDate);
            dateObj2.setDate(dateObj2.getDate() + 1);
            // Obtener la fecha en formato ISO 8601 (UTC)
            const gameDateUpdated = dateObj2.toISOString();
            return gameDateUpdated;
        }
        return(
<Box
			my={4}
			display="flex"
			alignItems="center"
			gap={4}
			p={5}
			m={10}
			sx={{
				border: '2px solid grey',
                background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                boxShadow:"0 10px 50px rgb(0, 8, 255)",
                borderColor:"black"
			}}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container margin={5} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={12} md={12} >
					<img src={naranja} alt="Person" class="card__image_game_update_create"></img>

					<Box
						component="form"
						sx={{
                            background: "linear-gradient(-45deg, #0E24A0 0%, #900C0C 100% )",
							borderRadius: "20px",
                            borderColor:"black",
                            boxShadow:"0 10px 50px rgb(0, 0, 0)"

						}}
                        autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
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
									><FormattedMessage id="project.global.fields.date" /></h4>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DatePicker']}>
											<DatePicker
												sx={{
													border: '2px solid grey',
													borderRadius: "20px",
													colorAdjust: "#00bfff",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
                                                    borderColor:"black",
                                                    boxShadow:"0 10px 10px rgb(0, 0, 0)"
												}}
												autoFocus
												required
												onChange={(newDate) =>
													{
														setGameDate(newDate.toISOString())
														console.log("formattedDate:", newDate.$d.toISOString());
													
													
													}
													
												
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.games.fields.rival" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
                                            borderColor:"black",
                                            boxShadow:"0 10px 10px rgb(0, 0, 0)"

										}}
										value={rival}
										onChange={(e) => setRival(e.target.value)}
									/>

									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
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
				<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
						<Typography
							sx={{ flex: '1 1 100%', mt: 3.5, color: "#00bfff", m:2 }}
							variant="h6"
							id="tableTitle"
							component="div"
						>
							Team Selection
						</Typography>
						<div style={{ height: 400, width: '100%', }}>
							<DataGrid
								sx={{
									background: "linear-gradient(-45deg, #0E24A0 0%, #AD1010 100% )",
									borderRadius: "20px",
									boxShadow: 12,
									m:2,
                                    color:"white",
                                    borderColor:"black",
                                    boxShadow:"0 10px 50px rgb(0, 0, 0)"
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
					</Grid>

					<Grid item xs={12} md={6}>
						<Typography
							sx={{ flex: '1 1 100%', mt: 3.5, color: "#00bfff", m:2 }}
							variant="h6"
							id="tableTitle"
							component="div"
						>
							Season Selection
						</Typography>
						<div style={{ height: 400, width: '100%' }}>
							<DataGrid
								sx={{
									background: "linear-gradient(-45deg, #0E24A0 0%, #AD1010 100% )",
									borderRadius: "20px",
									boxShadow: 12,
									m:2,
                                    color:"white",
                                    borderColor:"black",
                                    boxShadow:"0 10px 50px rgb(0, 0, 0)"
								}}
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
			<button className="post_game" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
        );
}

export default AddGame;