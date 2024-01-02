package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.GameStatistics;
import es.udc.paproject.backend.model.entities.PlayerGameStatistics;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface StatisticsService {
    
    GameStatistics addStatisticsToGame(Long gameId, Integer totalPoints, Integer durationMinutes, Integer totalThreePointShots, Integer totalSetShots,
    Integer totalFreeShots, Integer totalRebounds, Integer totalBlockedShot, Integer totalAssists,
    Integer totalPersonalFouls, Integer totalTechnicalFouls, Integer totalUnsportsmanlikeFouls,
    Integer totalPointsRival, Integer totalThreePointShotsRival, Integer totalSetShotsRival,
    Integer totalFreeShotsRival, Integer totalReboundsRival, Integer totalBlockedShotsRival,
    Integer totalAssistsRival, Integer totalPersonalFoulsRival, Integer totalTechnicalFoulsRival,
    Integer totalUnsportsmanlikeFoulsRival) throws InstanceNotFoundException;

    //Aqui meto las estadisticas en la fila que cree en addPlayerToGame
    PlayerGameStatistics addStatisticsToPlayerAndGame(Long gameId, Long playerId, Integer totalPoints, Integer minutes,
    Integer threePointShots, Integer setShots, Integer freeShots, Integer failThreePointShots,
    Integer failSetShots, Integer failFreeShots, Integer rebounds, Integer blockedShot, Integer assists,
    Integer personalFouls, Integer technicalFouls, Integer unsportsmanlikeFouls) throws InstanceNotFoundException;

    GameStatistics findGameStatisticsById(Long gameStatisticsId) throws InstanceNotFoundException;

    GameStatistics findStatisticsByGame(Long gameId) throws InstanceNotFoundException;

    //se pone a nulo el objeto statisticas de game y luego se borra el obj gameStatistics
    void removeStatisticsToGame(Long gameId) throws InstanceNotFoundException;

    //no se borra la relacion solo las estadisticas o se ponen a cero
    void removeStatisticsToPlayerOfGame(Long playerId, Long gameId) throws InstanceNotFoundException;

    GameStatistics updateGameStatistics(Long gameId, Long gameStatisticsId, Integer totalPoints, Integer durationMinutes, Integer totalThreePointShots, Integer totalSetShots,
    Integer totalFreeShots, Integer totalRebounds, Integer totalBlockedShot, Integer totalAssists,
    Integer totalPersonalFouls, Integer totalTechnicalFouls, Integer totalUnsportsmanlikeFouls,
    Integer totalPointsRival, Integer totalThreePointShotsRival, Integer totalSetShotsRival,
    Integer totalFreeShotsRival, Integer totalReboundsRival, Integer totalBlockedShotsRival,
    Integer totalAssistsRival, Integer totalPersonalFoulsRival, Integer totalTechnicalFoulsRival,
    Integer totalUnsportsmanlikeFoulsRival) throws InstanceNotFoundException;


    //habria que crear otro objeto en el front en el reducer que se llame PlayerGameStatistics
    PlayerGameStatistics findStatisticsByPlayerAndGame(Long playerId, Long gameId) throws InstanceNotFoundException;

    //habria que crear otro objeto en el front en el reducer que se llame PlayerGameStatistics
    PlayerGameStatistics updatePlayerGameStatistics(Long playerId, Long gameId, Integer totalPoints, Integer minutes,
    Integer threePointShots, Integer setShots, Integer freeShots, Integer failThreePointShots,
    Integer failSetShots, Integer failFreeShots, Integer rebounds, Integer blockedShot, Integer assists,
    Integer personalFouls, Integer technicalFouls, Integer unsportsmanlikeFouls) throws InstanceNotFoundException;
}