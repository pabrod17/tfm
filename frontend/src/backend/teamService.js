import {config, appFetch} from './appFetch';

export const findAllTeams = (onSuccess) =>
    appFetch('/teams', config('GET'), onSuccess);

export const findTeamById = (id, onSuccess) =>
    appFetch(`/teams/${id}`, config('GET'), onSuccess);

export const findTeamByName = (name, onSuccess) =>{
    appFetch(`/teams/?name=${name}`, config('GET'), onSuccess);
}

export const addTeam = (name, onSuccess, onErrors) =>
    appFetch(`/teams?name=${name}`, config('POST'), onSuccess, onErrors);

export const updateTeam = (id, name, onSuccess, onErrors) =>
    appFetch(`/teams/${id}?name=${name}`, config('PUT'), onSuccess, onErrors);

export const removeTeam = (id, onSuccess, onErrors) =>{
    appFetch(`/teams/${id}`, config('DELETE'), onSuccess, onErrors);
}

export const addTeamToSeason = (seasonId, teamId, onSuccess, onErrors) =>
    appFetch(`/teams/${seasonId}/addTeamtoSeason/?teamId=${teamId}`, config('POST'), onSuccess, onErrors);

export const findTeamsToSeason = (seasonId, onSuccess, onErrors) => 
    appFetch(`/teams/${seasonId}/season`, config('GET'), onSuccess, onErrors);

