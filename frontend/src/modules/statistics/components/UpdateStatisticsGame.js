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
import * as actionsPlayers from '../../players/actions';

const UpdateStatisticsGame = () => {
	const dispatch = useDispatch();
	const history = useNavigate();
	const intl = useIntl();
	const gameStatistics = useSelector(selectors.getGameStatistics);
	const { gameId } = useParams();
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

	const handleItemNbChange = (event, newValue) => {
		if (typeof newValue !== 'number') {
			return;
		}
		setItemNb(newValue);
	};
	const handleSeriesNbChange = (event, newValue) => {
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
			dispatch(actions.findStatisticsByGame(gameId, () => history(`/statistics/update/game/${gameId}`)));
			dispatch(actionsGames.findGameById(gameId, () => history(`/statistics/update/game/${gameId}`)));
		} else {
			setTotalPoints(gameStatistics.totalPoints ? gameStatistics.totalPoints : 0);
			setDurationMinutes(gameStatistics.durationMinutes ? gameStatistics.durationMinutes : 0);
			setTotalThreePointShots(gameStatistics.totalThreePointShots ? gameStatistics.totalThreePointShots : 0);
			setTotalSetShots(gameStatistics.totalSetShots ? gameStatistics.totalSetShots : 0);
			setTotalFreeShots(gameStatistics.totalFreeShots ? gameStatistics.totalFreeShots : 0);
			setTotalRebounds(gameStatistics.totalRebounds ? gameStatistics.totalRebounds : 0);
			setTotalBlockedShot(gameStatistics.totalBlockedShot ? gameStatistics.totalBlockedShot : 0);
			setTotalAssists(gameStatistics.totalAssists ? gameStatistics.totalAssists : 0);
			setTotalPersonalFouls(gameStatistics.totalPersonalFouls ? gameStatistics.totalPersonalFouls : 0);
			setTotalTechnicalFouls(gameStatistics.totalTechnicalFouls ? gameStatistics.totalTechnicalFouls : 0);
			setTotalUnsportsmanlikeFouls(gameStatistics.totalUnsportsmanlikeFouls ? gameStatistics.totalUnsportsmanlikeFouls : 0);

			setTotalPointsRival(gameStatistics.totalPointsRival ? gameStatistics.totalPointsRival : 0);
			setTotalThreePointShotsRival(gameStatistics.totalThreePointShotsRival ? gameStatistics.totalThreePointShotsRival : 0);
			setTotalSetShotsRival(gameStatistics.totalSetShotsRival ? gameStatistics.totalSetShotsRival : 0);
			setTotalFreeShotsRival(gameStatistics.totalFreeShotsRival ? gameStatistics.totalFreeShotsRival : 0);
			setTotalReboundsRival(gameStatistics.totalReboundsRival ? gameStatistics.totalReboundsRival : 0);
			setTotalBlockedShotsRival(gameStatistics.totalBlockedShotsRival ? gameStatistics.totalBlockedShotsRival : 0);
			setTotalAssistsRival(gameStatistics.totalAssistsRival ? gameStatistics.totalAssistsRival : 0);
			setTotalPersonalFoulsRival(gameStatistics.totalPersonalFoulsRival ? gameStatistics.totalPersonalFoulsRival : 0);
			setTotalTechnicalFoulsRival(gameStatistics.totalTechnicalFoulsRival ? gameStatistics.totalTechnicalFoulsRival : 0);
			setTotalUnsportsmanlikeFoulsRival(gameStatistics.totalUnsportsmanlikeFoulsRival ? gameStatistics.totalUnsportsmanlikeFoulsRival : 0);


		}
	}, [dispatch, gameStatistics, history, gameId]);

	const handleSubmit = event => {

		event.preventDefault();

		dispatch(actions.updateGameStatistics(gameId, gameStatistics ? gameStatistics.id : null, totalPoints, durationMinutes,
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

	const pieParams = { height: 200, margin: { right: 5 } };
	const palette = ['red', 'blue', 'green'];
	return (


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
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
						sx={{
							background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
							bgcolor: "red",
							boxShadow: 4.02,
							borderRadius: 2.01,
							mb: 1.34,
							borderColor: "black",
							boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)"
						}}
					>
						<Tab value={0} sx={{ color: '#40FF00', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdateGameStatistics(0, dispatch)} label={<FormattedMessage id="project.games.fields.game"/>} />
						<Tab value={1} sx={{ color: '#ff0000', fontSize: "22.11px", padding: "13.4px" }} onClick={() => handleUpdatePlayerStatistics(1, dispatch)} label={<FormattedMessage id="project.players.fields.players"/>} />
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
						p={3.35}
						pt={0}

						sx={{
							maxWidth: { sm: 827.45 },

							border: '1.34px solid grey',
							background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
							borderRadius: "13.4px",
							flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
							flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
							boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
							borderColor: "black"
						}}
					>
						<Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
						<Grid container
						>
							<Grid item xs={12} md={12} >
								<Typography
									sx={{ flex: '1 1 100%', mt: 2.35, color: "#36FF00", m: 1.34, mb: 2.01, fontSize: 20.1, textAlign: 'center' }}
									variant="h6"
									id="tableTitle"
									component="div"
								>
									{<FormattedMessage id="project.statistics.fields.myteam" />}
								</Typography>
								<Box
									component="form"
									sx={{
										background: "linear-gradient(-45deg, #0E24A0 0%, #900C0C 100% )",
										borderRadius: "13.4px",
										borderColor: "black",
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",

									}}
									autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
									noValidate
									autoComplete="off"
								>
									<Grid container margin={3.35} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalFreeShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalSetShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalThreePointShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPoints" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPersonalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla
												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalTechnicalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalRebounds" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalBlockedShot" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalAssists" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.duration" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",
														height:"60px"

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
									sx={{ flex: '1 1 100%', mt: 0, color: "#FF0000", mb: 2.01, fontSize: 20.1, textAlign: 'center' }}

									variant="h6"
									id="tableTitle"
									component="div"
								>
									{<FormattedMessage id="project.statistics.fields.myrival" />}
								</Typography>
								<Box
									component="form"
									sx={{
										background: "linear-gradient(-45deg, #0E24A0 0%, #900C0C 100% )",
										borderRadius: "13.4px",
										borderColor: "black",
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",

									}}
									autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
									noValidate
									autoComplete="off"
								>
									<Grid container margin={3.35} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
										<Grid item xs={3}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalFreeShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalSetShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalThreePointShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPoints" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPersonalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalTechnicalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalRebounds" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalBlockedShot" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
													marginTop: '-5px', // Centra el formulario en la pantalla

												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalAssists" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
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
						p={3.35}
						m={6.7}
						my={0.67}

						sx={{

							border: '1.34px solid grey',
							background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
							borderRadius: "13.4px",
							flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
							flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
							boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
							borderColor: "black"
						}}
					>


						<Grid container margin={3.35} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 4, md: 12 }}>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{
										border: '1.34px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
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
										width={335}
										height={201}
										tooltip={{ trigger: 'item' }}

										sx={{
											background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
											borderRadius: "13.4px",
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
											"& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.21em" },
											"& .MuiChartsLegend-series text": { fontSize: "0.8em !important" }
										}}
									/>





								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '1.34px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
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
										width={335}
										height={201}
										tooltip={{ trigger: 'item' }}

										sx={{
											background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
											borderRadius: "13.4px",
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
											"& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.21em" },
											"& .MuiChartsLegend-series text": { fontSize: "0.8em !important" }
										}}
									/>




								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '1.34px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
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
										width={335}
										height={201}
										tooltip={{ trigger: 'item' }}

										sx={{
											background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
											borderRadius: "13.4px",
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
											"& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.21em" },
											"& .MuiChartsLegend-series text": { fontSize: "0.8em !important" }
										}}
									/>





								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '1.34px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
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

										border: '1.34px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<Box sx={{ width: '98%' }}>
										<BarChart
											tooltip={{ trigger: 'item' }}
											height={302}
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

												slotProps={{
													legend: {
													  labelStyle: {
														fontSize: 12.06,
													  },
													},
												  }}

											sx={{
												//change left yAxis label styles
												"& .MuiChartsAxis-tickLabel tspan": { fontSize: "1.21em" },
											}}
										/>

										<Typography id="input-item-number" style={{fontSize:"11px", marginTop:"-15px", marginBottom:"-10px"}} gutterBottom>
										<FormattedMessage id="project.statistics.fields.team_rival" />
										</Typography>
										<Slider
											value={itemNb}
											onChange={handleItemNbChange}
											valueLabelDisplay="auto"
											min={1}
											max={2}
											aria-labelledby="input-item-number"
											// sx={{
											// 	color:"#995711",
											// }}

										/>
										<Typography id="input-series-number" style={{fontSize:"11px", marginTop:"-15px", marginBottom:"-10px"}} gutterBottom>
										<FormattedMessage id="project.statistics.fields.totalFouls" />
										</Typography>
										<Slider
											value={seriesNb}
											onChange={handleSeriesNbChange}
											valueLabelDisplay="auto"
											min={1}
											max={3}
											aria-labelledby="input-series-number"
											// sx={{
											// 	color:"#b42e10",
											// }}
										/>
									</Box>





								</Box>
							</Grid>
							<Grid item xs={6}>


								<Box
									display="fixed"

									sx={{

										border: '1.34px solid grey',
										background: "linear-gradient(-35deg, #081971 30%, #00F7FF 80% )",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<Stack direction="row" width="100%" textAlign="center" spacing={1}>
										<Box flexGrow={1}>
											<Typography
												sx={{ m: 0, color: "black", fontSize: "13.4px", mb:0 }}

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
												height={314.9}

											/>
											<Typography
												sx={{ m: 0.1, color: "white", fontSize: "13.4px" }}
											><FormattedMessage id="project.statistics.fields.totalPoints" />:  {totalPoints}</Typography>
										</Box>
										<Box flexGrow={1}>
											<Typography
												sx={{ m: 0, color: "black", fontSize: "13.4px", mb:0 }}
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
												height={314.9}
											/>
											<Typography
												sx={{ m: 0.1, color: "white", fontSize: "13.4px" }}
											><FormattedMessage id="project.statistics.fields.totalPointsRival" />: {totalPointsRival}</Typography>
										</Box>
									</Stack>





								</Box>
							</Grid>
						</Grid>


					</Box>






				)}





			</Box>








		</Box>

	);
}

export default UpdateStatisticsGame;