import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findGameByIdCompleted = game => ({
    type: actionTypes.FIND_GAME_BY_ID_COMPLETED,
    game
});

export const findGameById = (gameId, onSuccess) => dispatch => {
    backend.gameService.findGameById(gameId,
        game => {
            dispatch(findGameByIdCompleted(game));
            onSuccess();
        }
        );
}

const findGamesByUserIdCompleted = games => ({
    type: actionTypes.FIND_GAMES_BY_USER_ID_COMPLETED,
    games
});

export const findGamesByUserId = (onSuccess, onErrors) => dispatch => {
    backend.gameService.findGamesByUserId(
        games => {
            dispatch(findGamesByUserIdCompleted(games));
            onSuccess();
        },
        onErrors);
}

const findGamesByPlayerIdCompleted = gamesByPlayerId => ({
    type: actionTypes.FIND_GAMES_BY_PLAYER_ID_COMPLETED,
    gamesByPlayerId
});

export const findGamesByPlayerId = (playerId, onSuccess, onErrors) => dispatch => {
    backend.gameService.findGamesByPlayerId(playerId,
        games => {
            dispatch(findGamesByPlayerIdCompleted(games));
            onSuccess();
        },
        onErrors);
}

const findGamesByTwoDatesAndTeamIdOrSeasonIdCompleted = games => ({
    type: actionTypes.FIND_GAMES_BY_TWO_DATES_AND_TEAM_ID_OR_SEASON_ID_COMPLETED,
    games
});

export const findGamesByTwoDatesAndTeamIdOrSeasonId = (teamId, seasonId, startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.gameService.findGamesByTwoDatesAndTeamIdOrSeasonId(teamId, seasonId, startDate, endDate,
        games => {
            dispatch(findGamesByTwoDatesAndTeamIdOrSeasonIdCompleted(games));
            onSuccess();
        },
        onErrors);
}

export const findGamesByTwoDates = (startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.gameService.findGamesByTwoDates(startDate, endDate,
        games => {
            dispatch(findGamesByTwoDatesAndTeamIdOrSeasonIdCompleted(games));
            onSuccess();
        },
        onErrors);
}

export const findGamesByTwoDatesAndTeamId = (teamId, startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.gameService.findGamesByTwoDatesAndTeamId(teamId, startDate, endDate,
        games => {
            dispatch(findGamesByTwoDatesAndTeamIdOrSeasonIdCompleted(games));
            onSuccess();
        },
        onErrors);
}

export const findGamesByTwoDatesAndSeasonId = (seasonId, startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.gameService.findGamesByTwoDatesAndSeasonId(seasonId, startDate, endDate,
        games => {
            dispatch(findGamesByTwoDatesAndTeamIdOrSeasonIdCompleted(games));
            onSuccess();
        },
        onErrors);
}

const findGamesByTeamIdCompleted = gamesByTeamId => ({
    type: actionTypes.FIND_GAMES_BY_TEAM_ID_COMPLETED,
    gamesByTeamId
});

export const findGamesByTeamId = (teamId, onSuccess, onErrors) => dispatch => {
    backend.gameService.findGamesByTeamId(teamId,
        games => {
            dispatch(findGamesByTeamIdCompleted(games));
            onSuccess();
        },
        onErrors);
}

const findGamesBySeasonIdCompleted = gamesBySeasonId => ({
    type: actionTypes.FIND_GAMES_BY_SEASON_ID_COMPLETED,
    gamesBySeasonId
});

export const findGamesBySeasonId = (seasonId, onSuccess, onErrors) => dispatch => {
    backend.gameService.findGamesBySeasonId(seasonId,
        games => {
            dispatch(findGamesBySeasonIdCompleted(games));
            onSuccess();
        },
        onErrors);
}

const addGameCompleted = game => ({
    type: actionTypes.ADD_GAME_COMPLETED,
    game
});

export const addGame = (teamId, seasonId, gameDate, rival, description, onSuccess, onErrors) => dispatch => {
    backend.gameService.addGame(teamId, seasonId, gameDate, rival, description,
        game => {
            dispatch(addGameCompleted(game));
            onSuccess();
        },
        onErrors);
}

export const addGameWithTeam = (teamId, gameDate, rival, description, onSuccess, onErrors) => dispatch => {
    backend.gameService.addGameWithTeam(teamId, gameDate, rival, description,
        game => {
            dispatch(addGameCompleted(game));
            onSuccess();
        },
        onErrors);
}

export const addGameWithSeason = (seasonId, gameDate, rival, description, onSuccess, onErrors) => dispatch => {
    backend.gameService.addGameWithSeason(seasonId, gameDate, rival, description,
        game => {
            dispatch(addGameCompleted(game));
            onSuccess();
        },
        onErrors);
}

export const addPlayerToGame = (gameId, playerId, onSuccess, onErrors) => {
    backend.gameService.addPlayerToGame(gameId, playerId, onSuccess, onErrors);
    return {type: actionTypes.ADD_PLAYER_TO_GAME_COMPLETED};
}

const updateGameCompleted = game => ({
    type: actionTypes.UPDATE_GAME_COMPLETED,
    game
});

export const updateGame = (gameId, gameDate, rival, description, onSuccess, onErrors) => dispatch => {
    backend.gameService.updateGame(gameId, gameDate, rival, description,
        game => {
            dispatch(updateGameCompleted(game));
            onSuccess();
        },
        onErrors);
}

export const removeGame = (gameId, onSuccess, onErrors) => {
    backend.gameService.removeGame(gameId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_GAME_COMPLETED};
}

export const removePlayerToGame = (playerId, gameId, onSuccess, onErrors) => {
    backend.gameService.removePlayerToGame(playerId, gameId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_PLAYER_TO_GAME_COMPLETED};
}