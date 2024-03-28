import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    training: null,
    trainings:null,
    trainingsBySeasonId:null
};

const training = (state = initialState.training, action) => {

    switch(action.type) {
        case actionTypes.ADD_TRAINING_COMPLETED:
            return action.training;
        case actionTypes.ADD_PLAYER_TO_TRAINING_COMPLETED:
            return state;
        case actionTypes.UPDATE_TRAINING_COMPLETED:
            return action.training;
        case actionTypes.REMOVE_TRAINING_COMPLETED:
            return state;
        case actionTypes.REMOVE_PLAYER_TO_TRAINING_COMPLETED:
            return state;
        case actionTypes.FIND_TRAINING_BY_ID_COMPLETED:
            return action.training;
        default:
            return state;
    }
}

const trainings = (state = initialState.trainings, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_TRAININGS_BY_USER_ID_COMPLETED:
            return action.trainings;
        case actionTypes.FIND_TRAININGS_BY_PLAYER_ID_COMPLETED:
            return action.trainings;
        case actionTypes.FIND_TRAININGS_BY_TWO_DATES_AND_TEAM_ID_OR_SEASON_ID_COMPLETED:
            return action.trainings;
        case actionTypes.FIND_TRAININGS_BY_TEAM_ID_COMPLETED:
            return action.trainings;
        default:
            return state;
    }
}

const trainingsBySeasonId = (state = initialState.trainingsBySeasonId, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_TRAININGS_BY_SEASON_ID_COMPLETED:
            return action.trainingsBySeasonId;
        default:
            return state;
    }
}

const reducer = combineReducers({
    training,
    trainings,
    trainingsBySeasonId
});

export default reducer;