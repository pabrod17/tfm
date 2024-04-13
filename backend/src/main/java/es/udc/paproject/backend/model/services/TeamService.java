package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedTrainingException;

public interface TeamService {

    Team addTeam(Long userId, String teamName, String arenaName, String ownerName, String description) throws InstanceNotFoundException, DuplicateInstanceException;

    void addTeamToSeason(Long seasonId, Long teamId, Long userId) throws InstanceNotFoundException;

    Team findTeamById(Long userId,Long teamId) throws InstanceNotFoundException;

    Team findTeamByPlayer(Long userId,Long playerId) throws InstanceNotFoundException;

    Team findTeamByName(Long userId, String teamName) throws InstanceNotFoundException;

    List<Team> findAllTeams(Long userId) throws InstanceNotFoundException;

    List<Team> findTeamsByName(Long userId,  String teamName) throws InstanceNotFoundException;

    List<Team> findTeamsByArena(Long userId,  String arena) throws InstanceNotFoundException;

    List<Team> findTeamsByOwner(Long userId,  String owner) throws InstanceNotFoundException;

    List<Team> findTeamsToSeason(Long userId, Long seasonId) throws InstanceNotFoundException;

    void removeTeam(Long userId, Long teamId) throws InstanceNotFoundException;

    void removeTeamToSeason(Long teamId, Long seasonId) throws InstanceNotFoundException, UsedTrainingException;

    void clearSeasonTeamTable(Long userId) throws InstanceNotFoundException;

    Team updateTeam(Long userId, Long teamId, String teamName, String arenaName, String ownerName, String description) throws InstanceNotFoundException;
}