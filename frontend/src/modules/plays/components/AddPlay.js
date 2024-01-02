import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import {useParams} from 'react-router-dom';

const AddPlay = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [title, setTitle] = useState("");
    const [playType, setPlayType] = useState("");
    const [gesture, setGesture] = useState("");
    const [pointGuardText, setPointGuardText] = useState("");
    const [shootingGuardText, setShootingGuardText] = useState("");
    const [smallForwardText, setSmallForwardText] = useState("");
    const [powerForwardText, setPowerForwardText] = useState("");
    const [centerText, setCenterText] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    
    const attack = "Ataque";
    const defense = "Defensa";


    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.addPlay(id, title.trim(), playType,
            gesture.trim(), pointGuardText.trim(), shootingGuardText.trim(), smallForwardText.trim(), powerForwardText.trim(), centerText.trim(),
            () => reloadWindow(id),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }

        const reloadWindow = (id) =>{
            history(`/plays/addPlay/${id}`);
            window.location.reload('true');
        }

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-dark text-light border-dark">
                    <h5 className="">
                    <FormattedMessage id="project.plays.fields.addPlay"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.notes.fields.title"/>
                                </label>
                                <div className="col-md-9">
                                    <input type="text" id="title" className="form-control"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className=" row">
                                <label htmlFor="firstName" className="col-md-5 col-form-label">
                                <FormattedMessage id="project.exercises.fields.typeOnly"/>
                                    </label>
                                <div class="dropdown col-md-6">
                                    <button class="dropbtn">{playType} 
                                    <i class="fa fa-caret-down"></i>
                                    </button>
                                    <div class="dropdown-content">
                                    <a type="button" onClick={() => setPlayType(attack)} ><FormattedMessage id="project.plays.fields.attack"/></a>
                                    <a type="button" onClick={() => setPlayType(defense)} ><FormattedMessage id="project.plays.fields.defense"/></a>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.plays.fields.gesture"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea type="text" id="gesture" className="form-control"
                                        value={gesture}
                                        onChange={e => setGesture(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.plays.fields.pointGuardText"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="pointGuardText" className="form-control"
                                        value={pointGuardText}
                                        onChange={e => setPointGuardText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.plays.fields.shootingGuardText"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="shootingGuardText" className="form-control"
                                        value={shootingGuardText}
                                        onChange={e => setShootingGuardText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.plays.fields.smallForwardText"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="smallForwardText" className="form-control"
                                        value={smallForwardText}
                                        onChange={e => setSmallForwardText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.plays.fields.powerForwardText"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="powerForwardText" className="form-control"
                                        value={powerForwardText}
                                        onChange={e => setPowerForwardText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.plays.fields.centerText"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="centerText" className="form-control"
                                        value={centerText}
                                        onChange={e => setCenterText(e.target.value)}
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

export default AddPlay;