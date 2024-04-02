import {config, appFetch} from './appFetch';

export const findPlayerByIdOfTeam = (playerId, teamId, onSuccess, onErrors) =>
    appFetch(`/players/${playerId}?teamId=${teamId}`, config('GET'), onSuccess, onErrors);

export const findPlayerById = (playerId, onSuccess, onErrors) =>
    appFetch(`/players/${playerId}`, config('GET'), onSuccess, onErrors);

export const findPlayersByUserId = (onSuccess, onErrors) =>
    appFetch('/players/user', config('GET'), onSuccess, onErrors);

export const findPlayerByDniOfTeam = (teamId, dni, onSuccess, onErrors) =>
    appFetch(`/players/${teamId}/dni?dni=${dni}`, config('GET'), onSuccess, onErrors);

export const findPlayersByCompletedNameOfTeam = (teamId, playerName, primaryLastName, secondLastName, onSuccess, onErrors) =>
    appFetch(`/players/${teamId}/name?name=${playerName}&primaryLastName=${primaryLastName}&secondLastName=${secondLastName}`, config('GET'), onSuccess, onErrors);

export const findAPlayersOfTeam = (teamId, onSuccess, onErrors) =>
    appFetch(`/players/${teamId}/team`, config('GET'), onSuccess, onErrors);

export const findPlayersByTraining = (trainingId, onSuccess, onErrors) =>
    appFetch(`/players/${trainingId}/training`, config('GET'), onSuccess, onErrors);

export const findPlayersByGame = (gameId, onSuccess, onErrors) =>
    appFetch(`/players/${gameId}/game`, config('GET'), onSuccess, onErrors);

export const findPlayersByPositionAndTeam = (teamId, position, onSuccess, onErrors) =>
    appFetch(`/players/${teamId}/position?position=${position}`, config('GET'), onSuccess, onErrors);

export const findPlayersrWithLesionOfTeam = (teamId, onSuccess, onErrors) =>
    appFetch(`/players/${teamId}/lesion`, config('GET'), onSuccess, onErrors);

export const findPlayersWithOneTypeLesion = (teamId, typeLesion, onSuccess, onErrors) =>
    appFetch(`/players/${teamId}/typeLesion?typeLesion=${typeLesion}`, config('GET'), onSuccess, onErrors);

export const addPlayer = (teamId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni, onSuccess, onErrors) =>
    appFetch(`/players?teamId=${teamId}&playerName=${playerName}&primaryLastName=${primaryLastName}&secondLastName=${secondLastName}&position=${position}&trends=${trends}&phoneNumber=${phoneNumber}&email=${email}&dni=${dni}`, config('POST'), onSuccess, onErrors);

export const changePlayerToTeam = (teamId, playerId, onSuccess, onErrors) =>
    appFetch(`/players/${teamId}/changePlayerToTeam?playerId=${playerId}`, config('POST'), onSuccess, onErrors);

export const clearTotalStatistics = (playerId, onSuccess, onErrors) =>
    appFetch(`/players/${playerId}/clearTotalStatistics`, config('POST'), onSuccess, onErrors);

export const updatePlayer = (playerId, teamId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni, onSuccess, onErrors) =>
    appFetch(`/players/${playerId}?teamId=${teamId}&playerName=${playerName}&primaryLastName=${primaryLastName}&secondLastName=${secondLastName}&position=${position}&trends=${trends}&phoneNumber=${phoneNumber}&email=${email}&dni=${dni}`, config('PUT'), onSuccess, onErrors);

export const removePlayer = (playerId, teamId, onSuccess, onErrors) =>
    appFetch(`/players/${playerId}?teamId=${teamId}`, config('DELETE'), onSuccess, onErrors);