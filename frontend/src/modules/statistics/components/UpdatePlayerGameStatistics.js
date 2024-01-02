import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as actionsGames from '../../games/actions';
import * as selectorsTeams from '../../teams/selectors';


const UpdatePlayerGameStatistics = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const playerGameStatistics = useSelector(selectors.getPlayerGameStatistics);
    const team = useSelector(selectorsTeams.getTeam);
    const {playerId} = useParams();
    const {gameId} = useParams();

    const [totalPoints, setTotalPoints] = useState(playerGameStatistics.totalPoints);
    const [minutes, setMinutes] = useState(playerGameStatistics.minutes);
    const [threePointShots, setThreePointShots] = useState(playerGameStatistics.threePointShots);
    const [setShots, setSetShots] = useState(playerGameStatistics.setShots);
    const [freeShots, setFreeShots] = useState(playerGameStatistics.freeShots);
    const [failThreePointShots, setFailThreePointShots] = useState(playerGameStatistics.failThreePointShots);

    const [failSetShots, setFailSetShots] = useState(playerGameStatistics.failSetShots);
    const [failFreeShots, setFailFreeShots] = useState(playerGameStatistics.failFreeShots);
    const [rebounds, setRebounds] = useState(playerGameStatistics.rebounds);
    const [blockedShot, setBlockedShot] = useState(playerGameStatistics.blockedShot);
    const [assists, setAssists] = useState(playerGameStatistics.assists);
    const [personalFouls, setPersonalFouls] = useState(playerGameStatistics.personalFouls);
    const [technicalFouls, setTechnicalFouls] = useState(playerGameStatistics.technicalFouls);
    const [unsportsmanlikeFouls, setUnsportsmanlikeFouls] = useState(playerGameStatistics.unsportsmanlikeFouls);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.updatePlayerGameStatistics(playerId, gameId, totalPoints, 
                minutes, threePointShots, setShots,freeShots,failThreePointShots,failSetShots,
                failFreeShots,rebounds,blockedShot,assists,personalFouls,technicalFouls,
                unsportsmanlikeFouls,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history(`/statistics/playerGame/${playerId}${gameId}`)
        }


return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark">
                    <h5 className="card-header">
                    <FormattedMessage id="project.statistics.fields.updatePlayerGameStatistics"/>
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
                                <FormattedMessage id="project.statistics.fields.minutes"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="minutes" className="form-control"
                                        value={minutes}
                                        onChange={e => setMinutes(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.threePointShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="threePointShots" className="form-control"
                                        value={threePointShots}
                                        onChange={e => setThreePointShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.setShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="setShots" className="form-control"
                                        value={setShots}
                                        onChange={e => setSetShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.freeShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="freeShots" className="form-control"
                                        value={freeShots}
                                        onChange={e => setFreeShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.failThreePointShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="failThreePointShots" className="form-control"
                                        value={failThreePointShots}
                                        onChange={e => setFailThreePointShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.failSetShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="failSetShots" className="form-control"
                                        value={failSetShots}
                                        onChange={e => setFailSetShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.failFreeShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="failFreeShots" className="form-control"
                                        value={failFreeShots}
                                        onChange={e => setFailFreeShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.rebounds"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="rebounds" className="form-control"
                                        value={rebounds}
                                        onChange={e => setRebounds(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.blockedShot"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="blockedShot" className="form-control"
                                        value={blockedShot}
                                        onChange={e => setBlockedShot(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>









                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.assists"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="assists" className="form-control"
                                        value={assists}
                                        onChange={e => setAssists(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.personalFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="personalFouls" className="form-control"
                                        value={personalFouls}
                                        onChange={e => setPersonalFouls(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.technicalFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="technicalFouls" className="form-control"
                                        value={technicalFouls}
                                        onChange={e => setTechnicalFouls(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.unsportsmanlikeFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="unsportsmanlikeFouls" className="form-control"
                                        value={unsportsmanlikeFouls}
                                        onChange={e => setUnsportsmanlikeFouls(e.target.value)}
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
        );
}

export default UpdatePlayerGameStatistics;