import React, { useEffect, useState, createContext } from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as actionsGames from '../../games/actions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const UpdateGameStatistics = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const gameStatistics = useSelector(selectors.getGameStatistics);
    const {id} = useParams();
    const [showTable, setShowTable] = useState(true);
    const { stretchingType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

    const [totalPoints, setTotalPoints] = useState(null);
    const [durationMinutes, setDurationMinutes] = useState(null);
    const [totalThreePointShots, setTotalThreePointShots] = useState(null);
    const [totalSetShots, setTotalSetShots] = useState(null);
    const [totalFreeShots, setTotalFreeShots] = useState(null);
    const [totalRebounds, setTotalRebounds] = useState(null);
    const [totalBlockedShot, setTotalBlockedShot] = useState(null);
    const [totalAssists, setTotalAssists] = useState(null);
    const [totalPersonalFouls, setTotalPersonalFouls] = useState(null);
    const [totalTechnicalFouls, setTotalTechnicalFouls] = useState(null);
    const [totalUnsportsmanlikeFouls, setTotalUnsportsmanlikeFouls] = useState(null);

    const [totalPointsRival, setTotalPointsRival] = useState(null);
    const [totalThreePointShotsRival, setTotalThreePointShotsRival] = useState(null);
    const [totalSetShotsRival, setTotalSetShotsRival] = useState(null);
    const [totalFreeShotsRival, setTotalFreeShotsRival] = useState(null);
    const [totalReboundsRival, setTotalReboundsRival] = useState(null);
    const [totalBlockedShotsRival, setTotalBlockedShotsRival] = useState(null);
    const [totalAssistsRival, setTotalAssistsRival] = useState(null);
    const [totalPersonalFoulsRival, setTotalPersonalFoulsRival] = useState(null);
    const [totalTechnicalFoulsRival, setTotalTechnicalFoulsRival] = useState(null);
    const [totalUnsportsmanlikeFoulsRival, setTotalUnsportsmanlikeFoulsRival] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!gameStatistics) {
            dispatch(actions.findStatisticsByGame(id, () => history(`/games/update/${id}/statistics/${3}`)));
            dispatch(actionsGames.findGameById(id, () => history(`/games/update/${id}/statistics/${3}`)));
        } else {
            setTotalPoints(gameStatistics.totalPoints);
            setDurationMinutes(gameStatistics.durationMinutes);
            setTotalThreePointShots(gameStatistics.totalThreePointShots);
            setTotalSetShots(gameStatistics.totalSetShots);
            setTotalFreeShots(gameStatistics.totalFreeShots);
            setTotalRebounds(gameStatistics.totalRebounds);
            setTotalBlockedShot(gameStatistics.totalBlockedShot);
            setTotalAssists(gameStatistics.totalAssists);
            setTotalPersonalFouls(gameStatistics.totalPersonalFouls);
            setTotalTechnicalFouls(gameStatistics.totalTechnicalFouls);
            setTotalUnsportsmanlikeFouls(gameStatistics.totalUnsportsmanlikeFouls);

            setTotalPointsRival(gameStatistics.totalPointsRival);
            setTotalThreePointShotsRival(gameStatistics.totalThreePointShotsRival);
            setTotalSetShotsRival(gameStatistics.totalSetShotsRival);
            setTotalFreeShotsRival(gameStatistics.totalFreeShotsRival);
            setTotalReboundsRival(gameStatistics.totalReboundsRival);
            setTotalBlockedShotsRival(gameStatistics.totalBlockedShotsRival);
            setTotalAssistsRival(gameStatistics.totalAssistsRival);
            setTotalPersonalFoulsRival(gameStatistics.totalPersonalFoulsRival);
            setTotalTechnicalFoulsRival(gameStatistics.totalTechnicalFoulsRival);
            setTotalUnsportsmanlikeFoulsRival(gameStatistics.totalUnsportsmanlikeFoulsRival);


        }
    }, [dispatch, gameStatistics, history, id]);

    const handleSubmit = event => {

        event.preventDefault();
    
            dispatch(actions.updateGameStatistics(id, gameStatistics.id, totalPoints, durationMinutes, 
                totalThreePointShots,totalSetShots,totalFreeShots,totalRebounds,
                totalBlockedShot,totalAssists,totalPersonalFouls,totalTechnicalFouls,
                totalUnsportsmanlikeFouls,totalPointsRival,totalThreePointShotsRival,
                totalSetShotsRival,totalFreeShotsRival,totalReboundsRival,totalBlockedShotsRival,
                totalAssistsRival,totalPersonalFoulsRival,totalTechnicalFoulsRival,
                totalUnsportsmanlikeFoulsRival,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        }
        const handleUpdateGame = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actionsGames.findGameById(id, () => history(`/games/update/${id}`)));
        }
        const handleUpdateGameExercise = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actionsGames.findGameById(id, () => history(`/games/update/${id}/exercise/${tabValue}`)));
        }
        const handleUpdateGameStretching = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actionsGames.findGameById(id, () => history(`/games/update/${id}/stretching/${tabValue}`)));
        }

        const handleUpdateGameStatistics = (tabValue, dispatch) => {
            setValue(tabValue);
            dispatch(actionsGames.findGameById(id, () => {
                // dispatch(actionsStretchings.findStretchingsByGameId(id, () => history(`/games/update/${id}/statistics/${tabValue}`)));
            }));
            history(`/games/update/${id}/stretching/${tabValue}`);
        }
        const reloadWindow = () =>{
            history(`/statistics/game/${id}`)
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
        marginTop: '100px', // Ajusta la distancia desde la parte superior según sea necesario
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

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark">
                    <h5 className="card-header">
                    <FormattedMessage id="project.statistics.fields.updateGameStatistics"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>

                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalPoints"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalPoints" className="form-control"
                                        value={totalPoints}
                                        onChange={e => setTotalPoints(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.duration"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="durationMinutes" className="form-control"
                                        value={durationMinutes}
                                        onChange={e => setDurationMinutes(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalThreePointShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalThreePointShots" className="form-control"
                                        value={totalThreePointShots}
                                        onChange={e => setTotalThreePointShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalSetShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalSetShots" className="form-control"
                                        value={totalSetShots}
                                        onChange={e => setTotalSetShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalFreeShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalFreeShots" className="form-control"
                                        value={totalFreeShots}
                                        onChange={e => setTotalFreeShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalRebounds"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalRebounds" className="form-control"
                                        value={totalRebounds}
                                        onChange={e => setTotalRebounds(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalBlockedShot"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalBlockedShot" className="form-control"
                                        value={totalBlockedShot}
                                        onChange={e => setTotalBlockedShot(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalAssists"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalAssists" className="form-control"
                                        value={totalAssists}
                                        onChange={e => setTotalAssists(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalPersonalFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalPersonalFouls" className="form-control"
                                        value={totalPersonalFouls}
                                        onChange={e => setTotalPersonalFouls(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalTechnicalFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalTechnicalFouls" className="form-control"
                                        value={totalTechnicalFouls}
                                        onChange={e => setTotalTechnicalFouls(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalUnsportsmanlikeFouls" className="form-control"
                                        value={totalUnsportsmanlikeFouls}
                                        onChange={e => setTotalUnsportsmanlikeFouls(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>









                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalPointsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalPointsRival" className="form-control"
                                        value={totalPointsRival}
                                        onChange={e => setTotalPointsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalThreePointShotsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalThreePointShotsRival" className="form-control"
                                        value={totalThreePointShotsRival}
                                        onChange={e => setTotalThreePointShotsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalSetShotsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalSetShotsRival" className="form-control"
                                        value={totalSetShotsRival}
                                        onChange={e => setTotalSetShotsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalFreeShotsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalFreeShotsRival" className="form-control"
                                        value={totalFreeShotsRival}
                                        onChange={e => setTotalFreeShotsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalReboundsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalReboundsRival" className="form-control"
                                        value={totalReboundsRival}
                                        onChange={e => setTotalReboundsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalBlockedShotRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalBlockedShotsRival" className="form-control"
                                        value={totalBlockedShotsRival}
                                        onChange={e => setTotalBlockedShotsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalAssistsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalAssistsRival" className="form-control"
                                        value={totalAssistsRival}
                                        onChange={e => setTotalAssistsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalPersonalFoulsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalPersonalFoulsRival" className="form-control"
                                        value={totalPersonalFoulsRival}
                                        onChange={e => setTotalPersonalFoulsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalTechnicalFoulsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalTechnicalFoulsRival" className="form-control"
                                        value={totalTechnicalFoulsRival}
                                        onChange={e => setTotalTechnicalFoulsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFoulsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalUnsportsmanlikeFoulsRival" className="form-control"
                                        value={totalUnsportsmanlikeFoulsRival}
                                        onChange={e => setTotalUnsportsmanlikeFoulsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="form-group row">
                                <div className="offset-md-5 col-md-1">
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.global.buttons.save"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
			<button className="post_game" type='submit' onClick={(e) => handleSubmit(e)}><FormattedMessage id="project.global.buttons.save" /></button>

		</Box>
)}





            </Box>






            

            </div>

        );
}

export default UpdateGameStatistics;