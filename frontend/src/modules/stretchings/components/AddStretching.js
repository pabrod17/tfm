import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Errors } from '../../common';
import * as actions from '../actions';
import { useParams } from 'react-router-dom';
import estiramientos from './estiramientos.jpg'; //1920x1200
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';

const AddStretching = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [stretchingName, setStretchingName] = useState("");
    const [description, setDescription] = useState("");
    const [stretchingType, setStretchingType] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        dispatch(actions.addStretching(stretchingName.trim(),
            description.trim(), stretchingType,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
        ));
        setBackendErrors(null);
    }
    const reloadWindow = () => {
        history('/stretchings/addStretching');
        window.location.reload('true');
    }

    const hamstrings = "Isquiotibiales";
    const buttocks = "Gluteos";
    const calf = "Gemelos";
    const adductors = "Adductores";
    const shoulder = "Hombro";
    const quadriceps = "Cuadriceps";
    const back = "Espalda";
    const pectoral = "Pectoral";
    const crotch = "Ingle";
    const triceps = "Triceps";

    const handleChange = (event) => {
        setStretchingType(event.target.value);
    };

    return (
		<Box
			my={4}
			display="flex"
			alignItems="center"
			gap={4}
			p={5}
			m={10}
			sx={{
				border: '2px solid grey',
				bgcolor: "#23192d",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                boxShadow:"0 15px 65px rgba(0, 0, 0, 0.5)"
			}}
		>
        <div className='login-box-stretching' >
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <img src={estiramientos} alt="Person" class="card__image_stretching_update_create"></img>

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
                            label={<FormattedMessage id="project.stretchings.fields.stretchingName" />}
                            InputLabelProps={{ sx: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                            InputProps={{ sx: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular' } }}
                            value={stretchingName}
                            onChange={(e) => setStretchingName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="demo-simple-select-label"
                            sx={{
                                color: "#00bfff",
                                margin: "15px"
                            }}

                        ><FormattedMessage id="project.stretchings.fields.stretchingType" /></InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={stretchingType}
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
                            <MenuItem value={hamstrings}><FormattedMessage id="project.stretchings.fields.hamstrings" /></MenuItem>
                            <MenuItem value={buttocks}><FormattedMessage id="project.stretchings.fields.buttocks" /></MenuItem>
                            <MenuItem value={calf}><FormattedMessage id="project.stretchings.fields.calf" /></MenuItem>
                            <MenuItem value={adductors}><FormattedMessage id="project.stretchings.fields.adductors" /></MenuItem>
                            <MenuItem value={shoulder}><FormattedMessage id="project.stretchings.fields.shoulder" /></MenuItem>
                            <MenuItem value={quadriceps}><FormattedMessage id="project.stretchings.fields.quadriceps" /></MenuItem>
                            <MenuItem value={back}><FormattedMessage id="project.stretchings.fields.back" /></MenuItem>
                            <MenuItem value={pectoral}><FormattedMessage id="project.stretchings.fields.pectoral" /></MenuItem>
                            <MenuItem value={crotch}><FormattedMessage id="project.stretchings.fields.crotch" /></MenuItem>
                            <MenuItem value={triceps}><FormattedMessage id="project.stretchings.fields.triceps" /></MenuItem>

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
        </Box>
    );
}

export default AddStretching;