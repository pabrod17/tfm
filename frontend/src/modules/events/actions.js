import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findEventByIdCompleted = event => ({
    type: actionTypes.FIND_EVENT_BY_ID_COMPLETED,
    event
});

export const findGameById = (eventId, onSuccess) => dispatch => {
    backend.eventService.findEventById(eventId,
        event => {
            dispatch(findEventByIdCompleted(event));
            onSuccess();
        }
        );
}

const findEventsByUserIdCompleted = events => ({
    type: actionTypes.FIND_EVENTS_BY_USER_ID_COMPLETED,
    events
});

export const findEventsByUserId = (onSuccess, onErrors) => dispatch => {
    backend.eventService.findEventsByUserId(
        events => {
            dispatch(findEventsByUserIdCompleted(events));
            onSuccess();
        },
        onErrors);
}

const addEventCompleted = event => ({
    type: actionTypes.ADD_EVENT_COMPLETED,
    event
});

export const addEvent = (title, startDate, finishDate, onSuccess, onErrors) => dispatch => {
    backend.eventService.addEvent(title, startDate, finishDate,
        event => {
            dispatch(addEventCompleted(event));
            onSuccess();
        },
        onErrors);
}



const updateEventCompleted = event => ({
    type: actionTypes.UPDATE_EVENT_COMPLETED,
    event
});

export const updateEvent = (eventId, title, startDate, finishDate, onSuccess, onErrors) => dispatch => {
    backend.eventService.updateEvent(eventId, title, startDate, finishDate,
        event => {
            dispatch(updateEventCompleted(event));
            onSuccess();
        },
        onErrors);
}

export const removeEvent = (eventId, onSuccess, onErrors) => {
    backend.eventService.removeEvent(eventId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_EVENT_COMPLETED};
}
