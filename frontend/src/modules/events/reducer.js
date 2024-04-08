import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    event: null,
    events:null
};

const event = (state = initialState.event, action) => {

    switch(action.type) {
        case actionTypes.ADD_EVENT_COMPLETED:
            return action.event;
        case actionTypes.UPDATE_EVENT_COMPLETED:
            return action.event;
        case actionTypes.REMOVE_EVENT_COMPLETED:
            return state;
        case actionTypes.FIND_EVENT_BY_ID_COMPLETED:
            return action.event;
        default:
            return state;
    }
}

const events = (state = initialState.events, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_EVENTS_BY_USER_ID_COMPLETED:
            return action.events;
        default:
            return state;
    }
}

const reducer = combineReducers({
    event,
    events
});

export default reducer;