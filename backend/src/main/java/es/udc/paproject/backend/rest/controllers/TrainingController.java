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
import es.udc.paproject.backend.model.exceptions.UsedTrainingException;
import es.udc.paproject.backend.model.services.TrainingService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.TrainingDto;

import org.springframework.http.HttpStatus;
import static es.udc.paproject.backend.rest.dtos.TrainingConversor.toTrainingDto;
import static es.udc.paproject.backend.rest.dtos.TrainingConversor.toTrainingDtos;
import static es.udc.paproject.backend.rest.dtos.TrainingConversor.toLocalDateTime;

@RestController
@RequestMapping("/trainings")
public class TrainingController {

    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";
    private final static String USED_TRAINING_EXCEPTION = "project.exceptions.UsedTrainingException";

    @Autowired
    private TrainingService trainingService;

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(InstanceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null, NOT_FOUND_EXCEPTION, locale);

        return new ErrorsDto(errorMessage);
    }

    @ExceptionHandler(UsedTrainingException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	@ResponseBody
	public ErrorsDto handleUsedTrainingException(UsedTrainingException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(USED_TRAINING_EXCEPTION, null,
        USED_TRAINING_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("/{trainingId}")
    public TrainingDto findTrainingById(@PathVariable Long trainingId) throws InstanceNotFoundException {
        return toTrainingDto(trainingService.findTrainingById(trainingId));
    }

    @GetMapping("/user")
    public List<TrainingDto> findTrainingsByUserId(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toTrainingDtos(trainingService.findTrainingsByUserId(userId));
    }

    @GetMapping("/{playerId}/player")
    public List<TrainingDto> findTrainingsByPlayerId(@PathVariable Long playerId) throws InstanceNotFoundException {
        return toTrainingDtos(trainingService.findTrainingsByPlayerId(playerId));
    }

    @GetMapping("/dates")
    public List<TrainingDto> findTrainingsByTwoDatesAndTeamIdOrSeasonId(@RequestAttribute Long userId, @RequestParam(required=false) Long teamId,
            @RequestParam(required=false) Long seasonId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate)
            throws InstanceNotFoundException, StartDateAfterEndDateException {
        return toTrainingDtos(trainingService.findTrainingsByTwoDatesAndTeamIdOrSeasonId(userId, teamId, seasonId,
                toLocalDateTime(startDate), toLocalDateTime(endDate)));
    }

    @GetMapping("/{teamId}/team")
    public List<TrainingDto> findTrainingsByTeamId(@PathVariable Long teamId) throws InstanceNotFoundException {
        return toTrainingDtos(trainingService.findTrainingsByTeamId(teamId));
    }

    @GetMapping("/{seasonId}/season")
    public List<TrainingDto> findTrainingsBySeasonId(@PathVariable Long seasonId) throws InstanceNotFoundException {
        return toTrainingDtos(trainingService.findTrainingsBySeasonId(seasonId));
    }

    @PostMapping("")
    public TrainingDto addTraining(@RequestParam(required=false) Long teamId, @RequestParam(required=false) Long seasonId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date trainingDate,
            @RequestParam String durationMinutes, @RequestParam String description, @RequestParam String objective)
            throws InstanceNotFoundException {
        return toTrainingDto(trainingService.addTraining(teamId, seasonId, toLocalDateTime(trainingDate),
                durationMinutes, description, objective));
    }

    @PostMapping("/{trainingId}/addPlayerToTraining")
    public void addPlayerToTraining(@PathVariable Long trainingId, @RequestParam List<Long> playerId)
            throws InstanceNotFoundException {
        for (Long id : playerId) {
            trainingService.addPlayerToTraining(trainingId, id);
        }
    }

    @PutMapping("/{trainingId}")
    public TrainingDto updateTraining(@PathVariable Long trainingId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") Date trainingDate,
            @RequestParam String durationMinutes, @RequestParam String description, @RequestParam String objective)
            throws InstanceNotFoundException {
        return toTrainingDto(trainingService.updateTraining(trainingId, toLocalDateTime(trainingDate), durationMinutes,
                description, objective));
    }

    @DeleteMapping("/{trainingId}")
    public void removeTraining(@PathVariable Long trainingId) throws InstanceNotFoundException, UsedTrainingException {
        trainingService.removeTraining(trainingId);
    }

    @DeleteMapping("/{playerId}/player")
    public void removePlayerToTraining(@PathVariable Long playerId, @RequestParam Long trainingId) throws InstanceNotFoundException,
            UsedTrainingException {
        trainingService.removePlayerToTraining(playerId, trainingId);
    }
}