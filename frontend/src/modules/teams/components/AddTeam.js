import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';

const AddTeam = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const [teamName, setTeamName] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
        event.preventDefault();
        if (form.checkValidity()) {

            dispatch(actions.addTeam(
                teamName.trim(),
            () => reloadWindow(),
                errors => setBackendErrors(errors),
            ));

        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    const reloadWindow = () =>{
        history('/teams/new');
        window.location.reload('true');
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark centrado-update-add">
                <h5 className="card-header">
                <FormattedMessage id="project.teams.fields.addTeam"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node}
                        className="needs-validation" noValidate 
                        onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="teamName" className="col-md-4 col-form-label">
                            Nombre
                            </label>
                            <div className="col-md-5">
                                <input type="text" id="teamName" className="form-control"
                                    value={teamName}
                                    onChange={e => setTeamName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-5 col-md-8">
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

export default AddTeam;