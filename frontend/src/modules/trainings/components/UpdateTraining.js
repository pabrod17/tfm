import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';

const UpdateTraining = () => {
    const training = useSelector(selectors.getOneTraining);
    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [trainingDate , setTrainingDate ] = useState(training.trainingDate);
    const [durationMinutes, setDurationMinutes] = useState(training.durationMinutes);
    const [description , setDescription ] = useState(training.description);
    const [objective , setObjective] = useState(training.objective);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.updateTraining(training.id, trainingDate, durationMinutes,
            description.trim(), objective.trim(),
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history('/trainings/home');
            window.location.reload('true');
        }


    return(
        <div>
        <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
        <div className="card bg-light border-dark centrado-update-add">
            <h5 className="card-header">
            <FormattedMessage id="project.trainings.fields.updateTraining"/>
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

export default UpdateTraining;