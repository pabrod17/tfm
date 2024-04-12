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
import Typography from '@mui/material/Typography';
import bigBall from '../../trainings/components/bigBall.jpg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import * as selectorsExercises from '../../exercises/selectors';
import * as actionsExercises from '../../exercises/actions';
import * as actionsStatistics from '../../statistics/actions';
import Exercises from '../../exercises/components/Exercises';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ExercisesByTraining from '../../exercises/components/ExercisesByTraining';
import ExercisesByGame from '../../exercises/components/ExercisesByGame';
import * as actionsPlayers from '../../players/actions';

const UpdateGameExercise = () => {
    const game = useSelector(selectors.getOneGame);

    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);
    const { exerciseType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);
    const [showTable, setShowTable] = useState(true);
	const [exerciseIds, setExerciseIds] = useState(null);
    const [rowsExercises, setRowsExercises] = useState([]);
    const [columnsExercises, setColumnsExercises] = useState([]);

    console.log("dentro PARA exercises: ", tabValue)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let filteredExercises = [];
    let form;

    const exercisesList = useSelector(selectorsExercises.getExercisesByGameId);
    const exercisesListAll = useSelector(selectorsExercises.getAllExercises);

    useEffect(() => {
        if (!exercisesList) {
            dispatch(actionsExercises.findExercisesByGameId(id, () => history(`/games/update/${id}/exercise/${1}`)));
            dispatch(actions.findGameById(id, () => history(`/games/update/${id}/exercise/${1}`)));
        }
    }, [dispatch, exercisesList, history, id]);

    useEffect(() => {
        if (!exercisesListAll.exercises) {
            dispatch(actionsExercises.findAllExercises(() => history(`/games/update/${id}/exercise/${1}`)));
        } else {
            filteredExercises = exercisesListAll.exercises;
            filteredExercises = exercisesListAll.exercises.filter(exercise => {
                    return !exercisesList || !exercisesList.some(ex => ex.id === exercise.id);
                });

            const columnsExercises2 = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: <FormattedMessage id="project.exercises.fields.name"/>, width: 160 },
                { field: 'type', headerName: <FormattedMessage id="project.exercises.fields.typeOnly" />, width: 160,
                renderCell: (params) => (
                    <div style={{ backgroundColor: 
                        params.row.type === 'Tactico' ? '#DD2476' : // Azul oscuro
                        params.row.type === 'Tecnica' ? '#FF512F' : // Verde esmeralda
                        params.row.type === 'Fisico' ? '#FFD166' : // Amarillo
                        params.row.type === 'Global' ? '#0f9b0f' : // Blanco
                        params.row.type === 'Especifico' ? '#000000' : // Gris claro
                        params.row.type === 'Psicologico' ? '#FF6B6B' : // Rosa
                        params.row.type === 'Estrategia' ? '#8E2DE2' : // Morado oscuro
                        params.row.type === 'PrePartido' ? '#00FFF3' : // Negro
                        'green', // Por defecto
                        borderRadius: '5px',
                        padding: '5px'                    }}>
                    {params.value}
                    </div>
                ), },
                { field: 'description', headerName: <FormattedMessage id="project.exercises.fields.description" />, width: 160 },
                { field: 'objective', headerName: <FormattedMessage id="project.exercises.fields.objective" />, width: 160 },
            ];
            setColumnsExercises(columnsExercises2);

            if (filteredExercises) {
                const newRowsExercises = filteredExercises.map(exercise => ({
                    id: exercise.id,
                    name: exercise.exerciseName,
                    type: exercise.exerciseType,
                    description: exercise.description,
                    objective: exercise.objective
                }));
                setRowsExercises(newRowsExercises);
            }

        }
    }, [dispatch, exercisesListAll, history]);










    const handleSubmit = event => {

        event.preventDefault();
    
        dispatch(actionsExercises.addExerciseToGame(id, exerciseIds,
            errors => setBackendErrors(errors),
            ));
            window.location.reload();
        }
        const handleUpdateGame = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => history(`/games/update/${id}`)));
        }
        const handleUpdateGameExercise = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => history(`/games/update/${id}/exercise/${tabValue}`)));
        }
        const handleUpdateGameStretching = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => history(`/games/update/${id}/stretching/${tabValue}`)));
        }

        const handleUpdateGameStatistics = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => {
                dispatch(actionsStatistics.findStatisticsByGame(id, () => history(`/games/update/${id}/statistics/${tabValue}`)));
            }));
            history(`/games/update/${id}/statistics/${tabValue}`);
        }

        const handleUpdateGamePlayer = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findGameById(id, () => {
                dispatch(actionsPlayers.findPlayersByGame(id, () => history(`/games/update/${id}/player/${tabValue}`)));
            }));
            history(`/games/update/${id}/player/${tabValue}`);
        }

        function dateConversor(trainingDate) {
            const dateObj2 = new Date(trainingDate);
            dateObj2.setDate(dateObj2.getDate() + 1);
            // Obtener la fecha en formato ISO 8601 (UTC)
            const trainingDateUpdated = dateObj2.toISOString();
        
            return trainingDateUpdated;
        }

    return(
        <Box
            display="flex"
            alignItems="center"
            p={1}
            sx={{
                flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
            }}
        >
<Box
    sx={{
        bgcolor: 'background.dark',
        borderRadius: 4,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '80px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>

<Box sx={{boxShadow:"0 10px 50px rgb(0, 0, 0)" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
                            bgcolor:"red",
                            boxShadow: 6,
                            borderRadius: 3,
                            mb:2,
                            borderColor:"black",
                            boxShadow:"0 10px 50px rgb(0, 0, 0)"
                        }}
        >
          <Tab value={0} sx={{ color: '#40FF00', fontSize: "30px", padding:"20px"}} onClick={() => handleUpdateGame(0, dispatch)} label="General"  />
          <Tab value={1} sx={{ color: '#f5af19', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateGameExercise(1, dispatch)} label="Exercises"  />
          <Tab value={2} sx={{ color: 'rgb(255, 0, 247)', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateGameStretching(2, dispatch)} label="Stretchings"  />
          <Tab value={3} sx={{ color: 'rgb(0, 217, 255)', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateGameStatistics(3, dispatch)} label="Statistics"/>
          <Tab value={4} sx={{ color: '#ff0000', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateGamePlayer(4, dispatch)} label="Players"/>
        </Tabs>
      </Box>
      <input type="checkbox" class="theme-checkbox" onClick={() => setShowTable(!showTable)}/>

</Box>
<Box
			display="flex"
			alignItems="center"
			p={1}
			sx={{
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
			}}
		>
{showTable && (




<Box
			display="flex"
			alignItems="center"
			p={1}
			sx={{
				border: '2px solid grey',
                background: "linear-gradient(-35deg, #081971 30%, #7C0C0C 80% )",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
                borderColor:"black",
				boxShadow:"0 10px 50px rgb(0, 0, 0)"
			}}
		>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
			<Grid container ml={5} mr={5} mb={1} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={12} md={12}>
						<Typography
							sx={{ flex: '1 1 100%', mt: 3.5, color: "#00bfff", m:2 }}
							variant="h6"
							id="tableTitle"
							component="div"
						>
							Team Selection
						</Typography>
						<div style={{ width: '100%', }}>
							<DataGrid
								sx={{
									background: "linear-gradient(-45deg, #0E24A0 0%, #AD1010 100% )",
									borderRadius: "20px",
									boxShadow: 12,
									m:2,
                                    color:"white",
                                    borderColor:"black",
                                    boxShadow:"0 10px 50px rgb(0, 0, 0)"
								}}
								rows={rowsExercises}
								columns={columnsExercises}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
                                autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
								pageSizeOptions={[5, 10]}
								checkboxSelection
								onRowSelectionModelChange={(newRowSelectionModelTeam) => {
                                        setExerciseIds((prevExerciseId) => {
										console.log(" seasonnnn PRIMEROOOOO: ", newRowSelectionModelTeam);
										return newRowSelectionModelTeam;
										 });
								}}
							/>
						</div>
                        
					</Grid>
			</Grid>


			<button className="post_game" type='submit' onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

		</Box>
)}

            <ExercisesByGame exercises={exercisesList} gameId={id} />

            </Box>



</Box>
);
}

export default UpdateGameExercise;