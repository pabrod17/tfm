import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import {useParams} from 'react-router-dom';


const AddLesion = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [lesionName, setLesionName] = useState("");
    const [description, setDescription] = useState("");
    const [medication, setMedication] = useState("");
    const [lesionType, setLesionType] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.addLesion(lesionName.trim(), 
            description.trim(), medication.trim(), lesionType,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history('/lesion/addLesion');
            window.location.reload('true');
        }

        const muscle = "Muscular";
        const tendon = "Tendinosa";
        const joint = "Articular";
        const spine = "ColumnaVertebral";
        const psychological  = "Psicologica";


        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark centrado-update-add">
                    <h5 className="card-header">
                    <FormattedMessage id="project.lesion.fields.addLesion"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.lesion.fields.lesionName"/>
                                </label>
                                <div className="col-md-9">
                                    <input type="text" id="lesionName" className="form-control"
                                        value={lesionName}
                                        onChange={e => setLesionName(e.target.value)}
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
                                <FormattedMessage id="project.lesion.fields.medication"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea type="text" id="medication" className="form-control"
                                        value={medication}
                                        onChange={e => setMedication(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className=" row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                            <FormattedMessage id="project.lesion.fields.lesionType"/>
                                </label>
                            <div class="dropdown col-md-6">
                                <button class="dropbtn">{lesionType} 
                                <i class="fa fa-caret-down"></i>
                                </button>
                                <div class="dropdown-content">
                                <a type="button" onClick={() => setLesionType(muscle)} ><FormattedMessage id="project.lesion.fields.muscle"/></a>
                                <a type="button" onClick={() => setLesionType(tendon)} ><FormattedMessage id="project.lesion.fields.tendon"/></a>
                                <a type="button" onClick={() => setLesionType(joint)} ><FormattedMessage id="project.lesion.fields.joint"/></a>
                                <a type="button" onClick={() => setLesionType(spine)} ><FormattedMessage id="project.lesion.fields.spine"/></a>
                                <a type="button" onClick={() => setLesionType(psychological)} ><FormattedMessage id="project.lesion.fields.psychological"/></a>
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

export default AddLesion;