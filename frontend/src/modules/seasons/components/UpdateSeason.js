import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const UpdateSeason = () => {

    const season = useSelector(selectors.getSeason);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [calendario, setCalendario] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
    
        event.preventDefault();

    if (form.checkValidity()) {
        
        dispatch(actions.updateSeason(
            season.id,
            startDate,
            endDate,
            calendario.trim()
        , () => reloadWindow(),
            errors => setBackendErrors(errors),
        ));
    } else {
        setBackendErrors(null);
        form.classList.add('was-validated');
        }
    }

    const reloadWindow = () =>{
        history('/seasons/all/result');
        window.location.reload('true');
    }

    return(

                <div>
                    <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                    <div className="card bg-light border-dark centrado-update-add">
                        <h5 className="card-header">
                        <FormattedMessage id='project.plays.fields.updateSeason'/>
                        </h5>
                        <div className="card-body">
                            <form ref={node => form = node} 
                                className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                                <div className="form-group row">
                                    <label htmlFor="startDate" className="col-md-3 col-form-label">
                                    <FormattedMessage id='project.seasons.fields.startDate'/>
                                    </label>
                                    <div className="col-md-8">
                                        <input type="date" id="startDate" className="form-control"
                                            value={startDate}
                                            onChange={e => setStartDate(e.target.value)}
                                            autoFocus
                                            required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="endDate" className="col-md-3 col-form-label">
                                    <FormattedMessage id='project.seasons.fields.endDate'/>
                                    </label>
                                    <div className="col-md-8">
                                        <input type="date" id="endDate" className="form-control"
                                            value={endDate}
                                            onChange={e => setEndDate(e.target.value)}
                                            autoFocus
                                            required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="calendario" className="col-md-3 col-form-label">
                                    <FormattedMessage id='project.seasons.fields.name'/>
                                    </label>
                                    <div className="col-md-8">
                                        <input type="text" id="calendario" className="form-control"
                                            value={calendario}
                                            onChange={e => setCalendario(e.target.value)}
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

export default UpdateSeason;