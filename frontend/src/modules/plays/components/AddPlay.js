import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

import {Errors} from '../../common';
import * as actions from '../actions';
import {useParams} from 'react-router-dom';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import * as selectorsTeams from '../../teams/selectors';
import * as actionsTeams from '../../teams/actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const AddPlay = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [title, setTitle] = useState("");
    const [playType, setPlayType] = useState("");
    const [gesture, setGesture] = useState("");
    const [pointGuardText, setPointGuardText] = useState("");
    const [shootingGuardText, setShootingGuardText] = useState("");
    const [smallForwardText, setSmallForwardText] = useState("");
    const [powerForwardText, setPowerForwardText] = useState("");
    const [centerText, setCenterText] = useState("");
    const [description, setDescription] = useState("");
    const [rowSelectionModelTeam, setRowSelectionModelTeam] = React.useState([]);
    const [teamId, setTeamId] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

	const teams = useSelector(selectorsTeams.getAllTeams);
	const teamsList = teams.teams;


    if (!teamsList) {
		dispatch(actionsTeams.findAllTeams());
		return "Loading...";
	}

	const columnsTeams = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'name', headerName: <FormattedMessage id="project.teams.fields.name"/>, width: 160 },
		{ field: 'arena', headerName: <FormattedMessage id="project.teams.fields.arena"/>, width: 160 },
		{ field: 'owner', headerName: <FormattedMessage id="project.teams.fields.owner"/>, width: 160 }
	];

	const rowsTeams = [
	];

	if (teamsList) {
		teamsList.map(team => {
			rowsTeams.push({
				id: team.id,
				name: team.teamName,
				arena: team.arenaName,
				owner: team.ownerName
			});
		})
	}

    const handleChange = (event) => {
        setPlayType(event.target.value);
      };


      const attack = "Ataque";
      const defense = "Defensa";
    
    const handleSubmit = event => {

        event.preventDefault();
    
            
            dispatch(actions.addPlay(teamId, title.trim(), playType,
            gesture.trim(), pointGuardText.trim(), shootingGuardText.trim(), smallForwardText.trim(), powerForwardText.trim(), centerText.trim(), description.trim(),
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        }

        const reloadWindow = () =>{
            history(`/plays/addPlay`);
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
                maxWidth: { sm: 1635 },
				border: '2px solid grey',
                background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
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
                <img src={notaLapiz} alt="Person" class="card__image_play_update_create"></img>

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
                        <Grid item xs={12}>
                        <Box
                                
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { mb: 2, width: '100%' },
                                    margin: '50px', // Centra el formulario en la pantalla
                                    mb:"-50px",
                                    mt:"-3px"
                                }}
                                noValidate
                                autoComplete="off"
                            >
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
	  <InputLabel id="demo-simple-select-label"
              sx={{
                color: "#00bfff",
				fontSize:"20px"
              }}

            ><FormattedMessage id="project.lesion.fields.lesionType" /></InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={playType}
          label="Type"
          onChange={handleChange}
		  sx={{
			color: "white",
			border: '2px solid grey',
			background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
			borderRadius: "20px",
			borderColor:"black",
			boxShadow:"0 10px 10px rgb(0, 0, 0)"

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
      </FormControl>
    </div>
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
										label={<FormattedMessage id="project.plays.fields.pointGuardText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={pointGuardText}
										onChange={(e) => setPointGuardText(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.shootingGuardText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={shootingGuardText}
										onChange={(e) => setShootingGuardText(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.smallForwardText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={smallForwardText}
										onChange={(e) => setSmallForwardText(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.powerForwardText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
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
										'& .MuiTextField-root': { mb: 2, width: '100%' },
										margin: '50px', // Centra el formulario en la pantalla

									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.centerText" />}
										InputLabelProps={{ style: { color: '#E8FF00', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={centerText}
										onChange={(e) => setCenterText(e.target.value)}
									/>
									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.notes.fields.title" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
                                    									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.plays.fields.gesture" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
											borderRadius: "20px",
											borderColor:"black",
											boxShadow:"0 10px 10px rgb(0, 0, 0)"
										}}
										value={gesture}
										onChange={(e) => setGesture(e.target.value)}
									/>
                                    									<TextField
										id="outlined-multiline-static-1"
										label={<FormattedMessage id="project.exercises.fields.description" />}
										InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular', width: '100%' } }}
										InputProps={{ style: { color: 'white', padding: '10px', fontSize: 15, fontWeight: 'regular', width: '100%' } }}
										multiline
										rows={4}
										sx={{
											border: '2px solid grey',
											background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
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






				<Grid container spacing={2}>
							<Grid item xs={12} md={12}>
                            <Box
								>
						<Typography
							sx={{ 
                                flex: '1 1 100%', mt: 3.5, color: "#00bfff", m:2 }}
							variant="h6"
							id="tableTitle"
							component="div"
						>
							Team Selection
						</Typography>
						<div style={{ height: 400, width: '100%', }}>
							<DataGrid
								sx={{
									background: "linear-gradient(-45deg, #41AF24 0%, #062C76 50% )",
									borderRadius: "20px",
									m:2,
									borderColor:"black",
									boxShadow:"0 10px 50px rgb(0, 0, 0)",
                                    color:"white"
								}}
								rows={rowsTeams}
								columns={columnsTeams}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
								pageSizeOptions={[5, 10]}
								checkboxSelection
								rowSelectionModel={rowSelectionModelTeam}
								onRowSelectionModelChange={(newRowSelectionModelTeam) => {
									if (newRowSelectionModelTeam.length <= 1) {
										setRowSelectionModelTeam(newRowSelectionModelTeam);
										console.log(" 111111: ", newRowSelectionModelTeam)
										setTeamId((prevTeamId) => {
											console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelTeam);
											return newRowSelectionModelTeam;
										});
									} else {
										setRowSelectionModelTeam(newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1]);
										console.log(" 22222: ", newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1])
										setTeamId((prevTeamId) => {
											console.log(" seasonnnn SEGIMDPOPPPPP: ", newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1]);
											return newRowSelectionModelTeam[newRowSelectionModelTeam.length - 1];
										});
									}

								}}
							/>
						</div>
                        </Box>

					</Grid>
				</Grid>

			</Grid>
			<button className="post_play" onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>
                  
		</Box>
        );






}

export default AddPlay;