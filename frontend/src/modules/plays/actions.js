import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findPlayByIdCompleted = play => ({
    type: actionTypes.FIND_PLAY_BY_ID_COMPLETED,
    play
});

export const findPlayById = (playId, onSuccess, onErrors) => dispatch => {
    backend.playService.findPlayById(playId,
        play => {
            dispatch(findPlayByIdCompleted(play));
            onSuccess();
        },
        onErrors)
};

const findPlaysByTeamIdCompleted = plays => ({
    type: actionTypes.FIND_PLAYS_BY_TEAM_ID_COMPLETED,
    plays
});

export const findPlaysByTeamId = (teamId, onSuccess, onErrors) => dispatch => {
    backend.playService.findPlaysByTeamId(teamId,
        plays => {
            dispatch(findPlaysByTeamIdCompleted(plays));
            onSuccess();
        },
        onErrors)
};

const findPlaysByTypeAndTeamCompleted = plays => ({
    type: actionTypes.FIND_PLAYS_BY_TYPE_AND_TEAM_COMPLETED,
    plays
});

export const findPlaysByTypeAndTeam = (teamId, playType, onSuccess, onErrors) => dispatch => {
    backend.playService.findPlaysByTypeAndTeam(teamId, playType,
        plays => {
            dispatch(findPlaysByTypeAndTeamCompleted(plays));
        },onSuccess,
        onErrors);
};

const addPlayCompleted = play => ({
    type: actionTypes.ADD_PLAY_COMPLETED,
    play
});

export const addPlay = (teamId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText, onSuccess, onErrors) => dispatch => {
    backend.playService.addPlay(teamId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText,
        play => {
            dispatch(addPlayCompleted(play));
            onSuccess();
        },
        onErrors)
};

export const addPlayToTeam = (teamId, playId, onSuccess, onErrors) => {
    backend.playService.addPlayToTeam(teamId, playId, onSuccess, onErrors);
    return {type: actionTypes.ADD_PLAY_TO_TEAM_COMPLETED};
}

const updatePlayCompleted = play => ({
    type: actionTypes.UPDATE_PLAY_COMPLETED,
    play
});

export const updatePlay = (playId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText, onSuccess, onErrors) => dispatch => {
    backend.playService.updatePlay(playId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText,
        play => {
            dispatch(updatePlayCompleted(play));
            onSuccess();
        },
        onErrors)
};

export const removePlayToTeam = (playId, teamId, onSuccess, onErrors) => {
    backend.playService.removePlayToTeam(playId, teamId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_PLAY_TO_TEAM_COMPLETED};
}