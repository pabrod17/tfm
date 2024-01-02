import {config, appFetch} from './appFetch';

export const findExerciseById = (exerciseId, onSuccess, onErrors) => 
    appFetch(`/exercises/${exerciseId}`, config('GET'), onSuccess, onErrors);

export const findAllExercises = (onSuccess, onErrors) => 
    appFetch('/exercises', config('GET'), onSuccess, onErrors);

export const findAllExercisesPage = ({page}, onSuccess, onErrors) => 
    appFetch(`/exercises/page?page=${page}`, config('GET'), onSuccess, onErrors);

export const findExercisesByTypePage = ({exerciseType, page}, onSuccess, onErrors) =>
    appFetch(`/exercises/${exerciseType}/exerciseType/page?page=${page}`, config('GET'), onSuccess, onErrors);

export const findExercisesByType = (exerciseType, onSuccess, onErrors) =>
    appFetch(`/exercises/${exerciseType}/exerciseType`, config('GET'), onSuccess, onErrors);

export const findExercisesByTrainingId = (trainingId, onSuccess, onErrors) => 
    appFetch(`/exercises/${trainingId}/training`, config('GET'), onSuccess, onErrors);

export const findExercisesByGameId = (gameId, onSuccess, onErrors) => 
    appFetch(`/exercises/${gameId}/game`, config('GET'), onSuccess, onErrors);

export const addExercise = (exerciseName, description, objective, exerciseType, onSuccess, onErrors) => 
    appFetch(`/exercises?exerciseName=${exerciseName}&description=${description}&objective=${objective}&exerciseType=${exerciseType}`, config('POST'), onSuccess, onErrors);

export const addExerciseToTraining = (trainingId, exerciseId, onSuccess, onErrors) =>
    appFetch(`/exercises/${trainingId}/addExerciseToTraining?exerciseId=${exerciseId}`, config('POST'), onSuccess, onErrors);

export const addExerciseToGame = (gameId, exerciseId, onSuccess, onErrors) =>
    appFetch(`/exercises/${gameId}/addExerciseToGame?exerciseId=${exerciseId}`, config('POST'), onSuccess, onErrors);

export const updatExercise = (exerciseId, exerciseName, description, objective, exerciseType, onSuccess, onErrors) => 
    appFetch(`/exercises/${exerciseId}?exerciseName=${exerciseName}&description=${description}&objective=${objective}&exerciseType=${exerciseType}`, config('PUT'), onSuccess, onErrors);

export const removeExercise = (exerciseId, onSuccess, onErrors) => 
    appFetch(`/exercises/${exerciseId}`, config('DELETE'), onSuccess, onErrors);

export const removeExerciseToTraining = (trainingId, exerciseId, onSuccess, onErrors) =>
    appFetch(`/exercises/${trainingId}/training?exerciseId=${exerciseId}`, config('DELETE'), onSuccess, onErrors);

export const removeExerciseToGame = (gameId, exerciseId, onSuccess, onErrors) =>
    appFetch(`/exercises/${gameId}/game?exerciseId=${exerciseId}`, config('DELETE'), onSuccess, onErrors);