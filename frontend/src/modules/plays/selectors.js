const getModuleState = state => state.plays;

export const getPlay = state =>
    getModuleState(state).play;

export const getPlays = state =>
    getModuleState(state);