package es.udc.paproject.backend.rest.dtos;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Note;

public class NoteConversor {

    public NoteConversor() {
    }

    public final static NoteDto toNoteDto(Note note) {
        return new NoteDto(note.getId(), note.getTitle(), note.getDescription(),
        toDate(note.getNoteDate()), note.getPlayer().getId());
    }
    
    public final static List<NoteDto> toNoteDtos(List<Note> notes) {
        return notes.stream().map(c -> toNoteDto(c)).collect(Collectors.toList());
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