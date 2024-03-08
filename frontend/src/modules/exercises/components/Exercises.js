import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import exercise from '../../app/components/exercise.jpg';

const handleRemoveExercise = (id, dispatch, history) => {
    dispatch(actions.removeExercise(id, () => history(`/exercises/home`)));
    window.location.reload('true');
}

const handleUpdateExercise = (id, dispatch, history) => {
  dispatch(actions.findExerciseById(id, () => history(`/exercises/update/${id}`)));
}

const handleViewExercise = (id, dispatch, history) => {
    dispatch(actions.findExerciseById(id, () => history(`/exercises/view/${id}`)));
}

function ExercisesList({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findAllExercises(() => history('/exercises/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div key={item.id}>
          <div>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card_exercise">
                    <img src={exercise} alt="Person" class="card__image_exercise"></img>
                    <span class="title">{item.exerciseName}</span>
                    <div class="buttons">
                      <button class="post">{item.exerciseType}</button>
                    </div>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card_exercise">
                    <span class="desc">{item.description}</span>
                    <a href="#" class="button">
                      <span class="desc">{item.objective}</span>
                    </a>
                  </div>
                  <ul class="social-icons trashgrande trash_position">
                  <li><a type="button" onClick={() => handleRemoveExercise(item.id, dispatch, history)}>
                    <i class="fa fa-trash"></i></a></li>
                  </ul>
                  <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateExercise(item.id, dispatch, history)}>
                      <i class="fa fa-wrench"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>;
        });
      }
}



const Exercises = ({exercises}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    return(
        <div className="card-group lesions_contaner">
          <ExercisesList items={exercises} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

export default Exercises;