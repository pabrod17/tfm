import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findStretchingByIdCompleted = stretching => ({
    type: actionTypes.FIND_STRETCHING_BY_ID_COMPLETED,
    stretching
});

export const findStretchingById = (stretchingId, onSuccess, onErrors) => dispatch => {
    backend.stretchingService.findStretchingById(stretchingId,
        stretching => {
            dispatch(findStretchingByIdCompleted(stretching));
            onSuccess();
        },
        onErrors);
}

const findAllStretchingsCompleted = stretchings => ({
    type: actionTypes.FIND_ALL_STRETCHINGS_COMPLETED,
    stretchings
});

export const findAllStretchings = (onSuccess, onErrors) => dispatch => {
    backend.stretchingService.findAllStretchings(
        stretchings => {
            dispatch(findAllStretchingsCompleted(stretchings));
        },onSuccess,
        onErrors);
}




const clearStretchingSearch = () => ({
    type: actionTypes.CLEAR_STRETCHING_SEARCH
});

const clearStretchingByTrainingId = () => ({
    type: actionTypes.CLEAR_STRETCHINGS_BY_TRAINING_ID
});


const findAllStretchingsPageCompleted = stretchingsSearch => ({
    type: actionTypes.FIND_ALL_STRETCHINGS_PAGE_COMPLETED,
    stretchingsSearch
});

export const findAllStretchingsPage = (criteria, onSuccess, onErrors) => dispatch => {
    dispatch(clearStretchingSearch());
    backend.stretchingService.findAllStretchingsPage(criteria,
        result => {
            dispatch(findAllStretchingsPageCompleted({criteria, result}));
        },onSuccess,
        onErrors);
}

export const previousFindAllStretchingsResultPage = page => 
    findAllStretchingsPage({page: page});

export const nextFindAllStretchingsResultPage = page => 
    findAllStretchingsPage({page: page});







    const findStretchingsByTypePageCompleted = stretchingsSearch => ({
        type: actionTypes.FIND_STRETCHINGS_BY_TYPE_PAGE_COMPLETED,
        stretchingsSearch
    });
    
    export const findStretchingsByTypePage = (criteria, onSuccess, onErrors) => dispatch => {
        backend.stretchingService.findStretchingsByTypePage(criteria,
            result => {
                dispatch(findStretchingsByTypePageCompleted({criteria, result}));
            },onSuccess,
            onErrors);
    }

export const previousFindStretchingsByTypeResultPage =(stretchingType, page)  => 
    findStretchingsByTypePage({page: page, stretchingType: stretchingType});

export const nextFindStretchingsByTypeResultPage = (stretchingType, page) => 
    findStretchingsByTypePage({page: page, stretchingType: stretchingType});









const findStretchingsByTypeCompleted = stretchings => ({
    type: actionTypes.FIND_STRETCHINGS_BY_TYPE_COMPLETED,
    stretchings
});

export const findStretchingsByType = (stretchingType, onSuccess, onErrors) => dispatch => {
    backend.stretchingService.findStretchingsByType(stretchingType,
        stretchings => {
            dispatch(findStretchingsByTypeCompleted(stretchings));
        },onSuccess,
        onErrors);
}

const findStretchingsByPlayerIdCompleted = stretchings => ({
    type: actionTypes.FIND_STRETCHINGS_BY_PLAYER_ID_COMPLETED,
    stretchings
});

export const findStretchingsByPlayerId = (playerId, onSuccess, onErrors) => dispatch => {
    backend.stretchingService.findStretchingsByPlayerId(playerId,
        stretchings => {
            dispatch(findStretchingsByPlayerIdCompleted(stretchings));
            onSuccess();
        },
        onErrors);
}

const findStretchingsByTrainingIdCompleted = stretchingsByTrainingId => ({
    type: actionTypes.FIND_STRETCHINGS_BY_TRAINING_ID_COMPLETED,
    stretchingsByTrainingId
});

export const findStretchingsByTrainingId = (trainingId, onSuccess, onErrors) => dispatch => {
    dispatch(clearStretchingByTrainingId());
    backend.stretchingService.findStretchingsByTrainingId(trainingId,
        stretchings => {
            dispatch(findStretchingsByTrainingIdCompleted(stretchings));
            onSuccess();
        },
        onErrors);
}

const findStretchingsByGameIdCompleted = stretchingsByGameId => ({
    type: actionTypes.FIND_STRETCHINGS_BY_GAME_ID_COMPLETED,
    stretchingsByGameId
});

export const findStretchingsByGameId = (gameId, onSuccess, onErrors) => dispatch => {
    backend.stretchingService.findStretchingsByGameId(gameId,
        stretchings => {
            dispatch(findStretchingsByGameIdCompleted(stretchings));
            onSuccess();
        },
        onErrors);
}

const addStretchingCompleted = stretching => ({
    type: actionTypes.ADD_STRETCHING_COMPLETED,
    stretching
});

export const addStretching = (stretchingName, description, stretchingType, onSuccess, onErrors) => dispatch => {
    backend.stretchingService.addStretching(stretchingName, description, stretchingType,
        stretching => {
            dispatch(addStretchingCompleted(stretching));
            onSuccess();
        },
        onErrors);
}

export const addStretchingToPlayer = (playerId, stretchingId, onSuccess, onErrors) => {
    backend.stretchingService.addStretchingToPlayer(playerId, stretchingId, onSuccess, onErrors);
    return {type: actionTypes.ADD_STRETCHING_TO_PLAYER_COMPLETED};
}

export const addStretchingToTraining = (trainingId, stretchingId, onSuccess, onErrors) => {
    backend.stretchingService.addStretchingToTraining(trainingId, stretchingId, onSuccess, onErrors);
    return {type: actionTypes.ADD_STRETCHING_TO_TRAINING_COMPLETED};
}

export const addStretchingToGame = (gameId, stretchingId, onSuccess, onErrors) => {
    backend.stretchingService.addStretchingToGame(gameId, stretchingId, onSuccess, onErrors);
    return {type: actionTypes.ADD_STRETCHING_TO_GAME_COMPLETED};
}

const updatStretchingCompleted = stretching => ({
    type: actionTypes.UPDATE_STRETCHING_COMPLETED,
    stretching
});

export const updatStretching = (stretchingId, stretchingName, description, stretchingType, onSuccess, onErrors) => dispatch => {
    backend.stretchingService.updatStretching(stretchingId, stretchingName, description, stretchingType,
        stretching => {
            dispatch(updatStretchingCompleted(stretching));
            onSuccess();
        },
        onErrors);
}

export const removeStretching = (stretchingId, onSuccess, onErrors) => {
    backend.stretchingService.removeStretching(stretchingId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_STRETCHING_COMPLETED};
}

export const removeStretchingToPlayer = (playerId, stretchingId, onSuccess, onErrors) => {
    backend.stretchingService.removeStretchingToPlayer(playerId, stretchingId, onSuccess(), onErrors);
    return {type: actionTypes.REMOVE_STRETCHING_TO_PLAYER_COMPLETED};
}

export const removeStretchingToTraining = (trainingId, stretchingId, onSuccess, onErrors) => {
    backend.stretchingService.removeStretchingToTraining(trainingId, stretchingId, onSuccess(), onErrors);
    return {type: actionTypes.REMOVE_STRETCHING_TO_TRAINING_COMPLETED};
}

export const removeStretchingToGame = (gameId, stretchingId, onSuccess, onErrors) => {
    backend.stretchingService.removeStretchingToGame(gameId, stretchingId, onSuccess(), onErrors);
    return {type: actionTypes.REMOVE_STRETCHING_TO_GAME_COMPLETED};
}