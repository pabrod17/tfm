import {config, appFetch} from './appFetch';

export const findStretchingById = (stretchingId, onSuccess, onErrors) => 
    appFetch(`/stretchings/${stretchingId}`, config('GET'), onSuccess, onErrors);

export const findAllStretchings = (onSuccess, onErrors) => 
    appFetch('/stretchings', config('GET'), onSuccess, onErrors);

export const findAllStretchingsPage = ({page}, onSuccess, onErrors) => 
    appFetch(`/stretchings/page?page=${page}`, config('GET'), onSuccess, onErrors);

export const findStretchingsByTypePage = ({stretchingType, page}, onSuccess, onErrors) =>
    appFetch(`/stretchings/${stretchingType}/stretchingType/page?page=${page}`, config('GET'), onSuccess, onErrors);

export const findStretchingsByType = (stretchingType, onSuccess, onErrors) =>
    appFetch(`/stretchings/${stretchingType}/stretchingType`, config('GET'), onSuccess, onErrors);

export const findStretchingsByPlayerId = (playerId, onSuccess, onErrors) => 
    appFetch(`/stretchings/${playerId}/player`, config('GET'), onSuccess, onErrors);

export const findStretchingsByTrainingId = (trainingId, onSuccess, onErrors) => 
    appFetch(`/stretchings/${trainingId}/training`, config('GET'), onSuccess, onErrors);

export const findStretchingsByGameId = (gameId, onSuccess, onErrors) => 
    appFetch(`/stretchings/${gameId}/game`, config('GET'), onSuccess, onErrors);

export const addStretching = (stretchingName, description, stretchingType, onSuccess, onErrors) => 
    appFetch(`/stretchings?stretchingName=${stretchingName}&description=${description}&stretchingType=${stretchingType}`, config('POST'), onSuccess, onErrors);

export const addStretchingToPlayer = (playerId, stretchingId, onSuccess, onErrors) =>
    appFetch(`/stretchings/${playerId}/addStretchingToPlayer?stretchingId=${stretchingId}`, config('POST'), onSuccess, onErrors);

export const addStretchingToTraining = (trainingId, stretchingId, onSuccess, onErrors) =>
    appFetch(`/stretchings/${trainingId}/addStretchingToTraining?stretchingId=${stretchingId}`, config('POST'), onSuccess, onErrors);

export const addStretchingToGame = (gameId, stretchingId, onSuccess, onErrors) =>
    appFetch(`/stretchings/${gameId}/addStretchingToGame?stretchingId=${stretchingId}`, config('POST'), onSuccess, onErrors);

export const updatStretching = (stretchingId, stretchingName, description, stretchingType, onSuccess, onErrors) => 
    appFetch(`/stretchings/${stretchingId}?stretchingName=${stretchingName}&description=${description}&stretchingType=${stretchingType}`, config('PUT'), onSuccess, onErrors);

export const removeStretching = (stretchingId, onSuccess, onErrors) => 
    appFetch(`/stretchings/${stretchingId}`, config('DELETE'), onSuccess, onErrors);

export const removeStretchingToPlayer = (playerId, stretchingId, onSuccess, onErrors) =>
    appFetch(`/stretchings/${playerId}/player?stretchingId=${stretchingId}`, config('DELETE'), onSuccess, onErrors);

export const removeStretchingToTraining = (trainingId, stretchingId, onSuccess, onErrors) =>
    appFetch(`/stretchings/${trainingId}/training?stretchingId=${stretchingId}`, config('DELETE'), onSuccess, onErrors);

export const removeStretchingToGame = (gameId, stretchingId, onSuccess, onErrors) =>
    appFetch(`/stretchings/${gameId}/game?stretchingId=${stretchingId}`, config('DELETE'), onSuccess, onErrors);