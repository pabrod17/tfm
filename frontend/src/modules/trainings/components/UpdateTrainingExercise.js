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
import Exercises from '../../exercises/components/Exercises';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ExercisesByTraining from '../../exercises/components/ExercisesByTraining';

const UpdateTrainingExercise = () => {
    const training = useSelector(selectors.getOneTraining);

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

    const exercisesList = useSelector(selectorsExercises.getExercisesByTrainingId);
    const exercisesListAll = useSelector(selectorsExercises.getAllExercises);

    useEffect(() => {
        if (!exercisesList) {
            dispatch(actionsExercises.findExercisesByTrainingId(id, () => history(`/trainings/update/${id}/exercise/${1}`)));
            dispatch(actions.findTrainingById(id, () => history(`/trainings/update/${id}/exercise/${1}`)));
        }
    }, [dispatch, exercisesList, history, id]);

    useEffect(() => {
        if (!exercisesListAll.exercises) {
            dispatch(actionsExercises.findAllExercises(() => history(`/trainings/update/${id}/exercise/${1}`)));
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
                        params.row.type === 'Especifico' ? '#DDDDDD' : // Gris claro
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
    
        dispatch(actionsExercises.addExerciseToTraining(id, exerciseIds,
            errors => setBackendErrors(errors),
            ));
            window.location.reload();
        }
        const handleUpdateTraining = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findTrainingById(id, () => history(`/trainings/update/${id}`)));
        }
        const handleUpdateTrainingExercise = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findTrainingById(id, () => history(`/trainings/update/${id}/exercise/${tabValue}`)));
        }
        const handleUpdateTrainingStretching = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actions.findTrainingById(id, () => history(`/trainings/update/${id}/stretching/${tabValue}`)));
        }

        const handleAddExerciseToTraining = (dispatch, history) => {
            dispatch(actionsExercises.addExerciseToTraining(id, exerciseIds, () => history(`/trainings/update/${id}`)));
          }

        function dateConversor(trainingDate) {
            const dateObj2 = new Date(trainingDate);
            dateObj2.setDate(dateObj2.getDate() + 1);
            // Obtener la fecha en formato ISO 8601 (UTC)
            const trainingDateUpdated = dateObj2.toISOString();
        
            return trainingDateUpdated;
        }

    return(
<div className=''>

<Box
    sx={{
        maxWidth: { xs: 320, sm: 620 },
        bgcolor: 'background.dark',
        boxShadow: 1,
        borderRadius: 4,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '100px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>

<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                        sx={{
                            background: "linear-gradient(-45deg, #41295a 0%, #2F0743 70% )",
                            bgcolor:"red",
                            boxShadow: 6,
                            borderRadius: 3,
                            mb:2
                        }}
        >
          <Tab value={0} sx={{ color: '#40FF00', fontSize: "30px", padding:"20px"}} onClick={() => handleUpdateTraining(0, dispatch)} label="General"  />
          <Tab value={1} sx={{ color: '#f5af19', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTrainingExercise(1, dispatch)} label="Exercises"  />
          <Tab value={2} sx={{ color: 'rgb(255, 0, 247)', fontSize: "30px", padding:"20px" }} onClick={() => handleUpdateTrainingStretching(2, dispatch)} label="Stretchings"  />
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
                maxWidth: { xs: 300, sm: 920 },
				border: '2px solid grey',
				background: "linear-gradient(-45deg, #41295a 0%, #2F0743 70% )",
				borderRadius: "20px",
				flexWrap: 'wrap',  // Permite que los elementos se envuelvan cuando no hay suficiente ancho
				flexDirection: 'column',  // Coloca los elementos en una columna cuando el ancho es insuficiente
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
									background: "linear-gradient(-45deg, #f12711 0%, #f5af19 100% )",
									borderRadius: "20px",
									boxShadow: 12,
									m:2,
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


			<button className="post_training" type='submit' onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

		</Box>
)}

            <ExercisesByTraining exercises={exercisesList} trainingId={id} />

            </Box>



</div>

















    //     <div>
    //     <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
    //     <div className="card bg-light border-dark centrado-update-add">
    //         <h5 className="card-header">
    //         <FormattedMessage id="project.trainings.fields.updateTraining"/>
    //         </h5>
    //         <div className="card-body">
    //             <form ref={node => form = node} 
    //                 className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
    //                 <div className="form-group row">
    //                 <label htmlFor="trainingDate" className="col-md-4 col-form-label">
    //                 <FormattedMessage id="project.global.fields.date"/>
    //                 </label>
    //                 <div className="col-md-8">
    //                     <input type="date" id="trainingDate" className="form-control"
    //                         value={trainingDate}
    //                         onChange={e => setTrainingDate(e.target.value)}
    //                         autoFocus
    //                         required/>
    //                     <div className="invalid-feedback">
    //                         <FormattedMessage id='project.global.validator.required'/>
    //                     </div>
    //                 </div>
    //             </div>
    //                 <div className="form-group row">
    //                     <label htmlFor="firstName" className="col-md-12 col-form-label">
    //                     <FormattedMessage id="project.statistics.fields.duration"/>
    //                     </label>
    //                     <div className="col-md-12">
    //                         <textarea  type="text" id="durationMinutes" className="form-control"
    //                             value={durationMinutes}
    //                             onChange={e => setDurationMinutes(e.target.value)}
    //                             autoFocus
    //                             required/>
    //                         <div className="invalid-feedback">
    //                             <FormattedMessage id='project.global.validator.required'/>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="form-group row">
    //                     <label htmlFor="firstName" className="col-md-12 col-form-label">
    //                     <FormattedMessage id="project.exercises.fields.description"/>
    //                     </label>
    //                     <div className="col-md-12">
    //                         <textarea  type="text" id="description" className="form-control"
    //                             value={description}
    //                             onChange={e => setDescription(e.target.value)}
    //                             autoFocus
    //                             required/>
    //                         <div className="invalid-feedback">
    //                             <FormattedMessage id='project.global.validator.required'/>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="form-group row">
    //                     <label htmlFor="firstName" className="col-md-12 col-form-label">
    //                     <FormattedMessage id="project.trainings.fields.objective"/>
    //                     </label>
    //                     <div className="col-md-12">
    //                         <textarea type="text" id="objective" className="form-control"
    //                             value={objective}
    //                             onChange={e => setObjective(e.target.value)}
    //                             autoFocus
    //                             required/>
    //                         <div className="invalid-feedback">
    //                             <FormattedMessage id='project.global.validator.required'/>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="form-group row">
    //                     <div className="offset-md-8 col-md-1">
    //                         <button type="submit" className="btn btn-primary">
    //                             <FormattedMessage id="project.global.buttons.save"/>
    //                         </button>
    //                     </div>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // </div>
);
}

export default UpdateTrainingExercise;