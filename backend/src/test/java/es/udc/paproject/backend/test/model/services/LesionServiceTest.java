package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
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
import es.udc.paproject.backend.model.exceptions.UsedLesionException;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.LesionService;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class LesionServiceTest {

    @Autowired
    private LesionService lesionService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @Autowired
    private PlayerLesionDao playerLesionDao;

    // Muscle, Tendon, Joint, Spine, Psychological

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName, "arenaName", "ownerName", "description");
    }

    @Test
    public void testAddLesionAndFinLesionById() throws InstanceNotFoundException {

        Lesion lesion = lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
                "Aqui pongo los medicamentos", "Muscle");
        Lesion lesionFound = lesionService.findLesionById(lesion.getId());

        assertEquals(lesion, lesionFound);
    }

    @Test
    public void testAddLesionToPlayer() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco@gmail.com", "46095900J");
        Lesion lesion = lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
                "Aqui pongo los medicamentos", "Muscle");

        lesionService.addLesionToPlayer(player.getId(), lesion.getId());
        List<PlayerLesion> playerLesions = playerLesionDao.findByPlayerId(player.getId());

        assertEquals(1, playerLesions.size());
        assertEquals(lesion, playerLesions.get(0).getLesion());
        assertEquals(player, playerLesions.get(0).getPlayer());
    }

    @Test
    public void testFindAllLesion() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {

        Lesion lesion = lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
                "Aqui pongo los medicamentos", "Muscle");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2",
                "Aqui pongo los medicamentos", "Joint");
        Lesion lesion3 = lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3",
                "Aqui pongo los medicamentos", "Tendon");

        List<Lesion> lesions2 = new ArrayList<>();
        lesions2.add(lesion);
        lesions2.add(lesion2);
        lesions2.add(lesion3);

        Block<Lesion> expectedLesionBlock = new Block<>(lesions2, false);


        assertEquals(expectedLesionBlock, lesionService.findAllLesion(0, 10));
        assertEquals(3, lesionService.findAllLesion(0, 10).getItems().size());
        assertEquals(lesion3.getLesionName(),lesionService.findAllLesion(0, 10).getItems().get(2).getLesionName());


        List<Lesion> lesions = lesionService.findAllLesion();

        assertEquals(3, lesions.size());
        assertEquals(lesion, lesions.get(0));
        assertEquals(lesion2, lesions.get(1));
        assertEquals(lesion3, lesions.get(2));
    }

    @Test
    public void testFindLesionByType() throws InstanceNotFoundException {
        lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
                "Aqui pongo los medicamentos", "Muscle");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2",
                "Aqui pongo los medicamentos", "Joint");
        Lesion lesion3 = lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3",
                "Aqui pongo los medicamentos", "Tendon");
        Lesion lesion4 = lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3",
                "Aqui pongo los medicamentos", "Tendon");
        lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3",
                "Aqui pongo los medicamentos", "Psychological");
        Lesion lesion6 = lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3",
                "Aqui pongo los medicamentos", "Tendon");

        Block<Lesion> lesions = lesionService.findLesionByType("Tendon",0, 10);

        assertEquals(3, lesions.getItems().size());
        assertEquals(lesion3, lesions.getItems().get(0));
        assertEquals(lesion4, lesions.getItems().get(1));
        assertEquals(lesion6, lesions.getItems().get(2));

        Block<Lesion> lesions2 = lesionService.findLesionByType("Joint", 0, 10);
        assertEquals(1, lesions2.getItems().size());
        assertEquals(lesion2, lesions2.getItems().get(0));
}

    @Test
    public void testFindLesionByBadType() throws InstanceNotFoundException {
        lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion",
                "Aqui pongo los medicamentos", "Muscle");
        lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2",
                "Aqui pongo los medicamentos", "Joint");

		assertThrows(InstanceNotFoundException.class, () -> lesionService.findLesionByType("hola"));
        }

    @Test
    public void testFindLesionByPlayer() throws InstanceNotFoundException, UsedLesionException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException, DuplicateInstanceException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco@gmail.com", "46095900J");
        lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion", "Aqui pongo los medicamentos", "Muscle");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2", "Aqui pongo los medicamentos", "Joint");
        Lesion lesion3 = lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3", "Aqui pongo los medicamentos", "Tendon");

        lesionService.addLesionToPlayer(player.getId(), lesion2.getId());
        lesionService.addLesionToPlayer(player.getId(), lesion3.getId());

        List<Lesion> lesions = lesionService.findAllLesion();
        List<Lesion> lesionPlayer = lesionService.findLesionByPlayer(player.getId());

        assertEquals(3, lesions.size());
        assertEquals(2, lesionPlayer.size());
        assertEquals(lesion2, lesionPlayer.get(0));
        assertEquals(lesion3, lesionPlayer.get(1));
    }

    @Test
    public void testRemoveLesion() throws InstanceNotFoundException, UsedLesionException {
        
        Lesion lesion = lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion", "Aqui pongo los medicamentos", "Muscle");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2", "Aqui pongo los medicamentos", "Joint");
        Lesion lesion3 = lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3", "Aqui pongo los medicamentos", "Tendon");

        lesionService.removeLesion(lesion2.getId());

        List<Lesion> lesions = lesionService.findAllLesion();

        assertEquals(2, lesions.size());
        assertEquals(lesion, lesions.get(0));
        assertEquals(lesion3, lesions.get(1));
    }

    @Test
    public void testBadRemoveLesionWithUsedLesion() throws InstanceNotFoundException, UsedLesionException,
            DuplicateInstanceException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco@gmail.com", "46095900J");
        
        lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion", "Aqui pongo los medicamentos", "Muscle");
        
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2", "Aqui pongo los medicamentos", "Joint");
        
        lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3", "Aqui pongo los medicamentos", "Tendon");
        lesionService.addLesionToPlayer(player.getId(), lesion2.getId());

		assertThrows(UsedLesionException.class, () -> lesionService.removeLesion(lesion2.getId()));
    }

    @Test
    public void testRemoveLesionToPlayer() throws InstanceNotFoundException, UsedLesionException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException, DuplicateInstanceException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco@gmail.com", "46095900J");
        lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion", "Aqui pongo los medicamentos", "Muscle");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2", "Aqui pongo los medicamentos", "Joint");
        Lesion lesion3 = lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3", "Aqui pongo los medicamentos", "Tendon");

        lesionService.addLesionToPlayer(player.getId(), lesion2.getId());
        lesionService.addLesionToPlayer(player.getId(), lesion3.getId());

        lesionService.removeLesionToPlayer(player.getId(), lesion2.getId());

        List<Lesion> lesions = lesionService.findAllLesion();
        List<PlayerLesion> playerLesion = (List<PlayerLesion>) playerLesionDao.findAll();

        assertEquals(3, lesions.size());
        assertEquals(1, playerLesion.size());
        assertEquals(lesion3, playerLesion.get(0).getLesion());
        assertEquals(player, playerLesion.get(0).getPlayer());
    }

    @Test
    public void testUpdateLesion() throws InstanceNotFoundException {
        
        lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion", "Aqui pongo los medicamentos", "Muscle");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2", "Aqui pongo los medicamentos", "Joint");
        lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3", "Aqui pongo los medicamentos", "Tendon");

        Lesion lesion2Updated = lesionService.updateLesion(lesion2.getId(), "Nuevo nombre", null, "Nueva medicacion", "Tendon");

        List<Lesion> lesions = lesionService.findLesionByType("Tendon");
        assertEquals(2, lesions.size());
        
        assertEquals(lesion2Updated.getLesionName(), "Nuevo nombre");
        assertEquals(lesion2Updated.getDescription(), "Aqui pongo una descripcion de la lesion2");
        assertEquals(lesion2Updated.getMedication(), "Nueva medicacion");
        assertEquals(lesion2Updated.getLesionType(), "Tendon");
    }

    @Test
    public void testUpdateLesionWithPlayer() throws InstanceNotFoundException, DuplicateInstanceException, IncorrectDniException,
                    IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard",
                "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065",
                "paco@gmail.com", "46095900J");
        lesionService.addLesion("Nombre de la lesion", "Aqui pongo una descripcion de la lesion", "Aqui pongo los medicamentos", "Muscle");
        Lesion lesion2 = lesionService.addLesion("Nombre de la lesion2", "Aqui pongo una descripcion de la lesion2", "Aqui pongo los medicamentos", "Joint");
        lesionService.addLesion("Nombre de la lesion3", "Aqui pongo una descripcion de la lesion3", "Aqui pongo los medicamentos", "Tendon");

        lesionService.addLesionToPlayer(player.getId(), lesion2.getId());

        lesionService.updateLesion(lesion2.getId(), "Nuevo nombre", null, "Nueva medicacion", "Tendon");

        List<Lesion> lesions = lesionService.findLesionByType("Tendon");
        List<PlayerLesion> playerLesion = (List<PlayerLesion>) playerLesionDao.findAll();
        Lesion lesionUpdated = lesionService.findLesionById(lesion2.getId());
        assertEquals(2, lesions.size());
        assertEquals(lesionUpdated.getLesionName(), playerLesion.get(0).getLesion().getLesionName());

        assertEquals(lesionUpdated.getLesionName(), "Nuevo nombre");
        assertEquals(lesionUpdated.getDescription(), "Aqui pongo una descripcion de la lesion2");
        assertEquals(lesionUpdated.getMedication(), "Nueva medicacion");
        assertEquals(lesionUpdated.getLesionType(), "Tendon");
    }
}