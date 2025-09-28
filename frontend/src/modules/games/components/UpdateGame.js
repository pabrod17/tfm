import React, { useEffect, useState, createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import naranja from '../../games/components/ballunsplash.jpeg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import * as actionsExercises from '../../exercises/actions';
import * as actionsStretchings from '../../stretchings/actions';
import * as actionsStatistics from '../../statistics/actions';
import * as actionsPlayers from '../../players/actions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const UpdateGame = () => {
    const game = useSelector(selectors.getOneGame);
    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [gameDate , setGameDate ] = useState(null);
    const [rival , setRival ] = useState(null);
    const [description , setDescription ] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [value, setValue] = useState(0);
    let form;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!game) {
            dispatch(actions.findGameById(id, () => history(`/games/update/${id}`)));
        } else {
            console.log("CARAJOOOO;: ", game.gameDate)


            setGameDate(dayjs(game.gameDate));
            setRival(game.rival);
            setDescription(game.description);
        }
    }, [dispatch, game, history, id]);

    const handleSubmit = event => {

        event.preventDefault();
    
            dispatch(actions.updateGame(game.id, dateConversor(gameDate), rival.trim(), description.trim(),
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        }
        const reloadWindow = () =>{
            history('/games/home');
            window.location.reload('true');
        }

        const handleUpdateGame = (dispatch) => {
            dispatch(actions.findGameById(id, () => history(`/games/update/${id}`)));
        }
        const handleUpdateGameExercise = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => {
                dispatch(actionsExercises.findExercisesByGameId(id, () => history(`/games/update/${id}/exercise/${tabValue}`)));
            }));
            history(`/games/update/${id}/exercise/${tabValue}`);
        }
        const handleUpdateGameStretching = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => {
                dispatch(actionsStatistics.findStatisticsByGame(id, () => history(`/games/update/${id}/stretching/${tabValue}`)));
            }));
            history(`/games/update/${id}/stretching/${tabValue}`);
        }

        const handleUpdateGameStatistics = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => {
                dispatch(actionsStatistics.findStatisticsByGame(id, () => history(`/games/update/${id}/statistics/${tabValue}`)));
            }));
            history(`/games/update/${id}/statistics/${tabValue}`);
        }

        const handleUpdateGamePlayer = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => {
                dispatch(actionsPlayers.findPlayersByGame(id, () => history(`/games/update/${id}/player/${tabValue}`)));
            }));
            history(`/games/update/${id}/player/${tabValue}`);
        }



        
        // function dateConversor(gameDate) {
        //     const dateObj2 = new Date(gameDate);
        //     dateObj2.setDate(dateObj2.getDate() + 1);
        //     // Obtener la fecha en formato ISO 8601 (UTC)
        //     const trainingDateUpdated = dateObj2.toISOString();
        //     return trainingDateUpdated;
        // }
        function dateConversor(djs) {
            if (!djs || !djs.isValid?.()) return '';
            return djs.format('YYYY-MM-DD HH:mm');
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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
                            bgcolor:"red",
							boxShadow: 4.02,
							borderRadius: 2.01,
                            borderColor: "black",
							boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                              },
                        }}
        >
          <Tab sx={{ color: '#40FF00', fontSize: "22.11px", padding:"13.4px"}} onClick={() => handleUpdateGame(dispatch)} label="General"  />
          <Tab sx={{ color: '#f5af19', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdateGameExercise(1, dispatch)} label={<FormattedMessage id="project.exercises.fields.exercises"/>}  />
          <Tab sx={{ color: 'rgb(255, 0, 247)', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdateGameStretching(2, dispatch)} label={<FormattedMessage id="project.stretchings.fields.stretchings"/>}/>
          {/* <Tab sx={{ color: 'rgb(0, 217, 255)', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateGameStatistics(3, dispatch)} label="Statistics"/> */}
          <Tab sx={{ color: '#ff0000', fontSize: "22.11px", padding:"13.4px" }} onClick={() => handleUpdateGamePlayer(4, dispatch)} label={<FormattedMessage id="project.players.fields.players"/>}/>
        </Tabs>
      </Box>
</Box>


<Box
			my={2.68}
			display="flex"
			alignItems="center"
            p={3.35}
            sx={{
                border: '1.34px solid grey',
                background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
                borderRadius: "13.4px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                borderColor:"black",
                boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
                width:"670px"
            }}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container margin={3.35} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={12} md={12} >
					<img src={naranja} alt="Person" class="card__image_game_update_create"></img>

					<Box
						component="form"
						sx={{
                            background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
                            borderRadius: "13.4px",
                            borderColor:"black",
                            boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
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
										'& .MuiTextField-root': { mb: 1.34, width: '100%' },
										margin: '33.5px', // Centra el formulario en la pantalla
                                        marginTop:"-5px",
                                        marginBottom:"10px"

									}}
									noValidate
									autoComplete="off"
								>
									<h6 class="margin_training_form" 
									><FormattedMessage id="project.global.fields.date" /></h6>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
										<DemoContainer components={['DateTimePicker']}>
											<DateTimePicker
												sx={{
													border: '1.34px solid grey',
                                                    background: "linear-gradient(-45deg, #0E24A0 0%, #900C0C 100% )",
													borderRadius: "13.4px",
													colorAdjust: "#00bfff",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
                                                    borderColor:"black",
                                                    boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
												}}
												label={<FormattedMessage id="project.global.fields.date" />}
												autoFocus
												required
                                                value={gameDate}
												onChange={(newDate) =>
													{
														setGameDate(newDate)
													}
													
												
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
                                    <TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.games.fields.rival" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.4, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={2}
										sx={{
                                            border: '1.34px solid grey',
                                            background: "linear-gradient(-45deg, #0E24A0 0%, #900C0C 100% )",
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
										}}
										value={rival}
										onChange={(e) => setRival(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.4, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
                                            border: '1.34px solid grey',
                                            background: "linear-gradient(-45deg, #0E24A0 0%, #900C0C 100% )",
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
										}}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
			</Grid>
			<button className="post_game" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
</Box>
);
}

export default UpdateGame;