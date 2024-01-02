const getModuleState = state => state.players;

export const getPlayer = state =>
    getModuleState(state).player;

export const getAllPlayers = state =>
    getModuleState(state);