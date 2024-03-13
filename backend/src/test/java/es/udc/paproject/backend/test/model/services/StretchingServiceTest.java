package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.Stretching;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.Training;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedStretchingException;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.model.services.StretchingService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;
import es.udc.paproject.backend.model.services.GameService;
import es.udc.paproject.backend.model.services.TrainingService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class StretchingServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private TrainingService trainingService;

    @Autowired
    private GameService gameService;

    @Autowired
    private StretchingService stretchingService;

    private final LocalDateTime startDate = LocalDateTime.of(2021, 5, 12, 15, 56);

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName);
    }

    private Player createPlayer(Long teamId) throws InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        return playerService.addPlayer(teamId, "jugador1", "apellido1", "apellido2", "PointGuard",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco@gmail.com", "46095900J");
    }

    private Player createPlayer2(Long teamId) throws InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        return playerService.addPlayer(teamId, "jugador2", "apellido11", "apellido22", "SmallForward",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco2@gmail.com", "53984323B");
    }

    private Training createTraining(Long teamId) throws InstanceNotFoundException {
        return trainingService.addTraining(teamId, null, startDate, "120", "description", "objective");
    }

    private Game createGame(Long teamId) throws InstanceNotFoundException {
        return gameService.addGame(teamId, null, startDate, "rival");
    }

    // Hamstrings, Buttocks, Calf, Adductors, Shoulder, Quadriceps, Back, Pectoral,
    // Crotch, Triceps

    @Test
    public void testAddStretchingAndFindStretchingById() throws InstanceNotFoundException {

        Stretching stretching = stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        Stretching stretchingFound = stretchingService.findStretchingById(stretching.getId());

        assertEquals(stretching, stretchingFound);
    }

    @Test
    public void testAddStretchingToPlayerAndFindStretchingsByPlayerId() throws InstanceNotFoundException,
            DuplicateInstanceException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Player player = createPlayer(team.getId());
        Player player2 = createPlayer2(team.getId());

        Stretching stretching = stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        Stretching stretching2 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        stretchingService.addStretchingToPlayer(player.getId(), stretching.getId());
        stretchingService.addStretchingToPlayer(player2.getId(), stretching.getId());
        stretchingService.addStretchingToPlayer(player.getId(), stretching2.getId());

        List<Stretching> stretchings1 = stretchingService.findStretchingsByPlayerId(player.getId());
        List<Stretching> stretchings2 = stretchingService.findStretchingsByPlayerId(player2.getId());

        assertEquals(stretchings1.size(), 2);
        assertEquals(stretchings2.size(), 1);
    }

    @Test
    public void testRemoveStretchingToPlayer() throws InstanceNotFoundException,
            DuplicateInstanceException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Player player = createPlayer(team.getId());

        Stretching stretching = stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        Stretching stretching2 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        Stretching stretching3 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");

        stretchingService.addStretchingToPlayer(player.getId(), stretching.getId());
        stretchingService.addStretchingToPlayer(player.getId(), stretching2.getId());
        stretchingService.addStretchingToPlayer(player.getId(), stretching3.getId());

        stretchingService.removeStretchingToPlayer(stretching2.getId(), player.getId());

        List<Stretching> stretchings1 = stretchingService.findStretchingsByPlayerId(player.getId());
        List<Stretching> stretchingsTotal = stretchingService.findAllStretchings();

        assertEquals(stretchings1.size(), 2);
        assertEquals(stretchingsTotal.size(), 3);
    }

    @Test
    public void testAddStretchingToTrainingAndFindStretchingsByTrainingId() throws InstanceNotFoundException,
            DuplicateInstanceException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Training training = createTraining(team.getId());
        Training training2 = createTraining(team.getId());

        Stretching stretching = stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        Stretching stretching2 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        stretchingService.addStretchingToTraining(training.getId(), stretching.getId());
        stretchingService.addStretchingToTraining(training2.getId(), stretching.getId());
        stretchingService.addStretchingToTraining(training.getId(), stretching2.getId());

        List<Stretching> stretchings1 = stretchingService.findStretchingsByTrainingId(training.getId());
        List<Stretching> stretchings2 = stretchingService.findStretchingsByTrainingId(training2.getId());

        assertEquals(stretchings1.size(), 2);
        assertEquals(stretchings2.size(), 1);
    }

    @Test
    public void testRemoveStretchingToTraining() throws InstanceNotFoundException,
            DuplicateInstanceException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Training training = createTraining(team.getId());

        Stretching stretching = stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        Stretching stretching2 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        Stretching stretching3 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");

        stretchingService.addStretchingToTraining(training.getId(), stretching.getId());
        stretchingService.addStretchingToTraining(training.getId(), stretching2.getId());
        stretchingService.addStretchingToTraining(training.getId(), stretching3.getId());

        stretchingService.removeStretchingToTraining(stretching2.getId(), training.getId());

        List<Stretching> stretchings1 = stretchingService.findStretchingsByTrainingId(training.getId());
        List<Stretching> stretchingsTotal = stretchingService.findAllStretchings();

        assertEquals(stretchings1.size(), 2);
        assertEquals(stretchingsTotal.size(), 3);
    }

    @Test
    public void testAddStretchingToGameAndFindStretchingsByGameId() throws InstanceNotFoundException,
            DuplicateInstanceException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGame(team.getId());
        Game game2 = createGame(team.getId());

        Stretching stretching = stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        Stretching stretching2 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        stretchingService.addStretchingToGame(game.getId(), stretching.getId());
        stretchingService.addStretchingToGame(game2.getId(), stretching.getId());
        stretchingService.addStretchingToGame(game.getId(), stretching2.getId());

        List<Stretching> stretchings1 = stretchingService.findStretchingsByGameId(game.getId());
        List<Stretching> stretchings2 = stretchingService.findStretchingsByGameId(game2.getId());

        assertEquals(stretchings1.size(), 2);
        assertEquals(stretchings2.size(), 1);
    }

    @Test
    public void testRemoveStretchingToGame() throws InstanceNotFoundException,
            DuplicateInstanceException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGame(team.getId());

        Stretching stretching = stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        Stretching stretching2 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        Stretching stretching3 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");

        stretchingService.addStretchingToGame(game.getId(), stretching.getId());
        stretchingService.addStretchingToGame(game.getId(), stretching2.getId());
        stretchingService.addStretchingToGame(game.getId(), stretching3.getId());

        stretchingService.removeStretchingToGame(stretching2.getId(), game.getId());

        List<Stretching> stretchings1 = stretchingService.findStretchingsByGameId(game.getId());
        List<Stretching> stretchingsTotal = stretchingService.findAllStretchings();

        assertEquals(stretchings1.size(), 2);
        assertEquals(stretchingsTotal.size(), 3);
    }

    @Test
    public void testFindAllStretchings() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Adductors");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Calf");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Calf");

        List<Stretching> stretchings1 = stretchingService.findAllStretchings();

        assertEquals(stretchings1.size(), 5);
    }

    @Test
    public void testFindStretchingsByType() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Adductors");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Calf");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Calf");

        List<Stretching> stretchings1 = stretchingService.findStretchingsByType("Calf");
        List<Stretching> stretchings2 = stretchingService.findStretchingsByType("Adductors");
        List<Stretching> stretchings3 = stretchingService.findStretchingsByType("Hamstrings");

        assertEquals(stretchings1.size(), 2);
        assertEquals(stretchings2.size(), 1);
        assertEquals(stretchings3.size(), 1);
    }

    @Test
    public void testRemoveStretching() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException, UsedStretchingException {
        
        stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");
        Stretching stretching = stretchingService.addStretching("stretchingName2", "descript2ion", "Adductors");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Calf");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Calf");

        stretchingService.removeStretching(stretching.getId());

        List<Stretching> stretchings1 = stretchingService.findAllStretchings();


        assertEquals(stretchings1.size(), 4);
    }

    @Test
    public void testUpdatStretching() throws InstanceNotFoundException,
            DuplicateInstanceException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Player player = createPlayer(team.getId());
        Game game = createGame(team.getId());

        stretchingService.addStretching("stretchingName", "description", "Hamstrings");
        Stretching stretching2 = stretchingService.addStretching("stretchingName2", "descript2ion", "Pectoral");

        stretchingService.addStretchingToPlayer(player.getId(), stretching2.getId());
        stretchingService.addStretchingToGame(game.getId(), stretching2.getId());
        
        Stretching stretchingUpdated = stretchingService.updatStretching(stretching2.getId(), "cambio", "je je je", "Quadriceps");

        List<Stretching> stretchingsPlayer = stretchingService.findStretchingsByPlayerId(player.getId());
        List<Stretching> stretchingsGame = stretchingService.findStretchingsByGameId(game.getId());
        Stretching stretchingFound = stretchingService.findStretchingById(stretching2.getId());

        assertEquals(stretchingUpdated, stretchingsPlayer.get(0));
        assertEquals(stretchingUpdated, stretchingsGame.get(0));
        assertEquals(stretchingUpdated, stretchingFound);
        assertEquals(stretchingFound.getStretchingName(), "cambio");
        assertEquals(stretchingFound.getDescription(), "je je je");
        assertEquals(stretchingFound.getStretchingType(), "Quadriceps");


    }

    @Test
    public void testRemoveUsedStretching() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        
        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Player player = createPlayer(team.getId());
        
        stretchingService.addStretching("stretchingName2", "descript2ion", "Adductors");
        Stretching stretching = stretchingService.addStretching("stretchingName2", "descript2ion", "Adductors");
        stretchingService.addStretching("stretchingName2", "descript2ion", "Adductors");

        stretchingService.addStretchingToPlayer(player.getId(), stretching.getId());
        
        assertThrows(UsedStretchingException.class, () -> stretchingService.removeStretching(stretching.getId()));
    }
}