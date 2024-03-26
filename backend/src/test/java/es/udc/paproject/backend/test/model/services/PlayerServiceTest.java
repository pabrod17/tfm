package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Lesion;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerLesion;
import es.udc.paproject.backend.model.entities.PlayerLesionDao;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.LesionService;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class PlayerServiceTest {

//https://testingdatagenerator.com/doi.html --> Generador de DNIs
    private final Long NON_EXISTENT_ID = new Long(-1);

    @Autowired
    private PlayerService playerService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private LesionService lesionService;

    @Autowired
    private PlayerLesionDao playerLesionDao;

    @Autowired
    private UserService userService;

    // PointGuard, ShootingGuard, SmallForward, PowerForward, Center

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName, "arenaName", "ownerName","");
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J");

        Player playerFound = playerService.findPlayerByIdOfTeam(player.getId(), team.getId());

        assertEquals(player, playerFound);
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamInjured() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2", "Aqui pongo los medicamentos", "Joint");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J");

        Player playerFound = playerService.findPlayerByIdOfTeam(player.getId(), team.getId());

        assertEquals(player, playerFound);



        assertEquals(false, player.isInjured());

        lesionService.addLesionToPlayer(player.getId(), lesion2.getId());
        assertEquals(true, player.isInjured());

        lesionService.removeLesionToPlayer(player.getId(), lesion2.getId());
        assertEquals(false, player.isInjured());
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamFromNonExistentId() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J");

		assertThrows(InstanceNotFoundException.class, () -> playerService.findPlayerByIdOfTeam(NON_EXISTENT_ID, team.getId()));
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamWithBadPhoneNumber() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

		assertThrows(IncorrectPhoneNumberException.class, () -> playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "63867706554684", "paco@gmail.com", "46095900J"));
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamWithBadEmail() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

		assertThrows(IncorrectEmailException.class, () -> playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco4684", "46095900J"));
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamWithBadDni() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

		assertThrows(IncorrectDniException.class, () -> playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900fasedfasdf"));
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamWithBadPosition() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

		assertThrows(InstanceNotFoundException.class, () -> playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "badPosition", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J"));
    }

    @Test
    public void testChangePlayerToTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J");

        playerService.changePlayerToTeam(player.getId(), team2.getId());
        Player playerFound = playerService.findPlayerByIdOfTeam(player.getId(), team2.getId());

        assertEquals(player, playerFound);
    }

    @Test
    public void testFindPlayersOfTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");

        List<Player> players = playerService.findAPlayersOfTeam(team.getId());

        assertEquals(2, players.size());
        assertEquals(player, players.get(0));
        assertEquals(player2, players.get(1));
    }

    @Test
    public void testFindPlayerByIdOfTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team2.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");

        Player player1Found = playerService.findPlayerByIdOfTeam(player.getId(), team.getId());
        Player player2Found = playerService.findPlayerByIdOfTeam(player2.getId(), team2.getId());
        List<Player> players = playerService.findAPlayersOfTeam(team.getId());
        List<Player> players2 = playerService.findAPlayersOfTeam(team2.getId());

        assertEquals(1, players.size());
        assertEquals(1, players2.size());
        assertEquals(player, player1Found);
        assertEquals(player2, player2Found);
        assertEquals(player2, player2Found);
    }

    @Test
    public void testFindPlayerByCompletedNameOfTeam() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");
        Player player3 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco3@gmail.com", "27458552W");

        List<Player> players = playerService.findPlayersByCompletedNameOfTeam(team.getId(), "jugador2", "", "apellido22");

        assertEquals(2, players.size());
        assertEquals(player2, players.get(0));
        assertEquals(player3, players.get(1));
    }

    @Test
    public void testFindPlayerByDniOfTeam() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");
        playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco3@gmail.com", "27458552W");

        Player playerFound = playerService.findPlayerByDniOfTeam(team.getId(), "53984323B");

        assertEquals(player2, playerFound);
    }

    @Test
    public void testFindPlayersByPositionAndTeam() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");
        Player player3 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco3@gmail.com", "27458552W");

        List<Player> players = playerService.findPlayersByPositionAndTeam(team.getId(), "SmallForward");

        assertEquals(2, players.size());
        assertEquals(player2, players.get(0));
        assertEquals(player3, players.get(1));
    }

    @Test
    public void testFindPlayersrWithLesionOfTeam() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        playerService.addPlayer(team.getId(), "jugador2", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco5@gmail.com", "53984323B");
        Player player3 = playerService.addPlayer(team.getId(), "jugador2", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco7@gmail.com", "27458552W");

        Lesion lesion = lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
                "Aqui pongo los medicamentos", "Muscle");

        lesionService.addLesionToPlayer(player.getId(), lesion.getId());
        lesionService.addLesionToPlayer(player3.getId(), lesion.getId());

        List<Player> players = playerService.findPlayersrWithLesionOfTeam(team.getId());

        assertEquals(2, players.size());
        assertEquals(player, players.get(0));
        assertEquals(player3, players.get(1));
    }

    @Test
    public void testFindPlayersWithOneTypeLesion() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        playerService.addPlayer(team.getId(), "jugador2", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco5@gmail.com", "53984323B");
        Player player3 = playerService.addPlayer(team.getId(), "jugador2", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco7@gmail.com", "46095900J");
        Player player4 = playerService.addPlayer(team.getId(), "jugador2", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco9@gmail.com", "27458552W");

        Lesion lesion = lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
                "Aqui pongo los medicamentos", "Muscle");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2",
                "Aqui pongo los medicamentos", "Joint");

        lesionService.addLesionToPlayer(player.getId(), lesion.getId());
        lesionService.addLesionToPlayer(player3.getId(), lesion.getId());
        lesionService.addLesionToPlayer(player4.getId(), lesion2.getId());

        List<Player> playersWithMuscle = playerService.findPlayersWithOneTypeLesion("Muscle", team.getId());
        List<Player> playersWithJoint = playerService.findPlayersWithOneTypeLesion("Joint", team.getId());

        assertEquals(2, playersWithMuscle.size());
        assertEquals(1, playersWithJoint.size());

        assertEquals(player, playersWithMuscle.get(0));
        assertEquals(player3, playersWithMuscle.get(1));
        assertEquals(player4, playersWithJoint.get(0));
    }

    @Test
    public void testRemovePlayer() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");
        Player player3 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco3@gmail.com", "27458552W");

        playerService.removePlayer(team.getId(), player2.getId());
        List<Player> players = playerService.findAPlayersOfTeam(team.getId());

        assertEquals(2, players.size());
        assertEquals(player, players.get(0));
        assertEquals(player3, players.get(1));
    }

    // @Test
    // public void testRemovePlayerWithLesion() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
    //         IncorrectEmailException, IncorrectPhoneNumberException {
    //     User user = createUser("usuario");
    //     Team team = createTeam(user.getId(), "team");
        
    //     Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
    //     "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
    //     playerService.addPlayer(team.getId(), "jugador2", "apellido1", "apellido2", "ShootingGuard", 
    //     "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco5@gmail.com", "53984323B");

    //     Lesion lesion = lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
    //             "Aqui pongo los medicamentos", "Muscle");
    //     Lesion lesion2 = lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
    //             "Aqui pongo los medicamentos", "Muscle");

    //     lesionService.addLesionToPlayer(player.getId(), lesion.getId());
    //     lesionService.addLesionToPlayer(player.getId(), lesion2.getId());

    //     playerService.removePlayer(team.getId(), player.getId());

    //     List<Player> players = playerService.findAPlayersOfTeam(team.getId());

    //     List<Lesion> lesions = lesionService.findAllLesion();

    //     List<PlayerLesion> playerlesion = (List<PlayerLesion>) playerLesionDao.findAll();

    //     assertEquals(2, lesions.size());
    //     assertEquals(1, players.size());//aqui deberia de borrarlo
    //     assertEquals(0, playerlesion.size());
    // }

    @Test
    public void testUpdatePlayer() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");

        playerService.updatePlayer(team2.getId(), player.getId(), "updated", "updated2", "updated3", "SmallForward", "Mucha tendencia de tiro de 3", "638677065", "paco3@gmail.com", "53984323B");

        Player playerFound = playerService.findPlayerByIdOfTeam(player.getId(), team2.getId());
        List<Player> players2 = playerService.findAPlayersOfTeam(team2.getId());

        assertEquals(1, players2.size());
        assertEquals(playerFound.getPlayerName(), "updated");
        assertEquals(playerFound.getPrimaryLastName(), "updated2");
        assertEquals(playerFound.getSecondLastName(), "updated3");
        assertEquals(playerFound.getPosition(), "SmallForward");
        assertEquals(playerFound.getTrends(), "Mucha tendencia de tiro de 3");
        assertEquals(playerFound.getPhoneNumber(), "638677065");
        assertEquals(playerFound.getEmail(), "paco3@gmail.com");
        assertEquals(playerFound.getDni(), "53984323B");
    }

    @Test
    public void testUpdatePlayerWithLesion() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2", "Aqui pongo los medicamentos", "Joint");

        lesionService.addLesionToPlayer(player.getId(), lesion2.getId());

        playerService.updatePlayer(team2.getId(), player.getId(), "updated", "updated2", "updated3", "SmallForward", "Mucha tendencia de tiro de 3", "638677065", "paco3@gmail.com", "53984323B");

        Player playerFound = playerService.findPlayerByIdOfTeam(player.getId(), team2.getId());
        List<Player> players2 = playerService.findAPlayersOfTeam(team2.getId());
        List<PlayerLesion> playerLesion = (List<PlayerLesion>) playerLesionDao.findAll();

        assertEquals(playerFound, playerLesion.get(0).getPlayer());

        assertEquals(1, players2.size());
        assertEquals(playerFound.getPlayerName(), "updated");
        assertEquals(playerFound.getPrimaryLastName(), "updated2");
        assertEquals(playerFound.getSecondLastName(), "updated3");
        assertEquals(playerFound.getPosition(), "SmallForward");
        assertEquals(playerFound.getTrends(), "Mucha tendencia de tiro de 3");
        assertEquals(playerFound.getPhoneNumber(), "638677065");
        assertEquals(playerFound.getEmail(), "paco3@gmail.com");
        assertEquals(playerFound.getDni(), "53984323B");
    }
}