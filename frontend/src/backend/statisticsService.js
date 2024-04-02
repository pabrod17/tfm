import {config, appFetch} from './appFetch';

export const findGameStatisticsById = (gameStatisticsId, onSuccess, onErrors) =>
    appFetch(`/statistics/${gameStatisticsId}`, config('GET'), onSuccess, onErrors);

export const findStatisticsByGame = (gameId, onSuccess, onErrors) =>
    appFetch(`/statistics/${gameId}/game`, config('GET'), onSuccess, onErrors);

export const findStatisticsByPlayerAndGame = (playerId, gameId, onSuccess, onErrors) =>
    appFetch(`/statistics/${playerId}/playerGameStatistics?gameId=${gameId}`, config('GET'), onSuccess, onErrors);

export const addStatisticsToGame = (gameId, totalPoints, durationMinutes, totalThreePointShots,totalSetShots,totalFreeShots,totalRebounds,totalBlockedShot,totalAssists,totalPersonalFouls,totalTechnicalFouls,totalUnsportsmanlikeFouls,totalPointsRival,totalThreePointShotsRival,totalSetShotsRival,totalFreeShotsRival,totalReboundsRival,totalBlockedShotsRival,totalAssistsRival,totalPersonalFoulsRival,totalTechnicalFoulsRival,totalUnsportsmanlikeFoulsRival,onSuccess, onErrors) =>
    appFetch(`/statistics?gameId=${gameId}&totalPoints=${totalPoints}&durationMinutes=${durationMinutes}&totalThreePointShots=${totalThreePointShots}&totalSetShots=${totalSetShots}&totalFreeShots=${totalFreeShots}&totalRebounds=${totalRebounds}&totalBlockedShot=${totalBlockedShot}&totalAssists=${totalAssists}&totalPersonalFouls=${totalPersonalFouls}&totalTechnicalFouls=${totalTechnicalFouls}&totalUnsportsmanlikeFouls=${totalUnsportsmanlikeFouls}&totalPointsRival=${totalPointsRival}&totalThreePointShotsRival=${totalThreePointShotsRival}&totalSetShotsRival=${totalSetShotsRival}&totalFreeShotsRival=${totalFreeShotsRival}&totalReboundsRival=${totalReboundsRival}&totalBlockedShotsRival=${totalBlockedShotsRival}&totalAssistsRival=${totalAssistsRival}&totalPersonalFoulsRival=${totalPersonalFoulsRival}&totalTechnicalFoulsRival=${totalTechnicalFoulsRival}&totalUnsportsmanlikeFoulsRival=${totalUnsportsmanlikeFoulsRival}`, config('POST'), onSuccess, onErrors);

export const addStatisticsToPlayerAndGame = (playerId, gameId, totalPoints, minutes, threePointShots, setShots,freeShots,failThreePointShots,failSetShots,failFreeShots,rebounds,blockedShot,assists,personalFouls,technicalFouls,unsportsmanlikeFouls, onSuccess, onErrors) =>
    appFetch(`/statistics/${playerId}/addStatisticsToPlayerAndGame?gameId=${gameId}&totalPoints=${totalPoints}&minutes=${minutes}&threePointShots=${threePointShots}&setShots=${setShots}&freeShots=${freeShots}&failThreePointShots=${failThreePointShots}&failSetShots=${failSetShots}&failFreeShots=${failFreeShots}&rebounds=${rebounds}&blockedShot=${blockedShot}&assists=${assists}&personalFouls=${personalFouls}&technicalFouls=${technicalFouls}&unsportsmanlikeFouls=${unsportsmanlikeFouls}`, config('POST'), onSuccess, onErrors);

    export const updateGameStatistics = (gameId, gameStatisticsId, totalPoints, durationMinutes, totalThreePointShots, totalSetShots, totalFreeShots, totalRebounds, totalBlockedShot, totalAssists, totalPersonalFouls, totalTechnicalFouls, totalUnsportsmanlikeFouls, totalPointsRival, totalThreePointShotsRival, totalSetShotsRival, totalFreeShotsRival, totalReboundsRival, totalBlockedShotsRival, totalAssistsRival, totalPersonalFoulsRival, totalTechnicalFoulsRival, totalUnsportsmanlikeFoulsRival, onSuccess, onErrors) => {
        let url = `/statistics/${gameId}?`;
        if (gameStatisticsId !== null && gameStatisticsId !== undefined) {
            url += `gameStatisticsId=${gameStatisticsId}&`;
        }
        url += `totalPoints=${totalPoints}&durationMinutes=${durationMinutes}&totalThreePointShots=${totalThreePointShots}&totalSetShots=${totalSetShots}&totalFreeShots=${totalFreeShots}&totalRebounds=${totalRebounds}&totalBlockedShot=${totalBlockedShot}&totalAssists=${totalAssists}&totalPersonalFouls=${totalPersonalFouls}&totalTechnicalFouls=${totalTechnicalFouls}&totalUnsportsmanlikeFouls=${totalUnsportsmanlikeFouls}&totalPointsRival=${totalPointsRival}&totalThreePointShotsRival=${totalThreePointShotsRival}&totalSetShotsRival=${totalSetShotsRival}&totalFreeShotsRival=${totalFreeShotsRival}&totalReboundsRival=${totalReboundsRival}&totalBlockedShotsRival=${totalBlockedShotsRival}&totalAssistsRival=${totalAssistsRival}&totalPersonalFoulsRival=${totalPersonalFoulsRival}&totalTechnicalFoulsRival=${totalTechnicalFoulsRival}&totalUnsportsmanlikeFoulsRival=${totalUnsportsmanlikeFoulsRival}`;
    
        appFetch(url, config('PUT'), onSuccess, onErrors);
    };
//al actualizar las estadisticas de un jugador en un partido no me hace falta hacer nada
    //porque cuando añado un jugador a un partido ya se crea la tabla de PlayerGameStatistics
    //Entonces ahora solo se rellena y listo
export const updatePlayerGameStatistics = (playerId, gameId, totalPoints, minutes, threePointShots, setShots,freeShots,failThreePointShots,failSetShots,failFreeShots,rebounds,blockedShot,assists,personalFouls,technicalFouls,unsportsmanlikeFouls, onSuccess, onErrors) =>
    appFetch(`/statistics/${playerId}/playerGameStatistics?gameId=${gameId}&totalPoints=${totalPoints}&minutes=${minutes}&threePointShots=${threePointShots}&setShots=${setShots}&freeShots=${freeShots}&failThreePointShots=${failThreePointShots}&failSetShots=${failSetShots}&failFreeShots=${failFreeShots}&rebounds=${rebounds}&blockedShot=${blockedShot}&assists=${assists}&personalFouls=${personalFouls}&technicalFouls=${technicalFouls}&unsportsmanlikeFouls=${unsportsmanlikeFouls}`, config('PUT'), onSuccess, onErrors);

export const removeStatisticsToGame = (gameId, onSuccess, onErrors) =>
    appFetch(`/statistics/${gameId}`, config('DELETE'), onSuccess, onErrors);

export const removeStatisticsToPlayerOfGame = (playerId, gameId, onSuccess, onErrors) =>
    appFetch(`/statistics/${playerId}/playerGameStatistics?gameId=${gameId}`, config('DELETE'), onSuccess, onErrors);