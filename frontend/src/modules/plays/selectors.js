const getModuleState = state => state.plays;

export const getPlay = state =>
    getModuleState(state).play;

export const getPlays = state =>
    getModuleState(state);

export const getPlaysByTeamId = state =>
    getModuleState(state).playsByTeamId;