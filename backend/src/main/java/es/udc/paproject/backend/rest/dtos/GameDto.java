package es.udc.paproject.backend.rest.dtos;

import java.util.Date;

public class GameDto {
    
    private Long id;
    private Date gameDate;
    private String rival;
    private Long seasonTeam;
    private Long gameStatistics;

    public GameDto() {
    }

    public GameDto(Long id, Date gameDate, String rival, Long seasonTeam) {
        this.id = id;
        this.gameDate = gameDate;
        this.rival = rival;
        this.seasonTeam = seasonTeam;
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
}