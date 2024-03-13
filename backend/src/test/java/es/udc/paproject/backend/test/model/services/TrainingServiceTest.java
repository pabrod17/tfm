package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.Training;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.exceptions.UsedTrainingException;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.TrainingService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class TrainingServiceTest {

    @Autowired
    private TrainingService trainingService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private UserService userService;

    private final Long NON_EXISTENT_ID = new Long(-1);

    private final LocalDateTime trainingDate = LocalDateTime.of(2023, 5, 12, 15, 56);
    private final LocalDateTime trainingDate2 = LocalDateTime.of(2022, 5, 12, 15, 56);
    private final LocalDateTime trainingDate3 = LocalDateTime.of(2022, 5, 12, 15, 56);
    private final LocalDateTime startDate = LocalDateTime.of(2021, 5, 12, 15, 56);
    private final LocalDateTime endDate = LocalDateTime.of(2022, 6, 12, 15, 56);

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName);
    }

    private Season createSeason(Long userId, String calendario)
            throws InstanceNotFoundException, DuplicateInstanceException, StartDateAfterEndDateException {
        return seasonService.addSeason(userId, startDate, endDate, calendario);
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

    private Player createPlayer3(Long teamId) throws InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        return playerService.addPlayer(teamId, "jugador2", "apellido11", "apellido22", "SmallForward",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco3@gmail.com", "27458552W");
    }

    @Test
    public void testAddTrainingAndFindTrainingById() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Training training = trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo",
                "objetivo");
        Training trainingFound = trainingService.findTrainingById(training.getId());
        assertEquals(training, trainingFound);
    }

    @Test
    public void testAddPlayerToTrainingAndFindPlayersToTraining() throws DuplicateInstanceException,
            InstanceNotFoundException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Player player = createPlayer(team.getId());
        Player player2 = createPlayer2(team.getId());
        Player player3 = createPlayer3(team.getId());
        Training training = trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo",
                "objetivo");
        Training training2 = trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo",
                "objetivo");

        trainingService.addPlayerToTraining(training.getId(), player.getId());
        trainingService.addPlayerToTraining(training.getId(), player3.getId());
        trainingService.addPlayerToTraining(training.getId(), player2.getId());

        trainingService.addPlayerToTraining(training2.getId(), player3.getId());

        List<Player> players1 = playerService.findPlayersByTraining(training.getId());
        List<Player> players2 = playerService.findPlayersByTraining(training2.getId());

        assertEquals(players1.size(), 3);
        assertEquals(players2.size(), 1);
    }

    @Test
    public void testAddPlayerToTrainingAndFindTrainingsByPlayerId() throws DuplicateInstanceException,
            InstanceNotFoundException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Player player = createPlayer(team.getId());
        Player player2 = createPlayer2(team.getId());
        Player player3 = createPlayer3(team.getId());
        Training training = trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo",
                "objetivo");
        Training training2 = trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo",
                "objetivo");

        trainingService.addPlayerToTraining(training.getId(), player.getId());
        trainingService.addPlayerToTraining(training.getId(), player3.getId());
        trainingService.addPlayerToTraining(training.getId(), player2.getId());

        trainingService.addPlayerToTraining(training2.getId(), player3.getId());

        List<Training> trainings1 = trainingService.findTrainingsByPlayerId(player3.getId());
        List<Training> trainings2 = trainingService.findTrainingsByPlayerId(player2.getId());

        assertEquals(trainings1.size(), 2);
        assertEquals(trainings2.size(), 1);
    }

    @Test
    public void testFindTrainingsByTwoDatesAndTeamIdOrSeasonId()
            throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException, StartDateAfterEndDateException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo", "objetivo");
        trainingService.addTraining(team.getId(), null, trainingDate2, "150", "describiendo", "objetivo");
        trainingService.addTraining(team.getId(), null, trainingDate3, "150", "describiendo", "objetivo");

        List<Training> trainings = trainingService.findTrainingsByTwoDatesAndTeamIdOrSeasonId(user.getId(), team.getId(), null,
                startDate, endDate);

        assertEquals(trainings.size(), 2);
    }

    @Test
    public void testFindTrainingsByTeamId()
            throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException, StartDateAfterEndDateException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");
        trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo", "objetivo");
        trainingService.addTraining(team.getId(), null, trainingDate2, "150", "describiendo", "objetivo");
        trainingService.addTraining(team.getId(), null, trainingDate3, "150", "describiendo", "objetivo");

        trainingService.addTraining(team2.getId(), null, trainingDate2, "150", "describiendo", "objetivo");

        List<Training> trainings = trainingService.findTrainingsByTeamId(team.getId());
        List<Training> trainings2 = trainingService.findTrainingsByTeamId(team2.getId());

        assertEquals(trainings.size(), 3);
        assertEquals(trainings2.size(), 1);
    }

    @Test
    public void testFindTrainingsByUserId()
            throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException, StartDateAfterEndDateException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");
        Season season2 = createSeason(user.getId(), "calendario2");

        trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo", "objetivo");
        trainingService.addTraining(team.getId(), null, trainingDate2, "150", "describiendo", "objetivo");
        trainingService.addTraining(team.getId(), null, trainingDate3, "150", "describiendo", "objetivo");

        trainingService.addTraining(team2.getId(), null, trainingDate2, "150", "describiendo", "objetivo");
        trainingService.addTraining(null, season2.getId(), trainingDate2, "150", "describiendo", "objetivo");

        List<Training> trainings = trainingService.findTrainingsByUserId(user.getId());

        assertEquals(trainings.size(), 5);
    }

    @Test
    public void testFindTrainingsBySeasonId()
            throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException, StartDateAfterEndDateException {

        User user = createUser("paco");
        Season season = createSeason(user.getId(), "calendario");
        Season season2 = createSeason(user.getId(), "calendario2");
        trainingService.addTraining(null, season.getId(), trainingDate, "150", "describiendo", "objetivo");
        Training training2 = trainingService.addTraining(null, season.getId(), trainingDate2, "150", "describiendo",
                "objetivo");
        Training training3 = trainingService.addTraining(null, season2.getId(), trainingDate3, "150", "describiendo",
                "objetivo");

        trainingService.addTraining(null, season.getId(), trainingDate2, "150", "describiendo", "objetivo");

        List<Training> trainings = trainingService.findTrainingsBySeasonId(season.getId());
        List<Training> trainings2 = trainingService.findTrainingsBySeasonId(season2.getId());

        assertEquals(trainings.size(), 3);
        assertEquals(trainings2.size(), 1);
        assertEquals(trainings.get(1), training2);
        assertEquals(trainings2.get(0), training3);
    }

    @Test
    public void testRemoveTraining() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException,
            StartDateAfterEndDateException, UsedTrainingException {

        User user = createUser("paco");
        Season season = createSeason(user.getId(), "calendario");
        Season season2 = createSeason(user.getId(), "calendario2");
        trainingService.addTraining(null, season.getId(), trainingDate, "150", "describiendo", "objetivo");
        Training training2 = trainingService.addTraining(null, season.getId(), trainingDate2, "150", "describiendo", "objetivo");
        trainingService.addTraining(null, season2.getId(), trainingDate3, "150", "describiendo", "objetivo");

        Training training22 = trainingService.addTraining(null, season.getId(),trainingDate2, "150", "describiendo", "objetivo");

        trainingService.removeTraining(training2.getId());

        List<Training> trainings = trainingService.findTrainingsBySeasonId(season.getId());

        assertEquals(trainings.size(), 2);
        assertEquals(trainings.get(1), training22);
    }

    @Test
    public void testUpdateTraining()
            throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException, StartDateAfterEndDateException {

        User user = createUser("paco");
        Season season = createSeason(user.getId(), "calendario");
        Season season2 = createSeason(user.getId(), "calendario2");
        trainingService.addTraining(null, season.getId(), trainingDate, "150", "describiendo", "objetivo");
        Training training2 = trainingService.addTraining(null, season.getId(), trainingDate2, "150", "describiendo", "objetivo");
        trainingService.addTraining(null, season2.getId(), trainingDate3, "150", "describiendo", "objetivo");

        trainingService.addTraining(null, season.getId(),trainingDate2, "150", "describiendo", "objetivo");

        Training training2Updated = trainingService.updateTraining(training2.getId(), trainingDate3, "25", "cambio", "jeje jaja");

        List<Training> trainings = trainingService.findTrainingsBySeasonId(season.getId());

        assertEquals(trainings.size(), 3);
        assertEquals(trainings.get(1), training2Updated);
        assertEquals(trainings.get(1).getTrainingDate(), trainingDate3);
        assertEquals(trainings.get(1).getDurationMinutes(), "25");
        assertEquals(trainings.get(1).getDescription(), "cambio");
        assertEquals(trainings.get(1).getObjective(), "jeje jaja");
    }

    @Test
    public void testFindTrainingWithBadId() throws InstanceNotFoundException, DuplicateInstanceException {
		assertThrows(InstanceNotFoundException.class, () -> trainingService.addTraining(NON_EXISTENT_ID, null, trainingDate, "150", "describiendo",
        "objetivo"));
    }

    @Test
    public void testFindTrainingWithBadDates() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        trainingService.addTraining(team.getId(), null, trainingDate, "150", "describiendo", "objetivo");
        trainingService.addTraining(team.getId(), null, trainingDate2, "150", "describiendo", "objetivo");
        trainingService.addTraining(team.getId(), null, trainingDate3, "150", "describiendo", "objetivo");
    
		assertThrows(StartDateAfterEndDateException.class, () -> trainingService.findTrainingsByTwoDatesAndTeamIdOrSeasonId(user.getId(),team.getId(),null, endDate, startDate));
    }



}