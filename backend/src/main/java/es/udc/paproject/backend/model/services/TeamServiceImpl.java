package es.udc.paproject.backend.model.services;

import java.util.*;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.UsedTrainingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private SeasonDao seasonDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @Override
    public Team addTeam(Long userId, String teamName, String arenaName, String ownerName, String description) throws InstanceNotFoundException, DuplicateInstanceException {
        
        if(teamDao.existsByTeamName(teamName)){
            throw new DuplicateInstanceException("project.entities.team", teamName);
        }

        User user = userService.loginFromId(userId);
        Team team = new Team(teamName, arenaName, ownerName, description);
        teamDao.save(team);
        SeasonTeam seasonTeam = new SeasonTeam(null, team, user);
        seasonTeamDao.save(seasonTeam);

        return team;
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
    public void addTeamToSeason(Long seasonId, Long teamId, Long userId) throws InstanceNotFoundException {
        
        User user = userService.loginFromId(userId);

        Season season = seasonService.findSeasonById(userId, seasonId);
        Team team = teamService.findTeamById(userId, teamId);

        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getId() == teamId){
                if(seasonTeam.getSeason() != null && seasonTeam.getSeason().getId() != seasonId){
                    SeasonTeam seasonTeamNew = new SeasonTeam(season, team, user);
                    seasonTeamDao.save(seasonTeamNew);
                    break;
                } else {
                    if(seasonTeam.getSeason() == null){
                        seasonTeam.setSeason(season);
                        seasonTeamDao.save(seasonTeam);
                        break;
                    }
                }
            }
        }
        clearSeasonTeamTable(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Team findTeamById(Long userId, Long teamId) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());


        Team team = null;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getId() == teamId){
                team = seasonTeam.getTeam();
            }
        }
        if (team == null) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        return team;
    }

    @Override
    @Transactional(readOnly = true)
    public Team findTeamByName(Long userId, String teamName) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Team team = null;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getTeamName().equals(teamName)){
                team = seasonTeam.getTeam();
            }
        }
        if (team == null) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        return team;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Team> findTeamsByName(Long userId, String teamName) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Team> teams = new ArrayList<>();
        Set<Team> teamSet = new HashSet<>();

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getTeamName().equals(teamName)){
                teamSet.add(seasonTeam.getTeam());
            }
        }
        if (teamSet.isEmpty()) {
            return teams;
        }
        return new ArrayList<>(teamSet);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Team> findTeamsByArena(Long userId, String arena) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Set<Team> teamSet = new HashSet<>();
        List<Team> teams = new ArrayList<>();

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getArenaName().equals(arena)){
                teamSet.add(seasonTeam.getTeam());
            }
        }
        if (teamSet.isEmpty()) {
            return teams;
        }
        return new ArrayList<>(teamSet);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Team> findTeamsByOwner(Long userId, String owner) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Team> teams = new ArrayList<>();
        Set<Team> teamSet = new HashSet<>();

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getOwnerName().equals(owner)){
                teamSet.add(seasonTeam.getTeam());
            }
        }
        if (teamSet.isEmpty()) {
            return teams;
        }
        return new ArrayList<>(teamSet);
    }

    @Override
    public List<Team> findAllTeams(Long userId) throws InstanceNotFoundException {
        
        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Team> teams = new ArrayList<>();

        if (seasonTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.seasonTeam");
        }

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null){
                teams.add(seasonTeam.getTeam());
            }
        }
        teams = teams.stream().distinct().collect(Collectors.toList());

        return teams;
    }



    @Override
    public List<Team> findTeamsToSeason(Long userId, Long seasonId) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Team> teams = new ArrayList<>();

        if (seasonTeams.isEmpty()) {
            return teams;
        }

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getSeason() != null && seasonTeam.getTeam() != null && seasonTeam.getSeason().getId() == seasonId){
                teams.add(seasonTeam.getTeam());
            }
        }

        if (teams.isEmpty()) {
            return teams;
        }

        return teams;
    }

    @Override
    public void removeTeam(Long userId, Long teamId) throws InstanceNotFoundException {
        
        Optional<Team> existingTeam = teamDao.findById(teamId);
        if (!existingTeam.isPresent()) {
            throw new InstanceNotFoundException("project.entities.season", teamId);
        }

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Long id = (long) -1;
        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getId() == teamId){
                id = seasonTeam.getTeam().getId();
                teamDao.delete(seasonTeam.getTeam());
                seasonTeam.setTeam(null);
                clearSeasonTeamTable(userId);


                if(seasonTeam.getSeason() == null && seasonTeam.getTeam()==null){
                    seasonTeamDao.delete(seasonTeam);
                }
            }
        }
        if(id == -1) {
            throw new InstanceNotFoundException("project.entities.team", teamId);
        }
    }

    @Override
    public void removeTeamToSeason(Long teamId, Long seasonId)
            throws InstanceNotFoundException, UsedTrainingException {

        if (!seasonDao.existsById(seasonId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }
        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<SeasonTeam> seasonTeams = (List<SeasonTeam>) seasonTeamDao.findAll();

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getSeason() != null && seasonTeam.getSeason().getId() == seasonId && seasonTeam.getTeam().getId() == teamId){
                seasonTeamDao.delete(seasonTeam);
            }
        }
    }

    @Override
    public Team updateTeam(Long userId, Long teamId, String teamName, String arenaName, String ownerName, String description) throws InstanceNotFoundException {

        Optional<Team> existingTeam = teamDao.findById(teamId);
        if (!existingTeam.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", teamId);
        }

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Team existingTeam2 = null;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null &&seasonTeam.getTeam().getId() == teamId){
                existingTeam2 = seasonTeam.getTeam();
                existingTeam2.setTeamName(teamName);
                existingTeam2.setArenaName(arenaName);
                existingTeam2.setOwnerName(ownerName);
                existingTeam2.setDescription(description);
                teamDao.save(existingTeam2);

                Optional<SeasonTeam> seasonTeam2 = seasonTeamDao.findById(seasonTeam.getId());
                seasonTeam2.get().getTeam().setTeamName(teamName);
                seasonTeam2.get().getTeam().setArenaName(arenaName);
                seasonTeam2.get().getTeam().setOwnerName(ownerName);
                seasonTeam2.get().getTeam().setDescription(description);
                seasonTeamDao.save(seasonTeam2.get());
            }
        }
        if (existingTeam2 == null) {
            throw new InstanceNotFoundException("project.entities.team", teamId);
        }
        return existingTeam2;
    }
}