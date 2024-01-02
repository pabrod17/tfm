package es.udc.paproject.backend.model.exceptions;

@SuppressWarnings("serial")
public class UsedExerciseException extends Exception{
    
    private String exerciseName;

    public UsedExerciseException(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public String getExerciseName() {
        return exerciseName;
    }
}