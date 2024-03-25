import React, { useEffect, useState, createContext } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Errors } from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as actionsGames from '../../games/actions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import naranja from '../../games/components/ballunsplash.jpeg';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useIntl } from 'react-intl';

const UpdateGameStatistics = () => {
	const dispatch = useDispatch();
	const history = useNavigate();
	const intl = useIntl();
	const gameStatistics = useSelector(selectors.getGameStatistics);
	const { id } = useParams();
	const [showTable, setShowTable] = useState(true);
	const { stretchingType, tabValue } = useParams();
	const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

	//OTRA OPCION:
	//Arriba: Card con el numero de minutos, Card con rebotes, Card con tapones, Card con asistencias
	//Aqui habria que mirar como mirar los items del rival ( o en la misma card o en otra al lado)
	//Abajo: Dos graficos uno para puntos y otro para faltas
	//Aqui habria que mirar como mirar los items del rival (Pero si es un grafico se pueden meter ahi los dos tipos)


	//Hacer un grafico que compare lo de mi equipo y lo del rival para cada section

	//puntos -> primer grafico de barras verticales: bar chart
	const [totalFreeShots, setTotalFreeShots] = useState(0);
	const [totalSetShots, setTotalSetShots] = useState(0);
	const [totalThreePointShots, setTotalThreePointShots] = useState(0);
	//tiros totales:
	const [totalPoints, setTotalPoints] = useState(0);

	//duracion -> una card arriba a la izq con el numero en grande como vi en algun otro dashboard
	const [durationMinutes, setDurationMinutes] = useState(0);

	//Rebotes
	const [totalRebounds, setTotalRebounds] = useState(0);

	//Tapones
	const [totalBlockedShot, setTotalBlockedShot] = useState(0);
	//Asistencias
	const [totalAssists, setTotalAssists] = useState(0);
	//Faltas -> circulo -> Charts - Pie
	const [totalPersonalFouls, setTotalPersonalFouls] = useState(0);
	const [totalTechnicalFouls, setTotalTechnicalFouls] = useState(0);
	const [totalUnsportsmanlikeFouls, setTotalUnsportsmanlikeFouls] = useState(0);
	const [totalFouls, setTotalFouls] = useState(0);

	//RIVAL: puntos
	const [totalPointsRival, setTotalPointsRival] = useState(0);
	const [totalThreePointShotsRival, setTotalThreePointShotsRival] = useState(0);
	const [totalSetShotsRival, setTotalSetShotsRival] = useState(0);
	//RIVAL: total puntos
	const [totalFreeShotsRival, setTotalFreeShotsRival] = useState(0);

	//RIVAL: rebotes
	const [totalReboundsRival, setTotalReboundsRival] = useState(0);

	//RIVAL: tapones
	const [totalBlockedShotsRival, setTotalBlockedShotsRival] = useState(0);

	//RIVAL: asistencias
	const [totalAssistsRival, setTotalAssistsRival] = useState(0);

	//RIVAL: faltas
	const [totalPersonalFoulsRival, setTotalPersonalFoulsRival] = useState(0);
	const [totalTechnicalFoulsRival, setTotalTechnicalFoulsRival] = useState(0);
	const [totalUnsportsmanlikeFoulsRival, setTotalUnsportsmanlikeFoulsRival] = useState(0);
	const [totalFoulsRival, setTotalFoulsRival] = useState(0);

	const [backendErrors, setBackendErrors] = useState(0);
	const [seriesNb, setSeriesNb] = React.useState(2);
	const [itemNb, setItemNb] = React.useState(5);
	const [skipAnimation, setSkipAnimation] = React.useState(false);

	const handleItemNbChange = (event: Event, newValue: number | number[]) => {
		if (typeof newValue !== 'number') {
			return;
		}
		setItemNb(newValue);
	};
	const handleSeriesNbChange = (event: Event, newValue: number | number[]) => {
		if (typeof newValue !== 'number') {
			return;
		}
		setSeriesNb(newValue);
	};


	const highlightScope = {
		highlighted: 'series',
		faded: 'global',
	};

	const series = [
		{
			label: 'project.statistics.fields.totalTechnicalFouls',
			data: [
				2423, 2210
			],
			color: "#FF4600"
		},
		{
			label: 'project.statistics.fields.totalUnsportsmanlikeFouls',
			data: [
				2362, 2254
			],
			color: "#FF7800"
		},
		{
			label: 'project.statistics.fields.totalPersonalFouls',
			data: [
				1145, 1214
			],
			color: "#FFF000"
		},
	].map((s) => ({ ...s, highlightScope }));
	let form;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (!gameStatistics) {
			dispatch(actions.findStatisticsByGame(id, () => history(`/games/update/${id}/statistics/${3}`)));
			dispatch(actionsGames.findGameById(id, () => history(`/games/update/${id}/statistics/${3}`)));
		} else {
			setTotalPoints(gameStatistics.totalPoints);
			setDurationMinutes(gameStatistics.durationMinutes);
			setTotalThreePointShots(gameStatistics.totalThreePointShots);
			setTotalSetShots(gameStatistics.totalSetShots);
			setTotalFreeShots(gameStatistics.totalFreeShots);
			setTotalRebounds(gameStatistics.totalRebounds);
			setTotalBlockedShot(gameStatistics.totalBlockedShot);
			setTotalAssists(gameStatistics.totalAssists);
			setTotalPersonalFouls(gameStatistics.totalPersonalFouls);
			setTotalTechnicalFouls(gameStatistics.totalTechnicalFouls);
			setTotalUnsportsmanlikeFouls(gameStatistics.totalUnsportsmanlikeFouls);

			setTotalPointsRival(gameStatistics.totalPointsRival);
			setTotalThreePointShotsRival(gameStatistics.totalThreePointShotsRival);
			setTotalSetShotsRival(gameStatistics.totalSetShotsRival);
			setTotalFreeShotsRival(gameStatistics.totalFreeShotsRival);
			setTotalReboundsRival(gameStatistics.totalReboundsRival);
			setTotalBlockedShotsRival(gameStatistics.totalBlockedShotsRival);
			setTotalAssistsRival(gameStatistics.totalAssistsRival);
			setTotalPersonalFoulsRival(gameStatistics.totalPersonalFoulsRival);
			setTotalTechnicalFoulsRival(gameStatistics.totalTechnicalFoulsRival);
			setTotalUnsportsmanlikeFoulsRival(gameStatistics.totalUnsportsmanlikeFoulsRival);


		}
	}, [dispatch, gameStatistics, history, id]);

	const handleSubmit = event => {

		event.preventDefault();

		dispatch(actions.updateGameStatistics(id, gameStatistics ? gameStatistics.id : null, totalPoints, durationMinutes,
			totalThreePointShots, totalSetShots, totalFreeShots, totalRebounds,
			totalBlockedShot, totalAssists, totalPersonalFouls, totalTechnicalFouls,
			totalUnsportsmanlikeFouls, totalPointsRival, totalThreePointShotsRival,
			totalSetShotsRival, totalFreeShotsRival, totalReboundsRival, totalBlockedShotsRival,
			totalAssistsRival, totalPersonalFoulsRival, totalTechnicalFoulsRival,
			totalUnsportsmanlikeFoulsRival,
			() => window.location.reload('true'),
			errors => setBackendErrors(errors),
		));
	}
	const handleUpdateGame = (tabValue, dispatch) => {
		setValue(tabValue);
		dispatch(actionsGames.findGameById(id, () => history(`/games/update/${id}`)));
	}
	const handleUpdateGameExercise = (tabValue, dispatch) => {
		setValue(tabValue);
		dispatch(actionsGames.findGameById(id, () => history(`/games/update/${id}/exercise/${tabValue}`)));
	}
	const handleUpdateGameStretching = (tabValue, dispatch) => {
		setValue(tabValue);
		dispatch(actionsGames.findGameById(id, () => history(`/games/update/${id}/stretching/${tabValue}`)));
	}

	const handleUpdateGameStatistics = (tabValue, dispatch) => {
		setValue(tabValue);
		dispatch(actionsGames.findGameById(id, () => {
			// dispatch(actionsStretchings.findStretchingsByGameId(id, () => history(`/games/update/${id}/statistics/${tabValue}`)));
		}));
		history(`/games/update/${id}/statistics/${tabValue}`);
	}
	const reloadWindow = () => {
		history(`/statistics/game/${id}`)
	}
	const pieParams = { height: 200, margin: { right: 5 } };
	const palette = ['red', 'blue', 'green'];
	return (

		<div className=''>
			<Box
				sx={{
					maxWidth: { xs: 320, sm: 835 },
					bgcolor: 'background.dark',
					boxShadow: 1,
					borderRadius: 4,
					margin: 'auto',  // Centra horizontalmente
					marginTop: '80px', // Ajusta la distancia desde la parte superior según sea necesario
					textAlign: 'center', // Centra el contenido dentro del Box
				}}>

				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
						sx={{
							background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
							bgcolor: "red",
							boxShadow: 6,
							borderRadius: 3,
							mb: 2,
							borderColor: "black",
							boxShadow: "0 10px 50px rgb(0, 0, 0)"
						}}
					>
						<Tab value={0} sx={{ color: '#40FF00', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateGame(0, dispatch)} label="General" />
						<Tab value={1} sx={{ color: '#f5af19', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateGameExercise(1, dispatch)} label="Exercises" />
						<Tab value={2} sx={{ color: 'rgb(255, 0, 247)', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateGameStretching(2, dispatch)} label="Stretchings" />
						<Tab value={3} sx={{ color: 'rgb(0, 217, 255)', fontSize: "30px", padding: "20px" }} onClick={() => handleUpdateGameStatistics(3, dispatch)} label="Statistics" />
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
				{showTable ? (




					<Box
						display="flex"
						alignItems="center"
						p={5}
						pt={0}

						sx={{
							maxWidth: { sm: 1235 },

							border: '2px solid grey',
							background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
							borderRadius: "20px",
							flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
							flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
							boxShadow: "0 10px 50px rgb(0, 8, 255)",
							borderColor: "black"
						}}
					>
						<Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
						<Grid container
						>
							<Grid item xs={12} md={12} >
								<Typography
									sx={{ flex: '1 1 100%', mt: 3.5, color: "#36FF00", m: 2, mb: 3, fontSize: 30, textAlign: 'center' }}
									variant="h6"
									id="tableTitle"
									component="div"
								>
									My Team
								</Typography>
								<Box
									component="form"
									sx={{
										background: "linear-gradient(-45deg, #0E24A0 0%, #900C0C 100% )",
										borderRadius: "20px",
										borderColor: "black",
										boxShadow: "0 10px 50px rgb(0, 0, 0)",

									}}
									autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
									noValidate
									autoComplete="off"
								>
									<Grid container margin={5} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalFreeShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalFreeShots}
													onChange={(e) => setTotalFreeShots(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalSetShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalSetShots}
													onChange={(e) => setTotalSetShots(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalThreePointShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalThreePointShots}
													onChange={(e) => setTotalThreePointShots(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPoints" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalPoints}
													onChange={(e) => setTotalPoints(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPersonalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalPersonalFouls}
													onChange={(e) => setTotalPersonalFouls(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalTechnicalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalTechnicalFouls}
													onChange={(e) => setTotalTechnicalFouls(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalUnsportsmanlikeFouls}
													onChange={(e) => setTotalUnsportsmanlikeFouls(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalFouls}
													onChange={(e) => setTotalFouls(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalRebounds" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalRebounds}
													onChange={(e) => setTotalRebounds(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalBlockedShot" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalBlockedShot}
													onChange={(e) => setTotalBlockedShot(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalAssists" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalAssists}
													onChange={(e) => setTotalAssists(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.duration" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={durationMinutes}
													onChange={(e) => setDurationMinutes(e.target.value)}
												/>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</Grid>

							<Grid item xs={12} md={12} marginTop={-2} >
								<Typography
									sx={{ flex: '1 1 100%', mt: 0, color: "#FF0000", mb: 3, fontSize: 30, textAlign: 'center' }}

									variant="h6"
									id="tableTitle"
									component="div"
								>
									Rival
								</Typography>
								<Box
									component="form"
									sx={{
										background: "linear-gradient(-45deg, #0E24A0 0%, #900C0C 100% )",
										borderRadius: "20px",
										borderColor: "black",
										boxShadow: "0 10px 50px rgb(0, 0, 0)",

									}}
									autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
									noValidate
									autoComplete="off"
								>
									<Grid container margin={5} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalFreeShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalFreeShotsRival}
													onChange={(e) => setTotalFreeShotsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalSetShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalSetShotsRival}
													onChange={(e) => setTotalSetShotsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalThreePointShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalThreePointShotsRival}
													onChange={(e) => setTotalThreePointShotsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPoints" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalPointsRival}
													onChange={(e) => setTotalPointsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPersonalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalPersonalFoulsRival}
													onChange={(e) => setTotalPersonalFoulsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalTechnicalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalTechnicalFoulsRival}
													onChange={(e) => setTotalTechnicalFoulsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalUnsportsmanlikeFoulsRival}
													onChange={(e) => setTotalUnsportsmanlikeFoulsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalFoulsRival}
													onChange={(e) => setTotalFoulsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={4}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalRebounds" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalReboundsRival}
													onChange={(e) => setTotalReboundsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={4}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalBlockedShot" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalBlockedShotsRival}
													onChange={(e) => setTotalBlockedShotsRival(e.target.value)}
												/>
											</Box>
										</Grid>
										<Grid item xs={4}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 2 },
													margin: '30px', // Centra el formulario en la pantalla
													marginTop: '0px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalAssists" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '2px solid grey',
														borderRadius: "20px",
														borderColor: "black",
														boxShadow: "0 10px 10px rgb(0, 0, 0)"

													}}
													value={totalAssistsRival}
													onChange={(e) => setTotalAssistsRival(e.target.value)}
												/>
											</Box>
										</Grid>

									</Grid>
								</Box>
							</Grid>








						</Grid>
						<button className="post_gamestatistics" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

					</Box>
				) : (


					<Box
						display="flex"
						alignItems="center"
						p={5}
						m={10}
						my={1}

						sx={{

							border: '2px solid grey',
							background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
							borderRadius: "20px",
							flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
							flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
							boxShadow: "0 10px 50px rgb(0, 8, 255)",
							borderColor: "black"
						}}
					>


						<Grid container margin={5} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 4, md: 12 }}>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{
										border: '2px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
										borderRadius: "20px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 10px 50px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<BarChart
										xAxis={[{
											scaleType: 'band', data: [
												intl.formatMessage({ id: 'project.statistics.fields.totalRebounds' }),
											]
										}]}


										series={[
											{ data: [totalRebounds], color: "blue", stack: '2', label: 'Team' },
											{ data: [totalReboundsRival], color: "red", stack: '1', label: 'Rival' },
										]}
										tooltip={{ trigger: 'axis' }}
										width={500}
										height={300}
										tooltip={{ trigger: 'item' }}

										sx={{
											background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
											borderRadius: "20px",
											flexDirection: 'column',
											//change left yAxis label styles
											"& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
												strokeWidth: "0.4",
												fill: "white"
											},
											// change all labels fontFamily shown on both xAxis and yAxis
											"& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
												fontFamily: "Roboto",
											},
											// change bottom label styles
											"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
												strokeWidth: "0.5",
												fill: "white"
											},
											// bottomAxis Line Styles
											"& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
												stroke: "white",
												strokeWidth: 2,
											},
											// leftAxis Line Styles
											"& .MuiChartsAxis-left .MuiChartsAxis-line": {
												stroke: "white",
												strokeWidth: 2
											},
											"& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.8em" },
											"& .MuiChartsLegend-series text": { fontSize: "1.2em !important" }
										}}
									/>





								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '2px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
										borderRadius: "20px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 10px 50px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<BarChart
										xAxis={[{
											scaleType: 'band', data: [
												intl.formatMessage({ id: 'project.statistics.fields.totalBlockedShot' }),
											]
										}]}

										series={[
											{ data: [totalBlockedShot], color: "blue", stack: '2', label: 'Team' },
											{ data: [totalBlockedShotsRival], color: "red", stack: '1', label: 'Rival' },
										]}
										tooltip={{ trigger: 'axis' }}
										width={500}
										height={300}
										tooltip={{ trigger: 'item' }}

										sx={{
											background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
											borderRadius: "20px",
											flexDirection: 'column',
											//change left yAxis label styles
											"& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
												strokeWidth: "0.4",
												fill: "white"
											},
											// change all labels fontFamily shown on both xAxis and yAxis
											"& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
												fontFamily: "Roboto",
											},
											// change bottom label styles
											"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
												strokeWidth: "0.5",
												fill: "white"
											},
											// bottomAxis Line Styles
											"& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
												stroke: "white",
												strokeWidth: 2,
											},
											// leftAxis Line Styles
											"& .MuiChartsAxis-left .MuiChartsAxis-line": {
												stroke: "white",
												strokeWidth: 2
											},
											"& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.8em" },
											"& .MuiChartsLegend-series text": { fontSize: "1.2em !important" }
										}}
									/>




								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '2px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
										borderRadius: "20px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 10px 50px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<BarChart
										xAxis={[{
											scaleType: 'band', data: [
												intl.formatMessage({ id: 'project.statistics.fields.totalAssists' }),
											]
										}]}

										series={[
											{ data: [totalAssists], color: "blue", stack: '2', label: 'Team' },
											{ data: [totalAssistsRival], color: "red", stack: '1', label: 'Rival' },
										]}
										tooltip={{ trigger: 'axis' }}
										width={500}
										height={300}
										tooltip={{ trigger: 'item' }}

										sx={{
											background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
											borderRadius: "20px",
											flexDirection: 'column',
											//change left yAxis label styles
											"& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
												strokeWidth: "0.4",
												fill: "white"
											},
											// change all labels fontFamily shown on both xAxis and yAxis
											"& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
												fontFamily: "Roboto",
											},
											// change bottom label styles
											"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
												strokeWidth: "0.5",
												fill: "white"
											},
											// bottomAxis Line Styles
											"& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
												stroke: "white",
												strokeWidth: 2,
											},
											// leftAxis Line Styles
											"& .MuiChartsAxis-left .MuiChartsAxis-line": {
												stroke: "white",
												strokeWidth: 2
											},
											"& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.8em" },
											"& .MuiChartsLegend-series text": { fontSize: "1.2em !important" }
										}}
									/>





								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '2px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
										borderRadius: "20px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 10px 50px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<div class="cardstatistics">
										<p class="time-text"><span>{durationMinutes}</span></p>
										<p class="day-text">
											<FormattedMessage id="project.statistics.fields.duration" />
										</p>
									</div>





								</Box>
							</Grid>
						</Grid>

						<Grid container margin={5} marginBottom={1} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 4, md: 12 }}>
							<Grid item xs={6}>


								<Box
									display="fixed"

									sx={{

										border: '2px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
										borderRadius: "20px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 10px 50px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<Box sx={{ width: '98%' }}>
										<BarChart
											tooltip={{ trigger: 'item' }}
											height={400}
											series={[
												{
													label: intl.formatMessage({ id: 'project.statistics.fields.totalPersonalFouls' }),
													data: [totalPersonalFouls, totalPersonalFoulsRival],
													color: "#FF4600"
												},
												{
													label: intl.formatMessage({ id: 'project.statistics.fields.totalTechnicalFouls' }),
													data: [totalTechnicalFouls, totalTechnicalFoulsRival],
													color: "#FF7800"
												},
												{
													label: intl.formatMessage({ id: 'project.statistics.fields.totalUnsportsmanlikeFouls' }),
													data: [totalUnsportsmanlikeFouls, totalUnsportsmanlikeFoulsRival],
													color: "#FFF000"
												},
											]
												.slice(0, seriesNb)
												.map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
										/>

										<Typography id="input-item-number" gutterBottom>
										<FormattedMessage id="project.statistics.fields.team_rival" />
										</Typography>
										<Slider
											value={itemNb}
											onChange={handleItemNbChange}
											valueLabelDisplay="auto"
											min={1}
											max={2}
											aria-labelledby="input-item-number"
										/>
										<Typography id="input-series-number" gutterBottom>
										<FormattedMessage id="project.statistics.fields.totalFouls" />
										</Typography>
										<Slider
											value={seriesNb}
											onChange={handleSeriesNbChange}
											valueLabelDisplay="auto"
											min={1}
											max={3}
											aria-labelledby="input-series-number"
										/>
									</Box>





								</Box>
							</Grid>
							<Grid item xs={6}>


								<Box
									display="fixed"

									sx={{

										border: '2px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
										borderRadius: "20px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 10px 50px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<Stack direction="row" width="100%" textAlign="center" spacing={1}>
										<Box flexGrow={1}>
											<Typography
												sx={{ m: 0, color: "black", fontSize: "20px" }}

											><FormattedMessage id="project.statistics.fields.totalPointsTeam1" /></Typography>
											<PieChart
												colors={palette}
												series={[{
													data: [{ value: totalFreeShots, label: intl.formatMessage({ id: 'project.statistics.fields.totalFreeShots' }) }, { value: totalSetShots, label: intl.formatMessage({ id: 'project.statistics.fields.totalSetShots' }) }, { value: totalThreePointShots, label: intl.formatMessage({ id: 'project.statistics.fields.totalThreePointShots' }) }],
													faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
													highlightScope: { faded: 'global', highlighted: 'item' },
												}]}
												slotProps={{ legend: { hidden: true } }}
												{...pieParams}
												height={470}

											/>
											<Typography
												sx={{ m: 0.1, color: "white", fontSize: "20px" }}
											><FormattedMessage id="project.statistics.fields.totalPoints" />  {totalPoints}</Typography>
										</Box>
										<Box flexGrow={1}>
											<Typography
												sx={{ m: 0, color: "black", fontSize: "20px" }}
											><FormattedMessage id="project.statistics.fields.totalPointsRival1" /></Typography>
											<PieChart
												series={[
													{
														data: [{ value: totalFreeShotsRival, label: intl.formatMessage({ id: 'project.statistics.fields.totalFreeShotsRival' }), color: 'orange' }, { value: totalSetShotsRival, label: intl.formatMessage({ id: 'project.statistics.fields.totalSetShotsRival' }) }, { value: totalThreePointShotsRival, label: intl.formatMessage({ id: 'project.statistics.fields.totalThreePointShotsRival' }) }],
														faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
														highlightScope: { faded: 'global', highlighted: 'item' },
													},

												]}
												slotProps={{ legend: { hidden: true } }}
												{...pieParams}
												height={470}
											/>
											<Typography
												sx={{ m: 0.1, color: "white", fontSize: "20px" }}
											><FormattedMessage id="project.statistics.fields.totalPointsRival" /> {totalPointsRival}</Typography>
										</Box>
									</Stack>





								</Box>
							</Grid>
						</Grid>


					</Box>






				)}





			</Box>








		</div>

	);
}

export default UpdateGameStatistics;