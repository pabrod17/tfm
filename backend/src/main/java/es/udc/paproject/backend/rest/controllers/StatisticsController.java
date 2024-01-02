package es.udc.paproject.backend.rest.controllers;

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

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.StatisticsService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.GameStatisticsDto;
import es.udc.paproject.backend.rest.dtos.PlayerGameStatisticsDto;

import org.springframework.http.HttpStatus;
import static es.udc.paproject.backend.rest.dtos.GameStatisticsConversor.toGameStatisticsDto;
import static es.udc.paproject.backend.rest.dtos.PlayerGameStatisticsConversor.toPlayerGameStatisticsDto;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";
    
    @Autowired
    private StatisticsService statisticsService;

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(InstanceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null, NOT_FOUND_EXCEPTION, locale);

        return new ErrorsDto(errorMessage);
    }

    @GetMapping("/{gameStatisticsId}")
    public GameStatisticsDto findGameStatisticsById(@PathVariable Long gameStatisticsId) throws InstanceNotFoundException {
        return toGameStatisticsDto(statisticsService.findGameStatisticsById(gameStatisticsId));
    }

    @GetMapping("/{gameId}/game")
    public GameStatisticsDto findStatisticsByGame(@PathVariable Long gameId) throws InstanceNotFoundException {
        return toGameStatisticsDto(statisticsService.findStatisticsByGame(gameId));
    }

    @GetMapping("/{playerId}/playerGameStatistics")
    public PlayerGameStatisticsDto findStatisticsByPlayerAndGame(@PathVariable Long playerId, @RequestParam Long gameId) throws InstanceNotFoundException {
        return toPlayerGameStatisticsDto(statisticsService.findStatisticsByPlayerAndGame(playerId, gameId));
    }

    @PostMapping("")
    public GameStatisticsDto addStatisticsToGame(@RequestParam Long gameId,
    @RequestParam Integer totalPoints, @RequestParam Integer durationMinutes, @RequestParam Integer totalThreePointShots, @RequestParam Integer totalSetShots,
    @RequestParam Integer totalFreeShots, @RequestParam Integer totalRebounds, @RequestParam Integer totalBlockedShot, @RequestParam Integer totalAssists,
    @RequestParam Integer totalPersonalFouls, @RequestParam Integer totalTechnicalFouls, @RequestParam Integer totalUnsportsmanlikeFouls,
    @RequestParam Integer totalPointsRival, @RequestParam Integer totalThreePointShotsRival, @RequestParam Integer totalSetShotsRival,
    @RequestParam Integer totalFreeShotsRival, @RequestParam Integer totalReboundsRival, @RequestParam Integer totalBlockedShotsRival,
    @RequestParam Integer totalAssistsRival, @RequestParam Integer totalPersonalFoulsRival, @RequestParam Integer totalTechnicalFoulsRival,
    @RequestParam Integer totalUnsportsmanlikeFoulsRival)
            throws InstanceNotFoundException {
        return toGameStatisticsDto(statisticsService.addStatisticsToGame(gameId, totalPoints, durationMinutes, totalThreePointShots, totalSetShots, totalFreeShots, totalRebounds, totalBlockedShot, totalAssists, totalPersonalFouls, totalTechnicalFouls, totalUnsportsmanlikeFouls, totalPointsRival, totalThreePointShotsRival, totalSetShotsRival, totalFreeShotsRival, totalReboundsRival, totalBlockedShotsRival, totalAssistsRival, totalPersonalFoulsRival, totalTechnicalFoulsRival, totalUnsportsmanlikeFoulsRival));
    }

    @PostMapping("/{playerId}/addStatisticsToPlayerAndGame")
    public PlayerGameStatisticsDto addStatisticsToPlayerAndGame(@RequestParam Long gameId, @PathVariable Long playerId,
    @RequestParam Integer totalPoints,@RequestParam  Integer minutes,
    @RequestParam Integer threePointShots, @RequestParam Integer setShots, @RequestParam Integer freeShots, @RequestParam Integer failThreePointShots,
    @RequestParam Integer failSetShots, @RequestParam Integer failFreeShots, @RequestParam Integer rebounds, @RequestParam Integer blockedShot, @RequestParam Integer assists,
    @RequestParam Integer personalFouls, @RequestParam Integer technicalFouls, @RequestParam Integer unsportsmanlikeFouls)
            throws InstanceNotFoundException {
        return toPlayerGameStatisticsDto(statisticsService.addStatisticsToPlayerAndGame(gameId, playerId, totalPoints, minutes, threePointShots, setShots, freeShots, failThreePointShots, failSetShots, failFreeShots, rebounds, blockedShot, assists, personalFouls, technicalFouls, unsportsmanlikeFouls));
    }

    @PutMapping("/{gameId}")
    public GameStatisticsDto updateGameStatistics(@PathVariable Long gameId, @RequestParam Long gameStatisticsId,
    @RequestParam Integer totalPoints, @RequestParam Integer durationMinutes, @RequestParam Integer totalThreePointShots, @RequestParam Integer totalSetShots,
    @RequestParam Integer totalFreeShots, @RequestParam Integer totalRebounds, @RequestParam Integer totalBlockedShot, @RequestParam Integer totalAssists,
    @RequestParam Integer totalPersonalFouls, @RequestParam Integer totalTechnicalFouls, @RequestParam Integer totalUnsportsmanlikeFouls,
    @RequestParam Integer totalPointsRival, @RequestParam Integer totalThreePointShotsRival, @RequestParam Integer totalSetShotsRival,
    @RequestParam Integer totalFreeShotsRival, @RequestParam Integer totalReboundsRival, @RequestParam Integer totalBlockedShotsRival,
    @RequestParam Integer totalAssistsRival, @RequestParam Integer totalPersonalFoulsRival, @RequestParam Integer totalTechnicalFoulsRival,
    @RequestParam Integer totalUnsportsmanlikeFoulsRival)
            throws InstanceNotFoundException {
        return toGameStatisticsDto(statisticsService.updateGameStatistics(gameId, gameStatisticsId, totalPoints, durationMinutes, totalThreePointShots, totalSetShots, totalFreeShots, totalRebounds, totalBlockedShot, totalAssists, totalPersonalFouls, totalTechnicalFouls, totalUnsportsmanlikeFouls, totalPointsRival, totalThreePointShotsRival, totalSetShotsRival, totalFreeShotsRival, totalReboundsRival, totalBlockedShotsRival, totalAssistsRival, totalPersonalFoulsRival, totalTechnicalFoulsRival, totalUnsportsmanlikeFoulsRival));
    }

    @PutMapping("/{playerId}/playerGameStatistics")
    public PlayerGameStatisticsDto updatePlayerGameStatistics(@PathVariable Long playerId, @RequestParam Long gameId,
    @RequestParam Integer totalPoints,@RequestParam  Integer minutes,
    @RequestParam Integer threePointShots, @RequestParam Integer setShots, @RequestParam Integer freeShots, @RequestParam Integer failThreePointShots,
    @RequestParam Integer failSetShots, @RequestParam Integer failFreeShots, @RequestParam Integer rebounds, @RequestParam Integer blockedShot, @RequestParam Integer assists,
    @RequestParam Integer personalFouls, @RequestParam Integer technicalFouls, @RequestParam Integer unsportsmanlikeFouls)
            throws InstanceNotFoundException {
        return toPlayerGameStatisticsDto(statisticsService.updatePlayerGameStatistics(playerId, gameId, totalPoints, minutes, threePointShots, setShots, freeShots, failThreePointShots, failSetShots, failFreeShots, rebounds, blockedShot, assists, personalFouls, technicalFouls, unsportsmanlikeFouls));
    }

    @DeleteMapping("/{gameId}")
    public void removeStatisticsToGame(@PathVariable Long gameId) throws InstanceNotFoundException{
        statisticsService.removeStatisticsToGame(gameId);
    }

    @DeleteMapping("/{playerId}/playerGameStatistics")
    public void removeStatisticsToPlayerOfGame(@PathVariable Long playerId, @RequestParam Long gameId) throws InstanceNotFoundException{
        statisticsService.removeStatisticsToPlayerOfGame(playerId, gameId);
    }
}