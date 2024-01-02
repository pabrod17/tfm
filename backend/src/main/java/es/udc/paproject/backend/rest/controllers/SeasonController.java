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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.SeasonDto;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonDto;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toSeasonDtos;
import static es.udc.paproject.backend.rest.dtos.SeasonConversor.toLocalDateTime;;




@RestController
@RequestMapping("/seasons")
public class SeasonController {

	private final static String STARTDATE_AFTER_ENDDATE_EXCEPTION_CODE = "project.exceptions.StartDateAfterEndDateException";
    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";

    @Autowired
	private MessageSource messageSource;

    @Autowired
    private SeasonService seasonService;

	@ExceptionHandler(StartDateAfterEndDateException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectLoginException(StartDateAfterEndDateException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(STARTDATE_AFTER_ENDDATE_EXCEPTION_CODE, null,
        STARTDATE_AFTER_ENDDATE_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}

    @ExceptionHandler(InstanceNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null,
        NOT_FOUND_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("")
    public List<SeasonDto> findAllSeasons(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toSeasonDtos(seasonService.findAllSeasons(userId));
    }

    @GetMapping("/{teamId}/team")
    public List<SeasonDto> findSeasonsToTeam(@RequestAttribute Long userId, @PathVariable Long teamId) throws InstanceNotFoundException {
        return toSeasonDtos(seasonService.findSeasonsToTeam(userId, teamId));
    }

    @GetMapping("/dates")
    public List<SeasonDto> findSeasonsBetweenTwoDates(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, 
    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate, @RequestAttribute Long userId)
            throws InstanceNotFoundException, StartDateAfterEndDateException {
        return toSeasonDtos(seasonService.findSeasonsBetweenTwoDates(userId, toLocalDateTime(startDate), toLocalDateTime(endDate)));
    }

    @GetMapping("/{id}")
    public SeasonDto findSeasonById(@RequestAttribute Long userId, @PathVariable Long id)
            throws InstanceNotFoundException {
        return toSeasonDto(seasonService.findSeasonById(userId, id));
    }

    @PostMapping("")
    public SeasonDto addSeason(@RequestAttribute Long userId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, 
    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate, @RequestParam String calendario)
            throws InstanceNotFoundException, StartDateAfterEndDateException {
        return toSeasonDto(seasonService.addSeason(userId, toLocalDateTime(startDate), toLocalDateTime(endDate), calendario));
    }

    @PutMapping("/{id}")
    public SeasonDto updateSeason(@RequestAttribute Long userId, @PathVariable Long id, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, 
    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate, @RequestParam String calendario) throws InstanceNotFoundException {
        return toSeasonDto(seasonService.updateSeason(userId, id, toLocalDateTime(startDate), toLocalDateTime(endDate), calendario));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeSeason(@RequestAttribute Long userId, @PathVariable Long id) throws InstanceNotFoundException {
        seasonService.removeSeason(userId, id);
    }
}