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
public class SeasonServiceTest {

    private final Long NON_EXISTENT_ID = new Long(-1);
    private final LocalDateTime startDate = LocalDateTime.of(2015, 5, 12, 15, 56);
    private final LocalDateTime endDate = LocalDateTime.of(2022, 5, 12, 15, 56);
    private final LocalDateTime startDateUpdated = LocalDateTime.of(2030, 1, 7, 15, 56);
    private final LocalDateTime endDateUpdated = LocalDateTime.of(2035, 2, 6, 15, 56);

    private final LocalDateTime startDate1 = LocalDateTime.of(2020, 5, 12, 15, 56);
    private final LocalDateTime endDate1 = LocalDateTime.of(2021, 2, 14, 15, 56);
    private final LocalDateTime startDate2 = LocalDateTime.of(2020, 7, 12, 15, 56);
    private final LocalDateTime endDate2 = LocalDateTime.of(2021, 7, 14, 15, 56);
    private final LocalDateTime startDate3 = LocalDateTime.of(2020, 8, 12, 15, 56);
    private final LocalDateTime endDate3 = LocalDateTime.of(2021, 8, 14, 15, 56);
    private final LocalDateTime startDateOut = LocalDateTime.of(2014, 8, 12, 15, 56);
    private final LocalDateTime endDateOut = LocalDateTime.of(2023, 8, 14, 15, 56);
    private final LocalDateTime endDateBad = LocalDateTime.of(2021, 7, 14, 15, 56);
    private final LocalDateTime startDateBad = LocalDateTime.of(2020, 7, 12, 15, 56);

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Autowired
    private UserService userService;

    private User createUser(String userName) {
        return new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
    }

    @Test
    public void testAddSeasonAndFindSeasonById() throws InstanceNotFoundException, DuplicateInstanceException,
            StartDateAfterEndDateException {

        User user = createUser("usuario");
        userService.signUp(user);

        Season season = seasonService.addSeason(user.getId(), startDate1, endDate1, "Calendario");

        Long seasonId = season.getId();
        Season foundSeason = seasonService.findSeasonById(user.getId(), seasonId);
        List<SeasonTeam> seasonsTeams = seasonTeamDao.findByUserId(user.getId());
        Season foundSeasonByUser = seasonsTeams.get(0).getSeason();

        assertEquals(season, foundSeason);
        assertEquals(season, foundSeasonByUser);
    }

    @Test
    public void testAddSeasonAndFindSeasonBetweenTwoDates()
            throws InstanceNotFoundException, DuplicateInstanceException, StartDateAfterEndDateException {

        User user = createUser("usuario");
        userService.signUp(user);

        seasonService.addSeason(user.getId(), startDate1, endDate1, "Calendario");
        seasonService.addSeason(user.getId(), startDate2, endDate2, "Calendario");
        seasonService.addSeason(user.getId(), startDate3, endDate3, "Calendario");

        seasonService.addSeason(user.getId(), startDateOut, endDateOut,"Calendario");

        List<Season> seasons = seasonService.findSeasonsBetweenTwoDates(user.getId(), startDate, endDate);
        assertEquals(3, seasons.size());
    }

    @Test
    public void testAddSeasonAndFindSeasonByIdFromNonExistentId() throws DuplicateInstanceException {
        User user = createUser("usuario");
        userService.signUp(user);

        assertThrows(InstanceNotFoundException.class,
                () -> seasonService.findSeasonById(user.getId(), NON_EXISTENT_ID));
    }

    @Test
    public void testAddSeasonWithBadDates() throws DuplicateInstanceException, InstanceNotFoundException,
            StartDateAfterEndDateException {
        User user = createUser("usuario");
        userService.signUp(user);

        assertThrows(StartDateAfterEndDateException.class, () -> seasonService.addSeason(user.getId(), endDateBad, startDateBad, "Calendario"));
    }

    @Test
    public void testAddSeasonsAndFindSeasonsWithBadDates() throws DuplicateInstanceException, InstanceNotFoundException,
            StartDateAfterEndDateException {
        User user = createUser("usuario");
        userService.signUp(user);
        seasonService.addSeason(user.getId(), startDate1, endDate1, "Calendario");
        seasonService.addSeason(user.getId(), startDate2, endDate2, "Calendario");

        assertThrows(StartDateAfterEndDateException.class, () -> seasonService.findSeasonsBetweenTwoDates(user.getId(),endDate, startDate));
    }

