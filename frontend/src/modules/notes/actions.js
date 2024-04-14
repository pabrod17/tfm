import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findNotesByPlayerCompleted = notes => ({
    type: actionTypes.FIND_NOTES_BY_PLAYER_COMPLETED,
    notes
});

export const findNotesByPlayer = (playerId, onSuccess, onErrors) => dispatch => {
    backend.noteService.findNotesByPlayer(playerId,
        notes => {
            dispatch(findNotesByPlayerCompleted(notes));
            onSuccess();
        },
        onErrors)
};

const findNoteByIdCompleted = note => ({
    type: actionTypes.FIND_NOTE_BY_ID_COMPLETED,
    note
});

export const findNoteById = (noteId, onSuccess, onErrors) => dispatch => {
    backend.noteService.findNoteById(noteId,
        note => {
            dispatch(findNoteByIdCompleted(note));
            onSuccess();
        },
        onErrors)
}

const findNotesByPlayerAndDatesCompleted = notes => ({
    type: actionTypes.FIND_NOTES_BY_PLAYER_AND_DATES_COMPLETED,
    notes
});

export const findNotesByPlayerAndDates = (playerId, startDate, endDate, onSuccess, onErrors) => dispatch => {
    backend.noteService.findNotesByPlayerAndDates(playerId, startDate, endDate,
        notes => {
            dispatch(findNotesByPlayerAndDatesCompleted(notes));
            onSuccess();
        },
        onErrors)
};

export const addNoteToPlayer = (playerId, title, description, onSuccess, onErrors) => {
    backend.noteService.addNoteToPlayer(playerId, title, description, onSuccess, onErrors);
    return {type: actionTypes.ADD_NOTE_TO_PLAYER_COMPLETED};
};

const updateNoteCompleted = note => ({
    type: actionTypes.ADD_NOTE_TO_PLAYER_COMPLETED,
    note
});

export const updateNote = (noteId, title, description, onSuccess, onErrors) => dispatch => {
    backend.noteService.updateNote(noteId, title, description,
        note => {
            dispatch(updateNoteCompleted(note));
            onSuccess();
        },
        onErrors)
};

export const removeNote = (noteId, onSuccess, onErrors) => {
    backend.noteService.removeNote(noteId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_NOTE_COMPLETED};
}