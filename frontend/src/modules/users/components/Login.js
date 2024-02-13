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
    const [isLoginChecked, setLoginChecked] = useState(true);

    const handleRadioChange = (event) => {
        setLoginChecked(event.target.id === 'login');
    };
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
    const onButtonClick = () => {
        // You'll update this function later...
    }
    return (
        <div class="wrapper">
            <div class="form-container">
                <div class="slide-controls">
                    <input type="radio" name="slide" id="login"
                        checked={isLoginChecked}
                        onChange={handleRadioChange}
                    />
                    <input type="radio" name="slide" id="signup"
                        checked={!isLoginChecked}
                        onChange={handleRadioChange}
                        value="signup"
                    />
                    <label for="login" class="slide login">Login</label>
                    <label for="signup" class="slide signup">Signup</label>
                    <div class="slider-tab"></div>
                </div>
                <div class="form-inner">

                    {isLoginChecked ? (
                        <form ref={node => form = node}
                        className="needs-validation" noValidate
                        onSubmit={e => handleSubmit(e)}>
                            <div class="field">
                                <input
                                    value={userName}
                                    placeholder="Username"
                                    onChange={ev => setUserName(ev.target.value)} required
                                />
                            </div>
                            <div class="field">
                                <input
                                    value={password}
                                    type="password"
                                    placeholder="Password"
                                    onChange={ev => setPassword(ev.target.value)}
                                    required />
                            </div>
                            <div class="field btn">
                                <div class="btn-layer"></div>
                                <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                type="submit"
                value={"Log in"} />
                            </div>
                        </form>
                    ) : (
                        <form action="#" class="signup">
                            <div class="field">
                                <input type="text" placeholder="Username" required />
                            </div>
                            <div class="field">
                                <input type="password" placeholder="Password" required />
                            </div>
                            <div class="field">
                                <input type="password" placeholder="Confirm password" required />
                            </div>
                            <div class="field btn">
                                <div class="btn-layer"></div>
                                <input type="submit" value="Signup" />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Login;