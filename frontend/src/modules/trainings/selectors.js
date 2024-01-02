const getModuleState = state => state.trainings;

export const getOneTraining = state =>
    getModuleState(state).training;

export const getAllTrainings = state =>
    getModuleState(state);