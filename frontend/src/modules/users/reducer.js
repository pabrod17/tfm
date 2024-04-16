import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    user: null,
    users: null
};

const user = (state = initialState.user, action) => {

    switch (action.type) {

        case actionTypes.SIGN_UP_COMPLETED:
            return action.authenticatedUser.user;
        case actionTypes.SIGN_UP_BY_COACH_COMPLETED:
            return state;
        case actionTypes.LOGIN_COMPLETED:
            return action.authenticatedUser.user;

        case actionTypes.LOGOUT:
            return initialState.user;

        case actionTypes.UPDATE_PROFILE_COMPLETED:
            return action.user;
            
        case actionTypes.REMOVE_USER_BY_COACH_COMPLETED:
            return state;
            
        case actionTypes.REMOVE_USER_BY_ADMIN_COMPLETED:
            return state;

        default:
            return state;

    }

}

const users = (state = initialState.users, action) => {

    switch (action.type) {

        case actionTypes.FIND_USERS_BY_COACH_ID_COMPLETED:
            return action.users;
        case actionTypes.FIND_USERS_BY_ADMIN_ID_COMPLETED:
            return action.users;
        default:
            return state;

    }

}

const reducer = combineReducers({
    user,
    users
});

export default reducer;


