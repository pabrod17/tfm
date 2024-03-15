package es.udc.paproject.backend.rest.controllers;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamDtos;
import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamDto;

import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.TeamDto;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.TeamService;

@RestController
@RequestMapping("/teams")
public class TeamController {
    
    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";

    @Autowired
    private TeamService teamService;

    @Autowired
	private MessageSource messageSource;
    
    @ExceptionHandler(InstanceNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null,
        NOT_FOUND_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}



    @GetMapping("")
    public List<TeamDto> findAllTeams(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toTeamDtos(teamService.findAllTeams(userId));
    }

    @GetMapping("/{seasonId}/season")
    public List<TeamDto> findTeamsToSeason(@RequestAttribute Long userId, @PathVariable Long seasonId) throws InstanceNotFoundException {
        return toTeamDtos(teamService.findTeamsToSeason(userId, seasonId));
    }

    @GetMapping("/")
    public TeamDto findTeamByName(@RequestAttribute Long userId, @RequestParam String name)
            throws InstanceNotFoundException {
        return toTeamDto(teamService.findTeamByName(userId, name));
    }

    @GetMapping("/{id}")
    public TeamDto findTeamById(@RequestAttribute Long userId, @PathVariable Long id)
            throws InstanceNotFoundException {
        return toTeamDto(teamService.findTeamById(userId, id));
    }

    @PostMapping("")
    public TeamDto addTeam(@RequestAttribute Long userId, @RequestParam String name, @RequestParam String arenaName, @RequestParam String ownerName)
            throws InstanceNotFoundException, DuplicateInstanceException {
        return toTeamDto(teamService.addTeam(userId, name, arenaName, ownerName));
    }

    @PutMapping("/{id}")
    public TeamDto updateTeam(@RequestAttribute Long userId, @PathVariable Long id, @RequestParam String name, @RequestParam String arenaName, @RequestParam String ownerName) throws InstanceNotFoundException {
        return toTeamDto(teamService.updateTeam(userId, id, name, arenaName, ownerName));
    }

    @DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeTeam(@RequestAttribute Long userId, @PathVariable Long id) throws InstanceNotFoundException {
        teamService.removeTeam(userId, id);
    }

    @PostMapping("/{seasonId}/addTeamtoSeason")
    public void addTeamToSeason(@RequestAttribute Long userId, @PathVariable Long seasonId, @RequestParam Long teamId) throws InstanceNotFoundException {
        teamService.addTeamToSeason(seasonId, teamId, userId);
    }
}