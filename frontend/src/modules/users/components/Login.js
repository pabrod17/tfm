import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';

const Login = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.login(
                userName.trim(),
                password,
                () => history('/'),
                errors => setBackendErrors(errors),
                () => {
                    history('/users/login');
                    dispatch(actions.logout());
                }
            ));

        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }

    }

    return (
        <div className="">
            <p className="">

            <div className="card bg-light border-dark">
                <h5 className="card-header">
                <Link className=" signup color-signup" to="/users/signup">
                    <FormattedMessage id="project.users.SignUp.title"/>
                </Link>
                </h5>
            </div>
                

            </p>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.users.Login.title"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate 
                        onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="userName" className="col-md-4 col-form-label">
                                <FormattedMessage id="project.global.fields.userName"/>
                            </label>
                            <div className="col-md-5">
                                <input type="text" id="userName" className="form-control"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-md-4 col-form-label">
                                <FormattedMessage id="project.global.fields.password"/>
                            </label>
                            <div className="col-md-5">
                                <input type="password" id="password" className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-4 col-md-1">
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="project.users.Login.title"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;