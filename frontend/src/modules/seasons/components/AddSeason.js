import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import SeasonsHome from './SeasonsHome';
import logo22 from '../../seasons/components/red3.jpeg';
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

const AddSeason = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const [seasonName, setSeasonName] = useState("");
	const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
        event.preventDefault();

            dispatch(actions.addSeason(
                dateConversor(startDate),
                dateConversor(endDate),
                seasonName.trim(), description.trim(),
             () => reloadWindow(),
                errors => setBackendErrors(errors),
            ));

    }

    const reloadWindow = () =>{
        history('/seasons/home');
        window.location.reload('true');
    }

    function dateConversor(startEndDate) {
		const dateObj2 = new Date(startEndDate);
		dateObj2.setDate(dateObj2.getDate() + 1);
		// Obtener la fecha en formato ISO 8601 (UTC)
		const dateUpdated = dateObj2.toISOString();
		return dateUpdated;
	}

    return(
<Box
			my={4}
			display="flex"
			alignItems="center"
			gap={2}
			p={3.35}
			m={6.7}
			sx={{
				border: '1.34px solid grey',
				background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
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
					<img src={logo22} alt="Person" class="card__image_season_update_create"></img>

					<Box
						component="form"
						sx={{
							background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
							borderRadius: "13.4px",
							borderColor:"black",
                            boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)"
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
										margin: '33.5px', // Centra el formulario en la pantalla
                                        mb:"0px",
										mt:"0px"
									}}
									noValidate
									autoComplete="off"
								>
									<h6 class="margin_training_form margin_training_form_top_botton"
									><FormattedMessage id="project.seasons.fields.startDate" /></h6>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
										<DemoContainer components={['DatePicker']}>
											<DatePicker
												sx={{
													border: '1.34px solid grey',
													borderRadius: "13.4px",
													colorAdjust: "#00bfff",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
													borderColor:"black",
                                                    boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
													height:"50px"
												}}
												autoFocus
												required
												onChange={(newDate) =>
													{
														setStartDate(newDate.toISOString())
														console.log("formattedDate:", newDate.$d.toISOString());
													
													
													}
													
												
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<h6 class="margin_training_form margin_training_form_top_botton"
									><FormattedMessage id="project.seasons.fields.endDate" /></h6>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
										<DemoContainer components={['DatePicker']}>
											<DatePicker
												sx={{
													border: '1.34px solid grey',
													borderRadius: "13.4px",
													colorAdjust: "#00bfff",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
													borderColor:"black",
                                                    boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
													height:"50px"

												}}
												autoFocus
												required
												onChange={(newDate) =>
													{
														setEndDate(newDate.toISOString())
														console.log("formattedDate:", newDate.$d.toISOString());
													
													
													}
													
												
												}
											/>
										</DemoContainer>
									</LocalizationProvider>


								</Box>
							</Grid>
							<Grid item xs={12} md={12}>

								{/* <div className='form_add_training_general'> */}
								<Box
									component="form"
									sx={{
										'& .MuiTextField-root': { mb: 2, width: '100%' },
										margin: '33.5px', // Centra el formulario en la pantalla
										mt:"15px",
										mb:"20px"
									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.seasons.fields.name" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={2}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={seasonName}
										onChange={(e) => setSeasonName(e.target.value)}
									/>

									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={5}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>


								</Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
			</Grid>
			<button className="post_season" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
    );

}

export default AddSeason;