import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findGameStatisticsByIdCompleted = gameStatistics => ({
    type: actionTypes.FIND_GAMESTATISTICS_BY_ID_COMPLETED,
    gameStatistics
});

export const findGameStatisticsById = (gameStatisticsId, onSuccess, onErrors) => dispatch => {
    backend.statisticsService.findGameStatisticsById(gameStatisticsId,
        gameStatistics => {
            dispatch(findGameStatisticsByIdCompleted(gameStatistics));
            onSuccess();
        },
        onErrors)
}

const findStatisticsByGameCompleted = gameStatistics => ({
    type: actionTypes.FIND_STATISTICS_BY_GAME_COMPLETED,
    gameStatistics
});

export const findStatisticsByGame = (gameId, onSuccess, onErrors) => dispatch => {
    backend.statisticsService.findStatisticsByGame(gameId,
        gameStatistics => {
            dispatch(findStatisticsByGameCompleted(gameStatistics));
            onSuccess();
        },
        onErrors)
}

const findStatisticsByPlayerAndGameCompleted = playerGameStatistics => ({
    type: actionTypes.FIND_STATISTICS_BY_PLAYER_AND_GAME_COMPLETED,
    playerGameStatistics
});

export const findStatisticsByPlayerAndGame = (playerId, gameId, onSuccess, onErrors) => dispatch => {
    backend.statisticsService.findStatisticsByPlayerAndGame(playerId, gameId,
        playerGameStatistics => {
            dispatch(findStatisticsByPlayerAndGameCompleted(playerGameStatistics));
            onSuccess();
        },
        onErrors)
}

const addStatisticsToGameCompleted = gameStatistics => ({
    type: actionTypes.ADD_STATISTICS_TO_GAME_COMPLETED,
    gameStatistics
});

export const addStatisticsToGame = (gameId, totalPoints, durationMinutes, totalThreePointShots,totalSetShots,totalFreeShots,totalRebounds,totalBlockedShot,totalAssists,totalPersonalFouls,totalTechnicalFouls,totalUnsportsmanlikeFouls,totalPointsRival,totalThreePointShotsRival,totalSetShotsRival,totalFreeShotsRival,totalReboundsRival,totalBlockedShotsRival,totalAssistsRival,totalPersonalFoulsRival,totalTechnicalFoulsRival,totalUnsportsmanlikeFoulsRival,onSuccess, onErrors) => dispatch => {
    backend.statisticsService.addStatisticsToGame(gameId, totalPoints, durationMinutes, totalThreePointShots,totalSetShots,totalFreeShots,totalRebounds,totalBlockedShot,totalAssists,totalPersonalFouls,totalTechnicalFouls,totalUnsportsmanlikeFouls,totalPointsRival,totalThreePointShotsRival,totalSetShotsRival,totalFreeShotsRival,totalReboundsRival,totalBlockedShotsRival,totalAssistsRival,totalPersonalFoulsRival,totalTechnicalFoulsRival,totalUnsportsmanlikeFoulsRival,
        gameStatistics => {
            dispatch(addStatisticsToGameCompleted(gameStatistics));
            onSuccess();
        },
        onErrors)
};

const addStatisticsToPlayerAndGameCompleted = playerGameStatistics => ({
    type: actionTypes.ADD_STATISTICS_TO_PLAYER_AND_GAME_COMPLETED,
    playerGameStatistics
});

export const addStatisticsToPlayerAndGame = (playerId, gameId, totalPoints, minutes, threePointShots, setShots,freeShots,failThreePointShots,failSetShots,failFreeShots,rebounds,blockedShot,assists,personalFouls,technicalFouls,unsportsmanlikeFouls, onSuccess, onErrors) => dispatch => {
    backend.statisticsService.addStatisticsToPlayerAndGame(playerId, gameId, totalPoints, minutes, threePointShots, setShots,freeShots,failThreePointShots,failSetShots,failFreeShots,rebounds,blockedShot,assists,personalFouls,technicalFouls,unsportsmanlikeFouls,
        playerGameStatistics => {
            dispatch(addStatisticsToPlayerAndGameCompleted(playerGameStatistics));
            onSuccess();
        },
        onErrors)
};

const updateGameStatisticsCompleted = gameStatistics => ({
    type: actionTypes.UPDATE_GAMESTATISTICS_COMPLETED,
    gameStatistics
});

export const updateGameStatistics = (gameId, gameStatisticsId, totalPoints, durationMinutes, totalThreePointShots,totalSetShots,totalFreeShots,totalRebounds,totalBlockedShot,totalAssists,totalPersonalFouls,totalTechnicalFouls,totalUnsportsmanlikeFouls,totalPointsRival,totalThreePointShotsRival,totalSetShotsRival,totalFreeShotsRival,totalReboundsRival,totalBlockedShotsRival,totalAssistsRival,totalPersonalFoulsRival,totalTechnicalFoulsRival,totalUnsportsmanlikeFoulsRival,onSuccess, onErrors) => dispatch => {
    backend.statisticsService.updateGameStatistics(gameId, gameStatisticsId, totalPoints, durationMinutes, totalThreePointShots,totalSetShots,totalFreeShots,totalRebounds,totalBlockedShot,totalAssists,totalPersonalFouls,totalTechnicalFouls,totalUnsportsmanlikeFouls,totalPointsRival,totalThreePointShotsRival,totalSetShotsRival,totalFreeShotsRival,totalReboundsRival,totalBlockedShotsRival,totalAssistsRival,totalPersonalFoulsRival,totalTechnicalFoulsRival,totalUnsportsmanlikeFoulsRival,
        gameStatistics => {
            dispatch(updateGameStatisticsCompleted(gameStatistics));
            onSuccess();
        },
        onErrors)
};

const updatePlayerGameStatisticsCompleted = playerGameStatistics => ({
    type: actionTypes.UPDATE_PLAYERGAMESTATISTICS_COMPLETED,
    playerGameStatistics
});

export const updatePlayerGameStatistics = (playerId, gameId, totalPoints, minutes, threePointShots, setShots,freeShots,failThreePointShots,failSetShots,failFreeShots,rebounds,blockedShot,assists,personalFouls,technicalFouls,unsportsmanlikeFouls, onSuccess, onErrors) => dispatch => {
    backend.statisticsService.updatePlayerGameStatistics(playerId, gameId, totalPoints, minutes, threePointShots, setShots,freeShots,failThreePointShots,failSetShots,failFreeShots,rebounds,blockedShot,assists,personalFouls,technicalFouls,unsportsmanlikeFouls,
        playerGameStatistics => {
            dispatch(updatePlayerGameStatisticsCompleted(playerGameStatistics));
            onSuccess();
        },
        onErrors)
};

export const removeStatisticsToGame = (gameId, onSuccess, onErrors) => {
    backend.statisticsService.removeStatisticsToGame(gameId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_STATISTICS_TO_GAME_COMPLETED};
}

export const removeStatisticsToPlayerOfGame = (playerId, gameId, onSuccess, onErrors) => {
    backend.statisticsService.removeStatisticsToPlayerOfGame(playerId, gameId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_STATISTICS_TO_PLAYER_OF_GAME_COMPLETED};
}