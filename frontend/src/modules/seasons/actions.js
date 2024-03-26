import * as actionTypes from './actionsTypes';
import backend from '../../backend';


const findAllSeaonsCompleted = seasons => ({
    type: actionTypes.FIND_ALL_SEASONS_COMPLETED,
    seasons
});

export const findAllSeasons = (onSuccess, onErrors) => dispatch => {
    backend.seasonService.findAllSeasons(
        seasons => {
            dispatch(findAllSeaonsCompleted(seasons));
            onSuccess();
        },
        onErrors);
}

const findSeasonByIdCompleted = season => ({
    type: actionTypes.FIND_SEASON_BY_ID_COMPLETED,
    season
});

export const findSeasonById = (id, onSuccess) => dispatch => {
    backend.seasonService.findSeasonById(id,
        season => {dispatch(findSeasonByIdCompleted(season));
        onSuccess();
        }
    );
}

const findSeasonsBetweenTwoDatesCompleted = seasons => ({
    type: actionTypes.FIND_SEASONS_BETWEEN_TWO_DATES_COMPLETED,
    seasons
});

export const findSeasonsBetweenTwoDates = (startDate, endDate, onSucces, onErrors) => dispatch => {
    backend.seasonService.findSeasonsBetweenTwoDates(startDate, endDate,
        seasons => {dispatch(findSeasonsBetweenTwoDatesCompleted(seasons));
        onSucces();
        },
    onErrors);
}

const updateSeasonCompleted = season => ({
    type: actionTypes.UPDATE_SEASON_COMPLETED,
    season
});

export const updateSeason =  (id, startDate, endDate, calendario, onSuccess, onErrors) => dispatch =>{
    backend.seasonService.updateSeason(id, startDate, endDate, calendario,
        season => {
            dispatch(updateSeasonCompleted(season));
            onSuccess();
        },
        onErrors);
}

const addSeasonCompleted = season => ({
    type: actionTypes.ADD_SEASON_COMPLETED,
    season
});

export const addSeason =  (startDate, endDate, seasonName, description, onSuccess, onErrors) => dispatch =>{
    backend.seasonService.addSeason(startDate, endDate, seasonName, description,
        season => {
            dispatch(addSeasonCompleted(season));
            onSuccess();
        },
        onErrors);
}

export const removeSeason = (id, onSuccess, onErrors) => {
    backend.seasonService.removeSeason(id, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_SEASON_COMPLETED};
}

const findSeasonsToTeamCompleted = seasons => ({
    type: actionTypes.FIND_SEASONS_TO_TEAM_COMPLETED,
    seasons
});

export const findSeasonsToTeam = (teamId, onSucces, onErrors) => dispatch => {
    backend.seasonService.findSeasonsToTeam(teamId,
        seasons => { dispatch(findSeasonsToTeamCompleted(seasons));
            onSucces();
        },
        onErrors);
}