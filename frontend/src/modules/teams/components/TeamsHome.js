import React, { useEffect, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';

import * as selectors from '../selectors';
import { Errors } from '../../common';
import { FormattedMessage } from 'react-intl';

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { format } from 'date-fns'; // Importa la función format de date-fns
import { IconButton, Pagination, Paper, Stack, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Teams from './Teams';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';

const TeamsHome = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const teams = useSelector(selectors.getAllTeams);
    const [teamName, setTeamName] = useState(null);
    const [arenaName, setArenaName] = useState(null);
    const [ownerName, setOwnerName] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [originalTeams, setOriginalTeams] = useState(null);

    const [backendErrors, setBackendErrors] = useState(null);
    let form;



    useEffect(() => {
        if (!teams) {
            dispatch(actions.findAllTeams( () => history(`/teams/home`)));
            setOriginalTeams(null);
        } else {
                if (!originalTeams) {
                    setOriginalTeams(teams.teams);
                }
        }
    }, [dispatch, originalTeams, teams, history]);

    const handleSubmit = event => {


        console.log("holaa1 11111: ", selectedOption)
        console.log("holaa1 22222: ", teamName)

        event.preventDefault();
        if(selectedOption && selectedOption.label === 'Nombre') {
            dispatch(actions.findTeamsByName(
                teamName.trim(),
                errors => setBackendErrors(errors),
            ));


        }
        if(selectedOption && selectedOption.label === 'Estadio') {
            dispatch(actions.findTeamsByArena(arenaName.trim()));
        }
        if(selectedOption && selectedOption.label === 'Propietario') {
            dispatch(actions.findTeamsByOwner(ownerName.trim()));

        }
    }

    const handleSetAllTeams = (dispatch) => {
        dispatch(actions.findAllTeams(() => history('/teams/home')));
    }

    const CustomPaperComponentOption = (props) => (
        <Paper {...props} sx={{
            background: 'linear-gradient(-45deg, black 0%, #ff4800 60% )', color: "white",
            ".MuiOutlinedInput-root": {
                "&:hover": {
                    background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",

                }
            },
            [`& .${autocompleteClasses.listbox}`]: {
                [`& .${autocompleteClasses.option}`]: {
                    '&[aria-selected="true"]': {
                        backgroundColor: "#00bfff",

                    },
                    [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
                    {
                        backgroundColor: "#00bfff",
                    },
                },
            },
        }} />
    );


    const CustomPaperComponent = (props) => (
        <Paper {...props} sx={{
            background: 'linear-gradient(-45deg, #ff4800 0%, #000000 60% )', color: "white",
            ".MuiOutlinedInput-root": {
                "&:hover": {
                    background: "linear-gradient(-45deg, #711ce0 0%, #000046 60% )",

                }
            },
            [`& .${autocompleteClasses.listbox}`]: {
                [`& .${autocompleteClasses.option}`]: {
                    '&[aria-selected="true"]': {
                        backgroundColor: "#00bfff",

                    },
                    [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
                    {
                        backgroundColor: "#00bfff",
                    },
                },
            },
        }} />
    );

    const options = [
        { label: 'Nombre' },
        { label: 'Estadio' },
        { label: 'Propietario' }]

    const handleTeamName = (event, value) => {
        if (value) {
            setTeamName(value.teamName);
        }
    };

    const handleTeamArena = (event, value) => {
        if (value) {
        setArenaName(value.arenaName);
        }
    };

    const handleTeamOwner = (event, value) => {
        if (value) {
        setOwnerName(value.ownerName);
        }
    };

    const handleOptionSelect = (event, value) => {
        setSelectedOption(value);
    };
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
                    display: "flex",
                    borderRadius: 4,
                    margin: 'auto',  // Centra horizontalmente
                    marginTop: '33.5px', // Ajusta la distancia desde la parte superior según sea necesario
                    textAlign: 'center', // Centra el contenido dentro del Box
                    marginBottom: "13.4px",
                }}>

                <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Box
                        sx={{
                            display: 'flex', // Mostrar los Autocompletados en fila
                            mr: "6.7px"
                        }}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            sx={{ width: 200}}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params}
                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                label={
                                    <FormattedMessage id="project.global.buttons.filter" />
                                }
                                sx={{
                                    boxShadow: 1,
                                    border: '2px solid grey',
                                    borderRadius: "20px",
                                    '& label': { color: 'white' },
                                    '& input': { color: 'white' },
                                    borderColor: "black",
                                    boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)"
                                }}
                            />}
                            PaperComponent={CustomPaperComponentOption} // Usar el componente personalizado para las opciones
                            onChange={handleOptionSelect}
                        />
                    </Box>

                    {selectedOption && (
                        <div>
                            {selectedOption.label === 'Nombre' && (
                                <Box
                                    sx={{
                                        display: 'flex', // Mostrar los Autocompletados en fila
                                    }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={originalTeams}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(team) => team.teamName}
                                        renderInput={(params) => <TextField {...params}
                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                            label={
                                                <FormattedMessage id="project.teams.fields.name" />
                                            }
                                            sx={{
                                                background: 'linear-gradient(-45deg, #ff4800 0%, #000000 60% )',
                                                boxShadow: 1,
                                                border: '2px solid grey',
                                                borderRadius: "20px",
                                                '& label': { color: 'white' },
                                                '& input': { color: 'white' },
                                                borderColor: "black",
                                                boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)"
                                            }}
                                        />}
                                        PaperComponent={CustomPaperComponent} // Usar el componente personalizado para las opciones
                                        onChange={handleTeamName}

                                    />
                                    <button type="button" className="button_all_buscar2" onClick={handleSubmit}>
                                        <FormattedMessage id="project.global.buttons.find" />
                                    </button>
                                </Box>
                            )}
                            {selectedOption.label === 'Estadio' && (
                                <Box
                                    sx={{
                                        display: 'flex', // Mostrar los Autocompletados en fila
                                    }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={originalTeams}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(team) => team.arenaName}
                                        renderInput={(params) => <TextField {...params}
                                        InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                        label={
                                                <FormattedMessage id="project.teams.fields.arena" />
                                            }                                            sx={{
                                                background: 'linear-gradient(-45deg, #ff4800 0%, #000000 60% )',
                                                boxShadow: 1,
                                                border: '2px solid grey',
                                                borderRadius: "20px",
                                                '& label': { color: 'white' },
                                                '& input': { color: 'white' },
                                                borderColor: "black",
                                                boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)"
                                            }}
                                        />}
                                        PaperComponent={CustomPaperComponent} // Usar el componente personalizado para las opciones
                                        onChange={handleTeamArena}

                                    />
                                    <button type="button" className="button_all_buscar2" onClick={handleSubmit}>
                                        <FormattedMessage id="project.global.buttons.find" />
                                    </button>
                                </Box>
                            )}
                            {selectedOption.label === 'Propietario' && (
                                <Box
                                    sx={{
                                        display: 'flex', // Mostrar los Autocompletados en fila
                                    }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={originalTeams}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(team) => team.ownerName}
                                        renderInput={(params) => <TextField {...params}
                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                            label={
                                                <FormattedMessage id="project.teams.fields.owner" />
                                            }                                                         sx={{
                                                background: 'linear-gradient(-45deg, #ff4800 0%, #000000 60% )',
                                                boxShadow: 1,
                                                border: '2px solid grey',
                                                borderRadius: "20px",
                                                '& label': { color: 'white' },
                                                '& input': { color: 'white' },
                                                borderColor: "black",
                                                boxShadow: "0 6.7px 6.7px rgb(0, 0, 0)"
                                            }}
                                        />}
                                        PaperComponent={CustomPaperComponent} // Usar el componente personalizado para las opciones
                                        onChange={handleTeamOwner}

                                    />
                                    <button type="button" className="button_all_buscar2" onClick={handleSubmit}>
                                        <FormattedMessage id="project.global.buttons.find" />
                                    </button>
                                </Box>
                            )}
                        </div>
                    )}
                </Grid>
            </Box>
            <Box>
                <button type="button" className="button_all" style={{marginTop:"-1px", paddingBottom:"3px"}}  onClick={() => handleSetAllTeams(dispatch)}>
                    All
                </button>
            </Box>
            <Box>
                <IconButton >
                    <AddCircleOutlineIcon sx={{
                        margin: 'auto',  // Centra horizontalmente
                        textAlign: 'center', // Centra el contenido dentro del Box
                        fontSize: "46.9px",
                        color: "white",
                        marginTop:"0px"
                    }}
                        onClick={() => history(`/teams/addTeam`)}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
            </Box>
            <Teams teams={teams.teams} />
        </Box>

    );

}

export default TeamsHome;