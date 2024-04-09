import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import logo22 from './logo3.jpeg';

const AddTeam = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [arenaName, setArenaName] = useState("");
    const [ownerName, setOwnerName] = useState("");
	const [description, setDescription] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
        event.preventDefault();

            dispatch(actions.addTeam(
                teamName.trim(), arenaName.trim(), ownerName.trim(), description.trim(),
             () => reloadWindow(),
                errors => setBackendErrors(errors),
            ));

    }

    const reloadWindow = () =>{
        history('/teams/home');
        window.location.reload('true');
    }

    return(
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
                background: "linear-gradient(180deg,#111010,#dd4103,#111010)",
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
					<img src={logo22} alt="Person" class="card__image_season_update_create"></img>

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
										margin: '50px', // Centra el formulario en la pantalla
                                        mb:"-70px"
									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.seasons.fields.name" />}
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
										value={teamName}
										onChange={(e) => setTeamName(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.teams.fields.arena" />}
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
										value={arenaName}
										onChange={(e) => setArenaName(e.target.value)}
									/>


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
										label={<FormattedMessage id="project.teams.fields.owner" />}
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
										value={ownerName}
										onChange={(e) => setOwnerName(e.target.value)}
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
			<button className="post_team" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
    );

}

export default AddTeam;