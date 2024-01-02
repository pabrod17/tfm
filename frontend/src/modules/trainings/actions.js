import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findTrainingByIdCompleted = training => ({
    type: actionTypes.FIND_TRAINING_BY_ID_COMPLETED,
    training
});

export const findTrainingById = (trainingId, onSuccess) => dispatch => {
    backend.trainingService.findTrainingById(trainingId,
        training => {
            dispatch(findTrainingByIdCompleted(training));
            onSuccess();
        }
        );
}

const findTrainingsByUserIdCompleted = trainings => ({
    type: actionTypes.FIND_TRAININGS_BY_USER_ID_COMPLETED,
    trainings
});

export const findTrainingsByUserId = (onSuccess, onErrors) => dispatch => {
    backend.trainingService.findTrainingsByUserId(
        trainings => {
            dispatch(findTrainingsByUserIdCompleted(trainings));
            onSuccess();
        },
        onErrors);
}

const findTrainingsByPlayerIdCompleted = trainings => ({
    type: actionTypes.FIND_TRAININGS_BY_PLAYER_ID_COMPLETED,
    trainings
});

export const findTrainingsByPlayerId = (playerId, onSuccess, onErrors) => dispatch => {
    backend.trainingService.findTrainingsByPlayerId(playerId,
        trainings => {
            dispatch(findTrainingsByPlayerIdCompleted(trainings));
            onSuccess();
        },
        onErrors);
}

const findTrainingsByTwoDatesAndTeamIdOrSeasonIdCompleted = trainings => ({
    type: actionTypes.FIND_TRAININGS_BY_TWO_DATES_AND_TEAM_ID_OR_SEASON_ID_COMPLETED,
    trainings
});

export const findTrainingsByTwoDatesAndTeamIdOrSeasonId = (teamId, seasonId, startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.trainingService.findTrainingsByTwoDatesAndTeamIdOrSeasonId(teamId, seasonId, startDate, endDate,
        trainings => {
            dispatch(findTrainingsByTwoDatesAndTeamIdOrSeasonIdCompleted(trainings));
            onSuccess();
        },
        onErrors);
}

export const findTrainingsByTwoDates = (startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.trainingService.findTrainingsByTwoDates(startDate, endDate,
        trainings => {
            dispatch(findTrainingsByTwoDatesAndTeamIdOrSeasonIdCompleted(trainings));
            onSuccess();
        },
        onErrors);
}


export const findTrainingsByTwoDatesAndTeamId = (teamId, startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.trainingService.findTrainingsByTwoDatesAndTeamId(teamId, startDate, endDate,
        trainings => {
            dispatch(findTrainingsByTwoDatesAndTeamIdOrSeasonIdCompleted(trainings));
            onSuccess();
        },
        onErrors);
}

export const findTrainingsByTwoDatesAndSeasondId = (seasonId, startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.trainingService.findTrainingsByTwoDatesAndSeasonId(seasonId, startDate, endDate,
        trainings => {
            dispatch(findTrainingsByTwoDatesAndTeamIdOrSeasonIdCompleted(trainings));
            onSuccess();
        },
        onErrors);
}


const findTrainingsByTeamIdCompleted = trainings => ({
    type: actionTypes.FIND_TRAININGS_BY_TEAM_ID_COMPLETED,
    trainings
});

export const findTrainingsByTeamId = (teamId, onSuccess, onErrors) => dispatch => {
    backend.trainingService.findTrainingsByTeamId(teamId,
        trainings => {
            dispatch(findTrainingsByTeamIdCompleted(trainings));
            onSuccess();
        },
        onErrors);
}

const findTrainingsBySeasonIdCompleted = trainings => ({
    type: actionTypes.FIND_TRAININGS_BY_SEASON_ID_COMPLETED,
    trainings
});

export const findTrainingsBySeasonId = (seasonId, onSuccess, onErrors) => dispatch => {
    backend.trainingService.findTrainingsBySeasonId(seasonId,
        trainings => {
            dispatch(findTrainingsBySeasonIdCompleted(trainings));
            onSuccess();
        },
        onErrors);
}

const addTrainingCompleted = training => ({
    type: actionTypes.ADD_TRAINING_COMPLETED,
    training
});

export const addTraining = (teamId, seasonId, trainingDate, durationMinutes, description, objective, onSuccess, onErrors) => dispatch => {
    backend.trainingService.addTraining(teamId, seasonId, trainingDate, durationMinutes, description, objective,
        training => {
            dispatch(addTrainingCompleted(training));
            onSuccess();
        },
        onErrors);
}

export const addTrainingWithTeam = (teamId, trainingDate, durationMinutes, description, objective, onSuccess, onErrors) => dispatch => {
    backend.trainingService.addTrainingWithTeam(teamId, trainingDate, durationMinutes, description, objective,
        training => {
            dispatch(addTrainingCompleted(training));
            onSuccess();
        },
        onErrors);
}

export const addTrainingWithSeason = (seasonId, trainingDate, durationMinutes, description, objective, onSuccess, onErrors) => dispatch => {
    backend.trainingService.addTrainingWithSeason(seasonId, trainingDate, durationMinutes, description, objective,
        training => {
            dispatch(addTrainingCompleted(training));
            onSuccess();
        },
        onErrors);
}

export const addPlayerToTraining = (playerId, trainingId, onSuccess, onErrors) => {
    backend.trainingService.addPlayerToTraining(playerId, trainingId, onSuccess, onErrors);
    return {type: actionTypes.ADD_PLAYER_TO_TRAINING_COMPLETED};
}

const updateTrainingCompleted = training => ({
    type: actionTypes.UPDATE_TRAINING_COMPLETED,
    training
});

export const updateTraining = (trainingId, trainingDate, durationMinutes, description, objective, onSuccess, onErrors) => dispatch => {
    backend.trainingService.updateTraining(trainingId, trainingDate, durationMinutes, description, objective,
        training => {
            dispatch(updateTrainingCompleted(training));
            onSuccess();
        },
        onErrors);
}

export const removeTraining = (trainingId, onSuccess, onErrors) => {
    backend.trainingService.removeTraining(trainingId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_TRAINING_COMPLETED};
}

export const removePlayerToTraining = (playerId, trainingId, onSuccess, onErrors) => {
    backend.trainingService.removePlayerToTraining(playerId, trainingId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_PLAYER_TO_TRAINING_COMPLETED};
}