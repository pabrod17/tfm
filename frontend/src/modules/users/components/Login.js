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

    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail]  = useState('');
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    const [isCheckConfirmPassword, setCheckConfirmPassword] = useState(false);

    let confirmPasswordInput=null;

    const handleRadioChange = (event) => {
        setLoginChecked(event.target.id === 'login');
    };
    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity() && checkConfirmPassword()) {
            console.log("11111")
            console.log("11111")
            console.log("11111")
            console.log("11111")
            
            dispatch(actions.signUp(
                {userName: userName.trim(),
                password: password,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim()},
                () => history('/'),
                errors => setBackendErrors(errors),
                () => {
                    history('/users/login');
                    dispatch(actions.logout());
                }
            ));
            

        } else if (form.checkValidity()) {
            console.log("11111 2222222")
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
            console.log("11111 333333")
            setBackendErrors(null);
            form.classList.add('was-validated');
        }

    }
    const checkConfirmPassword = () => {

        if (password !== confirmPassword) {
            if(confirmPasswordInput) {
                confirmPasswordInput.setCustomValidity('error');
            }
            setPasswordsDoNotMatch(true);
            return false;
            

        } else {
            setCheckConfirmPassword(true);
            return true;
        }

    }

    const handleConfirmPasswordChange = value => {

        confirmPasswordInput.setCustomValidity('');
        setConfirmPassword(value);
        setPasswordsDoNotMatch(false);
    
    }
    const onButtonClick = () => {
    }

    return (
        <div class="wrapper">
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
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
                            <div class="field">
                            <input ref={node => confirmPasswordInput = node}
                                    value={confirmPassword}
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={e => handleConfirmPasswordChange(e.target.value)}
                                    required />
                                <div className="invalid-feedback">
                                    {passwordsDoNotMatch ?
                                        <FormattedMessage id='project.global.validator.passwordsDoNotMatch'/> :
                                        <FormattedMessage id='project.global.validator.required'/>}
                                </div>
                            </div>
                            <div class="field">
                                <input
                                    value={firstName}
                                    placeholder="FirstName"
                                    onChange={ev => setFirstName(ev.target.value)} required
                                />
                            </div>
                            <div class="field">
                                <input
                                    value={lastName}
                                    placeholder="LastName"
                                    onChange={ev => setLastName(ev.target.value)} required
                                />
                            </div>
                            <div class="field">
                                <input
                                    value={email}
                                    placeholder="Email"
                                    onChange={ev => setEmail(ev.target.value)} required
                                />
                            </div>
                            <div class="field btn">
                                <div class="btn-layer"></div>
                                <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                type="submit"
                value={"Sign up"} />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Login;