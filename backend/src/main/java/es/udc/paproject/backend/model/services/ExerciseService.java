package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Exercise;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedExerciseException;

public interface ExerciseService {
    
    Exercise addExercise(String exerciseName, String description, String objective, String exerciseType) throws InstanceNotFoundException;

    void addExerciseToTraining(Long trainingId, Long exerciseId) throws InstanceNotFoundException;

    void addExerciseToGame(Long gameId, Long exerciseId) throws InstanceNotFoundException;

    Exercise findExerciseById(Long exerciseId) throws InstanceNotFoundException;

    List<Exercise> findAllExercises() throws InstanceNotFoundException;

    Block<Exercise> findAllExercises(int page, int size) throws InstanceNotFoundException;

    Block<Exercise> findExercisesByType(String exerciseType, int page, int size) throws InstanceNotFoundException;
    
    List<Exercise> findExercisesByType(String exerciseType) throws InstanceNotFoundException;

    List<Exercise> findExercisesByTrainingId(Long trainingId) throws InstanceNotFoundException;

    List<Exercise> findExercisesByGameId(Long gameId) throws InstanceNotFoundException;

    void removeExercise(Long exerciseId) throws InstanceNotFoundException, UsedExerciseException;

    void removeExerciseToTraining(Long exerciseId, Long trainingId) throws InstanceNotFoundException;

    void removeExerciseToGame(Long exerciseId, Long gameId) throws InstanceNotFoundException;

    Exercise updatExercise(Long exerciseId, String exerciseName, String description, String objective, String exerciseType) throws InstanceNotFoundException;
}