package es.udc.paproject.backend.rest.dtos;

import java.util.Date;


public class TrainingDto {
    
    private Long id;
    private Date trainingDate;
    private Integer durationMinutes;
    private String description;
    private String objective;
    private Long seasonTeam;

    public TrainingDto() {
    }

    public TrainingDto(Long id, Date trainingDate, Integer durationMinutes, String description, String objective,
            Long seasonTeam) {
        this.id = id;
        this.trainingDate = trainingDate;
        this.durationMinutes = durationMinutes;
        this.description = description;
        this.objective = objective;
        this.seasonTeam = seasonTeam;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTrainingDate() {
        return trainingDate;
    }

    public void setTrainingDate(Date trainingDate) {
        this.trainingDate = trainingDate;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
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

    public Long getSeasonTeam() {
        return seasonTeam;
    }

    public void setSeasonTeam(Long seasonTeam) {
        this.seasonTeam = seasonTeam;
    }
}