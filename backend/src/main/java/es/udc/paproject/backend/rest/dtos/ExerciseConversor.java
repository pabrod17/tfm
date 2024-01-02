package es.udc.paproject.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Exercise;

public class ExerciseConversor {

    public ExerciseConversor() {
    }
    
    public final static ExerciseDto toExerciseDto(Exercise exercise) {
        return new ExerciseDto(exercise.getId(), exercise.getExerciseName(),
        exercise.getDescription(), exercise.getObjective(), exercise.getExerciseType());
    }

    public final static List<ExerciseDto> toExerciseDtos(List<Exercise> exercises) {
        return exercises.stream().map(c -> toExerciseDto(c)).collect(Collectors.toList());
    }
}