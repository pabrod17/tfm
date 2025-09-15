package es.udc.paproject.backend.model.entities;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
public class Training {
    
    private Long id;
    private LocalDateTime trainingDate;
    private Integer durationMinutes;
    private String description;
    private String objective;
    private SeasonTeam seasonTeam;

    private CalendarEvent calendarEvent;

    public Training() {
    }

    public Training(LocalDateTime trainingDate, Integer durationMinutes, String description, String objective,
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

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name= "seasonTeamId", nullable = true)
    public SeasonTeam getSeasonTeam() {
        return seasonTeam;
    }

    public void setSeasonTeam(SeasonTeam seasonTeam) {
        this.seasonTeam = seasonTeam;
    }

    @OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name= "calendarEventId", nullable = true)
    public CalendarEvent getCalendarEvent() {
        return calendarEvent;
    }

    public void setCalendarEvent(CalendarEvent calendarEvent) {
        this.calendarEvent = calendarEvent;
    }
}