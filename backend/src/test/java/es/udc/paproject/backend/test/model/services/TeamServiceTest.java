package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.SeasonTeam;
import es.udc.paproject.backend.model.entities.SeasonTeamDao;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class TeamServiceTest {

	private final Long NON_EXISTENT_ID = new Long(-1);
	private final LocalDateTime startDate1 = LocalDateTime.of(2020, 5, 12, 15, 56);
	private final LocalDateTime endDate1 = LocalDateTime.of(2021, 2, 14, 15, 56);
	private final LocalDateTime startDate2 = LocalDateTime.of(2020, 7, 12, 15, 56);
	private final LocalDateTime endDate2 = LocalDateTime.of(2021, 7, 14, 15, 56);

	@Autowired
	private TeamService teamService;

	@Autowired
	private SeasonService seasonService;

	@Autowired
	private SeasonTeamDao seasonTeamDao;

	@Autowired
	private UserService userService;

	private User createUser(String userName) {
		return new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com", null);
	}

	@Test
	public void testAddTeamAndFindTeamById() throws InstanceNotFoundException, DuplicateInstanceException {

		User user = createUser("usuario");
		userService.signUp(user);

		Team team = teamService.addTeam(user.getId(), "primero", "arenaName", "ownerName", "description");

		Long teamId = team.getId();
		Team foundTeam = teamService.findTeamById(user.getId(), teamId);
		List<SeasonTeam> seasonsTeams = seasonTeamDao.findByUserId(user.getId());
		Team foundTeamByUser = seasonsTeams.get(0).getTeam();

		assertEquals(team, foundTeam);
		assertEquals(team, foundTeamByUser);
	}

	@Test
	public void testAddTeamAndFindTeamByName() throws InstanceNotFoundException, DuplicateInstanceException {

		User user = createUser("usuario");
		userService.signUp(user);

		Team team = teamService.addTeam(user.getId(), "segundo", "arenaName", "ownerName", "description");

		Team foundTeam = teamService.findTeamByName(user.getId(), "segundo");

		List<SeasonTeam> seasonsTeams = seasonTeamDao.findByUserId(user.getId());
		Team foundTeamByUser = seasonsTeams.get(0).getTeam();

		assertEquals(team, foundTeam);
		assertEquals(team, foundTeamByUser);
	}

	@Test
	public void testAddTeamAndFindTeamByIdFromNonExistentId() throws DuplicateInstanceException {
		User user = createUser("usuario");
		userService.signUp(user);
		assertThrows(InstanceNotFoundException.class, () -> teamService.findTeamById(user.getId(), NON_EXISTENT_ID));
	}

	@Test
	public void testAddTeamAndFindTeamByIdFromNonExistentName() throws DuplicateInstanceException {
		User user = createUser("usuario");
		userService.signUp(user);
		assertThrows(InstanceNotFoundException.class, () -> teamService.findTeamByName(user.getId(), "noexiste"));
	}

	@Test
	public void testAddTeamWithDuplicateTeamName() throws DuplicateInstanceException, InstanceNotFoundException {
		User user = createUser("usuario");
		userService.signUp(user);

		teamService.addTeam(user.getId(), "segundo", "arenaName", "ownerName", "description");

		assertThrows(DuplicateInstanceException.class, () -> teamService.addTeam(user.getId(), "segundo", "arenaName", "ownerName", "description"));
	}

	@Test
	public void testFindAllTeams() throws InstanceNotFoundException, DuplicateInstanceException {

		User user = createUser("usuario");
		userService.signUp(user);
		Team team1 = teamService.addTeam(user.getId(), "primero", "arenaName", "ownerName", "description");
		Team team2 = teamService.addTeam(user.getId(), "segundo", "arenaName", "ownerName", "description");
		Team team3 = teamService.addTeam(user.getId(), "tercero", "arenaName", "ownerName", "description");

		User user2 = createUser("usuario2");
		userService.signUp(user2);
		teamService.addTeam(user2.getId(), "primero2", "arenaName", "ownerName", "description");
		teamService.addTeam(user2.getId(), "segundo2", "arenaName", "ownerName", "description");

		List<Team> teams = new ArrayList<>();
		teams.add(team1);
		teams.add(team2);
		teams.add(team3);

		assertEquals(3, teamService.findAllTeams(user.getId()).size());
		assertEquals(2, teamService.findAllTeams(user2.getId()).size());

		assertEquals(teams.get(0), teamService.findAllTeams(user.getId()).get(0));
		assertEquals(teams.get(1), teamService.findAllTeams(user.getId()).get(1));
		assertEquals(teams.get(2), teamService.findAllTeams(user.getId()).get(2));
	}

	@Test
	public void testRemoveTeam() throws InstanceNotFoundException, DuplicateInstanceException {

		User user = createUser("usuario");
		userService.signUp(user);
		teamService.addTeam(user.getId(), "primero", "arenaName", "ownerName", "description");
		Team team2 = teamService.addTeam(user.getId(), "segundo", "arenaName", "ownerName", "description");
		teamService.addTeam(user.getId(), "tercero", "arenaName", "ownerName", "description");

		teamService.removeTeam(user.getId(), team2.getId());

		assertEquals(2, teamService.findAllTeams(user.getId()).size());
	}

	@Test
	public void testRemoveTeamFromNonExistentId() throws DuplicateInstanceException {
		User user = createUser("usuario");
		userService.signUp(user);
		assertThrows(InstanceNotFoundException.class, () -> teamService.removeTeam(user.getId(), NON_EXISTENT_ID));
	}

	@Test
	public void testUpdateTeam() throws InstanceNotFoundException, DuplicateInstanceException {

		User user = createUser("usuario");
		userService.signUp(user);

		Team team = teamService.addTeam(user.getId(), "primero", "arenaName", "ownerName", "description");

		teamService.updateTeam(user.getId(), team.getId(), "segundo", "arenaName", "ownerName", "description");

		assertEquals("segundo", teamService.findTeamById(user.getId(), team.getId()).getTeamName());
		assertEquals("segundo", seasonTeamDao.findByUserId(user.getId()).get(0).getTeam().getTeamName());

	}



	@Test
	public void testFindTeamsToSeason() throws DuplicateInstanceException, InstanceNotFoundException,
            StartDateAfterEndDateException {
		
        User user = createUser("usuario");
		userService.signUp(user);

		Team team = teamService.addTeam(user.getId(),"equipo", "arenaName", "ownerName", "description");
		Team team2 = teamService.addTeam(user.getId(),"dos", "arenaName", "ownerName", "description");

		Season season = seasonService.addSeason(user.getId(),startDate1, endDate1, "Calendario", "description");
		Season season2 = seasonService.addSeason(user.getId(),startDate2, endDate2, "Calendario", "description");

		teamService.addTeamToSeason(season.getId(), team.getId(), user.getId());
		teamService.addTeamToSeason(season.getId(), team2.getId(), user.getId());
        teamService.addTeamToSeason(season2.getId(), team2.getId(), user.getId());

        List<Team> teams = teamService.findTeamsToSeason(user.getId(),season.getId());
        List<Team> teams2 = teamService.findTeamsToSeason(user.getId(),season2.getId());

        assertEquals(2, teams.size());
        assertEquals(1, teams2.size());

        assertEquals(teamService.findTeamsToSeason(user.getId(),season.getId()).get(0), team);
        assertEquals(teamService.findTeamsToSeason(user.getId(),season.getId()).get(1), team2);
        assertEquals(teamService.findTeamsToSeason(user.getId(),season2.getId()).get(0), team2);
	}
}