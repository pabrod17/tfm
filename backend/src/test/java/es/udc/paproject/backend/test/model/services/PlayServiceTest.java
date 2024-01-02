package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Play;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectPlayTypeException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedPlayException;
import es.udc.paproject.backend.model.services.PlayService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class PlayServiceTest {

    private final Long NON_EXISTENT_ID = new Long(-1);

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @Autowired
    private PlayService playService;

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName);
    }

    @Test
    public void testAddPlayAndFindPlayById()
            throws InstanceNotFoundException, DuplicateInstanceException, IncorrectPlayTypeException {

        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        Play play = playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText",
                "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");

        Play playFound = playService.findPlayById(play.getId());

        assertEquals(play, playFound);
    }

    @Test
    public void testAddPlayToTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException, UsedPlayException {
        
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");

        Play play = playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        
        playService.addPlayToTeam(team2.getId(), play.getId());
        List<Play> playTeams = playService.findPlaysByTeamId(team2.getId());
        List<Play> playTeams2 = playService.findPlaysByTeamId(team.getId());

        assertEquals(1, playTeams2.size());
        assertEquals(1, playTeams.size());
        assertEquals(play.getId(), playTeams.get(0).getId());
        assertEquals(play.getId(), playTeams2.get(0).getId());
    }

    @Test
    public void testAddPlayToTeamButPlayIsUsedInThisTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException, UsedPlayException {
        
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        Play play = playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        
		assertThrows(UsedPlayException.class, () -> playService.addPlayToTeam(team.getId(), play.getId()));
    }

    @Test
    public void testFindLesionWithBadId() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException, UsedPlayException {
        
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        
		assertThrows(InstanceNotFoundException.class, () -> playService.addPlayToTeam(NON_EXISTENT_ID, NON_EXISTENT_ID));
    }

    @Test
    public void testFindPlaysByUserId() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team3 = createTeam(user.getId(), "team3");
        playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title2", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team3.getId(), "title3", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team3.getId(), "title4", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team3.getId(), "title5", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");

        User user2 = createUser("usuario2");
        Team team2 = createTeam(user2.getId(), "team2");
        playService.addPlay(team2.getId(), "title11", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team2.getId(), "title22", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team2.getId(), "title33", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");

        List<Play> plays1 = playService.findPlaysByUserId(user.getId());
        List<Play> plays2 = playService.findPlaysByUserId(user2.getId());

        assertEquals(5, plays1.size());
        assertEquals(3, plays2.size());
    }

    @Test
    public void testFindPlaysByTeamId() throws DuplicateInstanceException, InstanceNotFoundException,
    IncorrectPlayTypeException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team3 = createTeam(user.getId(), "team3");
        playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title2", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team3.getId(), "title3", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team3.getId(), "title4", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team3.getId(), "title5", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");

        User user2 = createUser("usuario2");
        Team team2 = createTeam(user2.getId(), "team2");
        playService.addPlay(team2.getId(), "title11", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team2.getId(), "title22", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team2.getId(), "title33", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team2.getId(), "title43", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");

        List<Play> plays1 = playService.findPlaysByTeamId(team.getId());
        List<Play> plays2 = playService.findPlaysByTeamId(team2.getId());
        List<Play> plays3 = playService.findPlaysByTeamId(team3.getId());

        assertEquals(2, plays1.size());
        assertEquals(4, plays2.size());
        assertEquals(3, plays3.size());
    }

    @Test
    public void testFindPlaysByTypeAndTeam() throws DuplicateInstanceException, InstanceNotFoundException,
    IncorrectPlayTypeException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        createTeam(user.getId(), "team3");
        playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title2", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title3", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title4", "Defense", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title5", "Defense", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");

        List<Play> playsAttack = playService.findPlaysByTypeAndTeam(team.getId(),"Attack");
        List<Play> playsDefense = playService.findPlaysByTypeAndTeam(team.getId(),"Defense");

        assertEquals(3, playsAttack.size());
        assertEquals(2, playsDefense.size());
    }

    @Test
    public void testFindPlaysByTypeAndTeamWithBadPlayType() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException, UsedPlayException {
        
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        
		assertThrows(IncorrectPlayTypeException.class, () -> playService.findPlaysByTypeAndTeam(team.getId(),"hola"));
    }

    @Test
    public void testRemovePlayToTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException, UsedPlayException {
        
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        Play play2 = playService.addPlay(team.getId(), "title2", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title3", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");

        playService.removePlayToTeam(play2.getId(), team.getId());

        Team team2 = createTeam(user.getId(), "team2");
        playService.addPlay(team2.getId(), "title22", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");


        List<Play> plays1 = playService.findPlaysByTeamId(team.getId());
        List<Play> plays2 = playService.findPlaysByTeamId(team2.getId());

        assertEquals(2, plays1.size());
        assertEquals(1, plays2.size());
    }
    
    @Test
    public void testRemovePlayWithOnlyOneTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException, UsedPlayException {
        
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Play play = playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");

        playService.removePlayToTeam(play.getId(), team.getId());
        
        assertThrows(InstanceNotFoundException.class, () -> playService.findPlaysByTeamId(team.getId()));
    }

    @Test
    public void testRemovePlayToTeamWithPlayUsedInOtherTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException, UsedPlayException {
        
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        Play play2 = playService.addPlay(team.getId(), "title2", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title3", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");


        Team team2 = createTeam(user.getId(), "team2");
        playService.addPlayToTeam(team2.getId(), play2.getId());

        playService.removePlayToTeam(play2.getId(), team.getId());


        List<Play> plays1 = playService.findPlaysByTeamId(team.getId());
        List<Play> plays2 = playService.findPlaysByTeamId(team2.getId());

        assertEquals(2, plays1.size());
        assertEquals(1, plays2.size());
    }

    @Test
    public void testUpdatePlayWithPlayUsedInOtherTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectPlayTypeException, UsedPlayException {
        
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playService.addPlay(team.getId(), "title", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        Play play2 = playService.addPlay(team.getId(), "title2", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlay(team.getId(), "title3", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");


        Team team2 = createTeam(user.getId(), "team2");
        playService.addPlay(team2.getId(), "title22", "Attack", "gesture", "pointGuardText", "shootingGuardText", "smallForwardText", "powerForwardText", "centerText");
        playService.addPlayToTeam(team2.getId(), play2.getId());

        Play playUpdated = playService.updatePlay(play2.getId(), "cambio", "Defense", "cuernos", "fasfd", "azsgfad", "asfdaf", null, "asdf");


        List<Play> plays1 = playService.findPlaysByTeamId(team.getId());
        List<Play> plays2 = playService.findPlaysByTeamId(team2.getId());

        Play play2Updated = playService.findPlayById(play2.getId());

        assertEquals(3, plays1.size());
        assertEquals(2, plays2.size());
        assertEquals(plays2.get(1), play2Updated);

        assertEquals(play2.getPowerForwardText(), play2Updated.getPowerForwardText());
        assertEquals("Defense", play2Updated.getPlayType());
        assertEquals("fasfd", play2Updated.getPointGuardText());
        assertEquals(play2.getPowerForwardText(), play2Updated.getPowerForwardText());
        assertEquals(playUpdated, play2Updated);
    }
}
