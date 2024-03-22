import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findExerciseByIdCompleted = exercise => ({
    type: actionTypes.FIND_EXERCISE_BY_ID_COMPLETED,
    exercise
});

export const findExerciseById = (exerciseId, onSuccess, onErrors) => dispatch => {
    backend.exerciseService.findExerciseById(exerciseId,
        exercise => {
            dispatch(findExerciseByIdCompleted(exercise));
            onSuccess();
        },
        onErrors);
}

const findAllExercisesCompleted = exercises => ({
    type: actionTypes.FIND_ALL_EXERCISES_COMPLETED,
    exercises
});

export const findAllExercises = (onSuccess, onErrors) => dispatch => {
    backend.exerciseService.findAllExercises(
        exercises => {
            dispatch(findAllExercisesCompleted(exercises));
        },onSuccess,
        onErrors);
}

const clearExerciseSearch = () => ({
    type: actionTypes.CLEAR_EXERCISE_SEARCH
});

const findAllExercisesPageCompleted = exercisesSearch => ({
    type: actionTypes.FIND_ALL_EXERCISES_PAGE_COMPLETED,
    exercisesSearch
});

export const findAllExercisesPage = (criteria, onSuccess, onErrors) => dispatch => {
    dispatch(clearExerciseSearch());
    backend.exerciseService.findAllExercisesPage(criteria,
        result => {
            dispatch(findAllExercisesPageCompleted({criteria, result}));
        },onSuccess,
        onErrors);
}

export const previousFindAllExercisesResultPage = page => 
    findAllExercisesPage({page: page});

export const nextFindAllExercisesResultPage = page => 
    findAllExercisesPage({page: page});





const findExercisesByTypePageCompleted = exercisesSearch => ({
    type: actionTypes.FIND_EXERCISES_BY_TYPE_PAGE_COMPLETED,
    exercisesSearch
});

export const findExercisesByTypePage = (criteria, onSuccess, onErrors) => dispatch => {
    dispatch(clearExerciseSearch());
    backend.exerciseService.findExercisesByTypePage(criteria,
        result => {
            dispatch(findExercisesByTypePageCompleted({criteria, result}));
        },onSuccess,
        onErrors);
}

export const previousFindExercisesByTypeResultPage =(exerciseType, page)  => 
    findExercisesByTypePage({page: page, exerciseType: exerciseType});

export const nextFindExercisesByTypeResultPage = (exerciseType, page) => 
    findExercisesByTypePage({page: page, exerciseType: exerciseType});





const findExercisesByTypeCompleted = exercises => ({
    type: actionTypes.FIND_EXERCISES_BY_TYPE_COMPLETED,
    exercises
});

export const findExercisesByType = (exerciseType, onSuccess, onErrors) => dispatch => {
    backend.exerciseService.findExercisesByType(exerciseType,
        exercises => {
            dispatch(findExercisesByTypeCompleted(exercises));
        },onSuccess,
        onErrors);
}

const findExercisesByTrainingIdCompleted = exercisesByTrainingId => ({
    type: actionTypes.FIND_EXERCISES_BY_TRAINING_ID_COMPLETED,
    exercisesByTrainingId
});

export const findExercisesByTrainingId = (trainingId, onSuccess, onErrors) => dispatch => {
    dispatch(clearExerciseSearch());
    backend.exerciseService.findExercisesByTrainingId(trainingId,
        exercises => {
            dispatch(findExercisesByTrainingIdCompleted(exercises));
            onSuccess();
        },
        onErrors);
}

const findExercisesByGameIdCompleted = exercisesByGameId => ({
    type: actionTypes.FIND_EXERCISES_BY_GAME_ID_COMPLETED,
    exercisesByGameId
});

export const findExercisesByGameId = (gameId, onSuccess, onErrors) => dispatch => {
    backend.exerciseService.findExercisesByGameId(gameId,
        exercises => {
            dispatch(findExercisesByGameIdCompleted(exercises));
            onSuccess();
        },
        onErrors);
}

const addExerciseCompleted = exercise => ({
    type: actionTypes.ADD_EXERCISE_COMPLETED,
    exercise
});

export const addExercise = (exerciseName, description, objective, exerciseType, onSuccess, onErrors) => dispatch => {
    backend.exerciseService.addExercise(exerciseName, description, objective, exerciseType,
        exercise => {
            dispatch(addExerciseCompleted(exercise));
            onSuccess();
        },
        onErrors);
}

export const addExerciseToTraining = (trainingId, exerciseId, onSuccess, onErrors) => {
    backend.exerciseService.addExerciseToTraining(trainingId, exerciseId, onSuccess, onErrors);
    return {type: actionTypes.ADD_EXERCISE_TO_TRAINING_COMPLETED};
}

export const addExerciseToGame = (gameId, exerciseId, onSuccess, onErrors) => {
    backend.exerciseService.addExerciseToGame(gameId, exerciseId, onSuccess, onErrors);
    return {type: actionTypes.ADD_EXERCISE_TO_GAME_COMPLETED};
}

const updatExerciseCompleted = exercise => ({
    type: actionTypes.UPDATE_EXERCISE_COMPLETED,
    exercise
});

export const updatExercise = (exerciseId, exerciseName, description, objective, exerciseType, onSuccess, onErrors) => dispatch => {
    backend.exerciseService.updatExercise(exerciseId, exerciseName, description, objective, exerciseType,
        exercise => {
            dispatch(updatExerciseCompleted(exercise));
            onSuccess();
        },
        onErrors);
}

export const removeExercise = (exerciseId, onSuccess, onErrors) => {
    backend.exerciseService.removeExercise(exerciseId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_EXERCISE_COMPLETED};
}

export const removeExerciseToTraining = (trainingId, exerciseId, onSuccess, onErrors) => {
    backend.exerciseService.removeExerciseToTraining(trainingId, exerciseId, onSuccess(), onErrors);
    return {type: actionTypes.REMOVE_EXERCISE_TO_TRAINING_COMPLETED};
}

export const removeExerciseToGame = (gameId, exerciseId, onSuccess, onErrors) => {
    backend.exerciseService.removeExerciseToGame(gameId, exerciseId, onSuccess(), onErrors);
    return {type: actionTypes.REMOVE_EXERCISE_TO_GAME_COMPLETED};
}