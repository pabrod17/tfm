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


const UsersByCoachHome = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
	const [rowSelectionModelUser, setRowSelectionModelUser] = React.useState([]);
    const [userId , setUserId ] = useState(null);
	const [showTable, setShowTable] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail]  = useState("");
    const [userName, setUserName] = useState("");

    const [backendErrors, setBackendErrors] = useState("");
    const [emailError, setEmailError] = useState("");

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const users = useSelector(selectors.getAllUser);

    if(!users) {
        dispatch(actions.findUsersByCoachId( () => history(`/users/coach`)));
        return "Loading...";
    }


	const columnsUsers = [
		{ field: 'id', headerName: 'ID', width: 70, headerClassName: 'firstname-header' },
		{ field: 'firstName', headerName: <FormattedMessage id="project.global.fields.firstName"/>, width: 400, headerClassName: 'firstname-header'},
		{ field: 'lastName', headerName: <FormattedMessage id="project.global.fields.lastName"/>, width: 400, headerClassName: 'firstname-header' },
		{ field: 'userName', headerName: <FormattedMessage id="project.global.fields.userName1"/>, width: 400 , headerClassName: 'firstname-header'},
        { field: 'email', headerName: <FormattedMessage id="project.players.fields.email"/>, width: 400, headerClassName: 'firstname-header' }
	];

	const rowsUsers = [
	];

    if (users) {
		users.map(user => {
			rowsUsers.push({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
                email: user.email,
                userName: user.userName,
			});
		})
	}

    const handleSubmit = event => {

        event.preventDefault();
        dispatch(actions.signUpByCoach(
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

    
    return (

        <Box
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            width={"80vw"} // El ancho inicial es del 80% del ancho de la ventana
            height={"80vh"} // El alto inicial es del 80% del alto de la ventana
            p={5}
            m={9}
            ml={0}
            sx={{
                border: '2px solid grey',
                background: "linear-gradient(180deg,#df252c,#0c1345 10%,#0c1345 80%,#0c1345 ,#df252c)",
                borderRadius: "20px",
                flexWrap: 'wrap',
                flexDirection: 'column',
                borderColor: "black",
                boxShadow: "0 10px 50px rgb(0, 0, 0)"
            }}
        >
            <Grid container columns={{ xs: 12, sm: 12, md: 12 }} style={{ height: '100%' }}>
            <Grid item md={12} xs={12} style={{ height: '100%' }}>
            <Box
				sx={{
                    marginTop:"-30px",
					textAlign: 'center', // Centra el contenido dentro del Box
				}}>
            <input type="checkbox" class="theme-checkbox" onClick={() => setShowTable(!showTable)} />
            </Box>
            {showTable ? (

							<DataGrid
								sx={{
                                    background: "linear-gradient(180deg,#df252c,#0c1345 10%,#0c1345 80%,#0c1345 ,#df252c)",
									boxShadow: 12,
                                    color:"white",
                                    borderColor:"black",
                                    boxShadow:"0 10px 50px rgb(0, 0, 0)",
                                    fontSize:"30px",
                                    borderRadius: "20px",
								}}
								rows={rowsUsers}
								columns={columnsUsers}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
								pageSizeOptions={[5, 10]}
								checkboxSelection
								rowSelectionModel={rowSelectionModelUser}
								onRowSelectionModelChange={(newRowSelectionModelTeam) => {
									if (newRowSelectionModelTeam.length <= 1) {
										setRowSelectionModelUser(newRowSelectionModelTeam);
										console.log(" 111111: ", newRowSelectionModelTeam)
										setUserId((prevTeamId) => {
											console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelTeam);
											return newRowSelectionModelTeam;
										});
									} else {
										setRowSelectionModelUser(newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1]);
										console.log(" 22222: ", newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1])
										setUserId((prevTeamId) => {
											console.log(" seasonnnn SEGIMDPOPPPPP: ", newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1]);
											return newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1];
										});
									}

								}}
							/>




                            ) : (
                                <Box
                                display="flex"
                                alignItems="center"
                                p={1}
                                sx={{
                                    flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                                }}
                            >
                    
                    <Box
                                my={4}
                                display="flex"
                                alignItems="center"
                                gap={4}
                                p={5}
                                mt={7}
                                sx={{
                                    maxWidth: { sm: 1635 },
                                    border: '2px solid grey',
                                    background: "linear-gradient(180deg, #08043b 0%,#2f00ff)",
                                    background: "linear-gradient(180deg,#df252c,#0c1345 10%,#0c1345 80%,#0c1345 ,#df252c)",
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
                                    <Grid item md={12}>
                                    <img src={perfil2} alt="Person" class="card__image_player_update_create"></img>
                    
                                    </Grid>
                                    <Grid item md={12} >
                    
                                        <Box
                                            component="form"
                                            sx={{
                                                borderRadius: "20px",
                                                borderColor:"black",
                                                boxShadow:"0 10px 50px rgb(0, 0, 0)"
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
                                                            margin: '50px', // Centra el formulario en la pantalla
                    
                                                        }}
                                                        noValidate
                                                        autoComplete="off"
                                                    >
                    
                                                        <TextField
                                                            id="outlined-multiline-static-1"
                                                            label={<FormattedMessage id="project.players.fields.playerName" />}
                                                            InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                                                            InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
                                                            multiline
                                                            rows={4}
                                                            sx={{
                                                                border: '2px solid grey',
                                                                borderRadius: "20px",
                                                                borderColor:"black",
                                                                boxShadow:"0 10px 10px rgb(0, 0, 0)"
                                                            }}
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                        />
                                                        <TextField
                                                            id="outlined-multiline-static-1"
                                                            label={<FormattedMessage id="project.players.fields.primaryLastName" />}
                                                            InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                                                            InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
                                                            multiline
                                                            rows={4}
                                                            sx={{
                                                                border: '2px solid grey',
                                                                borderRadius: "20px",
                                                                borderColor:"black",
                                                                boxShadow:"0 10px 10px rgb(0, 0, 0)"
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
                    
                                                        }}
                                                        noValidate
                                                        autoComplete="off"
                                                    >
                                                        <TextField
                                                            id="outlined-multiline-static-1"
                                                            label={<FormattedMessage id="project.players.fields.email" />}
                                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                                                            InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
                                                            multiline
                                                            rows={2}
                                                            sx={{
                                                                border: '2px solid grey',
                                                                borderRadius: "20px",
                                                                borderColor:"black",
                                                                boxShadow:"0 10px 10px rgb(0, 0, 0)"
                                                            }}
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                            error={emailError} // Activa el estado de error en TextField
                                                            helperText={emailError ? "Email no válido" : ""} // Muestra un mensaje de ayuda si hay un error
                                                        />
                                                        <TextField
                                                            id="outlined-multiline-static-1"
                                                            label={<FormattedMessage id="project.global.fields.userName1" />}
                                                            InputLabelProps={{ style: { color: '#00ff22', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
                                                            InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
                                                            multiline
                                                            rows={2}
                                                            sx={{
                                                                border: '2px solid grey',
                                                                borderRadius: "20px",
                                                                borderColor:"black",
                                                                boxShadow:"0 10px 10px rgb(0, 0, 0)"
                                                            }}
                                                            value={userName}
                                                            onChange={(e) => setUserName(e.target.value)}
                                                          />
									<TextField
                                        id="outlined-password-input"
										label={<FormattedMessage id="project.global.fields.newPassword" />}
                                        type="password"
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										rows={4}
                                        ty
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)",
                                            marginTop:"20px"
										}}
                                        type="password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
									<TextField
                                        id="outlined-password-input"
										label={<FormattedMessage id="project.global.fields.confirmPassword" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
                                        type={"password"}
										rows={4}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
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
                    </Box>
                                )}

                </Grid>
                
            </Grid>
        </Box>
    );

}

export default UsersByCoachHome;