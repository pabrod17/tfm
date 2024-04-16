import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Errors } from '../../common';
import * as actions from '../actions';
import Topbar from '../../app/components/TopBar';
import logo from '../../app/components/logoBalonOscuro.jpg'
import { useIntl } from 'react-intl';

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

    const intl = useIntl();
    const userNamePlaceholder = intl.formatMessage({ id: 'project.global.fields.userName1' });
    const password1 = intl.formatMessage({ id: 'project.global.fields.password' });
    const confirmPassword1 = intl.formatMessage({ id: 'project.global.fields.confirmPassword' });
    const firstName1 = intl.formatMessage({ id: 'project.global.fields.firstName' });
    const lastName1 = intl.formatMessage({ id: 'project.global.fields.lastName' });
    const email1 = intl.formatMessage({ id: 'project.global.fields.email' });
    const signUp1 = intl.formatMessage({ id: 'project.users.SignUp.title' });
    const login1 = intl.formatMessage({ id: 'project.users.Login.title' });

    

    return (
        <div>
<nav class="navbar navbar-expand-lg navbar-light border border-dark ">
  <div class="container-fluid">
    <a class="navbar-brand login-menu" href="#">TeamHub</a>
    <div class="col collapse navbar-collapse" id="navbarSupportedContent">
      {/* <ul class="navbar-nav mr-auto   mt-2 mb-lg-0 justify-content-center">
        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#">Teams</a>
        </li>
        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#">Players</a>
        </li>
        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#">Games</a>
        </li>
      </ul> */}
    </div>
    <ul class="navbar-nav mr-auto   mt-2 mb-lg-0 justify-content-center">
        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#"><FormattedMessage id="project.lesion.fields.lesion"/></a>
        </li>
        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#"><FormattedMessage id="project.stretchings.fields.stretchings"/></a>
        </li>
        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#"><FormattedMessage id="project.global.buttons.statistics"/></a>
        </li>

        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#"><FormattedMessage id="project.teams.fields.teams"/></a>
        </li>
        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#"><FormattedMessage id="project.players.fields.players"/></a>
        </li>
        <li class="nav-item">
          <a class="mr-sm-2 nav-link login-menu2" aria-current="page" href="#"><FormattedMessage id="project.games.fields.games"/></a>
        </li>
      </ul>
      <form class="form-inline mt-2 mb-lg-0">
      <button class="btn btn-outline-success my-2 my-sm-0" type="button"><FormattedMessage id="project.global.buttons.signin"/></button>
    </form>
  </div>
</nav>   



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
                    <label for="login" class="slide login">{login1}</label>
                    <label for="signup" class="slide signup">{signUp1}</label>
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
                                    placeholder={userNamePlaceholder}
                                    onChange={ev => setUserName(ev.target.value)} required
                                />
                            </div>
                            <div class="field">
                                <input
                                    value={password}
                                    type="password"
                                    placeholder={password1}
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
                value={login1} />
                            </div>
                        </form>
                    ) : (
                        <form ref={node => form = node}
                        className="needs-validation" noValidate
                        onSubmit={e => handleSubmit(e)}>
                            <div class="field">
                                <input
                                    value={userName}
                                    placeholder={userNamePlaceholder}
                                    onChange={ev => setUserName(ev.target.value)} required
                                />
                            </div>
                            <div class="field">
                                <input
                                    value={password}
                                    type="password"
                                    placeholder={password1}
                                    onChange={ev => setPassword(ev.target.value)}
                                    required />
                            </div>
                            <div class="field">
                            <input ref={node => confirmPasswordInput = node}
                                    value={confirmPassword}
                                    type="password"
                                    placeholder={confirmPassword1}
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
                                    placeholder={firstName1}
                                    onChange={ev => setFirstName(ev.target.value)} required
                                />
                            </div>
                            <div class="field">
                                <input
                                    value={lastName}
                                    placeholder={lastName1}
                                    onChange={ev => setLastName(ev.target.value)} required
                                />
                            </div>
                            <div class="field">
                                <input
                                    value={email}
                                    placeholder={email1}
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
                value={signUp1} />
                            </div>
                        </form>
                    )}
                </div>

            </div>
            
        </div>

        </div>
    );

}

export default Login;