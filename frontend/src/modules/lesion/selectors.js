const getModuleState = state => state.lesion;

export const getOneLesion = state =>
    getModuleState(state).lesion;

export const getAllLesion = state =>
    getModuleState(state);

export const getLesionsSearch = state =>
    getModuleState(state).lesionsSearch;

export const getLesionsByPlayerId = state =>
    getModuleState(state).lesionsByPlayerId;