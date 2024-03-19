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

const UpdateLesion = () => {

  const lesion = useSelector(selectors.getOneLesion);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [lesionName, setLesionName] = useState(null);
  const [description, setDescription] = useState(null);
  const [medication, setMedication] = useState(null);
  const [lesionType, setLesionType] = useState(null);
  const [backendErrors, setBackendErrors] = useState(null);
  let form;

  useEffect(() => {
    if (!lesion) {
        dispatch(actions.findLesionById(id, () => history(`/lesion/update/${id}`)));
    } else {
      setLesionName(lesion.lesionName);
      setDescription(lesion.description);
      setMedication(lesion.medication);
      setLesionType(lesion.lesionType);

    }
}, [dispatch, lesion, history, id]);

  const handleSubmit = event => {

    event.preventDefault();


    dispatch(actions.updateLesion(lesion.id, lesionName.trim(),
      description.trim(), medication.trim(), lesionType,
      () => reloadWindow(),
      errors => setBackendErrors(errors),
    ));
    setBackendErrors(null);
  }

  const reloadWindow = () => {
    history(`/lesion/home`);
    window.location.reload('true');
  }

  const handleChange = (event) => {
    setLesionType(event.target.value);
  };

  const muscle = "Muscular";
  const tendon = "Tendinosa";
  const joint = "Articular";
  const spine = "ColumnaVertebral";
  const psychological = "Psicologica";
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
				bgcolor: "#001449",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
        boxShadow:"0 15px 65px rgba(0, 0, 0, 0.5)"
			}}
		>
    <div className='login-box ' >
      <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
      <img src={lesionPierna} alt="Person" class="card__image_lesion_update_create"></img>

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
          <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
                fontSize:"18px",
                ml: "5px"
              }}

            ><FormattedMessage id="project.lesion.fields.lesionName" /></InputLabel>
            <TextField
              InputLabelProps={{ sx: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
              InputProps={{ sx: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular' } }}
              value={lesionName}
              onChange={(e) => setLesionName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
                fontSize:"18px",
                ml: "5px"
              }}

            ><FormattedMessage id="project.lesion.fields.lesionType" /></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lesionType}
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
              <MenuItem value={muscle}><FormattedMessage id="project.lesion.fields.muscle" /></MenuItem>
              <MenuItem value={tendon}><FormattedMessage id="project.lesion.fields.tendon" /></MenuItem>
              <MenuItem value={joint}><FormattedMessage id="project.lesion.fields.joint" /></MenuItem>
              <MenuItem value={spine}><FormattedMessage id="project.lesion.fields.spine" /></MenuItem>
              <MenuItem value={psychological}><FormattedMessage id="project.lesion.fields.psychological" /></MenuItem>

            </Select>
          </Grid>
          <Grid item xs={12}>
          <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
                fontSize:"18px",
                margin: "5px"
              }}

            ><FormattedMessage id="project.exercises.fields.description" /></InputLabel>
            <TextField
              id="outlined-multiline-static"
              InputLabelProps={{ sx: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
              InputProps={{ sx: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular' } }}
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
                fontSize:"18px",
                ml: "5px"
              }}

            ><FormattedMessage id="project.lesion.fields.medication" /></InputLabel>
            <TextField
              id="outlined-multiline-static"
              InputLabelProps={{ sx: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
              InputProps={{ sx: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular' } }}
              multiline
              rows={4}
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
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

export default UpdateLesion;