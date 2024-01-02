const getModuleState = state => state.seasons;

export const getSeason = state => 
    getModuleState(state).season;

export const getAllSeasons = state =>
    getModuleState(state);
