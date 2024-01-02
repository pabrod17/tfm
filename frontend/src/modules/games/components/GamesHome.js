import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import Games from './Games';
import * as selectorsTeams from '../../teams/selectors';
import * as selectorsSeasons from '../../seasons/selectors';
import {Errors} from '../../common';
import {FormattedMessage} from 'react-intl';

const GamesHome = () => {
    
    const dispatch = useDispatch();
    const history = useNavigate();
    const games = useSelector(selectors.getAllGames);
    const team = useSelector(selectorsTeams.getTeam);
    const season = useSelector(selectorsSeasons.getSeason);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
        event.preventDefault();
        if (form.checkValidity()) {

            if(team == null) {
                if(season == null){
                    dispatch(actions.findGamesByTwoDates(
                        startDate, endDate,
                        errors => setBackendErrors(errors),
                    ));
                } else{
                    dispatch(actions.findGamesByTwoDatesAndSeasonId(
                        season.id, startDate, endDate,
                        errors => setBackendErrors(errors),
                    ));
                }
            } else{
                if(season == null){
                    dispatch(actions.findGamesByTwoDatesAndTeamId(
                        team.id,startDate, endDate,
                        errors => setBackendErrors(errors),
                    ));
                } else{
                    dispatch(actions.findGamesByTwoDatesAndTeamIdOrSeasonId(
                        team.id, season.id, startDate, endDate,
                        errors => setBackendErrors(errors),
                    ));
                }
            }
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history(`/games/addGame`)}><FormattedMessage id="project.games.fields.addGame"/></button>
                    </div>
                </div>


                <div>
                    <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                    <div className="">
                        <div>
                            <form ref={node => form = node}
                                className="needs-validation" noValidate 
                                onSubmit={e => handleSubmit(e)}>
                                <div>
                                    <div className="col-md-6">
                                        <input type="date" id="startDate" className="form-control"
                                            value={startDate}
                                            onChange={e => setStartDate(e.target.value)}
                                            autoFocus
                                            required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                        <input type="date" id="endDate" className="form-control"
                                            value={endDate}
                                            onChange={e => setEndDate(e.target.value)}
                                            autoFocus
                                            required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                        <div className="">
                                            <button type="submit" className="btn btn-primary">
                                            <FormattedMessage id='project.global.buttons.find'/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <Games games={games.games}/>
            </div>
        </div>
    );

}

export default GamesHome;