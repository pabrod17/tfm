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

const UpdateLesion = () => {

  const lesion = useSelector(selectors.getOneLesion);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [lesionName, setLesionName] = useState(lesion.lesionName);
  const [description, setDescription] = useState(lesion.description);
  const [medication, setMedication] = useState(lesion.medication);
  const [lesionType, setLesionType] = useState(lesion.lesionType);
  const [backendErrors, setBackendErrors] = useState(null);
  let form;

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
            <TextField
              label="Nombre"
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
                margin: "15px"
              }}

            >Type</InputLabel>
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
            <TextField
              id="outlined-multiline-static"
              label="Descripción"
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
              label="Medicación"
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
  );
}

export default UpdateLesion;