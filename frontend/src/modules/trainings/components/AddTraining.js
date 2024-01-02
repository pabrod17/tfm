import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectorsTeams from '../../teams/selectors';
import * as actionsTeams from '../../teams/actions';
import * as selectorsSeasons from '../../seasons/selectors';
import * as actionsSeasons from '../../seasons/actions';

const AddTraining = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [teamId , setTeamId ] = useState(null);
    const [seasonId , setSeasonId ] = useState(null);
    const [trainingDate , setTrainingDate ] = useState(null);
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [description , setDescription ] = useState("");
    const [objective , setObjective] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const teams = useSelector(selectorsTeams.getAllTeams);
    const seasons = useSelector(selectorsSeasons.getAllSeasons);

    const teamsList = teams.teams;

    if(!teamsList) {
        dispatch(actionsTeams.findAllTeams());
        return "Loading...";
    }

    const seasonsList = seasons.seasons;

    if(!seasonsList) {
        dispatch(actionsSeasons.findAllSeasons());
        return "Loading...";
    }

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            if(teamId==null) {
                dispatch(actions.addTrainingWithSeason(seasonId,trainingDate, durationMinutes,
                    description.trim(), objective.trim(),
                    () => reloadWindow(),
                    errors => setBackendErrors(errors),
                    ));
            } else if(seasonId==null){
                dispatch(actions.addTrainingWithTeam(teamId,trainingDate, durationMinutes,
                    description.trim(), objective.trim(),
                    () => reloadWindow(),
                    errors => setBackendErrors(errors),
                    ));
                } else{
                    dispatch(actions.addTraining(teamId, seasonId,trainingDate, durationMinutes,
                        description.trim(), objective.trim(),
                        () => reloadWindow(),
                        errors => setBackendErrors(errors),
                        ));
                }
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history('/trainings/addTraining');
            window.location.reload('true');
        }

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark centrado-update-add">
                    <h5 className="card-header">
                    <FormattedMessage id="project.trainings.fields.addTraining"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                            <label htmlFor="trainingDate" className="col-md-4 col-form-label">
                            <FormattedMessage id="project.global.fields.date"/>
                            </label>
                            <div className="col-md-8">
                                <input type="date" id="trainingDate" className="form-control"
                                    value={trainingDate}
                                    onChange={e => setTrainingDate(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.statistics.fields.duration"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="durationMinutes" className="form-control"
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
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.exercises.fields.description"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="description" className="form-control"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.trainings.fields.objective"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea type="text" id="objective" className="form-control"
                                        value={objective}
                                        onChange={e => setObjective(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown">
                            <button class="btn-player draw-border"><FormattedMessage id="project.teams.fields.team"/></button>
                                        <div class="dropdown-content">
                                        {teamsList.map(team => 
                                                    <a type="button" onClick={() => setTeamId(team.id)}> 
                                                        {team.id} : {"  "}{team.teamName}
                                                    </a>)}
                                        </div>
                            </div>
                            <div class="dropdown">
                            <button class="btn-player draw-border"><FormattedMessage id="project.seasons.fields.season"/></button>
                                        <div class="dropdown-content">
                                        {seasonsList.map(season => 
                                                    <a type="button" onClick={() => setSeasonId(season.id)}> 
                                                        {season.id} : {"  "}{season.calendario}
                                                    </a>)}
                                        </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-8 col-md-1">
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

export default AddTraining;