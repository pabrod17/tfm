import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {Errors} from '../../common';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';

const FindPlayersByCompletedName = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [playerName, setPlayerName] = useState("");
    const [primaryLastName, setPrimaryLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const {id} = useParams();
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
        event.preventDefault();
        if (form.checkValidity()) {
            dispatch(actions.findPlayersByCompletedNameOfTeam(id, playerName, primaryLastName, secondLastName,
                () => history(`/players/completedName/result/${id}${playerName.trim()}${primaryLastName.trim()}${secondLastName.trim()}`)
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
                <FormattedMessage id="project.players.fields.findPlayerByNameAndSurnames"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                            <FormattedMessage id="project.players.fields.playerName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="playerName" className="form-control"
                                    value={playerName}
                                    onChange={e => setPlayerName(e.target.value)}
                                    autoFocus
                                    />
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                            <FormattedMessage id="project.players.fields.primaryLastName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="primaryLastName" className="form-control"
                                    value={primaryLastName}
                                    onChange={e => setPrimaryLastName(e.target.value)}
                                    autoFocus
                                    />
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                            <FormattedMessage id="project.players.fields.secondLastName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="secondLastName" className="form-control"
                                    value={secondLastName}
                                    onChange={e => setSecondLastName(e.target.value)}
                                    autoFocus
                                    />
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

export default FindPlayersByCompletedName;