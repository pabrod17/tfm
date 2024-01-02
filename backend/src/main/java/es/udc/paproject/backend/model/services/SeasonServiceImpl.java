package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.SeasonDao;
import es.udc.paproject.backend.model.entities.SeasonTeam;
import es.udc.paproject.backend.model.entities.SeasonTeamDao;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;

@Service
@Transactional
public class SeasonServiceImpl implements SeasonService {

    @Autowired
    private SeasonDao seasonDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Autowired
    private UserService userService;
    
    @Override
    public Season addSeason(Long userId, LocalDateTime startDate, LocalDateTime endDate, String calendario) throws InstanceNotFoundException,
            StartDateAfterEndDateException {

        if(startDate.isAfter(endDate)){
            throw new StartDateAfterEndDateException(startDate, endDate);
        }

        Season season = new Season(startDate, endDate, calendario);
        User user = userService.loginFromId(userId);
        seasonDao.save(season);
        SeasonTeam seasonTeam = new SeasonTeam(season, null, user);
        seasonTeamDao.save(seasonTeam);

        return season;
    }

    @Override
    @Transactional(readOnly = true)
    public Season findSeasonById(Long userId, Long seasonId) throws InstanceNotFoundException {
        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());

        Season season = null;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getSeason() != null && seasonTeam.getSeason().getId() == seasonId){
                season = seasonTeam.getSeason();
            }
        }
        if(season == null){
            throw new InstanceNotFoundException("project.entities.season");
        }

        return season;
    }

    @Override
    public List<Season> findSeasonsBetweenTwoDates(Long userId, LocalDateTime startDate, LocalDateTime endDate)
            throws InstanceNotFoundException, StartDateAfterEndDateException {

                if(startDate.isAfter(endDate)){
                    throw new StartDateAfterEndDateException(startDate, endDate);
                }

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Season> seasons = new ArrayList<>();

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getSeason() != null && seasonTeam.getSeason().getStartDate().isAfter(startDate) && seasonTeam.getSeason().getEndDate().isBefore(endDate)) {
                seasons.add(seasonTeam.getSeason());
            }
        }
        if (seasons.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.season");
        }
        seasons = seasons.stream().distinct().collect(Collectors.toList());

        return seasons;
    }

    @Override
    public List<Season> findAllSeasons(Long userId) throws InstanceNotFoundException {
        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Season> seasons = new ArrayList<>();

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getSeason() != null){
                seasons.add(seasonTeam.getSeason());
            }
        }
        if (seasons.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.season");
        }
        seasons = seasons.stream().distinct().collect(Collectors.toList());

        return seasons;
    }

    @Override
    public List<Season> findSeasonsToTeam(Long userId, Long teamId) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Season> seasons = new ArrayList<>();

        if (seasonTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.seasonTeam");
        }
        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getSeason() != null && seasonTeam.getTeam().getId() == teamId){
                seasons.add(seasonTeam.getSeason());
            }
        }
        if (seasons.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.season");
        }

        return seasons;
    }

    @Override
    public void clearSeasonTeamTable(Long userId) throws InstanceNotFoundException {
        
        User user = userService.loginFromId(userId);

        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<SeasonTeam> seasonTeamsRepeat = new ArrayList<>();

        for (int i = 0; i < seasonTeams.size(); i++) {
            for (int j = i+1; j < seasonTeams.size(); j++) {
                if(seasonTeams.get(i).equals(seasonTeams.get(j))){
                    seasonTeamsRepeat.add(seasonTeams.get(i));
                }
            }
        }
        for (int i = 0; i < seasonTeamsRepeat.size(); i++) {
            seasonTeamDao.delete(seasonTeamsRepeat.get(i));
        }
    }

    @Override
    public void removeSeason(Long userId, Long seasonId) throws InstanceNotFoundException {

        Optional<Season> existingSeason = seasonDao.findById(seasonId);
        if (!existingSeason.isPresent()) {
            throw new InstanceNotFoundException("project.entities.season", seasonId);
        }

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Long id = (long) -1;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getSeason() != null && seasonTeam.getSeason().getId() == seasonId){
                id = seasonTeam.getSeason().getId();
                seasonDao.delete(seasonTeam.getSeason());
                seasonTeam.setSeason(null);
                clearSeasonTeamTable(userId);

                if(seasonTeam.getSeason() == null && seasonTeam.getTeam()==null){
                    seasonTeamDao.delete(seasonTeam);
                }
            }
        }
        if(id == -1) {
            throw new InstanceNotFoundException("project.entities.team", seasonId);
        }
    }

    @Override
    public Season updateSeason(Long userId, Long seasonId, LocalDateTime startDate, LocalDateTime endDate, String calendario)
            throws InstanceNotFoundException {

        Optional<Season> existingSeason = seasonDao.findById(seasonId);
        if (!existingSeason.isPresent()) {
            throw new InstanceNotFoundException("project.entities.season", seasonId);
        }

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Season existingSeason2 = null;

        for (SeasonTeam seasonTeam : seasonTeams){
            if(seasonTeam.getSeason() != null && seasonTeam.getSeason().getId() == seasonId){
                existingSeason2 = seasonTeam.getSeason();
                existingSeason2.setStartDate(startDate);
                existingSeason2.setEndDate(endDate);
                existingSeason2.setCalendario(calendario);
                seasonDao.save(existingSeason2);

                Optional<SeasonTeam> seasonTeam2 = seasonTeamDao.findById(seasonTeam.getId());
                seasonTeam2.get().getSeason().setStartDate(startDate);
                seasonTeam2.get().getSeason().setEndDate(endDate);
                seasonTeam2.get().getSeason().setCalendario(calendario);
                seasonTeamDao.save(seasonTeam2.get());
            }
        }
        if (existingSeason2 == null) {
            throw new InstanceNotFoundException("project.entities.season", seasonId);
        }
        return existingSeason2;
    }
}