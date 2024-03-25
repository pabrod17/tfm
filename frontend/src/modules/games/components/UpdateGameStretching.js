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
import * as selectorsStretchings from '../../stretchings/selectors';
import * as actionsStretchings from '../../stretchings/actions';
import ExercisesByTraining from '../../exercises/components/ExercisesByTraining';
import StretchingsByTraining from '../../stretchings/components/StretchingsByTraining';
import * as actionsStatistics from '../../statistics/actions';
import StretchingsByGame from '../../stretchings/components/StretchingsByGame';

const UpdateGameStretching = () => {
    const game = useSelector(selectors.getOneGame);

    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [backendErrors, setBackendErrors] = useState(null);
    const { stretchingType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);
    const [showTable, setShowTable] = useState(true);
	const [stretchingIds, setStretchingIds] = useState(null);
    const [rowsStretchings, setRowsStretchings] = useState([]);
    const [columnsStretchings, setColumnsStretchings] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let filteredStretchings = [];
    let form;

    const stretchingList = useSelector(selectorsStretchings.getStretchingsByGameId);
    const stretchingListAll = useSelector(selectorsStretchings.getAllStretchings);

    useEffect(() => {
        console.log("PRIMEROOOOOO, ", stretchingList)
        if (!stretchingList) {
            console.log("PRIMEROOOOOO 111111, ", stretchingList)
            dispatch(actionsStretchings.findStretchingsByGameId(id, () => history(`/games/update/${id}/stretching/${2}`)));
            dispatch(actions.findGameById(id, () => history(`/games/update/${id}/stretching/${2}`)));
        }
    }, [dispatch, stretchingList, history, id]);

    useEffect(() => {
        if (!stretchingListAll.stretchings) {
            dispatch(actionsStretchings.findAllStretchings(() => history(`/trainings/update/${id}/stretching/${2}`)));
        } else {
            filteredStretchings = stretchingListAll.stretchings;
                filteredStretchings = stretchingListAll.stretchings.filter(stretching => {
                    return !stretchingList || !stretchingList.some(ex => ex.id === stretching.id);
                });
        
        
            const columnsStretchings2 = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: <FormattedMessage id="project.stretchings.fields.stretchingName"/>, width: 160 },
                { field: 'type', headerName: <FormattedMessage id="project.stretchings.fields.stretchingType" />, width: 160,
                renderCell: (params) => (
                    <div style={{ backgroundColor: 
                        params.row.type === 'Isquiotibiales' ? '#DD2476' : // Azul oscuro
                        params.row.type === 'Gluteos' ? '#FF512F' : // Verde esmeralda
                        params.row.type === 'Gemelos' ? '#FF0000' : // Amarillo
                        params.row.type === 'Adductores' ? '#0f9b0f' : // Blanco
                        params.row.type === 'Hombro' ? '#000000' : // Gris claro
                        params.row.type === 'Cuadriceps' ? '#FF6B6B' : // Rosa
                        params.row.type === 'Espalda' ? '#8E2DE2' : // Morado oscuro
                        params.row.type === 'Pectoral' ? '#00FFF3' : // Negro
                        params.row.type === 'Ingle' ? '#FFFF00' : // Negro
                        'green', // Por defecto
                        borderRadius: '5px',
                        padding: '5px'
                    }}>
                    {params.value}
                    </div>
                ), },





                { field: 'description', headerName: <FormattedMessage id="project.exercises.fields.description" />, width: 160 }
            ];
            setColumnsStretchings(columnsStretchings2);

        
            if (filteredStretchings) {
                const newRowsStretchings = filteredStretchings.map(stretching => ({
                    id: stretching.id,
                    name: stretching.stretchingName,
                    type: stretching.stretchingType,
                    description: stretching.description
                }));
                // Actualizar el estado de rowsStretchings
                setRowsStretchings(newRowsStretchings);
            }
        
        }
    }, [dispatch, stretchingListAll, history]);








    const handleSubmit = event => {

        event.preventDefault();
    
        dispatch(actionsStretchings.addStretchingToGame(id, stretchingIds,
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
        maxWidth: { xs: 320, sm: 835 },
        bgcolor: 'background.dark',
        boxShadow: 1,
        borderRadius: 4,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '80px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>

<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
								rows={rowsStretchings}
								columns={columnsStretchings}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
                                autoHeight={true} // Permitir que la tabla determine su propio tamaño si los datos no se han cargado
								pageSizeOptions={[5, 10]}
								checkboxSelection
								onRowSelectionModelChange={(newRowSelectionModelTeam) => {
                                        setStretchingIds((prevStretchingId) => {
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

            <StretchingsByGame stretchings={stretchingList} gameId={id} />

            </Box>



</div>
);
}

export default UpdateGameStretching;