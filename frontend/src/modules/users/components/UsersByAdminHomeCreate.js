// MIT License

// Copyright (c) 2018 Martin Beierling

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, { useEffect, useRef, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as selectors from '../selectors';
import { useParams } from 'react-router-dom';
import { Errors } from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CanvasDraw from "react-canvas-draw";
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import perfil2 from './perfil1.jpeg'; //1920x1200


const UsersByAdminHomeCreate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
	const [rowSelectionModelUser, setRowSelectionModelUser] = React.useState([]);
    const [userId , setUserId ] = useState(null);
	const [showTable, setShowTable] = useState(true);
    const { exerciseType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail]  = useState("");
    const [userName, setUserName] = useState("");

    const [backendErrors, setBackendErrors] = useState("");
    const [emailError, setEmailError] = useState("");

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = event => {

        event.preventDefault();
        dispatch(actions.signUpByAdmin(
            {userName: userName.trim(),
            password: newPassword,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim()},
            () => errors => setBackendErrors(errors)
        ));
        window.location.reload('true')
    }



    const handleConfirmPassword = (e) => {
        const { value } = e.target;
        setConfirmNewPassword(value);
        setPasswordError(newPassword !== value);
    };



    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    
        // Expresión regular para validar el formato de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Verifica si el email cumple con el patrón
        setEmailError(!emailPattern.test(inputEmail));
      };

      const handleUsersByAdmin = (dispatch) => {
        dispatch(actions.findUsersByAdminId( () => history(`/users/admin`)));
    }
    const handleUsersByAdminCreate = (tabValue, dispatch) => {
        history(`/users/admin/${tabValue}`);
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
            }}
        >
<Box
    sx={{
        bgcolor: 'background.dark',
        boxShadow: 1,
        borderRadius: 2.68,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '53.6px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>

<Box sx={{boxShadow:"0 10px 50px rgb(0, 0, 0)" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(180deg,#0c1345,#91171b 30%,#91171b 30%,#91171b ,#0c1345)",
                            bgcolor:"red",
                            boxShadow: 4,
                            borderRadius: 2,
                            borderColor: "black",
							boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
                            '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                              },
                        }}
        >
          <Tab value={0} sx={{ color: '#f5af19', fontSize: "20.1px", padding:"13.4px"}} onClick={() => handleUsersByAdmin(dispatch)} label={<FormattedMessage id="project.global.list.users"/>}  />
          <Tab value={1} sx={{ color: '#f5af19', fontSize: "20.1px", padding:"13.4px" }} onClick={() => handleUsersByAdminCreate(1, dispatch)} label={<FormattedMessage id="project.global.create.users"/>}/>
        </Tabs>
      </Box>
</Box>















            <Grid container columns={{ xs: 12, sm: 12, md: 12 }} style={{ height: '100%' }}>
            <Grid item md={12} xs={12} style={{ height: '100%' }}>



                    
                    <Box
                                my={2.68}
                                display="flex"
                                alignItems="center"
                                gap={2}
                                p={3.35}
                                sx={{
                                    maxWidth: { sm: 971.45 },
                                    border: '1.34px solid grey',
                                    background: "linear-gradient(180deg, #08043b 0%,#2f00ff)",
                                    background: "linear-gradient(180deg,#0c1345,#91171b 10%,#91171b 80%,#91171b ,#0c1345)",
                                    borderRadius: "13.4px",
                                    flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
                                    flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                                    borderColor:"black",
                                    boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)"
                                    
                                }}
                            >
                                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
                                <Grid container margin={3.35} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
                                >
                                    <Grid item md={12}>
                                    <img src={perfil2} alt="Person" class="card__image_player_update_create"></img>
                    
                                    </Grid>
                                    <Grid item md={12} >
                    
                                        <Box
                                            component="form"
                                            sx={{
                                                borderRadius: "13.4px",
                                                borderColor:"black",
                                                boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)"
                                            }}
                                            autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <Grid container spacing={2}>
                    
                                            <Grid item xs={12} md={6}>
                    
                                                    {/* <div className='form_add_training_general'> */}
                                                    <Box
                                                    
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { mb: 2, width: '100%' },
                                                        margin: '33.5px', // Centra el formulario en la pantalla
                                                        mt:"30px"
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                    >
                    
                                                        <TextField
                                                            id="outlined-multiline-static-1"
                                                            label={<FormattedMessage id="project.players.fields.playerName" />}
                                                            InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
                                                            InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
                                                            multiline
                                                            rows={4}
                                                            sx={{
                                                                border: '1.34px solid grey',
                                                                borderRadius: "13.4px",
                                                                borderColor:"black",
                                                                boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
                                                            }}
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                        />
                                                        <TextField
                                                            id="outlined-multiline-static-1"
                                                            label={<FormattedMessage id="project.global.fields.lastName"/>}
                                                            InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
                                                            InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
                                                            multiline
                                                            rows={4}
                                                            sx={{
                                                                border: '1.34px solid grey',
                                                                borderRadius: "13.4px",
                                                                borderColor:"black",
                                                                boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
                                                            }}
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </Box>
                                                </Grid>
                                            <Grid item xs={12} md={6}>
                    
                                                    {/* <div className='form_add_training_general'> */}
                                                    <Box
                                                    
                                                        component="form"
                                                        sx={{
                                                            '& .MuiTextField-root': { mb: 2, width: '100%' },
                                                            margin: '50px', // Centra el formulario en la pantalla
                                                            mt:"30px",
                                                            mb:"30px"
                                                        }}
                                                        noValidate
                                                        autoComplete="off"
                                                    >
                                                        <TextField
                                                            id="outlined-multiline-static-1"
                                                            label={<FormattedMessage id="project.players.fields.email" />}
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
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                            error={emailError} // Activa el estado de error en TextField
                                                            helperText={emailError ? "Email no válido" : ""} // Muestra un mensaje de ayuda si hay un error
                                                        />
                                                        <TextField
                                                            id="outlined-multiline-static-1"
                                                            label={<FormattedMessage id="project.global.fields.userName1" />}
                                                            InputLabelProps={{ style: { color: '#00ff22', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
                                                            InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
                                                            multiline
                                                            rows={2}
                                                            sx={{
                                                                border: '1.34px solid grey',
                                                                borderRadius: "13.4px",
                                                                borderColor:"black",
                                                                boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
                                                            }}
                                                            value={userName}
                                                            onChange={(e) => setUserName(e.target.value)}
                                                          />
									<TextField
                                        id="outlined-password-input"
										label={<FormattedMessage id="project.global.fields.newPassword" />}
                                        type="password"
                                        InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
                                        InputProps={{ style: { color: 'white', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
                                        rows={4}
                                        ty
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)",
                                            marginTop:"20px"
										}}
                                        type="password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
									<TextField
                                        id="outlined-password-input"
										label={<FormattedMessage id="project.global.fields.confirmPassword" />}
                                        InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
                                        InputProps={{ style: { color: 'white', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
                                        type={"password"}
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={confirmNewPassword}
										onChange={handleConfirmPassword}
                                        type="password"
                                        error={passwordError} // Activa el estado de error en TextField
                                        helperText={passwordError ? "Passwords do not match" : ""} // Muestra un mensaje de ayuda si hay un error
									/>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>  </Grid>
                                </Grid>
                                <button className="post_user_coach" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                                      
                            </Box>



</Grid>



                               













            </Grid>
        </Box>

    );

}

export default UsersByAdminHomeCreate;