package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Note;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;

public interface NoteService {
    
    Note addNoteToPlayer(Long playerId, String title, String description) throws InstanceNotFoundException;

    List<Note> findNotesByPlayer(Long playerId) throws InstanceNotFoundException;

    Note findNoteById(Long noteId) throws InstanceNotFoundException;

    List<Note> findNotesByPlayerAndDates(Long playerId, LocalDateTime startDate, LocalDateTime endDate) throws InstanceNotFoundException, StartDateAfterEndDateException;

    void removeNote(Long noteId) throws InstanceNotFoundException;

    Note updateNote(Long noteId, String title, String description) throws InstanceNotFoundException;
}