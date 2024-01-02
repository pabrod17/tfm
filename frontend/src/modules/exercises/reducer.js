import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    exercise: null,
    exercises:null,
    exercisesSearch: null
};

const exercise = (state = initialState.exercise, action) => {

    switch(action.type) {
        case actionTypes.ADD_EXERCISE_COMPLETED:
            return action.exercise;
        case actionTypes.ADD_EXERCISE_TO_TRAINING_COMPLETED:
            return state;
        case actionTypes.ADD_EXERCISE_TO_GAME_COMPLETED:
            return state;
        case actionTypes.UPDATE_EXERCISE_COMPLETED:
            return action.exercise;
        case actionTypes.REMOVE_EXERCISE_COMPLETED:
            return state;
        case actionTypes.REMOVE_EXERCISE_TO_TRAINING_COMPLETED:
            return state;
        case actionTypes.REMOVE_EXERCISE_TO_GAME_COMPLETED:
            return state;
        case actionTypes.FIND_EXERCISE_BY_ID_COMPLETED:
            return action.exercise;
        default:
            return state;
    }
}

const exercises = (state = initialState.exercises, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_ALL_EXERCISES_COMPLETED:
            return action.exercises;
        case actionTypes.FIND_EXERCISES_BY_TRAINING_ID_COMPLETED:
            return action.exercises;
        case actionTypes.FIND_EXERCISES_BY_GAME_ID_COMPLETED:
            return action.exercises;
        case actionTypes.FIND_EXERCISES_BY_TYPE_COMPLETED:
            return action.exercises;
        default:
            return state;
    }
}

const exercisesSearch = (state = initialState.exercisesSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_EXERCISES_PAGE_COMPLETED:
            return action.exercisesSearch;
        case actionTypes.FIND_EXERCISES_BY_TYPE_PAGE_COMPLETED:
            return action.exercisesSearch;
        case actionTypes.CLEAR_EXERCISE_SEARCH:
            return initialState.exercisesSearch;

        default:
            return state;

    }

}

const reducer = combineReducers({
    exercise,
    exercises,
    exercisesSearch
});

export default reducer;