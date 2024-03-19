import {config, appFetch} from './appFetch';

export const findGameById = (gameId, onSuccess, onErrors) =>
    appFetch(`/games/${gameId}`, config('GET'), onSuccess, onErrors);

export const findGamesByUserId = (onSuccess, onErrors) =>
    appFetch('/games/user', config('GET'), onSuccess, onErrors);

export const findGamesByPlayerId = (playerId, onSuccess, onErrors) =>
    appFetch(`/games/${playerId}/player`, config('GET'), onSuccess, onErrors);

export const findGamesByTwoDatesAndTeamIdOrSeasonId = (teamId, seasonId, startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/games/dates?teamId=${teamId}&seasonId=${seasonId}&startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const findGamesByTwoDates= (startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/games/dates?startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const findGamesByTwoDatesAndTeamId = (teamId, startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/games/dates?teamId=${teamId}&startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const findGamesByTwoDatesAndSeasonId = (seasonId, startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/games/dates?seasonId=${seasonId}&startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const findGamesByTeamId = (teamId, onSuccess, onErrors) =>
    appFetch(`/games/${teamId}/team`, config('GET'), onSuccess, onErrors);

export const findGamesBySeasonId = (seasonId, onSuccess, onErrors) =>
    appFetch(`/games/${seasonId}/season`, config('GET'), onSuccess, onErrors);

export const addGame = (teamId, seasonId, gameDate, rival, description, onSuccess, onErrors) =>
    appFetch(`/games?teamId=${teamId}&seasonId=${seasonId}&gameDate=${gameDate}&rival=${rival}&description=${description}`, config('POST'), onSuccess, onErrors);

export const addGameWithTeam = (teamId, gameDate, rival, description, onSuccess, onErrors) =>
    appFetch(`/games?teamId=${teamId}&gameDate=${gameDate}&rival=${rival}&description=${description}`, config('POST'), onSuccess, onErrors);

export const addGameWithSeason = (seasonId, gameDate, rival, description, onSuccess, onErrors) =>
    appFetch(`/games?seasonId=${seasonId}&gameDate=${gameDate}&rival=${rival}&description=${description}`, config('POST'), onSuccess, onErrors);


export const addPlayerToGame = (playerId, gameId, onSuccess, onErrors) =>
    appFetch(`/games/${playerId}/addPlayerToGame?gameId=${gameId}`, config('POST'), onSuccess, onErrors);

export const updateGame = (gameId, gameDate, rival, onSuccess, onErrors) =>
    appFetch(`/games/${gameId}?gameDate=${gameDate}&rival=${rival}`, config('PUT'), onSuccess, onErrors);

export const removeGame = (gameId, onSuccess, onErrors) =>
    appFetch(`/games/${gameId}`, config('DELETE'), onSuccess, onErrors);

    export const removePlayerToGame = (playerId, gameId, onSuccess, onErrors) =>
    appFetch(`/games/${playerId}/player?gameId=${gameId}`, config('DELETE'), onSuccess, onErrors);