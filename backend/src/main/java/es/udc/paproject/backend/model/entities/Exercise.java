package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;


@Entity
public class Exercise {
    
    private Long id;
    private String exerciseName;
    private String description;
    private String objective;
    private ExerciseType exerciseType;
    @Version
    private Integer version;
    
    public Exercise() {
    }

    public Exercise(String exerciseName, String description, String objective, ExerciseType exerciseType) {
        this.exerciseName = exerciseName;
        this.description = description;
        this.objective = objective;
        this.exerciseType = exerciseType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
        return exerciseType.name();
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = ExerciseType.valueOf(exerciseType);
    }
    
    @Version
    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}