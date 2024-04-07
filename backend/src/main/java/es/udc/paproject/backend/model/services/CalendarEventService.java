package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.CalendarEvent;
import es.udc.paproject.backend.model.entities.CalendarEventDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import jdk.vm.ci.meta.Local;

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarEventService {

    CalendarEvent addCalendarEvent(Long userId, String title, LocalDateTime startDate, LocalDateTime finishDate) throws InstanceNotFoundException;

    CalendarEvent findCalendarEventById(Long calendarEventId) throws InstanceNotFoundException;

    List<CalendarEvent> findCalendarEventsByUserId(Long userId) throws InstanceNotFoundException;

    void removeCalendarEvent(Long calendarEventId) throws InstanceNotFoundException;

    CalendarEvent updateCalendarEvent(Long calendarEventId, String title, LocalDateTime startDate, LocalDateTime finishDate) throws InstanceNotFoundException;
}
