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
import FormControl from '@mui/material/FormControl';

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
				background: "linear-gradient(-180deg, #111010 0%, #dd4103 70%, #111010 )",
                background: "radial-gradient(circle, rgba(179, 5, 5, 0.557) -10%, transparent 120%)",
                background: "radial-gradient(circle, rgba(255, 0, 221, 0.25) 100%, transparent 120%)",

				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
				borderColor:"black",
				boxShadow:"0 10px 50px rgb(0, 0, 0)"
			}}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container margin={5} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item md={12} >
					<img src={estiramientos} alt="Person" class="card__image_stretching_update_create"></img>

					<Box
						component="form"
						sx={{
							borderRadius: "20px",
							borderColor:"black",
                            boxShadow:"0 0px 50px rgb(0, 0, 0)"
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
										marginLeft: '50px', // Centra el formulario en la pantalla
                                        mb:"-50px"
									}}
									noValidate
									autoComplete="off"
								>



<FormControl sx={{ m: 1, minWidth: 150 }}>
	  <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
				fontSize:"20px"
              }}

            ><FormattedMessage id="project.lesion.fields.lesionType" /></InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={stretchingType}
          label="Type"
          onChange={handleChange}
		  sx={{
			color: "white",
			border: '2px solid grey',
			borderRadius: "20px",
			borderColor:"black",
			boxShadow:"0 10px 10px rgb(0, 0, 0)"

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
            </FormControl>
            </Box>
							</Grid>
							<Grid item xs={12} md={12}>

								{/* <div className='form_add_training_general'> */}
								<Box
									component="form"
									sx={{
										'& .MuiTextField-root': { mb: 3, width: '100%' },
										margin: '50px', // Centra el formulario en la pantalla
									}}
									noValidate
									autoComplete="off"
								>

<TextField
							id="outlined-multiline-static-1"
              label={<FormattedMessage id="project.exercises.fields.name" />}
              InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
              InputProps={{ style: { color: 'white', padding: '10px', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
              multiline
              rows={2}
              sx={{
                border: '2px solid grey',
                borderRadius: "20px",
                borderColor:"black",
                boxShadow:"0 10px 10px rgb(0, 0, 0)"
              }}
              value={stretchingName}
              onChange={(e) => setStretchingName(e.target.value)}
            />
            <TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
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

			<button className="post_stretching" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

          </Box>
    );
}

export default AddStretching;