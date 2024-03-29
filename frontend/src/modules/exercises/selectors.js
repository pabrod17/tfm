const getModuleState = state => state.exercises;

export const getOneExercise = state =>
    getModuleState(state).exercise;

export const getAllExercises = state =>
    getModuleState(state);
    
export const getExercisesSearch = state =>
    getModuleState(state).exercisesSearch;

export const getExercisesByTrainingId = state =>
    getModuleState(state).exercisesByTrainingId;
    
export const getExercisesByGameId = state =>
    getModuleState(state).exercisesByGameId;