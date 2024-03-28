import React, { useEffect, useState, createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import bigBall from '../../trainings/components/bigBall.jpg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import * as actionsExercises from '../../exercises/actions';
import * as actionsStretchings from '../../stretchings/actions';

const UpdateTraining = () => {
    const training = useSelector(selectors.getOneTraining);
    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [trainingDate , setTrainingDate ] = useState(null);
    const [durationMinutes, setDurationMinutes] = useState(null);
    const [description , setDescription ] = useState(null);
    const [objective , setObjective] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let form;

    useEffect(() => {
        if (!training) {
            dispatch(actions.findTrainingById(id, () => history(`/trainings/update/${id}`)));
        } else {
            setTrainingDate(dayjs(training.trainingDate));
            setDurationMinutes(dayjs(training.durationMinutes));
            setDescription(training.description);
            setObjective(training.objective);

        }
    }, [dispatch, training, history, id]);

    const handleSubmit = event => {

        event.preventDefault();
    
            dispatch(actions.updateTraining(training.id, dateConversor(trainingDate), durationMinutes,
            description.trim(), objective.trim(),
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        }
        const reloadWindow = () =>{
            history('/trainings/home');
            window.location.reload('true');
        }

        const handleUpdateTraining = (dispatch) => {
            dispatch(actions.findTrainingById(id, () => history(`/trainings/update/${id}`)));
        }
        const handleUpdateTrainingExercise = (tabValue, dispatch) => {
            setValue(tabValue);
            console.log("PRIMERO PARA exercises: ", tabValue)
            dispatch(actions.findTrainingById(id, () => {
                dispatch(actionsExercises.findExercisesByTrainingId(id, () => history(`/trainings/update/${id}/exercise/${tabValue}`)));
            }));
            history(`/trainings/update/${id}/exercise/${tabValue}`);
        }
        const handleUpdateTrainingStretching = (tabValue, dispatch) => {
            setValue(tabValue);
            console.log("PRIMERO PARA STRETCHINGS: ", tabValue)
            dispatch(actions.findTrainingById(id, () => {
                dispatch(actionsStretchings.findStretchingsByTrainingId(id, () => history(`/trainings/update/${id}/stretching/${tabValue}`)));
            }));
            history(`/trainings/update/${id}/stretching/${tabValue}`);
        }

        function dateConversor(trainingDate) {
            const dateObj2 = new Date(trainingDate);
            dateObj2.setDate(dateObj2.getDate() + 1);
            // Obtener la fecha en formato ISO 8601 (UTC)
            const trainingDateUpdated = dateObj2.toISOString();
        
            return trainingDateUpdated;
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
        boxShadow: 1,
        borderRadius: 4,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '80px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>

<Box sx={{boxShadow:"0 10px 50px rgb(0, 0, 0)" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(-45deg, #41295a 0%, #2F0743 70% )",
                            bgcolor:"red",
                            boxShadow: 6,
                            borderRadius: 3,
                            borderColor: "black",
							boxShadow: "0 10px 50px rgb(0, 0, 0)"
                        }}
        >
          <Tab sx={{ color: '#40FF00', fontSize: "30px", padding:"20px"}} onClick={() => handleUpdateTraining(dispatch)} label="General"  />
          <Tab sx={{ color: '#f5af19', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTrainingExercise(1, dispatch)} label="Exercises"  />
          <Tab sx={{ color: 'rgb(255, 0, 247)', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTrainingStretching(2, dispatch)} label="Stretchings"  />
        </Tabs>
      </Box>
</Box>


<Box
			my={4}
			display="flex"
			alignItems="center"
			gap={4}
			p={5}
			sx={{
				border: '2px solid grey',
				background: "linear-gradient(-45deg, #41295a 0%, #2F0743 70% )",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                borderColor:"black",
                boxShadow:"0 10px 50px rgb(0, 0, 0)",
                width:"1000px"
            }}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container margin={5} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={12} md={12} >
					<img src={bigBall} alt="Person" class="card__image_training_update_create"></img>

					<Box
						component="form"
						sx={{
							background: "linear-gradient(-45deg, #f5af19 0%, #f12711 100% )",
							borderRadius: "20px",
                            borderColor:"black",
                            boxShadow:"0 10px 50px rgb(0, 0, 0)"
						}}
                        autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
						noValidate
						autoComplete="off"
					>
						<Grid container spacing={2}>
                        <Grid item xs={12} md={12}>

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
													background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
													borderRadius: "20px",
													colorAdjust: "#00bfff",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
                                                    borderColor:"black",
                                                    boxShadow:"0 10px 10px rgb(0, 0, 0)"
												}}
												label={<FormattedMessage id="project.global.fields.date" />}
												autoFocus
												required
                                                value={trainingDate}
												onChange={(newDate) =>
													{
														setTrainingDate(newDate.toISOString())
														console.log("formattedDate:", newDate.$d.toISOString());
													
													
													}
													
												
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<h4 class="margin_training_form"
									>Time</h4>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['TimePicker']}>
											<TimePicker
											    id="time-picker"

												sx={{
													border: '2px solid grey',
													background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
													borderRadius: "20px",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
                                                    borderColor:"black",
                                                    boxShadow:"0 10px 10px rgb(0, 0, 0)"
												}}
                                                value={durationMinutes}
												label="Time" 
												onChange={(durationMinutes) => {
													setDurationMinutes(durationMinutes)
													console.log("holaaa222; ", durationMinutes)
												}}
												/>
												
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
                                            borderColor:"black",
                                            boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>

									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.trainings.fields.objective" />}//Objetivo
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41295a 0%, #2F0743 100% )",
											borderRadius: "20px",
                                            borderColor:"black",
                                            boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={objective}
										onChange={(e) => setObjective(e.target.value)}
									/>


								</Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
			</Grid>
			<button className="post_training" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
</Box>
);
}

export default UpdateTraining;