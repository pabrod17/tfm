const getModuleState = state => state.notes;

export const getNote = state =>
    getModuleState(state).note;

export const getNotes = state =>
    getModuleState(state);