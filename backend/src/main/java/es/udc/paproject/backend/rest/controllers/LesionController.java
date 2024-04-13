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

import es.udc.paproject.backend.model.entities.Lesion;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedLesionException;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.LesionService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.BlockDto;
import es.udc.paproject.backend.rest.dtos.LesionDto;

import org.springframework.http.HttpStatus;
import static es.udc.paproject.backend.rest.dtos.LesionConversor.toLesionDto;
import static es.udc.paproject.backend.rest.dtos.LesionConversor.toLesionDtos;

@RestController
@RequestMapping("/lesion")
public class LesionController {
    
    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";
    private final static String USED_LESION_EXCEPTION = "project.exceptions.UsedLesionException";

    @Autowired
    private LesionService lesionService;

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

    @ExceptionHandler(UsedLesionException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	@ResponseBody
	public ErrorsDto handleUsedLesionException(UsedLesionException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(USED_LESION_EXCEPTION, null,
        USED_LESION_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("/{lesionId}")
    public LesionDto findLesionById(@PathVariable Long lesionId) throws InstanceNotFoundException {
        return toLesionDto(lesionService.findLesionById(lesionId));
    }

    @GetMapping("/page")
    public BlockDto<LesionDto> findAllLesionPage(@RequestParam(defaultValue="0") int page) throws InstanceNotFoundException {

        Block<Lesion> lesionBlock = lesionService.findAllLesion(page, 10);
        System.out.println("HOLA --> " + lesionBlock.getItems().size());
        return new BlockDto<>(toLesionDtos(lesionBlock.getItems()), lesionBlock.getExistMoreItems());
    }

    @GetMapping("")
    public List<LesionDto> findAllLesion() throws InstanceNotFoundException {

        return toLesionDtos(lesionService.findAllLesion());
    }

    @GetMapping("/{lesionType}/typeLesion")
    public List<LesionDto> findLesionByType(@PathVariable String lesionType) throws InstanceNotFoundException {

        return toLesionDtos(lesionService.findLesionByType(lesionType));
    }

    @GetMapping("/{lesionType}/typeLesion/page")
    public BlockDto<LesionDto> findLesionByTypePage(@PathVariable String lesionType, @RequestParam(defaultValue="0") int page) throws InstanceNotFoundException {

        Block<Lesion> lesionBlock = lesionService.findLesionByType(lesionType, page, 10);

        return new BlockDto<>(toLesionDtos(lesionBlock.getItems()), lesionBlock.getExistMoreItems());
    }

    @GetMapping("/{playerId}/player")
    public List<LesionDto> findLesionByPlayer(@PathVariable Long playerId) throws InstanceNotFoundException {
        return toLesionDtos(lesionService.findLesionByPlayer(playerId));
    }

    @PostMapping("")
    public LesionDto addLesion(@RequestParam String lesionName, @RequestParam String description, @RequestParam String medication, @RequestParam String lesionType)
            throws InstanceNotFoundException {
        return toLesionDto(lesionService.addLesion(lesionName, description, medication, lesionType));
    }

    @PostMapping("/{playerId}/addLesionToPlayer")
    public void addLesionToPlayer(@PathVariable Long playerId, @RequestParam List<Long> lesionId)
            throws InstanceNotFoundException {
        for (Long id : lesionId) {
            lesionService.addLesionToPlayer(playerId, id);
        }
    }

    @PutMapping("/{lesionId}")
    public LesionDto updateLesion(@PathVariable Long lesionId, @RequestParam String lesionName, @RequestParam String description, @RequestParam String medication, @RequestParam String lesionType)
            throws InstanceNotFoundException {
        return toLesionDto(lesionService.updateLesion(lesionId, lesionName, description, medication, lesionType));
    }

    @DeleteMapping("/{lesionId}")
    public void removeLesion(@PathVariable Long lesionId) throws InstanceNotFoundException, UsedLesionException {
        lesionService.removeLesion(lesionId);
    }

    @DeleteMapping("/{playerId}/player")
    public void removeLesionToPlayer(@PathVariable Long playerId, @RequestParam Long lesionId) throws InstanceNotFoundException, UsedLesionException {
        lesionService.removeLesionToPlayer(playerId, lesionId);
    }
}