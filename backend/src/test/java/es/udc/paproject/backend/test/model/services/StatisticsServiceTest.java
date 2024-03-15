package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;


import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.GameStatistics;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerGameStatistics;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.GameService;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.model.services.StatisticsService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class StatisticsServiceTest {


    @Autowired
    private PlayerService playerService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @Autowired
    private GameService gameService;

    @Autowired
    private StatisticsService statisticsService;

    private final Long NON_EXISTENT_ID = new Long(-1);

    private final LocalDateTime gameDate = LocalDateTime.of(2023, 5, 12, 15, 56);

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName, "arenaName", "ownerName");
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

    private Game createGameToTeam(Long teamId) throws InstanceNotFoundException {
        return gameService.addGame(teamId, null, gameDate, "rival");
    }

    @Test
    public void testAddStatisticsToGameAndFindGameStatisticsById() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGameToTeam(team.getId());
        createGameToTeam(team.getId());

        GameStatistics gameStatistics = statisticsService.addStatisticsToGame(game.getId(), 65, 120, 23, 5, 5, 7, 48, 2, 5, 0, 1, 5, 0, 5, 5, 12, 4, 2, 3, 3, 4);
        GameStatistics gameStatisticsFound = statisticsService.findGameStatisticsById(gameStatistics.getId());
        
        assertEquals(gameStatistics, gameStatisticsFound);
        assertEquals(gameStatisticsFound.getDurationMinutes(), 120);
        assertEquals(gameStatisticsFound.getTotalReboundsRival(), 12);
    }

    @Test
    public void testFindStatisticsByGame() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGameToTeam(team.getId());
        createGameToTeam(team.getId());

        GameStatistics gameStatistics = statisticsService.addStatisticsToGame(game.getId(), 65, 120, 23, 5, 5, 7, 48, 2, 5, 0, 1, 5, 0, 5, 5, 12, 4, 2, 3, 3, 4);
        GameStatistics gameStatisticsFound = statisticsService.findStatisticsByGame(game.getId());
        
        assertEquals(gameStatistics, gameStatisticsFound);
        assertEquals(gameStatisticsFound.getDurationMinutes(), 120);
        assertEquals(gameStatisticsFound.getTotalReboundsRival(), 12);
    }

    @Test
    public void testAddStatisticsToPlayerAndGameAndFindStatisticsByPlayerAndGame() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGameToTeam(team.getId());
        Game game2 = createGameToTeam(team.getId());
        Player player = createPlayer(team.getId());
        Player player2 = createPlayer2(team.getId());

        gameService.addPlayerToGame(game.getId(), player.getId());
        gameService.addPlayerToGame(game.getId(), player2.getId());
        gameService.addPlayerToGame(game2.getId(), player.getId());

        PlayerGameStatistics playerGameStatistics = statisticsService.addStatisticsToPlayerAndGame(game.getId(), player.getId(), 56, 157, 5, 5, 6, 7, 6, 8, 66, 8, 76, 7, 7, 6);
        PlayerGameStatistics playerGameStatistics2 = statisticsService.addStatisticsToPlayerAndGame(game2.getId(), player.getId(), 56, 157, 5, 5, 6, 7, 6, 8, 66, 8, 76, 7, 7, 6);

        PlayerGameStatistics playerGameStatisticsFound = statisticsService.findStatisticsByPlayerAndGame(player.getId(),game.getId());
        PlayerGameStatistics playerGameStatisticsFound2 = statisticsService.findStatisticsByPlayerAndGame(player.getId(),game2.getId());

        assertEquals(playerGameStatistics, playerGameStatisticsFound);
        assertEquals(playerGameStatistics2, playerGameStatisticsFound2);
    }

    @Test
    public void testRemmoveGameStatistics() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGameToTeam(team.getId());
        createGameToTeam(team.getId());

        statisticsService.addStatisticsToGame(game.getId(), 65, 120, 23, 5, 5, 7, 48, 2, 5, 0, 1, 5, 0, 5, 5, 12, 4, 2, 3, 3, 4);
        statisticsService.removeStatisticsToGame(game.getId());

        assertEquals(game.getGameStatistics(), null);
    }

    @Test
    public void testRemmovePlayerGameStatistics() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGameToTeam(team.getId());
        Game game2 = createGameToTeam(team.getId());
        Player player = createPlayer(team.getId());
        Player player2 = createPlayer2(team.getId());

        gameService.addPlayerToGame(game.getId(), player.getId());
        gameService.addPlayerToGame(game.getId(), player2.getId());
        gameService.addPlayerToGame(game2.getId(), player.getId());

        statisticsService.addStatisticsToPlayerAndGame(game.getId(), player.getId(), 56, 157, 5, 5, 6, 7, 6, 8, 66, 8, 76, 7, 7, 6);
        PlayerGameStatistics playerGameStatistics2 = statisticsService.addStatisticsToPlayerAndGame(game2.getId(), player.getId(), 56, 157, 5, 5, 6, 7, 6, 8, 66, 8, 76, 7, 7, 6);
        statisticsService.removeStatisticsToPlayerOfGame(player.getId(), game2.getId());
        statisticsService.findStatisticsByPlayerAndGame(player.getId(),game.getId());
        statisticsService.findStatisticsByPlayerAndGame(player.getId(),game2.getId());

        assertEquals(playerGameStatistics2.getTotalPoints(), null);
    }

    @Test
    public void testUpdateGameStatistics() throws InstanceNotFoundException, DuplicateInstanceException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGameToTeam(team.getId());
        createGameToTeam(team.getId());

        GameStatistics gameStatistics = statisticsService.addStatisticsToGame(game.getId(), 65, 120, 23, 5, 5, 7, 48, 2, 5, 0, 7, 5, 0, 5, 5, 12, 4, 2, 3, 3, 4);
        GameStatistics gameStatisticsUpdated = statisticsService.updateGameStatistics(game.getId(), gameStatistics.getId(), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        GameStatistics gameStatisticsFound = statisticsService.findStatisticsByGame(game.getId());
        
        assertEquals(gameStatisticsUpdated, gameStatisticsFound);
        assertEquals(gameStatisticsFound.getDurationMinutes(), 1);
        assertEquals(gameStatisticsFound.getTotalReboundsRival(), 1);
    }

    @Test
    public void testUpdatePlayerGameStatistics() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team");
        Game game = createGameToTeam(team.getId());
        Game game2 = createGameToTeam(team.getId());
        Player player = createPlayer(team.getId());
        Player player2 = createPlayer2(team.getId());

        gameService.addPlayerToGame(game.getId(), player.getId());
        gameService.addPlayerToGame(game.getId(), player2.getId());
        gameService.addPlayerToGame(game2.getId(), player.getId());

        statisticsService.addStatisticsToPlayerAndGame(game.getId(), player.getId(), 56, 157, 5, 5, 6, 7, 6, 8, 66, 8, 76, 7, 7, 6);
        statisticsService.addStatisticsToPlayerAndGame(game2.getId(), player.getId(), 56, 157, 5, 5, 6, 7, 6, 8, 66, 8, 76, 7, 7, 6);

        PlayerGameStatistics playerGameStatisticsUpdated = statisticsService.updatePlayerGameStatistics(player.getId(), game2.getId(), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

        PlayerGameStatistics playerGameStatisticsFound = statisticsService.findStatisticsByPlayerAndGame(player.getId(), game2.getId());

        assertEquals(playerGameStatisticsUpdated, playerGameStatisticsFound);
        assertEquals(playerGameStatisticsFound.getMinutes(), 1);
        assertEquals(playerGameStatisticsFound.getFailSetShots(), 1);
    }

    @Test
    public void testFindGameStatisticsWithBadId() throws InstanceNotFoundException, DuplicateInstanceException {
		assertThrows(InstanceNotFoundException.class, () -> statisticsService.findGameStatisticsById(NON_EXISTENT_ID));
    }

}