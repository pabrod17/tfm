import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    gameStatistics: null,
    playerGameStatistics: null
};

const gameStatistics = (state = initialState.gameStatistics, action) => {

    switch (action.type) {

        case actionTypes.ADD_STATISTICS_TO_GAME_COMPLETED:
            return action.gameStatistics;
        case actionTypes.UPDATE_GAMESTATISTICS_COMPLETED:
            return action.gameStatistics;
        case actionTypes.FIND_GAMESTATISTICS_BY_ID_COMPLETED:
            return action.gameStatistics;
        case actionTypes.FIND_STATISTICS_BY_GAME_COMPLETED:
            return action.gameStatistics;
        case actionTypes.REMOVE_STATISTICS_TO_GAME_COMPLETED:
            return state;
        default:
            return state;
    }
}

const playerGameStatistics = (state = initialState.playerGameStatistics, action) => {

    switch (action.type) {

        case actionTypes.ADD_STATISTICS_TO_PLAYER_AND_GAME_COMPLETED:
            return action.playerGameStatistics;
        case actionTypes.UPDATE_PLAYERGAMESTATISTICS_COMPLETED:
            return action.playerGameStatistics;
        case actionTypes.FIND_STATISTICS_BY_PLAYER_AND_GAME_COMPLETED:
            return action.playerGameStatistics;
        case actionTypes.REMOVE_STATISTICS_TO_PLAYER_OF_GAME_COMPLETED:
            return state;
        default:
            return state;
    }
}

const reducer = combineReducers({
    gameStatistics,
    playerGameStatistics
});

export default reducer;