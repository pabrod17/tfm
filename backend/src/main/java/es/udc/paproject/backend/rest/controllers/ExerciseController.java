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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.udc.paproject.backend.model.entities.Exercise;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedExerciseException;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.ExerciseService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.BlockDto;
import es.udc.paproject.backend.rest.dtos.ExerciseDto;

import org.springframework.http.HttpStatus;
import static es.udc.paproject.backend.rest.dtos.ExerciseConversor.toExerciseDto;
import static es.udc.paproject.backend.rest.dtos.ExerciseConversor.toExerciseDtos;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {
    
    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";
    private final static String USED_EXERCISE_EXCEPTION = "project.exceptions.UsedExerciseException";

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(InstanceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null, NOT_FOUND_EXCEPTION, locale);

        return new ErrorsDto(errorMessage);
    }

    @ExceptionHandler(UsedExerciseException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	@ResponseBody
	public ErrorsDto handleUsedExerciseException(UsedExerciseException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(USED_EXERCISE_EXCEPTION, null,
        USED_EXERCISE_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("/{exerciseId}")
    public ExerciseDto findExerciseById(@PathVariable Long exerciseId) throws InstanceNotFoundException {
        return toExerciseDto(exerciseService.findExerciseById(exerciseId));
    }

    @GetMapping("")
    public List<ExerciseDto> findAllExercises() throws InstanceNotFoundException {
        return toExerciseDtos(exerciseService.findAllExercises());
    }

    @GetMapping("/page")
    public BlockDto<ExerciseDto> findAllExercisesPage(@RequestParam(defaultValue="0") int page) throws InstanceNotFoundException {

        Block<Exercise> exerciseBlock = exerciseService.findAllExercises(page, 10);

        return new BlockDto<>(toExerciseDtos(exerciseBlock.getItems()), exerciseBlock.getExistMoreItems());
    }

    @GetMapping("/{exerciseType}/exerciseType/page")
    public BlockDto<ExerciseDto> findExercisesByTypePage(@PathVariable String exerciseType, @RequestParam(defaultValue="0") int page)
            throws InstanceNotFoundException {

        Block<Exercise> exerciseBlock = exerciseService.findExercisesByType(exerciseType, page, 10);

        return new BlockDto<>(toExerciseDtos(exerciseBlock.getItems()), exerciseBlock.getExistMoreItems());
    }

    @GetMapping("/{exerciseType}/exerciseType")
    public List<ExerciseDto> findExercisesByType(@PathVariable String exerciseType)
            throws InstanceNotFoundException {
        return toExerciseDtos(exerciseService.findExercisesByType(exerciseType));
    }

    @GetMapping("/{trainingId}/training")
    public List<ExerciseDto> findExercisesByTrainingId(@PathVariable Long trainingId)
            throws InstanceNotFoundException {
        return toExerciseDtos(exerciseService.findExercisesByTrainingId(trainingId));
    }

    @GetMapping("/{gameId}/game")
    public List<ExerciseDto> findExercisesByGameId(@PathVariable Long gameId)
            throws InstanceNotFoundException {
        return toExerciseDtos(exerciseService.findExercisesByGameId(gameId));
    }

    @PostMapping("")
    public ExerciseDto addExercise(@RequestParam String exerciseName, @RequestParam String description, @RequestParam String objective,
            @RequestParam String exerciseType) throws InstanceNotFoundException {
        return toExerciseDto(exerciseService.addExercise(exerciseName, description, objective, exerciseType));
    }

    @PostMapping("/{trainingId}/addExerciseToTraining")
    public void addExerciseToTraining(@PathVariable Long trainingId, @RequestParam List<Long> exerciseId)
            throws InstanceNotFoundException {
        for (Long id : exerciseId) {
            exerciseService.addExerciseToTraining(trainingId, id);
        }
    }
    
    @PostMapping("/{gameId}/addExerciseToGame")
    public void addExerciseToGame(@PathVariable Long gameId, @RequestParam Long exerciseId)
            throws InstanceNotFoundException {
                exerciseService.addExerciseToGame(gameId, exerciseId);
    }

    @PutMapping("/{exerciseId}")
    public ExerciseDto updatExercise(@PathVariable Long exerciseId, @RequestParam String exerciseName, @RequestParam String description, @RequestParam String objective,
    @RequestParam String exerciseType) throws InstanceNotFoundException {
        return toExerciseDto(
            exerciseService.updatExercise(exerciseId, exerciseName, description, objective, exerciseType));
    }

    @DeleteMapping("/{exerciseId}")
    public void removeExercise(@PathVariable Long exerciseId)
            throws InstanceNotFoundException, UsedExerciseException {
                exerciseService.removeExercise(exerciseId);
    }

    @DeleteMapping("/{trainingId}/training")
    public void removeExerciseToTraining(@PathVariable Long trainingId, @RequestParam Long exerciseId) throws InstanceNotFoundException {
        exerciseService.removeExerciseToTraining(exerciseId, trainingId);
    }

    @DeleteMapping("/{gameId}/game")
    public void removeExerciseToGame(@PathVariable Long gameId, @RequestParam Long exerciseId) throws InstanceNotFoundException {
        exerciseService.removeExerciseToGame(exerciseId, gameId);
    }
}