    @Test
    public void testFindAllSeasons() throws InstanceNotFoundException, DuplicateInstanceException,
            StartDateAfterEndDateException {

        User user = createUser("usuario");
        userService.signUp(user);
        Season season1 = seasonService.addSeason(user.getId(), startDate1, endDate1, "Calendario");
        Season season2 = seasonService.addSeason(user.getId(), startDate2, endDate2, "Calendario");
        Season season3 = seasonService.addSeason(user.getId(), startDate3, endDate3, "Calendario");

        User user2 = createUser("usuario2");
        userService.signUp(user2);
        seasonService.addSeason(user2.getId(), startDate1, endDate1, "Calendario");
        seasonService.addSeason(user2.getId(), startDate2, endDate2, "Calendario");
        List<Season> seasons = new ArrayList<>();
        seasons.add(season1);
        seasons.add(season2);
        seasons.add(season3);

        assertEquals(3, seasonService.findAllSeasons(user.getId()).size());
        assertEquals(2, seasonService.findAllSeasons(user2.getId()).size());

        assertEquals(seasons.size(), seasonService.findAllSeasons(user.getId()).size());
        assertEquals(seasons.get(0), seasonService.findAllSeasons(user.getId()).get(0));
        assertEquals(seasons.get(1), seasonService.findAllSeasons(user.getId()).get(1));
        assertEquals(seasons.get(2), seasonService.findAllSeasons(user.getId()).get(2));
    }

    @Test
    public void testRemoveSeason()
            throws InstanceNotFoundException, DuplicateInstanceException, StartDateAfterEndDateException {

		User user = createUser("usuario");
		userService.signUp(user);
        seasonService.addSeason(user.getId(), startDate1, endDate1, "Calendario");
        Season season2 = seasonService.addSeason(user.getId(), startDate2, endDate2, "Calendario");
        seasonService.addSeason(user.getId(), startDate3, endDate3, "Calendario");


        seasonService.removeSeason(user.getId(),season2.getId());

        assertEquals(2, seasonService.findAllSeasons(user.getId()).size());
    }

    @Test
    public void testRemoveSeasonFromNonExistentId() throws DuplicateInstanceException {
        User user = createUser("usuario");
		userService.signUp(user);
		assertThrows(InstanceNotFoundException.class, () -> seasonService.removeSeason(user.getId(),NON_EXISTENT_ID));
    }

    @Test
    public void testUpdateSeason() throws InstanceNotFoundException, DuplicateInstanceException,
            StartDateAfterEndDateException {

		User user = createUser("usuario");
		userService.signUp(user);

        Season season = seasonService.addSeason(user.getId(),startDate1, endDate2, "Calendario");
        seasonService.updateSeason(user.getId(),season.getId(), startDateUpdated, endDateUpdated, "cambio");

        assertEquals(startDateUpdated, seasonService.findSeasonById(user.getId(),season.getId()).getStartDate());
        assertEquals(endDateUpdated, seasonService.findSeasonById(user.getId(),season.getId()).getEndDate());
        assertEquals("cambio", seasonService.findSeasonById(user.getId(),season.getId()).getCalendario());

        assertEquals(startDateUpdated, seasonTeamDao.findByUserId(user.getId()).get(0).getSeason().getStartDate());
        assertEquals(endDateUpdated, seasonTeamDao.findByUserId(user.getId()).get(0).getSeason().getEndDate());
        assertEquals("cambio", seasonTeamDao.findByUserId(user.getId()).get(0).getSeason().getCalendario());
    }

	@Test
	public void testAddTeamToSeasonAndfindSeasonTeamsByTeamId()
			throws DuplicateInstanceException, InstanceNotFoundException, StartDateAfterEndDateException {

		User user = createUser("usuario");
		userService.signUp(user);
		
		Team team = teamService.addTeam(user.getId(),"equipo", "arenaName", "ownerName");
		Team team2 = teamService.addTeam(user.getId(),"dos", "arenaName", "ownerName");

		Season season = seasonService.addSeason(user.getId(), startDate1, endDate1, "Calendario");
		Season season2 = seasonService.addSeason(user.getId(), startDate2, endDate2, "Calendario");

		teamService.addTeamToSeason(season.getId(),team.getId(), user.getId());
		teamService.addTeamToSeason(season.getId(), team2.getId(), user.getId());
		teamService.addTeamToSeason(season2.getId(), team.getId(), user.getId());

		List<Season> seasons = seasonService.findSeasonsToTeam(user.getId(), team.getId());
		
		assertEquals(2, seasons.size());
		assertEquals(seasonService.findSeasonsToTeam(user.getId(), team.getId()).get(0), season);
		assertEquals(seasonService.findSeasonsToTeam(user.getId(), team.getId()).get(1), season2);
	}
}