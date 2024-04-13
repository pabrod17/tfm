const getModuleState = state => state.trainings;

export const getOneTraining = state =>
    getModuleState(state).training;

export const getAllTrainings = state =>
    getModuleState(state);

export const getTrainingsBySeasonId = state =>
    getModuleState(state).trainingsBySeasonId;

export const getTrainingsByTeamId = state =>
    getModuleState(state).trainingsByTeamId;

export const getTrainingsByPlayerId = state =>
    getModuleState(state).trainingsByPlayerId;