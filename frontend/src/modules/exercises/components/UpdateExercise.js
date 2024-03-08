import React, { useState } from 'react';
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

const UpdateExercise = () => {
    const exercise = useSelector(selectors.getOneExercise);
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [exerciseName, setExerciseName] = useState(exercise.exerciseName);
    const [description, setDescription] = useState(exercise.description);
    const [objective, setObjective] = useState(exercise.objective);
    const [exerciseType, setExerciseType] = useState(exercise.exerciseType);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

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

        <div className='login-box-exercise' >
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <img src={exerciseImage} alt="Person" class="card__image_exercise_update_create"></img>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { mb: 2, width: '100%' },
                    margin: '50px', // Centra el formulario en la pantalla
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label={<FormattedMessage id="project.exercises.fields.name" />}
                            InputLabelProps={{ sx: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                            InputProps={{ sx: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular' } }}
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="demo-simple-select-label"
                            sx={{
                                color: "#00bfff",
                                margin: "15px"
                            }}

                        ><FormattedMessage id="project.exercises.fields.typeOnly" /></InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={exerciseType}
                            label="Type"
                            onChange={handleChange}
                            autoWidth
                            sx={{
                                color: "white",
                                margin: "15px"
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label={<FormattedMessage id="project.exercises.fields.description" />}
                            InputLabelProps={{ sx: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                            InputProps={{ sx: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular' } }}
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label={<FormattedMessage id="project.exercises.fields.objective" />}
                            InputLabelProps={{ sx: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                            InputProps={{ sx: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular' } }}
                            multiline
                            rows={4}
                            value={objective}
                            onChange={(e) => setObjective(e.target.value)}
                        />
                    </Grid>
                    <a type='submit' onClick={(e) => handleSubmit(e)}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <FormattedMessage id="project.global.buttons.save" />
                    </a>
                </Grid>
            </Box>
        </div>
    );
}

export default UpdateExercise;