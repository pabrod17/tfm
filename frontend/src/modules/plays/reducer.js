import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    play: null,
    plays: null,
    playsByTeamId: null
};

const play = (state = initialState.play, action) => {

    switch (action.type) {

        case actionTypes.ADD_PLAY_COMPLETED:
            return action.play;
        case actionTypes.ADD_PLAY_TO_TEAM_COMPLETED:
            return state;
        case actionTypes.UPDATE_PLAY_COMPLETED:
            return action.play;
        case actionTypes.FIND_PLAY_BY_ID_COMPLETED:
            return action.play;
        case actionTypes.REMOVE_PLAY_TO_TEAM_COMPLETED:
            return state;
        default:
            return state;
    }
}

const playsByTeamId = (state = initialState.playsByTeamId, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_PLAYS_BY_TEAM_ID_COMPLETED:
            return action.playsByTeamId;
        default:
            return state;
    }
}

const plays = (state = initialState.plays, action) => {

    switch (action.type) {

        case actionTypes.FIND_PLAYS_BY_TYPE_COMPLETED:
            return action.plays;
        case actionTypes.FIND_PLAYS_BY_USER_ID_COMPLETED:
            return action.plays;
        default:
            return state;
    }
}

const reducer = combineReducers({
    play,
    plays,
    playsByTeamId
});

export default reducer;