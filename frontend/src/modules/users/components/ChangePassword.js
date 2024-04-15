import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import perfil2 from './perfil1.jpeg'; //1920x1200
import { Alert, Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';

const ChangePassword = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);


    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    const [currentPasswordOk, setCurrentPasswordOk] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    let form;
    let confirmNewPasswordInput;

    const handleSubmit = event => {

        event.preventDefault();

        // if (form.checkValidity() && checkConfirmNewPassword()) 
            
            dispatch(actions.changePassword(user.id, oldPassword, newPassword,
                () => history('/'),
                errors => setBackendErrors(errors)));
        // } else {

        //     setBackendErrors(null);
        //     form.classList.add('was-validated');
            
        // }

    }

    const checkConfirmNewPassword = (
    ) => {

        if (newPassword !== confirmNewPassword) {

            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const handleConfirmNewPasswordChange = event => {

        confirmNewPasswordInput.setCustomValidity('');
        setConfirmNewPassword(event.target.value);
        setPasswordsDoNotMatch(false);

    }

    const handleConfirmPassword = (e) => {
        const { value } = e.target;
        setConfirmNewPassword(value);
        setPasswordError(newPassword !== value);
    };


    return (
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
			p={5}
			m={10}
			sx={{
                maxWidth: { sm: 1635 },
				border: '2px solid grey',
                background: "linear-gradient(180deg, #08043b 0%,#2f00ff)",
                background: "radial-gradient(circle, #2f00ff -10%, #08043b 110%)",
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

                        <Grid item xs={12} md={12}>

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
                                        id="outlined-password-input"
										label={<FormattedMessage id="project.global.fields.currentPassword" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										rows={4}
										sx={{
											border: '2px solid grey',
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
                                        type="password"
										value={oldPassword}
										onChange={(e) => {
                                            setOldPassword(e.target.value);
                                        }
                                            
                                            
                                            
                                            }
									/>
                                <div className="invalid-feedback">
                                    {!currentPasswordOk ?
                                        <FormattedMessage id='project.global.validator.passwordsDoNotMatch'/> :
                                        <FormattedMessage id='project.global.validator.required'/>}
                                    
                                </div>
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
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
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
                              <Button
                className="post_user"
                onClick={(e) => handleSubmit(e)}
                disabled={passwordError} // Deshabilitar el botón si hay un error de contraseña
                sx={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '20px',
                    fontSize: '22px',
                    color: '#fff',
                    background: 'linear-gradient(180deg, rgb(47, 0, 255) 0%, #08043b 70%)',
                    boxShadow: '0 15px 65px rgba(0, 0, 0, 0.5)',
                    transition: '0.3s ease-out',
                    marginRight: '50px',
                    textTransform: 'none', // Anular la transformación del texto a mayúsculas
                    fontFamily:"Arial"
                }}
            >
                <FormattedMessage id="project.global.buttons.save" />
            </Button>
		</Box>
</Box>

    );

}

export default ChangePassword;
