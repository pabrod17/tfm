import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findLesionByIdCompleted = lesion => ({
    type: actionTypes.FIND_LESION_BY_ID_COMPLETED,
    lesion
});

export const findLesionById = (lesionId, onSuccess, onErrors) => dispatch => {
    backend.lesionService.findLesionById(lesionId,
        lesion => {
            dispatch(findLesionByIdCompleted(lesion));
            onSuccess();
        },
        onErrors);
}








const findAllLesionPageCompleted = lesionsSearch => ({
    type: actionTypes.FIND_ALL_LESION_PAGE_COMPLETED,
    lesionsSearch
});

const clearLesionSearch = () => ({
    type: actionTypes.CLEAR_LESION_SEARCH
});


export const findAllLesionPage = (criteria, onSuccess, onErrors) => dispatch => {
    dispatch(clearLesionSearch());
    backend.lesionService.findAllLesionPage(criteria,
        result => {
            dispatch(findAllLesionPageCompleted({criteria, result}));
        },onSuccess,
        onErrors);
}


export const previousFindAllLesionResultPage = page => 
    findAllLesionPage({page: page});

export const nextFindAllLesionResultPage = page => 
    findAllLesionPage({page: page});




    const findAllLesionCompleted = lesions => ({
        type: actionTypes.FIND_ALL_LESION_COMPLETED,
        lesions
    });
    
    export const findAllLesion = (onSuccess, onErrors) => dispatch => {
        backend.lesionService.findAllLesion(
            lesions => {
                dispatch(findAllLesionCompleted(lesions));
            },onSuccess,
            onErrors);
    }




const findLesionByTypePageCompleted = lesionsSearch => ({
    type: actionTypes.FIND_LESION_BY_TYPE_PAGE_COMPLETED,
    lesionsSearch
});

export const findLesionByTypePage = (criteria, onSuccess, onErrors) => dispatch => {
    dispatch(clearLesionSearch());
    backend.lesionService.findLesionByTypePage(criteria,
        result => {
            dispatch(findLesionByTypePageCompleted({criteria, result}));
        },onSuccess,
        onErrors);
}


export const previousFindLesionByTypeResultPage =(lesionType, page)  => 
    findLesionByTypePage({page: page, lesionType: lesionType});

export const nextFindLesionByTypeResultPage = (lesionType, page) => 
    findLesionByTypePage({page: page, lesionType: lesionType});






const findLesionByTypeCompleted = lesions => ({
    type: actionTypes.FIND_LESION_BY_TYPE_COMPLETED,
    lesions
});

export const findLesionByType = (lesionType, onSuccess, onErrors) => dispatch => {
    backend.lesionService.findLesionByType(lesionType,
        lesions => {
            dispatch(findLesionByTypeCompleted(lesions));
        },onSuccess,
        onErrors);
}


const findLesionByPlayerCompleted = lesions => ({
    type: actionTypes.FIND_LESION_BY_PLAYER_COMPLETED,
    lesions
});

export const findLesionByPlayer = (playerId, onSuccess, onErrors) => dispatch => {
    backend.lesionService.findLesionByPlayer(playerId,
        lesions => {
            dispatch(findLesionByPlayerCompleted(lesions));
            onSuccess();
        },
        onErrors);
}

const addLesionCompleted = lesion => ({
    type: actionTypes.ADD_LESION_COMPLETED,
    lesion
});

export const addLesion = (lesionName, description, medication, lesionType, onSuccess, onErrors) => dispatch => {
    backend.lesionService.addLesion(lesionName, description, medication, lesionType,
        lesion => {
            dispatch(addLesionCompleted(lesion));
            onSuccess();
        },
        onErrors);
}

export const addLesionToPlayer = (playerId, lesionId, onSuccess, onErrors) => {
    backend.lesionService.addLesionToPlayer(playerId, lesionId, onSuccess, onErrors);
    return {type: actionTypes.ADD_LESION_TO_PLAYER_COMPLETED};
}

const updateLesionCompleted = lesion => ({
    type: actionTypes.UPDATE_LESION_COMPLETED,
    lesion
});

export const updateLesion = (lesionId, lesionName, description, medication, lesionType, onSuccess, onErrors) => dispatch => {
    backend.lesionService.updateLesion(lesionId, lesionName, description, medication, lesionType,
        lesion => {
            dispatch(updateLesionCompleted(lesion));
            onSuccess();
        },
        onErrors);
}

export const removeLesion = (lesionId, onSuccess, onErrors) => {
    backend.lesionService.removeLesion(lesionId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_LESION_COMPLETED};
}

export const removeLesionToPlayer = (playerId, lesionId, onSuccess, onErrors) => {
    backend.lesionService.removeLesionToPlayer(playerId, lesionId, onSuccess(), onErrors);
    return {type: actionTypes.REMOVE_LESION_TO_PLAYER_COMPLETED};
}