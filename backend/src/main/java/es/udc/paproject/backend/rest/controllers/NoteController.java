package es.udc.paproject.backend.rest.controllers;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.NoteService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.NoteDto;
import static es.udc.paproject.backend.rest.dtos.NoteConversor.toNoteDto;
import static es.udc.paproject.backend.rest.dtos.NoteConversor.toNoteDtos;
import static es.udc.paproject.backend.rest.dtos.NoteConversor.toLocalDateTime;;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";

    @Autowired
    private NoteService noteService;

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(InstanceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null, NOT_FOUND_EXCEPTION, locale);

        return new ErrorsDto(errorMessage);
    }

    @GetMapping("")
    public List<NoteDto> findNotesByPlayer(@RequestParam Long playerId) throws InstanceNotFoundException {
        return toNoteDtos(noteService.findNotesByPlayer(playerId));
    }

    @GetMapping("/{noteId}")
    public NoteDto findNoteById(@PathVariable Long noteId) throws InstanceNotFoundException {
        return toNoteDto(noteService.findNoteById(noteId));
    }

    @GetMapping("/dates")
    public List<NoteDto> findNotesByPlayerAndDates(@RequestParam Long playerId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate)
            throws InstanceNotFoundException, StartDateAfterEndDateException {
        return toNoteDtos(noteService.findNotesByPlayerAndDates(playerId, toLocalDateTime(startDate), toLocalDateTime(endDate)));
    } 

    @PostMapping("/{playerId}/addNoteToPlayer")
    public NoteDto addNoteToPlayer(@PathVariable Long playerId, @RequestParam String title, @RequestParam String description)
            throws InstanceNotFoundException {
        return toNoteDto(noteService.addNoteToPlayer(playerId, title, description));
    }

    @PutMapping("/{noteId}")
    public NoteDto updateNote(@PathVariable Long noteId,  @RequestParam String title, @RequestParam String description)
            throws InstanceNotFoundException {
        return toNoteDto(noteService.updateNote(noteId, title, description));
    }

    @DeleteMapping("/{noteId}")
    public void removeNote(@PathVariable Long noteId) throws InstanceNotFoundException {
        noteService.removeNote(noteId);
    }
}