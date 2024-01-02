import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {Errors} from '../../common';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';

const FindPlayerByDni = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [dni, setDni] = useState('');
    const {id} = useParams();
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
        event.preventDefault();
        if (form.checkValidity()) {
            dispatch(actions.findPlayerByDniOfTeam(id, dni,
                () => history(`/players/dni/result/${dni.trim()}${id}`)
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
    }


    return(
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark centrado-update-add">
                <h5 className="card-header">
                <FormattedMessage id="project.players.fields.findPlayerByDni"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                            <FormattedMessage id="project.players.fields.dni"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="dni" className="form-control"
                                    value={dni}
                                    onChange={e => setDni(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-3 col-md-1">
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

export default FindPlayerByDni;