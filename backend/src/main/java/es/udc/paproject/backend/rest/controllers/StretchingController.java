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

import es.udc.paproject.backend.model.entities.Stretching;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedStretchingException;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.StretchingService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.BlockDto;
import es.udc.paproject.backend.rest.dtos.StretchingDto;

import org.springframework.http.HttpStatus;
import static es.udc.paproject.backend.rest.dtos.StretchingConversor.toStretchingDto;
import static es.udc.paproject.backend.rest.dtos.StretchingConversor.toStretchingDtos;;

@RestController
@RequestMapping("/stretchings")
public class StretchingController {

    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";
    private final static String USED_STRETCHING_EXCEPTION = "project.exceptions.UsedStretchingException";

    @Autowired
    private StretchingService stretchingService;

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(InstanceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null, NOT_FOUND_EXCEPTION, locale);

        return new ErrorsDto(errorMessage);
    }

    @ExceptionHandler(UsedStretchingException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	@ResponseBody
	public ErrorsDto handleUsedStretchingException(UsedStretchingException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(USED_STRETCHING_EXCEPTION, null,
        USED_STRETCHING_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("/{stretchingId}")
    public StretchingDto findStretchingById(@PathVariable Long stretchingId) throws InstanceNotFoundException {
        return toStretchingDto(stretchingService.findStretchingById(stretchingId));
    }

    @GetMapping("")
    public List<StretchingDto> findAllStretchings() throws InstanceNotFoundException {
        return toStretchingDtos(stretchingService.findAllStretchings());
    }

    @GetMapping("/page")
    public BlockDto<StretchingDto> findAllStretchingsPage(@RequestParam(defaultValue="0") int page) throws InstanceNotFoundException {
        
        Block<Stretching> stretchingBlock = stretchingService.findAllStretchings(page, 10);

        return new BlockDto<>(toStretchingDtos(stretchingBlock.getItems()), stretchingBlock.getExistMoreItems());
    }

    @GetMapping("/{stretchingType}/stretchingType/page")
    public BlockDto<StretchingDto> findStretchingsByTypePage(@PathVariable String stretchingType, @RequestParam(defaultValue="0") int page)
            throws InstanceNotFoundException {

        Block<Stretching> stretchingBlock = stretchingService.findStretchingsByType(stretchingType, page, 10);

        return new BlockDto<>(toStretchingDtos(stretchingBlock.getItems()), stretchingBlock.getExistMoreItems());
    }

    @GetMapping("/{stretchingType}/stretchingType")
    public List<StretchingDto> findStretchingsByType(@PathVariable String stretchingType)
            throws InstanceNotFoundException {
        return toStretchingDtos(stretchingService.findStretchingsByType(stretchingType));
    }

    @GetMapping("/{playerId}/player")
    public List<StretchingDto> findStretchingsByPlayerId(@PathVariable Long playerId) throws InstanceNotFoundException {
        return toStretchingDtos(stretchingService.findStretchingsByPlayerId(playerId));
    }

    @GetMapping("/{trainingId}/training")
    public List<StretchingDto> findStretchingsByTrainingId(@PathVariable Long trainingId)
            throws InstanceNotFoundException {
        return toStretchingDtos(stretchingService.findStretchingsByTrainingId(trainingId));
    }

    @GetMapping("/{gameId}/game")
    public List<StretchingDto> findStretchingsByGameId(@PathVariable Long gameId) throws InstanceNotFoundException {
        return toStretchingDtos(stretchingService.findStretchingsByGameId(gameId));
    }

    @PostMapping("")
    public StretchingDto addStretching(@RequestParam String stretchingName, @RequestParam String description,
            @RequestParam String stretchingType) throws InstanceNotFoundException {
        return toStretchingDto(stretchingService.addStretching(stretchingName, description, stretchingType));
    }

    @PostMapping("/{playerId}/addStretchingToPlayer")
    public void addStretchingToPlayer(@PathVariable Long playerId, @RequestParam Long stretchingId)
            throws InstanceNotFoundException {
        stretchingService.addStretchingToPlayer(playerId, stretchingId);
    }

    @PostMapping("/{trainingId}/addStretchingToTraining")
    public void addStretchingToTraining(@PathVariable Long trainingId,  @RequestParam List<Long> stretchingId)
            throws InstanceNotFoundException {
        for (Long id : stretchingId) {
            stretchingService.addStretchingToTraining(trainingId, id);
        }
    }

    @PostMapping("/{gameiId}/addStretchingToGame")
    public void addStretchingToGame(@PathVariable Long gameiId, @RequestParam List<Long> stretchingId)
            throws InstanceNotFoundException {
        for (Long id : stretchingId) {
            stretchingService.addStretchingToGame(gameiId, id);
        }
    }

    @PutMapping("/{stretchingId}")
    public StretchingDto updatStretching(@PathVariable Long stretchingId, @RequestParam String stretchingName,
            @RequestParam String description, @RequestParam String stretchingType) throws InstanceNotFoundException {
        return toStretchingDto(
                stretchingService.updatStretching(stretchingId, stretchingName, description, stretchingType));
    }

    @DeleteMapping("/{stretchingId}")
    public void removeStretching(@PathVariable Long stretchingId)
            throws InstanceNotFoundException, UsedStretchingException {
        stretchingService.removeStretching(stretchingId);
    }

    @DeleteMapping("/{playerId}/player")
    public void removeStretchingToPlayer(@PathVariable Long playerId, @RequestParam Long stretchingId) throws InstanceNotFoundException {
        stretchingService.removeStretchingToPlayer(stretchingId, playerId);
    }

    @DeleteMapping("/{trainingId}/training")
    public void removeStretchingToTraining(@PathVariable Long trainingId, @RequestParam Long stretchingId) throws InstanceNotFoundException {
        stretchingService.removeStretchingToTraining(stretchingId, trainingId);
    }

    @DeleteMapping("/{gameId}/game")
    public void removeStretchingToGame(@PathVariable Long gameId, @RequestParam Long stretchingId) throws InstanceNotFoundException {
        stretchingService.removeStretchingToGame(stretchingId, gameId);
    }
}