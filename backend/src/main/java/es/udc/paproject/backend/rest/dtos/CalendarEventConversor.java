package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.CalendarEvent;
import es.udc.paproject.backend.model.entities.Game;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class CalendarEventConversor {

    public CalendarEventConversor() {
    }

    public final static CalendarEventDto toCalendarEventDto(CalendarEvent calendarEvent) {
        return new CalendarEventDto(calendarEvent.getId(), calendarEvent.getTitle(),  toDate(calendarEvent.getStartDate()), toDate(calendarEvent.getFinishDate()),
                calendarEvent.getEventType(), calendarEvent.getUser().getId());
    }

    public final static List<CalendarEventDto> toCalendarEventDtos(List<CalendarEvent> calendarEvents) {
        return calendarEvents.stream().map(c -> toCalendarEventDto(c)).collect(Collectors.toList());
    }

    public final static Date toDate(LocalDateTime localDateTime) {
        Date date = Date.from( localDateTime.atZone( ZoneId.systemDefault()).toInstant());
        return date;
    }

    public final static LocalDateTime toLocalDateTime(Date date) {
        LocalDateTime localDateTime = Instant.ofEpochMilli( date.getTime()).atZone( ZoneId.systemDefault()).toLocalDateTime();
        return localDateTime;
    }
}
