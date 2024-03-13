package es.udc.paproject.backend.model.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Training {
    
    private Long id;
    private LocalDateTime trainingDate;
    private String durationMinutes;
    private String description;
    private String objective;
    private SeasonTeam seasonTeam;

    public Training() {
    }

    public Training(LocalDateTime trainingDate, String durationMinutes, String description, String objective,
            SeasonTeam seasonTeam) {
        this.trainingDate = trainingDate;
        this.durationMinutes = durationMinutes;
        this.description = description;
        this.objective = objective;
        this.seasonTeam = seasonTeam;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTrainingDate() {
        return trainingDate;
    }

    public void setTrainingDate(LocalDateTime trainingDate) {
        this.trainingDate = trainingDate;
    }

    public String getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(String durationMinutes) {
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

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name= "seasonTeamId", nullable = true)
    public SeasonTeam getSeasonTeam() {
        return seasonTeam;
    }

    public void setSeasonTeam(SeasonTeam seasonTeam) {
        this.seasonTeam = seasonTeam;
    }
}