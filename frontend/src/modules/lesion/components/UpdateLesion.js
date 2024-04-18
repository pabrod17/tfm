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
import users, { LoginNew, Login } from '../../users';

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

  const userLogged = useSelector(users.selectors.getUser);

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
        background: "linear-gradient(-180deg, #111010 0%, #dd4103 70%, #111010 )",
        background: "radial-gradient(circle, #0044ff -10%, transparent 120%)",
        borderRadius: "20px",
        flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
        flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
        borderColor: "black",
        boxShadow: "0 10px 50px rgb(0, 0, 0)"
      }}
    >
      <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
      <Grid container margin={5} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item md={12} >
          <img src={lesionPierna} alt="Person" class="card__image_lesion_update_create"></img>

          <Box
            component="form"
            sx={{
              borderRadius: "20px",
              borderColor: "black",
              boxShadow: "0 0px 50px rgb(0, 0, 0)"
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
                    mb: "-50px"
                  }}
                  noValidate
                  autoComplete="off"
                >

                    <InputLabel id="demo-simple-select-label"
                    sx={{
                      color: "#00bfff",
                      fontSize:"20px",
                      marginLeft:"10px"
                    }}

                    ><FormattedMessage id="project.lesion.fields.lesionType" /></InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={lesionType}
                      label="Type"
                      onChange={(e) => setLesionType(e.target.value)}
                      sx={{
                        color: "white",
                        border: '2px solid grey',
                        background: "linear-gradient(-45deg, #00a6ff 0%, #062C76 50% )",
                        borderRadius: "20px",
                        borderColor: "black",
                        boxShadow: "0 10px 10px rgb(0, 0, 0)"

                      }}
                      inputProps={{
                        readOnly: userLogged.role !== "ADMIN", 
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
                    label={<FormattedMessage id="project.lesion.fields.lesionName" />}
                    InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                    InputProps={{readOnly: userLogged.role !== "ADMIN",  style: { color: 'white', padding: '10px', fontSize: 30, fontWeight: 'regular', width: '100%' } }}
                    multiline
                    rows={2}
                    sx={{
                      border: '2px solid grey',
                      borderRadius: "20px",
                      borderColor: "black",
                      boxShadow: "0 10px 10px rgb(0, 0, 0)"
                    }}
                    value={lesionName}
                    onChange={(e) => setLesionName(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-static-1"
                    label={<FormattedMessage id="project.exercises.fields.description" />}
                    InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                    InputProps={{readOnly: userLogged.role !== "ADMIN",  style: { color: 'white', padding: '10px', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                    multiline
                    rows={4}
                    sx={{
                      border: '2px solid grey',
                      borderRadius: "20px",
                      borderColor: "black",
                      boxShadow: "0 10px 10px rgb(0, 0, 0)"
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-static-1"
                    label={<FormattedMessage id="project.lesion.fields.medication" />}
                    InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                    InputProps={{readOnly: userLogged.role !== "ADMIN",  style: { color: 'white', padding: '10px', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                    multiline
                    rows={4}
                    sx={{
                      border: '2px solid grey',
                      borderRadius: "20px",
                      borderColor: "black",
                      boxShadow: "0 10px 10px rgb(0, 0, 0)"
                    }}
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                  />




                </Box>
              </Grid>
            </Grid>
          </Box>  </Grid>
      </Grid>
      {(userLogged.role === "ADMIN") && (

      <button className="post_lesion" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
      )}
    </Box>

  );
}

export default UpdateLesion;