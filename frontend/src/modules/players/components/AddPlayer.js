import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import {useParams} from 'react-router-dom';

const AddPlayer = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [dni, setDni] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [phoneNumber, setPhoneNumber] = useState(" ");
    const [playerName, setPlayerName] = useState(" ");
    const [position, setPosition] = useState(" ");
    const [primaryLastName, setPrimaryLastName] = useState(" ");
    const [secondLastName, setSecondLastName] = useState(" ");
    const [trends, setTrends] = useState(" ");
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.addPlayer(id, playerName.trim(), 
            primaryLastName.trim(), secondLastName.trim(), position, trends.trim(),
            phoneNumber.trim(), email.trim(), dni.trim(),
            () => reloadWindow(id),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = (id) =>{
            history(`/players/addPlayer/${id}`);
            window.location.reload('true');
        }

        const pointGuard = "Base";
        const shootingGuard = "Escolta";
        const smallForward = "Alero";
        const powerForward = "AlaPivot";
        const center = "Pivot";

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark centrado-update-add">
                    <h5 className="card-header">
                    <FormattedMessage id="project.players.fields.addPlayer"/>
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
                                        required/>
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
                                        required/>
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
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
    
    
                            <div className=" row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                <FormattedMessage id="project.players.fields.position"/>
                                </label>
                            <div class="dropdown">
                                <button class="dropbtn">{position} 
                                <i class="fa fa-caret-down"></i>
                                </button>
                                <div class="dropdown-content">
                                <a type="button" onClick={() => setPosition(pointGuard)} ><FormattedMessage id="project.players.fields.pointGuard"/></a>
                                <a type="button" onClick={() => setPosition(shootingGuard)} ><FormattedMessage id="project.players.fields.shootingGuard"/></a>
                                <a type="button" onClick={() => setPosition(smallForward)} ><FormattedMessage id="project.players.fields.smallForward"/></a>
                                <a type="button" onClick={() => setPosition(powerForward)} ><FormattedMessage id="project.players.fields.powerForward"/></a>
                                <a type="button" onClick={() => setPosition(center)} ><FormattedMessage id="project.players.fields.center"/></a>
                                </div>
                            </div>
                            </div>
    
    
    
    
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-5 col-form-label">
                                <FormattedMessage id="project.players.fields.trends"/>
                                </label>
                                <div className="col-md-4">
                                    <input type="text" id="trends" className="form-control"
                                        value={trends}
                                        onChange={e => setTrends(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-5 col-form-label">
                                <FormattedMessage id="project.players.fields.phoneNumber"/>
                                </label>
                                <div className="col-md-4">
                                    <input type="text" id="phoneNumber" className="form-control"
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-5 col-form-label">
                                <FormattedMessage id="project.players.fields.email"/>
                                </label>
                                <div className="col-md-4">
                                    <input type="text" id="email" className="form-control"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
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

export default AddPlayer;