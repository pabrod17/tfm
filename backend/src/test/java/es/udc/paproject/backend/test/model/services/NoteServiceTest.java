package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;


import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Note;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.NoteService;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class NoteServiceTest {

    private final Long NON_EXISTENT_ID = new Long(-1);

    private final LocalDateTime startDate1 = LocalDateTime.of(2020, 5, 12, 15, 56);
    private final LocalDateTime endDate1 = LocalDateTime.of(2021, 7, 14, 15, 56);
    private final LocalDateTime startDate2 = LocalDateTime.of(2021, 4, 30, 15, 56);
    private final LocalDateTime endDate2 = LocalDateTime.of(2021, 5, 30, 15, 56);

    @Autowired
    private NoteService noteService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName, "arenaName", "ownerName");
    }

    private Player createPlayer1(Long teamId) throws InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        Player player = playerService.addPlayer(teamId, "jugador1", "apellido1", "apellido2", "PointGuard",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco@gmail.com", "16599412J");
        return player;
    }

    private Player createPlayer2(Long teamId) throws InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        Player player = playerService.addPlayer(teamId, "jugador1", "apellido1", "apellido2", "PointGuard",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco2@gmail.com", "35492472E");
        return player;
    }

    @Test
    public void testAddNoteAndFindNoteById() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player = createPlayer1(team.getId());

        Note note = noteService.addNoteToPlayer(player.getId(), "Titulo!", "Descipcion de la nota");
        Note noteFound = noteService.findNoteById(note.getId());

        assertEquals(note, noteFound);
    }

    @Test
    public void testAddNoteAndFindNoteByIdWithBadId()
            throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player1 = createPlayer1(team.getId());

        noteService.addNoteToPlayer(player1.getId(), "Titulo1", "Descipcion de la nota");
        noteService.addNoteToPlayer(player1.getId(), "Titulo2", "Descipcion de la nota");

        assertThrows(InstanceNotFoundException.class, () -> noteService.findNoteById(NON_EXISTENT_ID));
    }

    @Test
    public void testFindNotesByPlayer() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player1 = createPlayer1(team.getId());
        Player player2 = createPlayer2(team.getId());

        Note note1Player1 = noteService.addNoteToPlayer(player1.getId(), "Titulo1", "Descipcion de la nota");
        Note note2Player1 = noteService.addNoteToPlayer(player1.getId(), "Titulo2", "Descipcion de la nota");
        Note note1Player2 = noteService.addNoteToPlayer(player2.getId(), "Titulo3", "Descipcion de la nota");

        List<Note> notesPlayer1 = noteService.findNotesByPlayer(player1.getId());
        List<Note> notesPlayer2 = noteService.findNotesByPlayer(player2.getId());

        assertEquals(2, notesPlayer1.size());
        assertEquals(1, notesPlayer2.size());
        assertEquals(note1Player1, notesPlayer1.get(0));
        assertEquals(note2Player1, notesPlayer1.get(1));
        assertEquals(note1Player2, notesPlayer2.get(0));
    }

    @Test
    public void testFindNotesByPlayerAndDates()
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException, DuplicateInstanceException, StartDateAfterEndDateException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player1 = createPlayer1(team.getId());
        Player player2 = createPlayer2(team.getId());

        Note note1Player1 = noteService.addNoteToPlayer(player1.getId(), "Titulo1", "Descipcion de la nota");
        Note note2Player1 = noteService.addNoteToPlayer(player1.getId(), "Titulo2", "Descipcion de la nota");
        Note note1Player2 = noteService.addNoteToPlayer(player2.getId(), "Titulo3", "Descipcion de la nota");
        Note note2Player2 = noteService.addNoteToPlayer(player2.getId(), "Titulo4", "Descipcion de la nota");
        Note note3Player2 = noteService.addNoteToPlayer(player2.getId(), "Titulo5", "Descipcion de la nota");

        List<Note> notesPlayer1 = noteService.findNotesByPlayerAndDates(player1.getId(), startDate1, endDate1);
        List<Note> notesPlayer2 = noteService.findNotesByPlayerAndDates(player2.getId(), startDate2, endDate2);

        assertEquals(2, notesPlayer1.size());
        assertEquals(3, notesPlayer2.size());
        assertEquals(note1Player1, notesPlayer1.get(0));
        assertEquals(note2Player1, notesPlayer1.get(1));
        assertEquals(note1Player2, notesPlayer2.get(0));
        assertEquals(note2Player2, notesPlayer2.get(1));
        assertEquals(note3Player2, notesPlayer2.get(2));
    }

    @Test
    public void testFindNotesByPlayerAndDatesWithBadDates()
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException, DuplicateInstanceException, StartDateAfterEndDateException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player1 = createPlayer1(team.getId());

        noteService.addNoteToPlayer(player1.getId(), "Titulo1", "Descipcion de la nota");
        noteService.addNoteToPlayer(player1.getId(), "Titulo2", "Descipcion de la nota");

        assertThrows(StartDateAfterEndDateException.class, () -> noteService.findNotesByPlayerAndDates(player1.getId(), endDate1, startDate1));
    }

    @Test
    public void testRemoveNote() throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException, DuplicateInstanceException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player1 = createPlayer1(team.getId());

        Note note1Player1 = noteService.addNoteToPlayer(player1.getId(), "Titulo1", "Descipcion de la nota");
        Note note2Player1 = noteService.addNoteToPlayer(player1.getId(), "Titulo2", "Descipcion de la nota");
        Note note3Player1 = noteService.addNoteToPlayer(player1.getId(), "Titulo3", "Descipcion de la nota");

        noteService.removeNote(note2Player1.getId());

        List<Note> notesPlayer1 = noteService.findNotesByPlayer(player1.getId());

        assertEquals(2, notesPlayer1.size());
        assertEquals(note1Player1, notesPlayer1.get(0));
        assertEquals(note3Player1, notesPlayer1.get(1));
    }

    @Test
    public void testUpdateNote() throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
    IncorrectPhoneNumberException, DuplicateInstanceException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player1 = createPlayer1(team.getId());

        noteService.addNoteToPlayer(player1.getId(), "Titulo1", "Descipcion de la nota");
        Note note2Player1 = noteService.addNoteToPlayer(player1.getId(), "Titulo2", "Descipcion de la nota");
        noteService.addNoteToPlayer(player1.getId(), "Titulo3", "Descipcion de la nota");

        noteService.updateNote(note2Player1.getId(), null, "Descripcion actualizada");

        Note noteFound = noteService.findNoteById(note2Player1.getId());

        assertEquals(noteFound.getId(), note2Player1.getId());
        assertEquals(noteFound.getTitle(), note2Player1.getTitle());
        assertEquals(noteFound.getDescription(), note2Player1.getDescription());
        assertEquals(noteFound.getNoteDate(), note2Player1.getNoteDate());
    }
}


