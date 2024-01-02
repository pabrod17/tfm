import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    note: null,
    notes: null
};

const note = (state = initialState.note, action) => {

    switch (action.type) {

        case actionTypes.ADD_NOTE_TO_PLAYER_COMPLETED:
            return action.note;
        case actionTypes.UPDATE_NOTE_COMPLETED:
            return action.note;
        case actionTypes.FIND_NOTE_BY_ID_COMPLETED:
            return action.note;
        case actionTypes.REMOVE_NOTE_COMPLETED:
            return state;
        default:
            return state;
    }
}

const notes = (state = initialState.notes, action) => {

    switch (action.type) {

        case actionTypes.FIND_NOTES_BY_PLAYER_COMPLETED:
            return action.notes;
        case actionTypes.FIND_NOTES_BY_PLAYER_AND_DATES_COMPLETED:
            return action.notes;
        default:
            return state;
    }
}

const reducer = combineReducers({
    note,
    notes
});

export default reducer;