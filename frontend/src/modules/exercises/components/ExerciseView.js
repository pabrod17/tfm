import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import exercisesss from '../../app/components/exercise.jpg';

const ExerciseView = () => {
    const exercise = useSelector(selectors.getOneExercise);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();

    function ExerciseViewFunction({exercise, dispatch}){
        if(exercise){
            return (
                    <div class="card hola  text-center" >
                        <img className="holas" src={exercisesss}/>
                        <div class="card-body">
                            <h5 class="card__name">{exercise.exerciseName}</h5>
                            <h5 class="card-title"><FormattedMessage id="project.exercises.fields.typeOnly"/>: {exercise.exerciseType}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><FormattedMessage id="project.exercises.fields.objective"/></h5>
                            <p class="card-text">{exercise.objective}</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><FormattedMessage id="project.exercises.fields.description"/></h5>
                            <p class="card-text">{exercise.description}</p>
                        </div>
                        <div class="card-body">
                        </div>
                    </div>
            );
        }
        else{
            dispatch(actions.findExerciseById(id, () => history(`/exercises/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
            <ExerciseViewFunction exercise={exercise} dispatch={dispatch}/>
        </div>
    );
}

export default ExerciseView;