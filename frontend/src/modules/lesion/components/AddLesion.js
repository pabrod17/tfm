import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Errors } from '../../common';
import * as actions from '../actions';
import { useParams } from 'react-router-dom';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';

const AddLesion = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [lesionName, setLesionName] = useState("");
  const [description, setDescription] = useState("");
  const [medication, setMedication] = useState("");
  const [lesionType, setLesionType] = useState("");
  const [backendErrors, setBackendErrors] = useState(null);
  let form;

  const handleSubmit = event => {

    event.preventDefault();

    dispatch(actions.addLesion(lesionName.trim(),
      description.trim(), medication.trim(), lesionType,
      () => reloadWindow(),
      errors => setBackendErrors(errors),
    ));
    setBackendErrors(null);
  }
  const reloadWindow = () => {
    history('/lesion/addLesion');
    window.location.reload('true');
  }

  const muscle = "Muscular";
  const tendon = "Tendinosa";
  const joint = "Articular";
  const spine = "ColumnaVertebral";
  const psychological = "Psicologica";

  const handleChange = (event) => {
    setLesionType(event.target.value);
  };

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
                background: "radial-gradient(circle, #0044ff -10%, transparent 120%)",
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
					<img src={lesionPierna} alt="Person" class="card__image_lesion_update_create"></img>

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



<FormControl sx={{ minWidth: 100.50 }}>
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
          value={lesionType}
          label="Type"
          onChange={handleChange}
		  sx={{
			color: "white",
			background: "linear-gradient(-45deg, #00a6ff 0%, #062C76 50% )",
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
              <MenuItem value={muscle}><FormattedMessage id="project.lesion.fields.muscle" /></MenuItem>
              <MenuItem value={tendon}><FormattedMessage id="project.lesion.fields.tendon" /></MenuItem>
              <MenuItem value={joint}><FormattedMessage id="project.lesion.fields.joint" /></MenuItem>
              <MenuItem value={spine}><FormattedMessage id="project.lesion.fields.spine" /></MenuItem>
              <MenuItem value={psychological}><FormattedMessage id="project.lesion.fields.psychological" /></MenuItem>

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
										margin: '33.5px', // Centra el formulario en la pantalla
                    marginBottom:"10px"
									}}
									noValidate
									autoComplete="off"
								>

<TextField
							id="outlined-multiline-static-1"
              label={<FormattedMessage id="project.lesion.fields.lesionName" />}
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
              value={lesionName}
              onChange={(e) => setLesionName(e.target.value)}
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
              label={<FormattedMessage id="project.lesion.fields.medication" />}
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
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          
          


          </Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
			</Grid>

			<button className="post_lesion" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

          </Box>

  );
}

export default AddLesion;