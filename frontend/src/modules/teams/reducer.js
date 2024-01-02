import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    team: null,
    teams: null
};

const team = (state = initialState.team, action) => {

    switch (action.type) {

        case actionTypes.ADD_TEAM_COMPLETED:
            return action.team;
        case actionTypes.UPDATE_TEAM_COMPLETED:
            return action.team;
        case actionTypes.FIND_TEAM_BY_NAME_COMPLETED:
            return action.team;                
        case actionTypes.FIND_TEAM_BY_ID_COMPLETED:
            return action.team;
        case actionTypes.REMOVE_TEAM_COMPLETED:
            return state;
        case actionTypes.ADD_TEAM_TO_SEASON_COMPLETED:
            return state;
        default:
            return state;

    }
}

const teams = (state = initialState.teams, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_TEAMS_COMPLETED:
            return action.teams;
        case actionTypes.FIND_TEAMS_TO_SEASON_COMPLETED:
            return action.teams;
        default:
            return state;

    }
}

const reducer = combineReducers({
    team,
    teams
});

export default reducer;