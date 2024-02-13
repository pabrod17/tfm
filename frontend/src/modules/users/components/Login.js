import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Errors } from '../../common';
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
        <div className="mainContainer">
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />

            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <div>
                <form ref={node => form = node}
                    className="needs-validation" noValidate
                    onSubmit={e => handleSubmit(e)}>
                        <div className="inputContainer">
                            <input type="text" id="userName" className="inputBox"
                                value={userName}
                                placeholder="Enter your username here"
                                onChange={e => setUserName(e.target.value)}
                                autoFocus
                                required />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.required' />
                            </div>
                        </div>
                    <br />




                    <div >
                        <div className="inputContainer">
                            <input type="password" id="password" className="inputBox"
                                value={password}
                                placeholder="Enter your password here"
                                onChange={e => setPassword(e.target.value)}
                                required />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.required' />
                            </div>
                        </div>
                    </div>
                    <div className={"inputContainer"}>
                        <input
                            className={"inputButton"}
                            type="button"
                            type="submit"
                            value={"Log in"} />
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Login;