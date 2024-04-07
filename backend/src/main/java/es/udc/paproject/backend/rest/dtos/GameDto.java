package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.CalendarEvent;

import java.util.Date;

public class GameDto {
    
    private Long id;
    private Date gameDate;
    private String rival;
    private Long seasonTeam;
    private Long gameStatistics;

    private String description;

    private Long calendarEvent;


    public GameDto() {
    }

    public GameDto(Long id, Date gameDate, String rival, Long seasonTeam, String description) {
        this.id = id;
        this.gameDate = gameDate;
        this.rival = rival;
        this.seasonTeam = seasonTeam;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getGameDate() {
        return gameDate;
    }

    public void setGameDate(Date gameDate) {
        this.gameDate = gameDate;
    }

    public String getRival() {
        return rival;
    }

    public void setRival(String rival) {
        this.rival = rival;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getSeasonTeam() {
        return seasonTeam;
    }

    public void setSeasonTeam(Long seasonTeam) {
        this.seasonTeam = seasonTeam;
    }

    public Long getGameStatistics() {
        return gameStatistics;
    }

    public void setGameStatistics(Long gameStatistics) {
        this.gameStatistics = gameStatistics;
    }

    public Long getCalendarEvent() {
        return calendarEvent;
    }

    public void setCalendarEvent(Long calendarEvent) {
        this.calendarEvent = calendarEvent;
    }
}