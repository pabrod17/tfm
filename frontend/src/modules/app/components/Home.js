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

import back from './back.jpg'; //1920x1200
import Carousel from 'react-bootstrap/Carousel';

const handleFindAllLesions = (dispatch, history) => {
    dispatch(actionLesion.findAllLesionPage({ page: 0 }, () => history.push('/lesion/home')));
}

const handleFindAllTrainings = (dispatch, history) => {
    dispatch(actionTraining.findTrainingsByUserId(() => history.push('/trainings/home')));
}

const handleFindAllGames = (dispatch, history) => {
    dispatch(actionGames.findGamesByUserId(() => history.push('/games/home')));
}

const handleFindAllStretchings = (dispatch, history) => {
    dispatch(actionStretchings.findAllStretchingsPage({ page: 0 }, () => history.push('/stretchings/home')));
}

const handleFindAllExercises = (dispatch, history) => {
    dispatch(actionExercises.findAllExercisesPage({ page: 0 }, () => history.push('/exercises/home')));
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

    return (
<div>
<div class="holaaaaaa">
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a href="/teams/all">Teams</a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a href="/seasons/all">Seaons</a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a href="/games/home">Games</a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a href="/trainings/home">Trainings</a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a href="/lesion/home">Lesion</a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a href="/exercises/home">Exercise</a></h2>
    </div>
  </div>
  <div class="homecard">
    <span></span>
    <div class="content">
    <h2><a href="/stretchings/home">Stretching</a></h2>
    </div>
  </div>
</div>
</div>
    );

};

export default Home;
