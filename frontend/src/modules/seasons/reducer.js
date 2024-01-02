import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    season: null,
    seasons: null
};

const season = (state = initialState.season, action) => {

    switch(action.type) {

        case actionTypes.ADD_SEASON_COMPLETED:
            return action.season;
        case actionTypes.UPDATE_SEASON_COMPLETED:
            return action.season;
        case actionTypes.FIND_SEASON_BY_ID_COMPLETED:
            return action.season;
        case actionTypes.ADD_SEASON_COMPLETED:
            return action.season;
        case actionTypes.REMOVE_SEASON_COMPLETED:
            return state;
        default:
            return state;
    }
}

const seasons = (state = initialState.seasons, action) => {

    switch(action.type) {

        case actionTypes.FIND_ALL_SEASONS_COMPLETED:
            return action.seasons;
        case actionTypes.FIND_SEASONS_BETWEEN_TWO_DATES_COMPLETED:
            return action.seasons;
        case actionTypes.FIND_SEASONS_TO_TEAM_COMPLETED:
            return action.seasons;
        default:
            return state;

    }
}

const reducer = combineReducers({
    season,
    seasons
});

export default reducer;