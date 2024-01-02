import {config, appFetch} from './appFetch';

export const findLesionById = (lesionId, onSuccess, onErrors) => 
    appFetch(`/lesion/${lesionId}`, config('GET'), onSuccess, onErrors);

export const findAllLesionPage = ({page}, onSuccess, onErrors) => 
    appFetch(`/lesion/page?page=${page}`, config('GET'), onSuccess, onErrors);

export const findAllLesion = (onSuccess, onErrors) => 
    appFetch(`/lesion`, config('GET'), onSuccess, onErrors);

export const findLesionByTypePage = ({lesionType, page}, onSuccess, onErrors) =>
    appFetch(`/lesion/${lesionType}/typeLesion/page?page=${page}`, config('GET'), onSuccess, onErrors);

export const findLesionByType = (lesionType, onSuccess, onErrors) =>
    appFetch(`/lesion/${lesionType}/typeLesion`, config('GET'), onSuccess, onErrors);

export const findLesionByPlayer = (playerId, onSuccess, onErrors) => 
    appFetch(`/lesion/${playerId}/player`, config('GET'), onSuccess, onErrors);

export const addLesion = (lesionName, description, medication, lesionType, onSuccess, onErrors) => 
    appFetch(`/lesion?lesionName=${lesionName}&description=${description}&medication=${medication}&lesionType=${lesionType}`, config('POST'), onSuccess, onErrors);

export const addLesionToPlayer = (playerId, lesionId, onSuccess, onErrors) =>
    appFetch(`/lesion/${playerId}/addLesionToPlayer?lesionId=${lesionId}`, config('POST'), onSuccess, onErrors);

export const updateLesion = (lesionId, lesionName, description, medication, lesionType, onSuccess, onErrors) =>
    appFetch(`/lesion/${lesionId}?lesionName=${lesionName}&description=${description}&medication=${medication}&lesionType=${lesionType}`, config('PUT'), onSuccess, onErrors);

export const removeLesion = (lesionId, onSuccess, onErrors) => 
    appFetch(`/lesion/${lesionId}`, config('DELETE'), onSuccess, onErrors);

export const removeLesionToPlayer = (playerId, lesionId, onSuccess, onErrors) =>
    appFetch(`/lesion/${playerId}/player?lesionId=${lesionId}`, config('DELETE'), onSuccess, onErrors);