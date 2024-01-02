package es.udc.paproject.backend.rest.dtos;

public class ExerciseDto {
    
    private Long id;
    private String exerciseName;
    private String description;
    private String objective;
    private String exerciseType;

    public ExerciseDto() {
    }

    public ExerciseDto(Long id, String exerciseName, String description, String objective, String exerciseType) {
        this.id = id;
        this.exerciseName = exerciseName;
        this.description = description;
        this.objective = objective;
        this.exerciseType = exerciseType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public String getExerciseType() {
        return exerciseType;
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }
}