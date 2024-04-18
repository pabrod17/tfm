import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import canastaRed from './canastaRed.jpg';
import basketball from './basketball.jpg';
import basketRed2 from './basketRed2.jpg';
import canastaSimple from './canastaSimple.jpg';
import gameMatch from './gameMatch.jpg';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';

import blackCanasta from './blackCanasta.jpg'; //1920x1200
import estiramientos from './estiramientos.jpg'; //1920x1200
import exercise from './exercise.jpg'; //1920x1200

import * as actionLesion from '../..//lesion/actions';
import * as actionTraining from '../..//trainings/actions';
import * as actionGames from '../..//games/actions';
import * as actionStretchings from '../..//stretchings/actions';
import * as actionExercises from '../..//exercises/actions';
import * as actionsPlayers from '../../players/actions';
import * as actionsTeams from '../../teams/actions';

import back from './back.jpg'; //1920x1200
import Carousel from 'react-bootstrap/Carousel';
import Cajita from './Cajita';
import Topbar from './TopBar';
import users, { LoginNew, Login } from '../../users';



const handleFindAllPlayers = (dispatch, history) => {
  dispatch(actionsPlayers.findPlayersByUserId(() => history('/players/home')));
}

const handleFindAllTeams = (dispatch, history) => {
  dispatch(actionsTeams.findAllTeams(() => history('/teams/home')));
  history('/teams/home');
}




const handleFindAllGames = (dispatch, history) => {
  dispatch(actionGames.findGamesByUserId(() => history('/games/home')));
}

const handleFindAllTrainings = (dispatch, history) => {
      dispatch(actionTraining.findTrainingsByUserId(() => history('/trainings/home')));
}




const handleFindAllLesions = (dispatch, history) => {
  dispatch(actionLesion.findAllLesionPage({ page: 0 }, () => history('/lesion/home')));
  history(`/lesion/home`);
}

const handleFindAllExercises = (dispatch, history) => {
    dispatch(actionExercises.findAllExercisesPage({ page: 0 }, () => history.push('/exercises/home')));
    history(`/exercises/home`);
}

const handleFindAllStretchings = (dispatch, history) => {
  dispatch(actionStretchings.findAllStretchingsPage({ page: 0 }, () => history.push('/stretchings/home')));
  history(`/stretchings/home`);
}

const Home = () => {
    const [activeButton, setActiveButton, currentSlide, setCurrentSlide] = useState(0);

    const handleSlideChange = (newSlide) => {
      setCurrentSlide(newSlide);
    };
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleButtonClick = (index) => {
        setActiveButton(index);
      };
    const buttons = Array.from({ length: 7 }, (_, index) => index);
    
    const userLogged = useSelector(users.selectors.getUser);

    return (
<div>
{/* <Cajita></Cajita> */}

{(userLogged.role === "COACH" || userLogged.role === "ADMIN") && (
<div class="holaaaaaa">
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a type='button' onClick={() => handleFindAllTeams(dispatch, history)}><FormattedMessage id="project.teams.fields.teams"/></a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a type='button' onClick={() => handleFindAllPlayers(dispatch, history)}><FormattedMessage id="project.players.fields.players"/></a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a type='button' onClick={() => handleFindAllGames(dispatch, history)}><FormattedMessage id="project.games.fields.games"/></a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a type='button' onClick={() => handleFindAllTrainings(dispatch, history)}><FormattedMessage id="project.trainings.fields.trainings"/></a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a type='button' onClick={() => handleFindAllLesions(dispatch, history)}><FormattedMessage id="project.lesion.fields.lesion"/></a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a type='button' onClick={() => handleFindAllExercises(dispatch, history)}><FormattedMessage id="project.exercises.fields.exercises"/></a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a type='button' onClick={() => handleFindAllStretchings(dispatch, history)}><FormattedMessage id="project.stretchings.fields.stretchings"/></a></h2>
    </div>
  </div>
</div>
            )}
</div>
    );

};

export default Home;
