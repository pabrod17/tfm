package es.udc.paproject.backend.rest.controllers;

import java.util.List;
import java.util.Locale;

import es.udc.paproject.backend.rest.dtos.GameDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.IncorrectPositionException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.PlayerDto;

import static es.udc.paproject.backend.rest.dtos.GameConversor.toGameDtos;
import static es.udc.paproject.backend.rest.dtos.PlayerConversor.toPlayerDto;
import static es.udc.paproject.backend.rest.dtos.PlayerConversor.toPlayerDtos;

@RestController
@RequestMapping("/players")
public class PlayerController {
    
    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";
	private final static String INCORRECT_POSITION_EXCEPTION = "project.exceptions.IncorrectPositionException";
    private final static String INCORRECT_DNI_EXCEPTION = "project.exceptions.IncorrectDniException";
	private final static String INCORRECT_EMAIL_EXCEPTION = "project.exceptions.IncorrectEmailException";
	private final static String INCORRECT_PHONE_NUMBER_EXCEPTION = "project.exceptions.IncorrectPhoneNumberException";


    @Autowired
    private PlayerService playerService;

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

	@ExceptionHandler(IncorrectPositionException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectPositionException(IncorrectPositionException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_POSITION_EXCEPTION, null,
        INCORRECT_POSITION_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(IncorrectDniException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectDniException(IncorrectDniException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_DNI_EXCEPTION, null,
        INCORRECT_DNI_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(IncorrectEmailException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectEmailException(IncorrectEmailException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_EMAIL_EXCEPTION, null,
        INCORRECT_EMAIL_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(IncorrectPhoneNumberException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectPhoneNumberException(IncorrectPhoneNumberException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_PHONE_NUMBER_EXCEPTION, null,
        INCORRECT_PHONE_NUMBER_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("/{playerId}")
    public PlayerDto findPlayerByIdOfTeam(@PathVariable Long playerId, @RequestParam Long teamId)
            throws InstanceNotFoundException {
        return toPlayerDto(playerService.findPlayerByIdOfTeam(playerId, teamId));
    }

    @GetMapping("/user")
    public List<PlayerDto> findPlayersByUserId(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersByUserId(userId));
    }

    @GetMapping("/{teamId}/dni")
    public PlayerDto findPlayerByDniOfTeam(@PathVariable Long teamId, @RequestParam String dni)
            throws InstanceNotFoundException, IncorrectDniException {
        return toPlayerDto(playerService.findPlayerByDniOfTeam(teamId, dni));
    }

    @GetMapping("/{teamId}/name")
    public List<PlayerDto> findPlayersByCompletedNameOfTeam(@PathVariable Long teamId, @RequestParam(required=false) String name, @RequestParam(required=false) String primaryLastName, @RequestParam(required=false) String secondLastName)
            throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersByCompletedNameOfTeam(teamId, name, primaryLastName, secondLastName));
    }

    @GetMapping("/{teamId}/team")
    public List<PlayerDto> findAPlayersOfTeam(@PathVariable Long teamId) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findAPlayersOfTeam(teamId));
    }

    @GetMapping("/{trainingId}/training")
    public List<PlayerDto> findPlayersByTraining(@PathVariable Long trainingId) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersByTraining(trainingId));
    }

    @GetMapping("/{gameId}/game")
    public List<PlayerDto> findPlayersByGame(@PathVariable Long gameId) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersByGame(gameId));
    }

    @GetMapping("/{teamId}/position")
    public List<PlayerDto> findPlayersByPositionAndTeam(@PathVariable Long teamId, @RequestParam String position) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersByPositionAndTeam(teamId, position));
    }

    @GetMapping("/{teamId}/lesion")
    public List<PlayerDto> findPlayersrWithLesionOfTeam(@PathVariable Long teamId) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersrWithLesionOfTeam(teamId));
    }

    @GetMapping("/{teamId}/typeLesion")
    public List<PlayerDto> findPlayersWithOneTypeLesion(@PathVariable Long teamId, @RequestParam String typeLesion) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersWithOneTypeLesion(typeLesion, teamId));
    }

    @PostMapping("")
    public PlayerDto addPlayer(@RequestParam Long teamId, @RequestParam String playerName, @RequestParam String primaryLastName, @RequestParam String secondLastName,
    @RequestParam String position, @RequestParam String trends, @RequestParam String phoneNumber, @RequestParam String email, @RequestParam String dni)
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException {
        return toPlayerDto(playerService.addPlayer(teamId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni));
    }

    @PostMapping("/{teamId}/changePlayerToTeam")
    public void changePlayerToTeam(@PathVariable Long teamId, @RequestParam Long playerId)
            throws InstanceNotFoundException {
        playerService.changePlayerToTeam(playerId, teamId);
    }

    @PostMapping("/{playerId}/clearTotalStatistics")
    public void clearTotalStatistics(@PathVariable Long playerId)
            throws InstanceNotFoundException {
        playerService.clearTotalStatistics(playerId);
    }
    
    @PutMapping("/{playerId}")
    public PlayerDto updatePlayer(@RequestParam Long teamId, @PathVariable Long playerId, @RequestParam String playerName, @RequestParam String primaryLastName, @RequestParam String secondLastName,
    @RequestParam String position, @RequestParam String trends, @RequestParam String phoneNumber, @RequestParam String email, @RequestParam String dni)
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException {
        return toPlayerDto(playerService.updatePlayer(teamId, playerId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni));
    }

    @DeleteMapping("/{playerId}")
    public void removePlayer(@RequestParam Long teamId, @PathVariable Long playerId)
            throws InstanceNotFoundException {
        playerService.removePlayer(teamId, playerId);
    }
    
}