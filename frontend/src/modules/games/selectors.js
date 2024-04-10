const getModuleState = state => state.games;

export const getOneGame = state =>
    getModuleState(state).game;

export const getAllGames = state =>
    getModuleState(state);

export const getGamesBySeasonId = state =>
    getModuleState(state).gamesBySeasonId;

export const getGamesByTeamId = state =>
    getModuleState(state).gamesByTeamId;