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

        <div id="carouselExampleIndicators" class="carousel">
            <ol id="pagination">
            {buttons.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === activeButton ? 'active' : ''}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100 h-100" src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg' alt="First slide" />
                    <a href="/teams/all" class="btn-neon">

                        <FormattedMessage id="project.teams.fields.teams" />
                    </a>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg' alt="Second slide" />
                    <a href="/seasons/all" class="btn-neon">

                        <FormattedMessage id="project.seasons.fields.seasons" />
                    </a>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 " src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg' alt="Third slide" />
                    <a href="/lesion/home" class="btn-neon" onClick={() => handleFindAllLesions(dispatch, history)}>

                        <FormattedMessage id="project.lesion.fields.lesion" />
                    </a>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 " src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/bear2.jpg' alt="Fourth slide" />
                    <a href="/trainings/home" class="btn-neon" onClick={() => handleFindAllTrainings(dispatch, history)}>
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <FormattedMessage id="project.trainings.fields.trainings" />
                    </a>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 grande" src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg' alt="Fith slide" />
                    <a href="/games/home" class="btn-neon" onClick={() => handleFindAllGames(dispatch, history)}>
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <FormattedMessage id="project.games.fields.games" />
                    </a>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 grande" src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg' alt="Sixth slide" />
                    <a href="/stretchings/home" class="btn-neon" onClick={() => handleFindAllStretchings(dispatch, history)}>
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <FormattedMessage id="project.stretchings.fields.stretchings" />
                    </a>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 grande" src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg' alt="Seventh slide" />
                    <a href="/exercises/home" class="btn-neon" onClick={() => handleFindAllExercises(dispatch, history)}>
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <FormattedMessage id="project.exercises.fields.exercises" />
                    </a>
                </div>
            </div>
        </div>
    );

};

export default Home;
