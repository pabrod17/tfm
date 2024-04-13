import React, { useEffect, useState, createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {useParams} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import dayjs from 'dayjs';
import * as actionsTeams from '../../teams/actions';
import * as actionsTrainings from '../../trainings/actions';
import * as actionsGames from '../../games/actions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import logo22 from '../../seasons/components/red3.jpeg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UpdateSeason = () => {

    const season = useSelector(selectors.getSeason);
    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [seasonName, setSeasonName] = useState(null);
    const [description , setDescription ] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [value, setValue] = useState(0);
    let form;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!season) {
            dispatch(actions.findSeasonById(id, () => history(`/seasons/update/${id}`)));
        } else {
            setSeasonName(season.seasonName);
            setDescription(season.description);
            setStartDate(dayjs(season.startDate));
            setEndDate(dayjs(season.endDate));
        }
    }, [dispatch, season, history, id]);

    const handleSubmit = event => {
    
        event.preventDefault();
        
        dispatch(actions.updateSeason(
            season.id,
            dateConversor(startDate),
            dateConversor(endDate),
            seasonName.trim(),
            description.trim(),
         () => reloadWindow(),
            errors => setBackendErrors(errors),
        ));
    }

    const reloadWindow = () =>{
        history('/seasons/home');
        window.location.reload('true');
    }

    function dateConversor(seasonDate) {
        const dateObj2 = new Date(seasonDate);
        dateObj2.setDate(dateObj2.getDate() + 1);
        // Obtener la fecha en formato ISO 8601 (UTC)
        const dateUpdated = dateObj2.toISOString();
    
        return dateUpdated;
    }

    const handleUpdateSeason = (dispatch) => {
        dispatch(actions.findSeasonById(id, () => history(`/seasons/update/${id}`)));
    }
    const handleUpdateSeasonTeams = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findSeasonById(id, () => {
            dispatch(actionsTeams.findTeamsToSeason(id, () => history(`/seasons/update/${id}/team/${tabValue}`)));
        }));
        history(`/seasons/update/${id}/team/${tabValue}`);
    }
    const handleUpdateSeasonTrainings = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findSeasonById(id, () => {
            dispatch(actionsTrainings.findTrainingsBySeasonId(id, () => history(`/seasons/update/${id}/training/${tabValue}`)));
        }));
        history(`/seasons/update/${id}/training/${tabValue}`);
    }

    const handleUpdateSeasonGames = (tabValue, dispatch) => {
        setValue(tabValue);
        dispatch(actions.findSeasonById(id, () => {
            dispatch(actionsGames.findGamesBySeasonId(id, () => history(`/seasons/update/${id}/game/${tabValue}`)));
        }));
        history(`/seasons/update/${id}/game/${tabValue}`);
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
        borderColor:"black",
        boxShadow:"0 10px 50px rgb(0, 0, 0)"
    }}>

<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
                            bgcolor:"red",
                            boxShadow: 6,
                            borderRadius: 3,
							borderColor: "black",
							boxShadow: "0 10px 50px rgb(0, 0, 0)",
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                              },
                        }}
        >
          <Tab sx={{ color: '#40FF00', fontSize: "30px", padding:"20px"}} onClick={() => handleUpdateSeason(dispatch)} label="General"  />
          <Tab sx={{ color: '#e70707', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateSeasonTeams(1, dispatch)} label="Teams"  />
          <Tab sx={{ color: '#FF6C00', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateSeasonTrainings(2, dispatch)} label="Trainings"/>
          <Tab sx={{ color: '#F7FF00', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateSeasonGames(3, dispatch)} label="Games"/>
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
				background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
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
					<img src={logo22} alt="Person" class="card__image_season_update_create"></img>

					<Box
						component="form"
						sx={{
                            background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",
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
									><FormattedMessage id="project.seasons.fields.startDate" /></h4>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
												label={<FormattedMessage id="project.global.fields.date" />}
												autoFocus
												required
                                                value={startDate}
												onChange={(newDate) =>
													{
														setStartDate(newDate.toISOString())
														console.log("formattedDate:", newDate.$d.toISOString());
													
													
													}
													
												
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
                                    <h4 class="margin_training_form"
									><FormattedMessage id="project.seasons.fields.endDate" /></h4>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
										<DemoContainer components={['DatePicker']}>
											<DatePicker
												sx={{
													border: '2px solid grey',
													borderRadius: "20px",
													colorAdjust: "#00bfff",
													'& label': { color: 'white' },
													'& input': { color: 'white' },
                                                    borderColor:"black",
                                                    boxShadow:"0 10px 10px rgb(0, 0, 0)",
												}}
												label={<FormattedMessage id="project.global.fields.date" />}
												autoFocus
												required
                                                value={endDate}
												onChange={(newDate) =>
													{
														setEndDate(newDate.toISOString())
														console.log("formattedDate:", newDate.$d.toISOString());
													
													
													}
													
												
												}
											/>
										</DemoContainer>
									</LocalizationProvider>
                                    <TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.seasons.fields.name" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
                                            borderColor:"black",
                                            boxShadow:"0 10px 10px rgb(0, 0, 0)",
                                            mb:"60px"
										}}
										value={seasonName}
										onChange={(e) => setSeasonName(e.target.value)}
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
			</Grid>
			<button className="post_season" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box></Box>
    );
}

export default UpdateSeason;