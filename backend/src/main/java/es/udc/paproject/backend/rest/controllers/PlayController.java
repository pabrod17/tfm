package es.udc.paproject.backend.rest.controllers;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import es.udc.paproject.backend.model.exceptions.IncorrectPlayTypeException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedPlayException;
import es.udc.paproject.backend.model.services.PlayService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.PlayDto;
import static es.udc.paproject.backend.rest.dtos.PlayConversor.toPlayDto;
import static es.udc.paproject.backend.rest.dtos.PlayConversor.toPlayDtos;

@RestController
@RequestMapping("/plays")
public class PlayController {
    
    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";
    private final static String USED_PLAY_EXCEPTION = "project.exceptions.UsedPlayException";
    private final static String INCORRECT_PLAY_TYPE_EXCEPTION = "project.exceptions.IncorrectPlayTypeException";

    @Autowired
    private PlayService playService;

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

    @ExceptionHandler(UsedPlayException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	@ResponseBody
	public ErrorsDto handleUsedPlayException(UsedPlayException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(USED_PLAY_EXCEPTION, null,
        USED_PLAY_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @ExceptionHandler(IncorrectPlayTypeException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectPlayTypeException(IncorrectPlayTypeException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_PLAY_TYPE_EXCEPTION, null,
        INCORRECT_PLAY_TYPE_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("/{playId}")
    public PlayDto findPlayById(@PathVariable Long playId) throws InstanceNotFoundException {
        return toPlayDto(playService.findPlayById(playId));
    }
    //no utilizar en el front
    @GetMapping("/{userId}/user")
    public List<PlayDto> findPlaysByUserId(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toPlayDtos(playService.findPlaysByUserId(userId));
    }

    @GetMapping("/{teamId}/team")
    public List<PlayDto> findPlaysByTeamId(@PathVariable Long teamId) throws InstanceNotFoundException {
        return toPlayDtos(playService.findPlaysByTeamId(teamId));
    }

    @GetMapping("/{teamId}/playType")
    public List<PlayDto> findPlaysByTypeAndTeam(@PathVariable Long teamId, @RequestParam String playType) throws InstanceNotFoundException,
            IncorrectPlayTypeException {
        return toPlayDtos(playService.findPlaysByTypeAndTeam(teamId, playType));
    }

    @PostMapping("")
    public PlayDto addPlay(@RequestParam Long teamId, @RequestParam String title, @RequestParam String playType, @RequestParam String gesture, 
    @RequestParam String pointGuardText, @RequestParam String shootingGuardText, @RequestParam String smallForwardText, 
    @RequestParam String powerForwardText, @RequestParam String centerText)
            throws InstanceNotFoundException, IncorrectPlayTypeException {
        return toPlayDto(playService.addPlay(teamId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText));
    }

    @PostMapping("/{teamId}/addPlayToTeam")
    public void addPlayToTeam(@PathVariable Long teamId, @RequestParam Long playId)
            throws InstanceNotFoundException, IncorrectPlayTypeException, UsedPlayException {
        playService.addPlayToTeam(teamId, playId);
    }

    @PutMapping("/{playId}")
    public PlayDto updatePlay(@PathVariable Long playId, @RequestParam String title, @RequestParam String playType, @RequestParam String gesture, 
    @RequestParam String pointGuardText, @RequestParam String shootingGuardText, @RequestParam String smallForwardText, 
    @RequestParam String powerForwardText, @RequestParam String centerText)
            throws InstanceNotFoundException, IncorrectPlayTypeException {
        return toPlayDto(playService.updatePlay(playId, title, playType, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText));
    }

    @DeleteMapping("/{playId}")
    public void removePlayToTeam(@PathVariable Long playId, @RequestParam Long teamId)
            throws InstanceNotFoundException {
        playService.removePlayToTeam(playId, teamId);
    }
}