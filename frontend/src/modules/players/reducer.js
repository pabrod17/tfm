import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    player: null,
    players: null,
    playersByGameId: null,
    playersByTrainingId: null
};

const player = (state = initialState.player, action) => {

    switch (action.type) {

        case actionTypes.ADD_PLAYER_COMPLETED:
            return action.player;
        case actionTypes.UPDATE_PLAYER_COMPLETED:
            return action.player;
        case actionTypes.FIND_PLAYER_BY_ID_OF_TEAM_COMPLETED:
            return action.player;
        case actionTypes.FIND_PLAYER_BY_DNI_OF_TEAM_COMPLETED:
            return action.player;
        case actionTypes.FIND_PLAYER_BY_ID_COMPLETED:
            return action.player;
        case actionTypes.REMOVE_PLAYER_COMPLETED:
            return state;
        case actionTypes.CHANGE_PLAYER_TO_TEAM_COMPLETED:
            return state;
        case actionTypes.CLEAR_TOTAL_STATISTICS_COMPLETED:
            return state;
        default:
            return state;
    }

}

const players = (state = initialState.players, action) => {

    switch (action.type) {

        case actionTypes.FIND_PLAYERS_BY_COMPLETED_NAME_OF_TEAM_COMPLETED:
            return action.players;
        case actionTypes.FIND_PLAYERS_BY_USER_ID_COMPLETED:
            return action.players;
        case actionTypes.FIND_PLAYERS_OF_TEAM_COMPLETED:
            return action.players;
        case actionTypes.FIND_PLAYERS_BY_POSITION_AND_TEAM_COMPLETED:
            return action.players;
        case actionTypes.FIND_PLAYERS_WITH_LESION_OF_TEAM_COMPLETED:
            return action.players;
        case actionTypes.FIND_PLAYERS_WITH_ONE_TYPE_LESION_COMPLETED:
            return action.players;
        default:
            return state;
    }
}

const playersByGameId = (state = initialState.playersByGameId, action) => {

    switch (action.type) {

        case actionTypes.FIND_PLAYERS_BY_GAME_COMPLETED:
            return action.playersByGameId;
        default:
            return state;
    }
}

const playersByTrainingId = (state = initialState.playersByTrainingId, action) => {

    switch (action.type) {

        case actionTypes.FIND_PLAYERS_BY_TRAINING_COMPLETED:
            return action.playersByTrainingId;
        default:
            return state;
    }
}

const reducer = combineReducers({
    player,
    players,
    playersByGameId,
    playersByTrainingId
});

export default reducer;