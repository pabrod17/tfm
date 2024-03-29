package es.udc.paproject.backend.rest.controllers;

import java.util.List;
import java.util.Locale;

import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.UsedTrainingException;
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

    @GetMapping("/name")
    public List<TeamDto> findTeamsByName(@RequestAttribute Long userId, @RequestParam String name) throws InstanceNotFoundException {

        List<Team> holas = teamService.findTeamsByName(userId, name);

        System.out.println("HOLAAA 1111: ");
        System.out.println("HOLAAA 1111: ");
        System.out.println("HOLAAA 1111: ");
        System.out.println("HOLAAA 1111: ");
        System.out.println("HOLAAA 1111: ");
        System.out.println("HOLAAA 1111: ");
        System.out.println("HOLAAA 1111: ");
        System.out.println("HOLAAA 1111: FINAL ");

        System.out.println("HOLAAA 1111: FINAL1:  " + holas.size());

        System.out.println("HOLAAA 1111: FINAL2:  " + holas);


        return toTeamDtos(holas);
    }

    @GetMapping("/arena")
    public List<TeamDto> findTeamsByArena(@RequestAttribute Long userId, @RequestParam String arena) throws InstanceNotFoundException {
        System.out.println("HOLAAA 2222222: ");
        System.out.println("HOLAAA 2222222: ");
        System.out.println("HOLAAA 2222222: ");
        System.out.println("HOLAAA 2222222: ");
        System.out.println("HOLAAA 2222222: ");
        System.out.println("HOLAAA 2222222: ");
        System.out.println("HOLAAA 2222222: ");

        return toTeamDtos(teamService.findTeamsByArena(userId, arena));
    }

    @GetMapping("/owner")
    public List<TeamDto> findTeamsByOwner(@RequestAttribute Long userId, @RequestParam String owner) throws InstanceNotFoundException {
        System.out.println("HOLAAA 333333333: ");
        System.out.println("HOLAAA 333333333: ");
        System.out.println("HOLAAA 333333333: ");
        System.out.println("HOLAAA 333333333: ");
        System.out.println("HOLAAA 333333333: ");
        System.out.println("HOLAAA 333333333: ");

        return toTeamDtos(teamService.findTeamsByOwner(userId, owner));
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
    public TeamDto addTeam(@RequestAttribute Long userId, @RequestParam String name, @RequestParam String arenaName, @RequestParam String ownerName, @RequestParam String description)
            throws InstanceNotFoundException, DuplicateInstanceException {
        return toTeamDto(teamService.addTeam(userId, name, arenaName, ownerName, description));
    }

    @PutMapping("/{id}")
    public TeamDto updateTeam(@RequestAttribute Long userId, @PathVariable Long id, @RequestParam String name, @RequestParam String arenaName, @RequestParam String ownerName, @RequestParam String description) throws InstanceNotFoundException {
        return toTeamDto(teamService.updateTeam(userId, id, name, arenaName, ownerName, description));
    }

    @DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeTeam(@RequestAttribute Long userId, @PathVariable Long id) throws InstanceNotFoundException {
        teamService.removeTeam(userId, id);
    }

    @DeleteMapping("/{seasonId}/season")
    public void removeTeamToSeason(@PathVariable Long seasonId, @RequestParam Long teamId) throws InstanceNotFoundException,
            UsedTrainingException {
        teamService.removeTeamToSeason(teamId, seasonId);
    }

    @PostMapping("/{seasonId}/addTeamtoSeason")
    public void addTeamToSeason(@RequestAttribute Long userId, @PathVariable Long seasonId, @RequestParam List<Long> teamId) throws InstanceNotFoundException {
        for (Long id : teamId) {
            teamService.addTeamToSeason(seasonId, id, userId);
        }
    }
}