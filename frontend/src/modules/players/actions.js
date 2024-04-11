import * as actionTypes from './actionsTypes';
import backend from '../../backend';


const findPlayerByIdOfTeamCompleted = player => ({
    type: actionTypes.FIND_PLAYER_BY_ID_OF_TEAM_COMPLETED,
    player
});

export const findPlayerByIdOfTeam = (playerId, teamId, onSuccess) => dispatch => {
    backend.playerService.findPlayerByIdOfTeam(playerId, teamId,
        player => {
            dispatch(findPlayerByIdOfTeamCompleted(player));
            onSuccess();
        }
        );
}

const findPlayerByIdCompleted = player => ({
    type: actionTypes.FIND_PLAYER_BY_ID_COMPLETED,
    player
});

export const findPlayerById = (playerId, onSuccess) => dispatch => {
    backend.playerService.findPlayerById(playerId,
        player => {
            dispatch(findPlayerByIdCompleted(player));
            onSuccess();
        }
        );
}

const findPlayersByUserIdCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_USER_ID_COMPLETED,
    players
});

export const findPlayersByUserId = (onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayersByUserId(
        players => {
            dispatch(findPlayersByUserIdCompleted(players));
            onSuccess();
        },
        onErrors);
}

const findPlayerByDniOfTeamCompleted = player => ({
    type: actionTypes.FIND_PLAYER_BY_DNI_OF_TEAM_COMPLETED,
    player
});

export const findPlayerByDniOfTeam = (teamId, dni, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayerByDniOfTeam(teamId, dni,
        player => {
            dispatch(findPlayerByDniOfTeamCompleted(player));
            onSuccess();
        },
        onErrors);
}

const findPlayersByCompletedNameOfTeamCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_COMPLETED_NAME_OF_TEAM_COMPLETED,
    players
});

export const findPlayersByCompletedNameOfTeam = (teamId, playerName, primaryLastName, secondLastName, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayersByCompletedNameOfTeam(teamId, playerName, primaryLastName, secondLastName,
        players => {
            dispatch(findPlayersByCompletedNameOfTeamCompleted(players));
            onSuccess();
        },
        onErrors);
}








const findPlayerByUserIdAndNameCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_USER_ID_AND_NAME_COMPLETED,
    players
});

export const findPlayerByUserIdAndName = (playerName, primaryLastName, secondLastName, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayerByUserIdAndName(playerName, primaryLastName, secondLastName,
        players => {
            dispatch(findPlayerByUserIdAndNameCompleted(players));
        },
        onSuccess,
        onErrors);
}
const findPlayerByUserIdAndDniCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_USER_ID_AND_DNI_COMPLETED,
    players
});

export const findPlayerByUserIdAndDni = (dni, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayerByUserIdAndDni(dni,
        players => {
            dispatch(findPlayerByUserIdAndDniCompleted(players));
        },
        onSuccess,
        onErrors);
}
const findPlayerByUserIdAndPositionCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_USER_ID_AND_POSITION_COMPLETED,
    players
});

export const findPlayerByUserIdAndPosition = (position, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayerByUserIdAndPosition(position,
        players => {
            dispatch(findPlayerByUserIdAndPositionCompleted(players));
        },
        onSuccess,
        onErrors);
}
const findPlayerByUserIdAndEmailCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_USER_ID_AND_POSITION_COMPLETED,
    players
});

export const findPlayerByUserIdAndEmail = (email, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayerByUserIdAndEmail(email,
        players => {
            dispatch(findPlayerByUserIdAndEmailCompleted(players));
        },
        onSuccess,
        onErrors);
}
const findPlayerByUserIdWithLesionCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_USER_ID_WITH_LESION_COMPLETED,
    players
});

export const findPlayerByUserIdWithLesion = (onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayerByUserIdWithLesion(
        players => {
            dispatch(findPlayerByUserIdWithLesionCompleted(players));
        },
        onSuccess,
        onErrors);
}
const findPlayerByUserIdWithLesionTypeCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_USER_ID_WITH_LESION_TYPE_COMPLETED,
    players
});

