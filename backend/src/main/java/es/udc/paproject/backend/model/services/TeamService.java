package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface TeamService {

    Team addTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException;

    void addTeamToSeason(Long seasonId, Long teamId, Long userId) throws InstanceNotFoundException;

    Team findTeamById(Long userId,Long teamId) throws InstanceNotFoundException;

    Team findTeamByName(Long userId, String teamName) throws InstanceNotFoundException;

    List<Team> findAllTeams(Long userId) throws InstanceNotFoundException;

    List<Team> findTeamsToSeason(Long userId, Long seasonId) throws InstanceNotFoundException;

    void removeTeam(Long userId, Long teamId) throws InstanceNotFoundException;
    
    void clearSeasonTeamTable(Long userId) throws InstanceNotFoundException;

    Team updateTeam(Long userId, Long teamId, String teamName) throws InstanceNotFoundException;
}