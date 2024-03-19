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
import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.GameService;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class GameServiceTest {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private UserService userService;

    @Autowired
    private GameService gameService;

    private final Long NON_EXISTENT_ID = new Long(-1);

    private final LocalDateTime gameDate = LocalDateTime.of(2023, 5, 12, 15, 56);
    private final LocalDateTime gameDate2 = LocalDateTime.of(2022, 5, 12, 15, 56);
    private final LocalDateTime gameDate3 = LocalDateTime.of(2022, 5, 12, 15, 56);
    private final LocalDateTime startDate = LocalDateTime.of(2021, 5, 12, 15, 56);
    private final LocalDateTime endDate = LocalDateTime.of(2022, 6, 12, 15, 56);

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName, String arenaName, String ownerName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName, arenaName, ownerName);
    }

    private Season createSeason(Long userId, String calendario) throws InstanceNotFoundException, DuplicateInstanceException,
            StartDateAfterEndDateException {
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
    public void testAddGameAndFindGameById() throws DuplicateInstanceException, InstanceNotFoundException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team", "arenaName", "ownerName");
        Game game = gameService.addGame(team.getId(), null, gameDate, "rival", "description");

        Game gameFound = gameService.findGameById(game.getId());

        assertEquals(game, gameFound);
    }

    @Test
    public void testAddPlayerToGameAndFindGamesToPlayer() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team", "arenaName", "ownerName");
        Game game = gameService.addGame(team.getId(), null, gameDate, "rival", "description");
        Game game2 = gameService.addGame(team.getId(), null, gameDate, "rival", "description");
        Player player = createPlayer(team.getId());
        Player player2 = createPlayer2(team.getId());
        Player player3 = createPlayer3(team.getId());

        gameService.addPlayerToGame(game.getId(), player.getId());
        gameService.addPlayerToGame(game.getId(), player2.getId());
        gameService.addPlayerToGame(game.getId(), player3.getId());

        gameService.addPlayerToGame(game2.getId(), player.getId());

        List<Game> games = gameService.findGamesByPlayerId(player.getId());
        assertEquals(games.size(), 2);
    }

    @Test
    public void testAddPlayerToGameAnFindPlayersToGame() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team", "arenaName", "ownerName");
        Game game = gameService.addGame(team.getId(), null, gameDate, "rival", "description");
        Game game2 = gameService.addGame(team.getId(), null, gameDate, "rival", "description");
        Player player = createPlayer(team.getId());
        Player player2 = createPlayer2(team.getId());
        Player player3 = createPlayer3(team.getId());

        gameService.addPlayerToGame(game.getId(), player.getId());
        gameService.addPlayerToGame(game.getId(), player2.getId());
        gameService.addPlayerToGame(game.getId(), player3.getId());

        gameService.addPlayerToGame(game2.getId(), player.getId());

        List<Player> players = playerService.findPlayersByGame(game.getId());
        List<Player> players2 = playerService.findPlayersByGame(game2.getId());
        assertEquals(players.size(), 3);
        assertEquals(players2.size(), 1);
    }

    @Test
    public void testFindGamesByTwoDatesAndTeamIdOrSeasonId() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException,
            StartDateAfterEndDateException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team", "arenaName", "ownerName");
        gameService.addGame(team.getId(), null, gameDate, "rival", "description");
        gameService.addGame(team.getId(), null, gameDate2, "rival", "description");
        gameService.addGame(team.getId(), null, gameDate3, "rival", "description");


        List<Game> games = gameService.findGamesByTwoDatesAndTeamIdOrSeasonId(user.getId(), team.getId(), null, startDate, endDate);
        assertEquals(games.size(), 2);
    }

    @Test
    public void testFindGamesByTeamId() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException,
            StartDateAfterEndDateException {

        User user = createUser("paco");
        Team team = createTeam(user.getId(), "team", "arenaName", "ownerName");
        Team team2 = createTeam(user.getId(), "team2", "arenaName", "ownerName");
        gameService.addGame(team.getId(), null, gameDate, "rival", "description");
        gameService.addGame(team2.getId(), null, gameDate2, "rival", "description");
        gameService.addGame(team.getId(), null, gameDate3, "rival", "description");


        List<Game> games = gameService.findGamesByTeamId(team.getId());
        List<Game> games2 = gameService.findGamesByTeamId(team2.getId());
        assertEquals(games.size(), 2);
        assertEquals(games2.size(), 1);
    }

    @Test
    public void testFindGamesBySeasonId() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException,
            StartDateAfterEndDateException {

        User user = createUser("paco");
        Season season = createSeason(user.getId(), "seasonssss");
        Season season2 = createSeason(user.getId(), "seasonssss25222 sdcs");
        gameService.addGame(null, season.getId(), gameDate, "rival", "description");
        gameService.addGame(null, season2.getId(), gameDate2, "rival", "description");
        gameService.addGame(null, season.getId(), gameDate3, "rival", "description");


        List<Game> games = gameService.findGamesBySeasonId(season.getId());
        List<Game> games2 = gameService.findGamesBySeasonId(season2.getId());
        assertEquals(games.size(), 2);
        assertEquals(games2.size(), 1);
    }

    @Test
    public void testFindGamesByUserId() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException,
            StartDateAfterEndDateException {

        User user = createUser("paco");
        Season season = createSeason(user.getId(), "seasonssss");
        Season season2 = createSeason(user.getId(), "seasonssss25222 sdcs");
        Team team2 = createTeam(user.getId(), "team2", "arenaName", "ownerName");
        gameService.addGame(team2.getId(), null, gameDate, "rival", "description");
        gameService.addGame(null, season.getId(), gameDate, "rival", "description");
        gameService.addGame(null, season2.getId(), gameDate2, "rival", "description");
        gameService.addGame(null, season.getId(), gameDate3, "rival", "description");


        List<Game> games = gameService.findGamesByUserId(user.getId());
        assertEquals(games.size(), 4);
    }

    @Test
    public void testRemoveGame() throws DuplicateInstanceException, InstanceNotFoundException,
            StartDateAfterEndDateException {

        User user = createUser("paco");
        Season season = createSeason(user.getId(), "seasonssss");
        Season season2 = createSeason(user.getId(), "seasonssss25222 sdcs");
        Team team2 = createTeam(user.getId(), "team2", "arenaName", "ownerName");
        gameService.addGame(team2.getId(), null, gameDate, "rival", "description");
        Game game = gameService.addGame(null, season.getId(), gameDate, "rival", "description");
        Game game2 = gameService.addGame(null, season2.getId(), gameDate2, "rival", "description");
        gameService.addGame(null, season.getId(), gameDate3, "rival", "description");

        gameService.removeGame(game.getId());
        gameService.removeGame(game2.getId());

        List<Game> games = gameService.findGamesByUserId(user.getId());
        assertEquals(games.size(), 2);
    }

    @Test
    public void testUpdateGame() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException,
            StartDateAfterEndDateException {

        User user = createUser("paco");
        Season season = createSeason(user.getId(), "seasonssss");
        Season season2 = createSeason(user.getId(), "seasonssss25222 sdcs");
        Team team2 = createTeam(user.getId(), "team2", "arenaName", "ownerName");
        gameService.addGame(team2.getId(), null, gameDate, "rival", "description");
        gameService.addGame(null, season.getId(), gameDate, "rival", "description");
        Game game2 = gameService.addGame(null, season2.getId(), gameDate2, "rival", "description");
        gameService.addGame(null, season.getId(), gameDate3, "rival", "description");

        Game gameUpdated = gameService.updateGame(game2.getId(), gameDate3, "cambios lo", "description");

        List<Game> games = gameService.findGamesByUserId(user.getId());
        assertEquals(games.get(2), gameUpdated);
        assertEquals(games.get(2).getGameDate(), gameDate3);
        assertEquals(games.get(2).getRival(), "cambios lo", "description");
    }

    @Test
    public void testFindGameWithBadId() throws InstanceNotFoundException, DuplicateInstanceException {
		assertThrows(InstanceNotFoundException.class, () -> gameService.findGameById(NON_EXISTENT_ID));
    }

    @Test
    public void testFindGameWithBadDates() throws InstanceNotFoundException, DuplicateInstanceException {
		assertThrows(StartDateAfterEndDateException.class, () -> gameService.findGamesByTwoDatesAndTeamIdOrSeasonId(null, null, null, endDate, startDate));
    }
}