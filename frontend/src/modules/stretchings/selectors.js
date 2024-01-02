const getModuleState = state => state.stretchings;

export const getOneStretching = state =>
    getModuleState(state).stretching;

export const getAllStretchings = state =>
    getModuleState(state);

export const getStretchingsSearch = state =>
    getModuleState(state).stretchingsSearch;