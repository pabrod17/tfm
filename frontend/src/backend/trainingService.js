import {config, appFetch} from './appFetch';

export const findTrainingById = (trainingId, onSuccess, onErrors) =>
    appFetch(`/trainings/${trainingId}`, config('GET'), onSuccess, onErrors);

export const findTrainingsByUserId = (onSuccess, onErrors) =>
    appFetch('/trainings/user', config('GET'), onSuccess, onErrors);

export const findTrainingsByPlayerId = (playerId, onSuccess, onErrors) =>
    appFetch(`/trainings/${playerId}/player`, config('GET'), onSuccess, onErrors);

export const findTrainingsByTwoDatesAndTeamIdOrSeasonId = (teamId, seasonId, startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/trainings/dates?teamId=${teamId}&seasonId=${seasonId}&startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const findTrainingsByTwoDates = (startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/trainings/dates?startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const findTrainingsByTwoDatesAndSeasonId = (seasonId, startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/trainings/dates?seasonId=${seasonId}&startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const findTrainingsByTwoDatesAndTeamId = (teamId, startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/trainings/dates?teamId=${teamId}&startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const findTrainingsByTeamId = (teamId, onSuccess, onErrors) =>
    appFetch(`/trainings/${teamId}/team`, config('GET'), onSuccess, onErrors);

export const findTrainingsBySeasonId = (seasonId, onSuccess, onErrors) =>
    appFetch(`/trainings/${seasonId}/season`, config('GET'), onSuccess, onErrors);

export const addTraining = (teamId, seasonId, trainingDate, durationMinutes, description, objective, onSuccess, onErrors) =>
    appFetch(`/trainings?teamId=${teamId}&seasonId=${seasonId}&trainingDate=${trainingDate}&durationMinutes=${durationMinutes}&description=${description}&objective=${objective}`, config('POST'), onSuccess, onErrors);

export const addTrainingWithTeam = (teamId, trainingDate, durationMinutes, description, objective, onSuccess, onErrors) =>
    appFetch(`/trainings?teamId=${teamId}&trainingDate=${trainingDate}&durationMinutes=${durationMinutes}&description=${description}&objective=${objective}`, config('POST'), onSuccess, onErrors);

export const addTrainingWithSeason = (seasonId, trainingDate, durationMinutes, description, objective, onSuccess, onErrors) =>
    appFetch(`/trainings?seasonId=${seasonId}&trainingDate=${trainingDate}&durationMinutes=${durationMinutes}&description=${description}&objective=${objective}`, config('POST'), onSuccess, onErrors);

export const addPlayerToTraining = (trainingId, playerId, onSuccess, onErrors) =>
    appFetch(`/trainings/${trainingId}/addPlayerToTraining?playerId=${playerId}`, config('POST'), onSuccess, onErrors);

export const updateTraining = (trainingId, trainingDate, durationMinutes, description, objective, onSuccess, onErrors) =>
    appFetch(`/trainings/${trainingId}?trainingDate=${trainingDate}&durationMinutes=${durationMinutes}&description=${description}&objective=${objective}`, config('PUT'), onSuccess, onErrors);

export const removeTraining = (trainingId, onSuccess, onErrors) =>
    appFetch(`/trainings/${trainingId}`, config('DELETE'), onSuccess, onErrors);

export const removePlayerToTraining = (playerId, trainingId, onSuccess, onErrors) =>
    appFetch(`/trainings/${playerId}/player?trainingId=${trainingId}`, config('DELETE'), onSuccess, onErrors);