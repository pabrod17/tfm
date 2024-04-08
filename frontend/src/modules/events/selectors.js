const getModuleState = state => state.events;

export const getOneEvent = state =>
    getModuleState(state).event;

export const getAllEvents = state =>
    getModuleState(state);