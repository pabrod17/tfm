import {config, appFetch} from './appFetch';

export const findAllTeams = (onSuccess) =>
    appFetch('/teams', config('GET'), onSuccess);

export const findTeamById = (id, onSuccess) =>
    appFetch(`/teams/${id}`, config('GET'), onSuccess);

export const findTeamByName = (name, onSuccess) =>{
    appFetch(`/teams/?name=${name}`, config('GET'), onSuccess);
}
export const findTeamsByName = (name, onSuccess) =>{
    appFetch(`/teams/name?name=${name}`, config('GET'), onSuccess);
}
export const findTeamsByArena = (arena, onSuccess, onErrors) =>{
    appFetch(`/teams/arena?arena=${arena}`, config('GET'), onSuccess, onErrors);
}
export const findTeamsByOwner = (owner, onSuccess) =>{
    appFetch(`/teams/owner?owner=${owner}`, config('GET'), onSuccess);
}
export const addTeam = (name, arenaName, ownerName, description, onSuccess, onErrors) =>
    appFetch(`/teams?name=${name}&arenaName=${arenaName}&ownerName=${ownerName}&description=${description}`, config('POST'), onSuccess, onErrors);

export const updateTeam = (id, name, onSuccess, onErrors) =>
    appFetch(`/teams/${id}?name=${name}`, config('PUT'), onSuccess, onErrors);

export const removeTeam = (id, onSuccess, onErrors) =>{
    appFetch(`/teams/${id}`, config('DELETE'), onSuccess, onErrors);
}

export const addTeamToSeason = (seasonId, teamId, onSuccess, onErrors) =>
    appFetch(`/teams/${seasonId}/addTeamtoSeason/?teamId=${teamId}`, config('POST'), onSuccess, onErrors);

export const findTeamsToSeason = (seasonId, onSuccess, onErrors) => 
    appFetch(`/teams/${seasonId}/season`, config('GET'), onSuccess, onErrors);

export const removeTeamToSeason = (seasonId, teamId, onSuccess, onErrors) =>
    appFetch(`/teams/${seasonId}/season?teamId=${teamId}`, config('DELETE'), onSuccess, onErrors);