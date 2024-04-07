package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.CalendarEvent;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.CalendarEventService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.CalendarEventDto;
import es.udc.paproject.backend.rest.dtos.GameDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import static es.udc.paproject.backend.rest.dtos.CalendarEventConversor.toCalendarEventDto;
import static es.udc.paproject.backend.rest.dtos.CalendarEventConversor.toCalendarEventDtos;
import static es.udc.paproject.backend.rest.dtos.GameConversor.*;

@RestController
@RequestMapping("/events")
public class CalendarEventController {

    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";

    @Autowired
    private CalendarEventService calendarEventService;

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(InstanceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null, NOT_FOUND_EXCEPTION, locale);

        return new ErrorsDto(errorMessage);
    }

    @GetMapping("/{eventId}")
    public CalendarEventDto findCalendarEventById(@PathVariable Long eventId) throws InstanceNotFoundException {
        return toCalendarEventDto(calendarEventService.findCalendarEventById(eventId));
    }

    @GetMapping("/user")
    public List<CalendarEventDto> findCalendarEventsByUserId(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toCalendarEventDtos(calendarEventService.findCalendarEventsByUserId(userId));
    }

    @PostMapping("")
    public CalendarEventDto addCalendarEvent(@RequestAttribute Long userId,
                                             @RequestParam String title,
                           @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startDate,
                                             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date finishDate)
            throws InstanceNotFoundException {
        return toCalendarEventDto(calendarEventService.addCalendarEvent(userId, title, toLocalDateTime(startDate), toLocalDateTime(finishDate)));
    }

    @PutMapping("/{eventId}")
    public CalendarEventDto updateCalendarEvent(@PathVariable Long calendarEventId,
                                       @RequestParam String title,
                              @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date startDate,
                                       @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date finishDate
                                       )
            throws InstanceNotFoundException {
        return toCalendarEventDto(calendarEventService.updateCalendarEvent(calendarEventId, title, toLocalDateTime(startDate),toLocalDateTime(finishDate)));
    }

    @DeleteMapping("/{eventId}")
    public void removeGame(@PathVariable Long eventId) throws InstanceNotFoundException{
        calendarEventService.removeCalendarEvent(eventId);
    }
}
