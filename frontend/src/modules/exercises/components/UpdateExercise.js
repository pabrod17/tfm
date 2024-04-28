import React, { useEffect, useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Errors } from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { useParams } from 'react-router-dom';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import exerciseImage from '../../app/components/exercise.jpg';
import users, { LoginNew, Login } from '../../users';

const UpdateExercise = () => {
    const exercise = useSelector(selectors.getOneExercise);
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [exerciseName, setExerciseName] = useState(null);
    const [description, setDescription] = useState(null);
    const [objective, setObjective] = useState(null);
    const [exerciseType, setExerciseType] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const userLogged = useSelector(users.selectors.getUser);

    useEffect(() => {
        if (!exercise) {
            dispatch(actions.findExerciseById(id, () => history(`/exercises/update/${id}`)));
        } else {
            setExerciseName(exercise.exerciseName);
          setDescription(exercise.description);
          setObjective(exercise.objective);
          setExerciseType(exercise.exerciseType);
    
        }
    }, [dispatch, exercise, history, id]);

    const handleSubmit = event => {

        event.preventDefault();

        dispatch(actions.updatExercise(exercise.id, exerciseName.trim(),
            description.trim(), objective.trim(), exerciseType,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
        ));
        setBackendErrors(null);
    }
    const reloadWindow = () => {
        history('/exercises/home');
        window.location.reload('true');
    }

    const handleChange = (event) => {
        setExerciseType(event.target.value);
    };

    const tactic = "Tactico";
    const technique = "Tecnica";
    const physical = "Fisico";
    const globalized = "Global";
    const specific = "Especifico";
    const psychological = "Psicologico";
    const strategy = "Estrategia";
    const preMatch = "PrePartido";


    return (
<Box
			my={4}
			display="flex"
			alignItems="center"
			p={3.35}
			m={6.7}
			sx={{
				border: '1.34px solid grey',
				background: "linear-gradient(-180deg, #111010 0%, #dd4103 70%, #111010 )",
                background: "radial-gradient(circle, rgba(179, 5, 5, 0.557) -10%, transparent 120%)",
                background: "radial-gradient(circle, rgba(255, 0, 0, 0.25) 100%, transparent 120%)",
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
					<img src={exerciseImage} alt="Person" class="card__image_exercise_update_create"></img>

					<Box
						component="form"
						sx={{
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
										'& .MuiTextField-root': { mb: 3, width: '100%' },
										marginLeft: '33.5px', // Centra el formulario en la pantalla
                                        mb:"-50px",
									}}
									noValidate
									autoComplete="off"
								>



	  <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
                fontSize:"13.40px",
                top:"-5px"
              }}

            ><FormattedMessage id="project.lesion.fields.lesionType" /></InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={exerciseType}
          label="Type"
          onChange={handleChange}
		  sx={{
			color: "white",
			border: '2px solid grey',
			borderRadius: "20px",
			borderColor:"black",
			boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
			marginBottom:"20px",
			height:"40px"

		  }}
		  inputProps={{
			MenuProps: {
			  MenuListProps: {
				sx: {
				  backgroundColor: 'rgb(58 60 84)',
				  color: "white"
				}
			  }
			}
		  }}

        >
                            <MenuItem value={tactic}><FormattedMessage id="project.exercises.fields.tactic" /></MenuItem>
                            <MenuItem value={technique}><FormattedMessage id="project.exercises.fields.technique" /></MenuItem>
                            <MenuItem value={physical}><FormattedMessage id="project.exercises.fields.physical" /></MenuItem>
                            <MenuItem value={globalized}><FormattedMessage id="project.exercises.fields.globalized" /></MenuItem>
                            <MenuItem value={specific}><FormattedMessage id="project.exercises.fields.specific" /></MenuItem>
                            <MenuItem value={psychological}><FormattedMessage id="project.exercises.fields.psychological" /></MenuItem>
                            <MenuItem value={strategy}><FormattedMessage id="project.exercises.fields.strategy" /></MenuItem>
                            <MenuItem value={preMatch}><FormattedMessage id="project.exercises.fields.preMatch" /></MenuItem>

                            </Select>
            </Box>
							</Grid>
							<Grid item xs={12} md={12}>

								{/* <div className='form_add_training_general'> */}
								<Box
									component="form"
									sx={{
										'& .MuiTextField-root': { mb: 3, width: '100%' },
										margin: '33.5px', // Centra el formulario en la pantalla
                    marginBottom:"10px"
									}}
									noValidate
									autoComplete="off"
								>

<TextField
							id="outlined-multiline-static-1"
              label={<FormattedMessage id="project.exercises.fields.name" />}
              InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
              InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
              multiline
              rows={3}
              sx={{
                border: '1.34px solid grey',
                borderRadius: "13.4px",
                borderColor:"black",
                boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
              }}
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
            />
            <TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
                    InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
                    InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
                    multiline
										rows={6}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="outlined-multiline-static-1"
              label={<FormattedMessage id="project.exercises.fields.objective" />}
              InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
              InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
              multiline
              rows={6}
              sx={{
                border: '1.34px solid grey',
                borderRadius: "13.4px",
                borderColor:"black",
                boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
              }}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          
          


          </Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
			</Grid>
      {(userLogged.role === "ADMIN") && (

			<button className="post_exercise" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
      )}
          </Box>
    );
}

export default UpdateExercise;