import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';

const FindSeasonsBetweenTwoDates = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
        event.preventDefault();
        if (form.checkValidity()) {

            dispatch(actions.findSeasonsBetweenTwoDates(
                startDate,
                endDate
            , () => history(`/seasons/betweenDates/result/${startDate.trim()}/${endDate.trim()}`),
                errors => setBackendErrors(errors),
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
                <FormattedMessage id='project.seasons.fields.seasonsBetweenTwoDates'/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node}
                        className="needs-validation" noValidate 
                        onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="startDate" className="col-md-4 col-form-label">
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
                            <label htmlFor="endDate" className="col-md-4 col-form-label">
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
                            <div className="offset-md-5 col-md-8">
                                <button type="submit" className="btn btn-primary">
                                <FormattedMessage id='project.global.buttons.find'/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );


}

export default FindSeasonsBetweenTwoDates;