import React, { useEffect, useState, createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import * as actionsTeams from '../../teams/actions';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const UpdatePlay = () => {

    const play = useSelector(selectors.getPlay);
    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();

    const [title, setTitle] = useState(null);
    const [playType, setPlayType] = useState(null);
    const [gesture, setGesture] = useState(null);
    const [pointGuardText, setPointGuardText] = useState(null);
    const [shootingGuardText, setShootingGuardText] = useState(null);
    const [smallForwardText, setSmallForwardText] = useState(null);
    const [powerForwardText, setPowerForwardText] = useState(null);
    const [centerText, setCenterText] = useState(null);
    const [description, setDescription] = useState(null);
    const [value, setValue] = useState(0);

    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleChange = (event) => {
        setPlayType(event.target.value);
      };

    const attack = "Ataque";
    const defense = "Defensa";

    useEffect(() => {
        if (!play) {
            dispatch(actions.findPlayById(id, () => history(`/plays/update/${id}`)));
        } else {
            setTitle(play.title);
            setPlayType(play.playType);
            setGesture(play.gesture);

            setPointGuardText(play.pointGuardText);
            setShootingGuardText(play.shootingGuardText);
            setSmallForwardText(play.smallForwardText);
            setPowerForwardText(play.powerForwardText);
            setCenterText(play.centerText);

            setDescription(play.description);
        }
    }, [dispatch, play, history, id]);





    const handleSubmit = event => {

        event.preventDefault();
            dispatch(actions.updatePlay(play.id, title.trim(), playType,
            gesture.trim(), pointGuardText.trim(), shootingGuardText.trim(), smallForwardText.trim(), powerForwardText.trim(), centerText.trim(), description.trim(),
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        }

        const reloadWindow = () =>{
            history(`/plays/home`);
            window.location.reload('true');
        }

        return(
<Box
			my={4}
			display="flex"
			alignItems="center"
			p={3.35}
			gap={1}
			m={6.7}
			mb={0}
			sx={{
                maxWidth: { sm: 1095 },
				border: '1.34px solid grey',
                background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
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
				<Grid item md={12}>
                <img src={notaLapiz} alt="Person" class="card__image_play_update_create"></img>

                </Grid>


				<Grid item md={12} >

					<Box
						component="form"
						sx={{
							borderRadius: "13.4px",
							borderColor:"black",
                            boxShadow:"0 6.7px 33.5px rgb(0, 0, 0)",
							marginBottom:"0px",
							marginTop:"-21px"
						}}
						autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
						noValidate
						autoComplete="off"
					>
						<Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Box
                                
                                component="form"
                                sx={{
									'& .MuiTextField-root': { mb: 1.34, width: '100%' },
									margin: '33.5px', // Centra el formulario en la pantalla
                                    mb:"-70px",
                                    mt:"-3px"
                                }}
                                noValidate
                                autoComplete="off"
                            >
    <div>
	  <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
				fontSize:"13.40px",
				
              }}

            ><FormattedMessage id="project.lesion.fields.lesionType" /></InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={playType}
          label="Type"
          onChange={(e) => setPlayType(e.target.value)}
		  sx={{
			color: "white",
			border: '1.34px solid grey',
			background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
			borderRadius: "13.4px",
			borderColor:"black",
			boxShadow:"0 10px 10px rgb(0, 0, 0)",
			height:"40px",
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
		<MenuItem value={attack}><FormattedMessage id="project.plays.fields.attack" /></MenuItem>
        <MenuItem value={defense}><FormattedMessage id="project.plays.fields.defense" /></MenuItem>
        </Select>
    </div>
            </Box>
          </Grid>
                        <Grid item xs={12} md={6}>

								{/* <div className='form_add_training_general'> */}
								<Box
                                
									component="form"
									sx={{
										'& .MuiTextField-root': { mb: 1.34, width: '100%' },
										margin: '33.5px', // Centra el formulario en la pantalla
										marginTop:"50px",
										marginBottom:"10px"
									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.pointGuardText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={pointGuardText}
										onChange={(e) => setPointGuardText(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.shootingGuardText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={shootingGuardText}
										onChange={(e) => setShootingGuardText(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.smallForwardText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={smallForwardText}
										onChange={(e) => setSmallForwardText(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.powerForwardText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={powerForwardText}
										onChange={(e) => setPowerForwardText(e.target.value)}
									/>
								</Box>
							</Grid>
                        <Grid item xs={12} md={6}>

								{/* <div className='form_add_training_general'> */}
								<Box
                                
									component="form"
									sx={{
										'& .MuiTextField-root': { mb: 1.34, width: '100%' },
										margin: '33.5px', // Centra el formulario en la pantalla
										marginTop:"50px",
										marginBottom:"10px"

									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.centerText" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={centerText}
										onChange={(e) => setCenterText(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.notes.fields.title" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
                                    									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.gesture" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={gesture}
										onChange={(e) => setGesture(e.target.value)}
									/>
                                    									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 13.40, fontWeight: 'regular', width: '100%', top:-5 } }}
										InputProps={{ style: { color: 'white', padding: '6.7px', fontSize: 12, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '1.34px solid grey',
											borderRadius: "13.4px",
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderColor:"black",
											boxShadow:"0 6.7px 6.7px rgb(0, 0, 0)"
										}}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>

								</Box>
							</Grid>






						</Grid>
					</Box>  </Grid>
			</Grid>
			<button className="post_play" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>








        );
}

export default UpdatePlay;