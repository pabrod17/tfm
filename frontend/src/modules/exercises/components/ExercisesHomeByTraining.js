import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import ExercisesByTraining from './ExercisesByTraining';
import {useParams} from 'react-router-dom';

const ExercisesHomeByTraining = () => {
    const exercises = useSelector(selectors.getAllExercises);
    const dispatch = useDispatch();
    const history = useNavigate();
    const {trainingId} = useParams();

    const tactic = "Tactic";
    const technique = "Technique";
    const physical = "Physical";
    const globalized = "Globalized";
    const specific  = "Specific";
    const psychological = "Psychological";
    const strategy = "Strategy";
    const preMatch = "PreMatch";

    return(
        <div>
            <div>
                <ExercisesByTraining exercises={exercises.exercises} trainingId={trainingId}/>
            </div>
        </div>

    );
}

export default ExercisesHomeByTraining;