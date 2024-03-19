package es.udc.paproject.backend.rest.controllers;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.GameService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.GameDto;

import org.springframework.http.HttpStatus;
import static es.udc.paproject.backend.rest.dtos.GameConversor.toGameDto;
import static es.udc.paproject.backend.rest.dtos.GameConversor.toGameDtos;
import static es.udc.paproject.backend.rest.dtos.GameConversor.toLocalDateTime;;

@RestController
@RequestMapping("/games")
public class GameController {

    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";

    @Autowired
    private GameService gameService;

    @Autowired
    private MessageSource messageSource;
    
    @ExceptionHandler(InstanceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null, NOT_FOUND_EXCEPTION, locale);

        return new ErrorsDto(errorMessage);
    }

    @GetMapping("/{gameId}")
    public GameDto findGameById(@PathVariable Long gameId) throws InstanceNotFoundException {
        return toGameDto(gameService.findGameById(gameId));
    }

    @GetMapping("/{playerId}/player")
    public List<GameDto> findGamesByPlayerId(@PathVariable Long playerId) throws InstanceNotFoundException {
        return toGameDtos(gameService.findGamesByPlayerId(playerId));
    }

    @GetMapping("/user")
    public List<GameDto> findGamesByUserId(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toGameDtos(gameService.findGamesByUserId(userId));
    }

    @GetMapping("/dates")
    public List<GameDto> findGamesByTwoDatesAndTeamIdOrSeasonId(@RequestAttribute Long userId, @RequestParam(required=false) Long teamId,
            @RequestParam(required=false) Long seasonId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate)
            throws InstanceNotFoundException, StartDateAfterEndDateException {
        return toGameDtos(gameService.findGamesByTwoDatesAndTeamIdOrSeasonId(userId, teamId, seasonId,
                toLocalDateTime(startDate), toLocalDateTime(endDate)));
    }

    @GetMapping("/{teamId}/team")
    public List<GameDto> findGamesByTeamId(@PathVariable Long teamId) throws InstanceNotFoundException {
        return toGameDtos(gameService.findGamesByTeamId(teamId));
    }

    @GetMapping("/{seasonId}/season")
    public List<GameDto> findGamesBySeasonId(@PathVariable Long seasonId) throws InstanceNotFoundException {
        return toGameDtos(gameService.findGamesBySeasonId(seasonId));
    }

    @PostMapping("")
    public GameDto addGame(@RequestParam(required=false) Long teamId, @RequestParam(required=false) Long seasonId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date gameDate,
            @RequestParam String rival, @RequestParam String description)
            throws InstanceNotFoundException {
                if(seasonId == null) {
                    System.out.println("HOLAAAAA");
                }
        return toGameDto(gameService.addGame(teamId, seasonId, toLocalDateTime(gameDate), rival, description));
    }

    @PostMapping("/{playerId}/addPlayerToGame")
    public void addPlayerToGame(@PathVariable Long playerId, @RequestParam Long gameId)
            throws InstanceNotFoundException {
                gameService.addPlayerToGame(gameId, playerId);
    }

    @PutMapping("/{gameId}")
    public GameDto updateGame(@PathVariable Long gameId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date gameDate,
            @RequestParam String rival, @RequestParam String description)
            throws InstanceNotFoundException {
        return toGameDto(gameService.updateGame(gameId, toLocalDateTime(gameDate), rival, description));
    }

    @DeleteMapping("/{gameId}")
    public void removeGame(@PathVariable Long gameId) throws InstanceNotFoundException{
        gameService.removeGame(gameId);
    }

    @DeleteMapping("/{playerId}/player")
    public void removePlayerToGame(@PathVariable Long playerId, @RequestParam Long gameId) throws InstanceNotFoundException{
                gameService.removePlayerToGame(playerId, gameId);
    }
}


