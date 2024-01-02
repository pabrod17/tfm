package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.PlayerGameStatistics;

public class PlayerGameStatisticsConversor {

    public PlayerGameStatisticsConversor() {
    }

    public final static PlayerGameStatisticsDto toPlayerGameStatisticsDto(PlayerGameStatistics playerGameStatistics) {
        return new PlayerGameStatisticsDto(playerGameStatistics.getId(), playerGameStatistics.getTotalPoints(), playerGameStatistics.getMinutes(), playerGameStatistics.getThreePointShots(), playerGameStatistics.getSetShots(), playerGameStatistics.getFreeShots(),
        playerGameStatistics.getFailThreePointShots(), playerGameStatistics.getFailSetShots(), playerGameStatistics.getFailFreeShots(), playerGameStatistics.getRebounds(), playerGameStatistics.getBlockedShot(),
        playerGameStatistics.getAssists(), playerGameStatistics.getPersonalFouls(), playerGameStatistics.getTechnicalFouls(), playerGameStatistics.getUnsportsmanlikeFouls());
    }
    
}














