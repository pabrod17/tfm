const getModuleState = state => state.players;

export const getPlayer = state =>
    getModuleState(state).player;

export const getAllPlayers = state =>
    getModuleState(state);

export const getPlayersByGameId = state =>
    getModuleState(state).playersByGameId;

export const getPlayersByTrainingId = state =>
    getModuleState(state).playersByTrainingId;