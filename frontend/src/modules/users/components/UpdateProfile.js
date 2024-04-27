import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import { useNavigate } from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import perfil from '../../players/components/perfil2.jpeg'; //1920x1200
import perfil2 from './perfil1.jpeg'; //1920x1200

const UpdateProfile = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const history = useNavigate();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const [email, setEmail]  = useState(user.email);
    const [userName, setUserName] = useState(user.userName);

    const [backendErrors, setBackendErrors] = useState(null);
    const [emailError, setEmailError] = useState(false);

    let form;

    const handleSubmit = event => {

        event.preventDefault();
            dispatch(actions.updateProfile(
                {id: user.id,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim()},
                () => window.location.reload('true'),
                errors => setBackendErrors(errors)));
    }

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
            display="flex"
            alignItems="center"
			p={3}
            sx={{
                flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
            }}
        >

<Box
			my={4}
			display="flex"
			alignItems="center"
			gap={1}
			p={3.35}
			m={6.7}
			sx={{
                maxWidth: { sm: 870 },
				border: '1.34px solid grey',
                background: "linear-gradient(180deg, #08043b 0%,#2f00ff)",
                background: "radial-gradient(circle, #2f00ff -10%, #08043b 110%)",
				borderRadius: "13.4px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
				borderColor:"black",
				boxShadow: "0 6.7px 33.5px rgb(0, 0, 0)",
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
										margin: '33.5px', // Centra el formulario en la pantalla
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
										InputLabelProps={{ style: { color: '#00ff22', fontSize: 13.40, fontWeight: 'regular', width: '100%' } }}
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
								</Box>
							</Grid>
						</Grid>
					</Box>  </Grid>
			</Grid>
			<button className="post_user" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
</Box>
    );

}

export default UpdateProfile;