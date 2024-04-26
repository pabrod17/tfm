import React, { useEffect, useState, createContext } from 'react';
import {useSelector} from 'react-redux';
// import {useDispatch} from 'react-redux';
// import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import Players from './Players';
import * as actionsLesion from '../../lesion/actions';
import * as selectorsLesion from '../../lesion/selectors';
import {FormattedMessage} from 'react-intl';
import { IconButton, Pagination, Paper, Stack, Toolbar } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PlayersHome = () => {
    
    // const lesions = useSelector(selectorsLesion.getAllLesion);
    // const lesionList = lesions.lesions;

    // if(!lesionList) {
    //     dispatch(actionsLesion.findAllLesion());
    //     return "Loading...";
    // }
    // const dispatch = useDispatch();
    const dispatch = useDispatch();
    const history = useNavigate();
    const players = useSelector(selectors.getAllPlayers);

    const [playerName, setPlayerName] = useState(null);
    const [primaryLastName, setPrimaryLastName] = useState(null);
    const [secondLastName, setSecondLastName] = useState(null);
    const [dni, setDni] = useState(null);
    const [position, setPosition] = useState(null);
    const [email, setEmail] = useState(null);
    const [lesion, setLesion] = useState(null);
    const [lesionType, setLesionType] = useState(null);

    const [selectedOption, setSelectedOption] = useState(null);
    const [originalPlayers, setOriginalPlayers] = useState(null);
    
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    console.log("SACANDO JUGADORES HOMEEE")
    console.log("SACANDO JUGADORES HOMEEE")
    console.log("SACANDO JUGADORES HOMEEE")
    console.log("SACANDO JUGADORES HOMEEE")
    console.log("SACANDO JUGADORES HOMEEE")
    console.log("SACANDO JUGADORES HOMEEE")


    useEffect(() => {
        if (!players) {
            dispatch(actions.findPlayersByUserId( () => history(`/players/home`)));
            setOriginalPlayers(null);
        } else {
                if (!originalPlayers) {
                    setOriginalPlayers(players.players);
                }
        }
    }, [dispatch, originalPlayers, players, history]);
    
    const handleSubmit = event => {

        event.preventDefault();
        if(selectedOption && selectedOption.label === 'Name') {
            dispatch(actions.findPlayerByUserIdAndName(
                playerName, primaryLastName, secondLastName,
                errors => setBackendErrors(errors),
            ));
        }
        if(selectedOption && selectedOption.label === 'Dni') {
            dispatch(actions.findPlayerByUserIdAndDni(dni));
        }
        if(selectedOption && selectedOption.label === 'Email') {
            dispatch(actions.findPlayerByUserIdAndEmail(email));
        }
        if(selectedOption && selectedOption.label === 'Position') {
            dispatch(actions.findPlayerByUserIdAndPosition(position));
        }
        if(selectedOption && selectedOption.label === 'Lesion') {
            if(lesionType){
                dispatch(actions.findPlayerByUserIdWithLesionType(lesionType));
            } else {
                dispatch(actions.findPlayerByUserIdWithLesion());
            }
        }
    }

    const pointGuard = "Base";
    const shootingGuard = "Escolta";
    const smallForward = "Alero";
    const powerForward = "AlaPivot";
    const center = "Pivot";

    const positions = [
        { type: 'Base' },
        { type: 'Escolta' },
        { type: 'Alero' },
        { type: 'AlaPivot' },
        { type: 'Psicologica' },
    ]

    const lesions = [
        { type: 'Muscular' },
        { type: 'Tendinosa' },
        { type: 'Articular' },
        { type: 'ColumnaVertebral' },
        { type: 'Psicologica' },
    ]

    const muscle = "Muscular";
    const tendon = "Tendinosa";
    const joint = "Articular";
    const spine = "ColumnaVertebral";
    const psychological  = "Psicologica";
    
    const CustomPaperComponentOption = (props) => (
        <Paper {...props} sx={{
            background: 'linear-gradient(-45deg, rgb(47, 0, 255) 0%, rgb(59, 4, 26) 60% )', color: "white",
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
            background: 'linear-gradient(-45deg, rgb(47, 0, 255) 0%, rgb(59, 4, 26) 60% )', color: "white",
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
        { label: 'Name' },
        { label: 'Dni' },
        { label: 'Position' },
        { label: 'Email' },
        { label: 'Lesion' },
    ]

    const handlePlayerName = (event, value) => {
        if (value) {
            setPlayerName(value.playerName);
            setPrimaryLastName(value.primaryLastName);
            setSecondLastName(value.secondLastName);
        }
    };
    const handlePlayerDni = (event, value) => {
        if (value) {
        setDni(value.dni);
        }
    };

    const handlePlayerPosition = (event, value) => {
        console.log("aquiiiiii: ", value)
        if (value) {
        setPosition(value.type);
        }
    };
    const handlePlayerEmail = (event, value) => {
        if (value) {
        setEmail(value.email);
        }
    };
    const handlePlayerLesion = (event, value) => {
        if (value) {
        setLesionType(value.type);
        }
    };
    const handleOptionSelect = (event, value) => {
        setSelectedOption(value);
        if(value.label === 'Lesion'){
            dispatch(actions.findPlayerByUserIdWithLesion());
        }
    };

    const handleSetAllPlayers = (dispatch) => {
        dispatch(actions.findPlayersByUserId(() => history('/players/home')));
    }

    return(
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
                            sx={{ width: 200 }}
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
                            {selectedOption.label === 'Name' && (
                                <Box
                                    sx={{
                                        display: 'flex', // Mostrar los Autocompletados en fila
                                    }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={originalPlayers}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(player) => player.dni}
                                        
                                        
                                        
                                        options={originalPlayers}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(player) => {
                                            return player.playerName + " " + player.primaryLastName + " " + player.secondLastName;
                                        }}
                                        renderInput={(params) => <TextField {...params}
                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                            label={
                                                <FormattedMessage id="project.teams.fields.name" />
                                            }
                                            sx={{
                                                background: 'linear-gradient(-45deg, rgb(47, 0, 255) 0%, rgb(59, 4, 26) 60% )',
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
                                        onChange={handlePlayerName}

                                    />
                                    <button type="button" className="button_all_buscar2" onClick={handleSubmit}>
                                        <FormattedMessage id="project.global.buttons.find" />
                                    </button>
                                </Box>
                            )}
                            {selectedOption.label === 'Dni' && (
                                <Box
                                    sx={{
                                        display: 'flex', // Mostrar los Autocompletados en fila
                                    }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={originalPlayers}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(player) => player.dni}
                                        renderInput={(params) => <TextField {...params}
                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                            label={
                                                <FormattedMessage id="project.players.fields.dni" />
                                            }                                            sx={{
                                                background: 'linear-gradient(-45deg, rgb(47, 0, 255) 0%, rgb(59, 4, 26) 60% )',
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
                                        onChange={handlePlayerDni}

                                    />
                                    <button type="button" className="button_all_buscar2" onClick={handleSubmit}>
                                        <FormattedMessage id="project.global.buttons.find" />
                                    </button>
                                </Box>
                            )}
                            {selectedOption.label === 'Position' && (
                                <Box
                                    sx={{
                                        display: 'flex', // Mostrar los Autocompletados en fila
                                    }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={positions}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(position) => position.type}
                                        renderInput={(params) => <TextField {...params}
                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                            label={
                                                <FormattedMessage id="project.players.fields.position" />
                                            }                                                         sx={{
                                                background: 'linear-gradient(-45deg, rgb(47, 0, 255) 0%, rgb(59, 4, 26) 60% )',
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
                                        onChange={handlePlayerPosition}

                                    />
                                    <button type="button" className="button_all_buscar2" onClick={handleSubmit}>
                                        <FormattedMessage id="project.global.buttons.find" />
                                    </button>
                                </Box>
                            )}
                            {selectedOption.label === 'Email' && (
                                <Box
                                    sx={{
                                        display: 'flex', // Mostrar los Autocompletados en fila
                                    }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={originalPlayers}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(player) => player.email}
                                        renderInput={(params) => <TextField {...params}
                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                            label={
                                                <FormattedMessage id="project.players.fields.email" />
                                            }                                                         sx={{
                                                background: 'linear-gradient(-45deg, rgb(47, 0, 255) 0%, rgb(59, 4, 26) 60% )',
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
                                        onChange={handlePlayerEmail}

                                    />
                                    <button type="button" className="button_all_buscar2" onClick={handleSubmit}>
                                        <FormattedMessage id="project.global.buttons.find" />
                                    </button>
                                </Box>
                            )}
                            {selectedOption.label === 'Lesion' && (
                                <Box
                                    sx={{
                                        display: 'flex', // Mostrar los Autocompletados en fila
                                    }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={lesions}
                                        sx={{ width: 200 }}
                                        getOptionLabel={(lesion) => lesion.type}
                                        renderInput={(params) => <TextField {...params}
                                            InputLabelProps={{ style: { color: '#00bfff', fontSize: 20, fontWeight: 'regular' } }}
                                            label={
                                                <FormattedMessage id="project.lesion.fields.lesionType" />
                                            }                                                         sx={{
                                                background: 'linear-gradient(-45deg, rgb(47, 0, 255) 0%, rgb(59, 4, 26) 60% )',
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
                                        onChange={handlePlayerLesion}

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
                <button type="button" className="button_all" style={{marginTop:"-1px", paddingBottom:"3px"}} onClick={() => handleSetAllPlayers(dispatch)}>
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
                        marginTop:"0px",
                    }}
                        onClick={() => history(`/players/addPlayer`)}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
            </Box>
            <Players players={players.players} />
        </Box>

    );
}

export default PlayersHome;