import {config, appFetch} from './appFetch';

export const findPlayById = (playId, onSuccess, onErrors) => 
    appFetch(`/plays/${playId}`, config('GET'), onSuccess, onErrors);

export const findPlaysByUserId = (onSuccess, onErrors) =>
    appFetch('/plays/user', config('GET'), onSuccess, onErrors);

export const findPlaysByTeamId = (teamId, onSuccess, onErrors) =>
    appFetch(`/plays/${teamId}/team`, config('GET'), onSuccess, onErrors);

export const findPlaysByType = (playType, onSuccess, onErrors) =>
    appFetch(`/plays/playType?playType=${playType}`, config('GET'), onSuccess, onErrors);

export const addPlay = (teamId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText, description, onSuccess, onErrors) =>
    appFetch(`/plays?teamId=${teamId}&title=${title}&playType=${playType}&gesture=${gesture}&pointGuardText=${pointGuardText}&shootingGuardText=${shootingGuardText}&smallForwardText=${smallForwardText}&powerForwardText=${powerForwardText}&centerText=${centerText}&description=${description}`, config('POST'), onSuccess, onErrors);

export const addPlayToTeam = (teamId, playId, onSuccess, onErrors) => 
    appFetch(`/plays/${teamId}/addPlayToTeam?playId=${playId}`, config('POST'), onSuccess, onErrors);

export const updatePlay = (playId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText, description, onSuccess, onErrors) =>
    appFetch(`/plays/${playId}?title=${title}&playType=${playType}&gesture=${gesture}&pointGuardText=${pointGuardText}&shootingGuardText=${shootingGuardText}&smallForwardText=${smallForwardText}&powerForwardText=${powerForwardText}&centerText=${centerText}&description=${description}`, config('PUT'), onSuccess, onErrors);

export const removePlayToTeam = (playId, teamId, onSuccess, onErrors) => 
    appFetch(`/plays/${playId}?teamId=${teamId}`, config('DELETE'), onSuccess, onErrors);
export const removePlay = (playId, onSuccess, onErrors) => 
    appFetch(`/plays/play/${playId}`, config('DELETE'), onSuccess, onErrors);