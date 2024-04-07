import {config, appFetch} from './appFetch';

export const findEventById = (eventId, onSuccess, onErrors) =>
appFetch(`/events/${eventId}`, config('GET'), onSuccess, onErrors);

export const findEventsByUserId = (onSuccess, onErrors) =>
appFetch('/events/user', config('GET'), onSuccess, onErrors);

export const addEvent = (title, startDate, finishDate, onSuccess, onErrors) =>
    appFetch(`/events?title=${title}&startDate=${startDate}&finishDate=${finishDate}`, config('POST'), onSuccess, onErrors);

export const updateEvent = (eventId, title, startDate, finishDate, onSuccess, onErrors) =>
    appFetch(`/events/${eventId}?title=${title}&startDate=${startDate}&finishDate=${finishDate}`, config('PUT'), onSuccess, onErrors);

export const removeEvent = (eventId, onSuccess, onErrors) =>
    appFetch(`/events/${eventId}`, config('DELETE'), onSuccess, onErrors);