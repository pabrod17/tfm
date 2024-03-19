package es.udc.paproject.backend.model.entities;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Game {
    
    private Long id;
    private LocalDateTime gameDate;
    private String rival;
    private SeasonTeam seasonTeam;
    private GameStatistics gameStatistics;

    private String description;
    

    public Game() {
    }

    public Game(LocalDateTime gameDate, String rival, SeasonTeam seasonTeam, String description) {
        this.gameDate = gameDate;
        this.rival = rival;
        this.seasonTeam = seasonTeam;
        this.description = description;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getGameDate() {
        return gameDate;
    }

    public void setGameDate(LocalDateTime gameDate) {
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

    @ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name= "seasonTeamId", nullable = true)
    public SeasonTeam getSeasonTeam() {
        return seasonTeam;
    }

    public void setSeasonTeam(SeasonTeam seasonTeam) {
        this.seasonTeam = seasonTeam;
    }

	@OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name= "gameStatisticsId", nullable = true)
    public GameStatistics getGameStatistics() {
        return gameStatistics;
    }

    public void setGameStatistics(GameStatistics gameStatistics) {
        this.gameStatistics = gameStatistics;
    }
}