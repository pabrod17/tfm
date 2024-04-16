const getModuleState = state => state.users;

export const getUser = state => 
    getModuleState(state).user;

export const getAllUser = state => 
    getModuleState(state).users;

export const isLoggedIn = state =>
    getUser(state) !== null

export const getUserName = state => 
    isLoggedIn(state) ? getUser(state).userName : null;