export const findPlayerByUserIdWithLesionType = (lesionType, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayerByUserIdWithLesionType(lesionType,
        players => {
            dispatch(findPlayerByUserIdWithLesionTypeCompleted(players));
        },
        onSuccess,
        onErrors);
}



















const findAPlayersOfTeamCompleted = playersByTeamId => ({
    type: actionTypes.FIND_PLAYERS_OF_TEAM_COMPLETED,
    playersByTeamId
});

export const findAPlayersOfTeam = (teamId, onSuccess, onErrors) => dispatch => {
    backend.playerService.findAPlayersOfTeam(teamId,
        players => {
            dispatch(findAPlayersOfTeamCompleted(players));
            onSuccess();
        },
        onErrors);
}

const findPlayersByTrainingCompleted = playersByTrainingId => ({
    type: actionTypes.FIND_PLAYERS_BY_TRAINING_COMPLETED,
    playersByTrainingId
});

export const findPlayersByTraining = (trainingId, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayersByTraining(trainingId,
        players => {
            dispatch(findPlayersByTrainingCompleted(players));
            onSuccess();
        },
        onErrors);
}

const findPlayersByGameCompleted = playersByGameId => ({
    type: actionTypes.FIND_PLAYERS_BY_GAME_COMPLETED,
    playersByGameId
});

export const findPlayersByGame = (gameId, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayersByGame(gameId,
        players => {
            dispatch(findPlayersByGameCompleted(players));
            onSuccess();
        },
        onErrors);
}

const findPlayersByPositionAndTeamCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_BY_POSITION_AND_TEAM_COMPLETED,
    players
});

export const findPlayersByPositionAndTeam = (teamId, position, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayersByPositionAndTeam(teamId, position,
        players => {
            dispatch(findPlayersByPositionAndTeamCompleted(players));
            
        },onSuccess,
        onErrors);
}

const findPlayersrWithLesionOfTeamCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_WITH_LESION_OF_TEAM_COMPLETED,
    players
});

export const findPlayersrWithLesionOfTeam = (teamId, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayersrWithLesionOfTeam(teamId,
        players => {
            dispatch(findPlayersrWithLesionOfTeamCompleted(players));
        },onSuccess,
        onErrors);
}

const findPlayersWithOneTypeLesionCompleted = players => ({
    type: actionTypes.FIND_PLAYERS_WITH_ONE_TYPE_LESION_COMPLETED,
    players
});

export const findPlayersWithOneTypeLesion = (teamId, typeLesion, onSuccess, onErrors) => dispatch => {
    backend.playerService.findPlayersWithOneTypeLesion(teamId, typeLesion,
        players => {
            dispatch(findPlayersWithOneTypeLesionCompleted(players));
        },onSuccess,
        onErrors);
}

const addPlayerCompleted = player => ({
    type: actionTypes.ADD_PLAYER_COMPLETED,
    player
});

export const addPlayer = (teamId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni, onSuccess, onErrors) => dispatch => {
    backend.playerService.addPlayer(teamId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni,
        player => {
            dispatch(addPlayerCompleted(player));
            onSuccess();
        },
        onErrors);
}

export const changePlayerToTeam = (teamId, playerId, onSuccess, onErrors) => {
    backend.playerService.changePlayerToTeam(teamId, playerId, onSuccess, onErrors);
    return {type: actionTypes.CHANGE_PLAYER_TO_TEAM_COMPLETED};
}

export const clearTotalStatistics = (playerId, onSuccess, onErrors) => {
    backend.playerService.clearTotalStatistics(playerId, onSuccess, onErrors);
    return {type: actionTypes.CLEAR_TOTAL_STATISTICS_COMPLETED};
}

const updatePlayerCompleted = player => ({
    type: actionTypes.UPDATE_PLAYER_COMPLETED,
    player
});

export const updatePlayer = (playerId, teamId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni, onSuccess, onErrors) => dispatch => {
    backend.playerService.updatePlayer(playerId, teamId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni,
        player => {
            dispatch(updatePlayerCompleted(player));
            onSuccess();
        },
        onErrors);
}

export const removePlayer = (playerId, onSuccess, onErrors) => {
    backend.playerService.removePlayer(playerId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_PLAYER_COMPLETED};
}