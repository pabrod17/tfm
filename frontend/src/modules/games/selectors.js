const getModuleState = state => state.games;

export const getOneGame = state =>
    getModuleState(state).game;

export const getAllGames = state =>
    getModuleState(state);