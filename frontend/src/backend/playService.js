import {config, appFetch} from './appFetch';

export const findPlayById = (playId, onSuccess, onErrors) => 
    appFetch(`/plays/${playId}`, config('GET'), onSuccess, onErrors);

export const findPlaysByTeamId = (teamId, onSuccess, onErrors) =>
    appFetch(`/plays/${teamId}/team`, config('GET'), onSuccess, onErrors);

export const findPlaysByTypeAndTeam = (teamId, playType, onSuccess, onErrors) =>
    appFetch(`/plays/${teamId}/playType?playType=${playType}`, config('GET'), onSuccess, onErrors);

export const addPlay = (teamId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText, onSuccess, onErrors) =>
    appFetch(`/plays?teamId=${teamId}&title=${title}&playType=${playType}&gesture=${gesture}&pointGuardText=${pointGuardText}&shootingGuardText=${shootingGuardText}&smallForwardText=${smallForwardText}&powerForwardText=${powerForwardText}&centerText=${centerText}`, config('POST'), onSuccess, onErrors);

export const addPlayToTeam = (teamId, playId, onSuccess, onErrors) => 
    appFetch(`/plays/${teamId}/addPlayToTeam?playId=${playId}`, config('POST'), onSuccess, onErrors);

export const updatePlay = (playId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText, onSuccess, onErrors) =>
    appFetch(`/plays/${playId}?title=${title}&playType=${playType}&gesture=${gesture}&pointGuardText=${pointGuardText}&shootingGuardText=${shootingGuardText}&smallForwardText=${smallForwardText}&powerForwardText=${powerForwardText}&centerText=${centerText}`, config('PUT'), onSuccess, onErrors);

export const removePlayToTeam = (playId, teamId, onSuccess, onErrors) => 
    appFetch(`/plays/${playId}?teamId=${teamId}`, config('DELETE'), onSuccess, onErrors);
