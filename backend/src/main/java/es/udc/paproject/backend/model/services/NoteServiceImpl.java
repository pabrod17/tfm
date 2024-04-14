package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Note;
import es.udc.paproject.backend.model.entities.NoteDao;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;

@Service
@Transactional
public class NoteServiceImpl implements NoteService {


    @Autowired
    private NoteDao noteDao;

    @Autowired
    private PlayerDao playerDao;

    @Override
    public Note addNoteToPlayer(Long playerId, String title, String description)
            throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        LocalDateTime noteDate = LocalDateTime.now();
        Player player = playerDao.findById(playerId).get();
        Note note = new Note(title, description, noteDate, player);
        noteDao.save(note);
        return note;
    }

    @Override
    public Note findNoteById(Long noteId) throws InstanceNotFoundException {

        if (!noteDao.existsById(noteId)) {
            throw new InstanceNotFoundException("project.entities.note");
        }

        Note note = noteDao.findById(noteId).get();
        return note;
    }

    @Override
    public List<Note> findNotesByPlayer(Long playerId) throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<Note> notes = new ArrayList<>();
        notes = noteDao.findByPlayerId(playerId);

        if (notes.isEmpty()) {
            return notes;
        }

        return notes;
    }

    @Override
    public List<Note> findNotesByPlayerAndDates(Long playerId, LocalDateTime startDate, LocalDateTime endDate) throws InstanceNotFoundException,
            StartDateAfterEndDateException {

        if(startDate.isAfter(endDate)){
            throw new StartDateAfterEndDateException(startDate, endDate);
        }

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        
        List<Note> notesByPlayer = noteDao.findByPlayerId(playerId);
        List<Note> notes = new ArrayList<>();

        for (Note note : notesByPlayer) {
            if(note.getNoteDate().isAfter(startDate) && note.getNoteDate().isBefore(endDate)) {
                notes.add(note);
            }
        }

        if (notes.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.note");
        }

        return notes;
    }

    @Override
    public void removeNote(Long noteId) throws InstanceNotFoundException {

        if (!noteDao.existsById(noteId)) {
            throw new InstanceNotFoundException("project.entities.note");
        }
        Note note = noteDao.findById(noteId).get();
        noteDao.delete(note);
    }

    @Override
    public Note updateNote(Long noteId, String title, String description) throws InstanceNotFoundException {
        if (!noteDao.existsById(noteId)) {
            throw new InstanceNotFoundException("project.entities.note");
        }

        Note note = noteDao.findById(noteId).get();
        if(title != null)
            note.setTitle(title);
        if(description != null)
            note.setDescription(description);
        noteDao.save(note);
        return note;
    }
}