import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    game: null,
    games:null,
    gamesBySeasonId:null,
    gamesByTeamId:null
};

const game = (state = initialState.game, action) => {

    switch(action.type) {
        case actionTypes.ADD_GAME_COMPLETED:
            return action.game;
        case actionTypes.ADD_PLAYER_TO_GAME_COMPLETED:
            return state;
        case actionTypes.UPDATE_GAME_COMPLETED:
            return action.game;
        case actionTypes.REMOVE_GAME_COMPLETED:
            return state;
        case actionTypes.REMOVE_PLAYER_TO_GAME_COMPLETED:
            return state;
        case actionTypes.FIND_GAME_BY_ID_COMPLETED:
            return action.game;
        default:
            return state;
    }
}

const games = (state = initialState.games, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_GAMES_BY_USER_ID_COMPLETED:
            return action.games;
        case actionTypes.FIND_GAMES_BY_PLAYER_ID_COMPLETED:
            return action.games;
        case actionTypes.FIND_GAMES_BY_TWO_DATES_AND_TEAM_ID_OR_SEASON_ID_COMPLETED:
            return action.games;
        default:
            return state;
    }
}

const gamesBySeasonId = (state = initialState.gamesBySeasonId, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_GAMES_BY_SEASON_ID_COMPLETED:
            return action.gamesBySeasonId;
        default:
            return state;
    }
}

const gamesByTeamId = (state = initialState.gamesByTeamId, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_GAMES_BY_TEAM_ID_COMPLETED:
            return action.gamesByTeamId;
        default:
            return state;
    }
}

const reducer = combineReducers({
    game,
    games,
    gamesBySeasonId,
    gamesByTeamId
});

export default reducer;