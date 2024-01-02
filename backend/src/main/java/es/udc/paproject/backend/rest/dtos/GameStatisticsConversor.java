package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.GameStatistics;

public class GameStatisticsConversor {

    public GameStatisticsConversor() {
    }
    
    public final static GameStatisticsDto toGameStatisticsDto(GameStatistics gameStatistics){
        return new GameStatisticsDto(gameStatistics.getId(), gameStatistics.getTotalPoints(), gameStatistics.getDurationMinutes(), gameStatistics.getTotalThreePointShots(),gameStatistics.getTotalSetShots(),
        gameStatistics.getTotalFreeShots(),gameStatistics.getTotalRebounds(),gameStatistics.getTotalBlockedShot(),gameStatistics.getTotalAssists(),gameStatistics.getTotalPersonalFouls(),
        gameStatistics.getTotalTechnicalFouls(),gameStatistics.getTotalUnsportsmanlikeFouls(),gameStatistics.getTotalPointsRival(),
        gameStatistics.getTotalThreePointShotsRival(),gameStatistics.getTotalSetShotsRival(),gameStatistics.getTotalFreeShotsRival(),
        gameStatistics.getTotalReboundsRival(),gameStatistics.getTotalBlockedShotsRival(),gameStatistics.getTotalAssistsRival(),gameStatistics.getTotalPersonalFoulsRival(),
        gameStatistics.getTotalTechnicalFoulsRival(),gameStatistics.getTotalUnsportsmanlikeFoulsRival());
    }
}