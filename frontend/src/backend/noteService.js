import {config, appFetch} from './appFetch';

export const findNotesByPlayer = (playerId, onSuccess, onErrors) =>
    appFetch(`/notes?playerId=${playerId}`, config('GET'), onSuccess, onErrors);

export const findNoteById = (noteId, onSuccess, onErrors) =>
    appFetch(`/notes/${noteId}`, config('GET'), onSuccess, onErrors);

export const findNotesByPlayerAndDates = (playerId, startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/notes/dates?playerId=${playerId}&startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const addNoteToPlayer = (playerId, title, description, onSuccess, onErrors) =>
    appFetch(`/notes/${playerId}/addNoteToPlayer?title=${title}&description=${description}`, config('POST'), onSuccess, onErrors);

export const updateNote = (noteId, title, description, onSuccess, onErrors) =>
    appFetch(`/notes/${noteId}?title=${title}&description=${description}`, config('PUT'), onSuccess, onErrors);

export const removeNote = (noteId, onSuccess, onErrors) =>
    appFetch(`/notes/${noteId}`, config('DELETE'), onSuccess, onErrors);