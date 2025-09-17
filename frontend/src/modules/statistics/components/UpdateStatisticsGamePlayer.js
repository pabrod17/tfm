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
import * as selectorsPlayer from '../../players/selectors';
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
import { textAlign } from '@mui/system';

const UpdateStatisticsGamePlayer = () => {
	const dispatch = useDispatch();
	const history = useNavigate();
	const intl = useIntl();
    const playerGameStatistics = useSelector(selectors.getPlayerGameStatistics);
    const player = useSelector(selectorsPlayer.getPlayer);

	const { gameId, playerId } = useParams();
	const [showTable, setShowTable] = useState(true);
	const { stretchingType, tabValue } = useParams();
	const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

    const [playerName , setPlayerName ] = useState(null);
    const [primaryLastName , setPrimaryLastName ] = useState(null);
    const [position , setPosition ] = useState(null);
    const [dni , setDni ] = useState(null);


    const [freeShots, setFreeShots] = useState(0);
	const [setShots, setSetShots] = useState(0);
	const [threePointShots, setThreePointShots] = useState(0);
	//tiros totales:
	    const [totalPoints, setTotalPoints] = useState(0);
    const [failFreeShots, setFailFreeShots] = useState(0);
    const [failSetShots, setFailSetShots] = useState(0);
    const [failThreePointShots, setFailThreePointShots] = useState(0);

    const [personalFouls, setPersonalFouls] = useState(0);
    const [technicalFouls, setTechnicalFouls] = useState(0);
    const [unsportsmanlikeFouls, setUnsportsmanlikeFouls] = useState(0);

    const [rebounds, setRebounds] = useState(0);
    
    const [blockedShot, setBlockedShot] = useState(0);
    
    const [assists, setAssists] = useState(0);
    
    const [minutes, setMinutes] = useState(0);

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
		if (!player) {
			dispatch(actionsPlayers.findPlayerById(playerId, () => history(`/statistics/update/game/${gameId}/players/${1}/player/${playerId}`)));
		}
	}, [dispatch, player, history, playerId, gameId]);

    useEffect(() => {
        if (!player) {
			dispatch(actionsPlayers.findPlayerById(playerId, () => history(`/statistics/update/game/${gameId}/players/${1}/player/${playerId}`)));
        } else {
            setPlayerName(player.playerName);
            setPrimaryLastName(player.primaryLastName);
            setPosition(player.position);
            setDni(player.dni);
        }
	}, [dispatch, player, history, playerId, gameId]);


	useEffect(() => {
		if (!playerGameStatistics) {
			dispatch(actions.findStatisticsByPlayerAndGame(playerId, gameId, () => history(`/statistics/update/game/${gameId}/players/${1}/player/${playerId}`)));
			dispatch(actionsPlayers.findPlayerById(playerId, () => history(`/statistics/update/game/${gameId}/players/${1}/player/${playerId}`)));
		} else {
			setFreeShots(playerGameStatistics.freeShots ? playerGameStatistics.freeShots : 0);
			setSetShots(playerGameStatistics.setShots ? playerGameStatistics.setShots : 0);
			setThreePointShots(playerGameStatistics.threePointShots ? playerGameStatistics.threePointShots : 0);
                setTotalPoints(playerGameStatistics.totalPoints ? playerGameStatistics.totalPoints : 0);
			setFailFreeShots(playerGameStatistics.failFreeShots ? playerGameStatistics.failFreeShots : 0);
			setFailSetShots(playerGameStatistics.failSetShots ? playerGameStatistics.failSetShots : 0);
			setFailThreePointShots(playerGameStatistics.failThreePointShots ? playerGameStatistics.failThreePointShots : 0);
			
            setPersonalFouls(playerGameStatistics.personalFouls ? playerGameStatistics.personalFouls : 0);
			setTechnicalFouls(playerGameStatistics.technicalFouls ? playerGameStatistics.technicalFouls : 0);
			setUnsportsmanlikeFouls(playerGameStatistics.unsportsmanlikeFouls ? playerGameStatistics.unsportsmanlikeFouls : 0);

			setRebounds(playerGameStatistics.rebounds ? playerGameStatistics.rebounds : 0);
			setBlockedShot(playerGameStatistics.blockedShot ? playerGameStatistics.blockedShot : 0);
			setAssists(playerGameStatistics.assists ? playerGameStatistics.assists : 0);
			setMinutes(playerGameStatistics.minutes ? playerGameStatistics.minutes : 0);


		}
	}, [dispatch, playerGameStatistics, history, gameId]);

	const handleSubmit = event => {

		event.preventDefault();

        dispatch(actions.updatePlayerGameStatistics(playerId, gameId, totalPoints, 
            minutes, threePointShots, setShots,freeShots,failThreePointShots,failSetShots,
            failFreeShots,rebounds,blockedShot,assists,personalFouls,technicalFouls,
            unsportsmanlikeFouls,
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
							maxWidth: { sm:1095.45 },

							border: '1.34px solid grey',
							background: "linear-gradient(180deg, rgb(59, 4, 26) 10%,rgb(47, 0, 255), rgb(59, 4, 26))",
							borderRadius: "13.4px",
							flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
							flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
							boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
							borderColor: "black"
						}}
					>
						<Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
                        <Grid container margin={1} spacing={{ xs: 0, md: 5 }}>
                        <Typography
									sx={{ flex: '1 1 100%', pt:3.5,mt: 3.5, color: "#36FF00", m: 2, mb: 0, fontSize: 20.1, textAlign: 'center' }}
									variant="h6"
									id="tableTitle"
									component="div"
								>
									{playerName} {primaryLastName} {' '}
                                     (<span style={{ color: '#00AEFF' }}>{position}</span>)
                                     (<span style={{ color: '#00AEFF' }}>{dni}</span>)
								</Typography>
							<Grid item xs={12} md={6} >

                                
								<Box
									component="form"
									sx={{
										borderRadius: "13.4px",
										borderColor: "black",
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",

									}}
									autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
									noValidate
									autoComplete="off"
								>
									<Grid container margin={3.35} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 8, md: 6 }}>
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
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={freeShots}
													onChange={(e) => setFreeShots(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.failShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={failFreeShots}
													onChange={(e) => setFailFreeShots(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.setShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={setShots}
													onChange={(e) => setSetShots(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.failShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={failSetShots}
													onChange={(e) => setFailSetShots(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.threePointShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={threePointShots}
													onChange={(e) => setThreePointShots(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.failShots" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={failThreePointShots}
													onChange={(e) => setFailThreePointShots(e.target.value)}
												/>
											</Box>
										</Grid>
                                        <Grid item xs={6}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
                                                    alignContent:"center",
                                                    textAlign:"center"
												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.totalPoints" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={totalPoints}
													onChange={(e) => setTotalPoints(e.target.value)}
												/>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</Grid>







							<Grid item xs={12} md={6} >

                                
								<Box
									component="form"
									sx={{
										borderRadius: "13.4px",
										borderColor: "black",
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",

									}}
									autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
									noValidate
									autoComplete="off"
								>
									<Grid container margin={3.35} spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 8, md: 6 }}>
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
													label={<FormattedMessage id="project.statistics.fields.personalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={personalFouls}
													onChange={(e) => setPersonalFouls(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.rebounds" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={rebounds}
													onChange={(e) => setRebounds(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.technicalFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={technicalFouls}
													onChange={(e) => setTechnicalFouls(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.blockedShot" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={blockedShot}
													onChange={(e) => setBlockedShot(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.unsportsmanlikeFouls" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={unsportsmanlikeFouls}
													onChange={(e) => setUnsportsmanlikeFouls(e.target.value)}
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
													label={<FormattedMessage id="project.statistics.fields.assists" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={assists}
													onChange={(e) => setAssists(e.target.value)}
												/>
											</Box>
										</Grid>
                                        <Grid item xs={6}>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': { mb: 1.34 },
													margin: '20.1px', // Centra el formulario en la pantalla
                                                    alignContent:"center",
                                                    textAlign:"center"
												}}
												noValidate
												autoComplete="off"
											>

												<TextField
													id="outlined-number"
													label={<FormattedMessage id="project.statistics.fields.minutes" />}
													InputLabelProps={{ style: { color: '#00bfff', fontSize: 20.1, fontWeight: 'regular', width: '100%'} }}
													InputProps={{ style: { color: 'white', fontSize: 20.1, fontWeight: 'regular', width: '100%' } }}
													inputProps={{ min: 0 }}
													type="number"
													sx={{
														border: '1.34px solid grey',
														borderRadius: "13.4px",
														borderColor: "black",
														boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)",

													}}
													value={minutes}
													onChange={(e) => setMinutes(e.target.value)}
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
							background: "linear-gradient(180deg, rgb(59, 4, 26) 10%,rgb(47, 0, 255), rgb(59, 4, 26))",
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
										// background: "linear-gradient(-35deg, #171721 30%, #171721 80% )",
										background: "linear-gradient(180deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<div class="cardstatistics">
										<p class="time-text"><span>{rebounds}</span></p>
										<p class="day-text">
											<FormattedMessage id="project.statistics.fields.rebounds" />
										</p>
									</div>





								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '1.34px solid grey',
										background: "linear-gradient(180deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<div class="cardstatistics">
										<p class="time-text"><span>{blockedShot}</span></p>
										<p class="day-text">
											<FormattedMessage id="project.statistics.fields.blockedShot" />
										</p>
									</div>





								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '1.34px solid grey',
										background: "linear-gradient(180deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<div class="cardstatistics">
										<p class="time-text"><span>{assists}</span></p>
										<p class="day-text">
											<FormattedMessage id="project.statistics.fields.assists" />
										</p>
									</div>





								</Box>
							</Grid>
							<Grid item xs={3}>


								<Box
									display="fixed"

									sx={{

										border: '1.34px solid grey',
										background: "linear-gradient(180deg, rgb(59, 4, 26) 30%,rgb(47, 0, 255))",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
										borderColor: "black"
									}}
								>

									<div class="cardstatistics">
										<p class="time-text"><span>{minutes}</span></p>
										<p class="day-text">
											<FormattedMessage id="project.statistics.fields.minutes" />
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
										background: "linear-gradient(-35deg, #0A0F27 30%, #0A0F27 80% )",

										background: "linear-gradient(180deg, rgb(47, 0, 255) 60%,rgb(59, 4, 26))",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
										borderColor: "black",
										'&:hover': {
											boxShadow:"rgb(0,0,0) 3.35px 6.7px 33.5px ,rgb(0,0,0) -3.35px 0px 167.5px"
														 
											},
									}}
								>

									<Box sx={{ 
										

										width: '98%' }}
										
										>
										<BarChart 
											tooltip={{ trigger: 'item' }}
											height={352}
											series={[
												{
													
													label: intl.formatMessage({ id: 'project.statistics.fields.totalPersonalFouls', color:"white" }),
													data: [personalFouls],
													color: "#d62828"
												},
												{
													label: intl.formatMessage({ id: 'project.statistics.fields.totalTechnicalFouls' }),
													data: [technicalFouls],
													color: "#fff8f0"
												},
												{
													label: intl.formatMessage({ id: 'project.statistics.fields.totalUnsportsmanlikeFouls' }),
													data: [unsportsmanlikeFouls],
													color: "#1e1e24"
												},
											]}
											slotProps={{
												legend: {
												  labelStyle: {
													fontSize: 12.06,
													fill: 'white',
												  },
												},
											  }}
											sx={{
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
											}}

										/>
										<Typography id="input-series-number" style={{fontSize:"13.4px", marginTop:"-19.7px"}} gutterBottom>
										<FormattedMessage id="project.statistics.fields.totalFouls" />
										</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={6}>


								<Box

									sx={{

										border: '1.34px solid grey',
										background: "linear-gradient(-35deg, ##c31432 30%, ##240b36 80% )",

										background: "linear-gradient(180deg, rgb(47, 0, 255) 60%,rgb(59, 4, 26))",
										borderRadius: "13.4px",
										flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
										flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
										boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
										borderColor: "black",
										'&:hover': {
											boxShadow:"rgb(0,0,0) 3.35px 6.7px 33.5px ,rgb(0,0,0) -3.35px 0px 167.5px"
														 
											},
									}}
								>

									<Stack direction="row" width="100%" textAlign="center" spacing={1}>
										<Box flexGrow={1}>
											<Typography
												sx={{ m: 0, color: "white", fontSize: "13.4px" }}

											><FormattedMessage id="project.statistics.fields.shots" /></Typography>
											<PieChart
												colors={palette}
												series={[{
													data: [{ value: freeShots, label: intl.formatMessage({ id: 'project.statistics.fields.totalFreeShots' }), color:"#f77f00" },
													 { value: setShots, label: intl.formatMessage({ id: 'project.statistics.fields.totalSetShots' }), color:"#003049" },
													  { value: threePointShots, label: intl.formatMessage({ id: 'project.statistics.fields.totalThreePointShots' }), color:"#d62828" }],
													faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
													highlightScope: { faded: 'global', highlighted: 'item' },
												}]}
												slotProps={{ legend: { hidden: true } }}
												{...pieParams}
												height={314.9}

											/>
										</Box>
										<Box flexGrow={1}>
											<Typography
												sx={{ m: 0, color: "white", fontSize: "13.4px" }}
											><FormattedMessage id="project.statistics.fields.shotsFailed" /></Typography>
											<PieChart
												series={[
													{
														data: [{ value: failFreeShots, label: intl.formatMessage({ id: 'project.statistics.fields.failFreeShots' }), color: '#1e1e24' }, 
														{ value: failSetShots, label: intl.formatMessage({ id: 'project.statistics.fields.failSetShots' }), color: '#92140c' },
														 { value: failThreePointShots, label: intl.formatMessage({ id: 'project.statistics.fields.failThreePointShots' }), color: '#fff8f0' }],
														faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
														highlightScope: { faded: 'global', highlighted: 'item' },
													},

												]}
												slotProps={{ legend: { hidden: true } }}
												{...pieParams}
												height={314.9}
											/>
										</Box>
									</Stack>
									<Box flexGrow={1}>
									<Typography id="input-series-number" style={{fontSize:"13.4px", marginTop:"-2.7px"}} gutterBottom>
										<FormattedMessage id="project.statistics.fields.totalPoints" />:  {totalPoints}</Typography>
        							</Box>
								</Box>
							</Grid>
						</Grid>


					</Box>






				)}





			</Box>








		</Box>

	);
}

export default UpdateStatisticsGamePlayer;