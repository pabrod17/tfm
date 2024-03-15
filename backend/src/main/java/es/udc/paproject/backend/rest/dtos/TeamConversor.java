package es.udc.paproject.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Team;

public class TeamConversor {

    public TeamConversor() {
    }
    
    public final static TeamDto toTeamDto(Team team){
        return new TeamDto(team.getId(), team.getTeamName(), team.getArenaName(), team.getOwnerName());
    }

    public final static List<TeamDto> toTeamDtos(List<Team> teams){
        return teams.stream().map(c -> toTeamDto(c)).collect(Collectors.toList());
    }

    public final static Team toTeam(TeamDto teamDto) {
		return new Team(teamDto.getTeamName(), teamDto.getArenaName(), teamDto.getOwnerName());
    }

    public final static Team toTeamUpdate(TeamDto teamDto) {
        Team team = new Team(teamDto.getTeamName(), teamDto.getArenaName(), teamDto.getOwnerName());
        team.setId(teamDto.getId());
		return team;
    }
}