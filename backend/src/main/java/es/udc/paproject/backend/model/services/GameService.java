package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;

public interface GameService {
    
    Game addGame(Long teamId, Long seasonId, LocalDateTime gameDate, String rival, String description) throws InstanceNotFoundException;

    //solo añado el obj jugador y el partido a la tabla playerGame
    void addPlayerToGame(Long gameId, Long playerId) throws InstanceNotFoundException;

    Game findGameById(Long gameId) throws InstanceNotFoundException;

    List<Game> findGamesByPlayerId(Long playerId) throws InstanceNotFoundException;
    
    List<Game> findGamesByUserId(Long userId) throws InstanceNotFoundException;

    List<Game> findGamesByTwoDatesAndTeamIdOrSeasonId(Long userId, Long teamId, Long seasonId, LocalDateTime startDate, LocalDateTime endDate) throws StartDateAfterEndDateException, InstanceNotFoundException;

    List<Game> findGamesByTeamId(Long teamId) throws InstanceNotFoundException;

    List<Game> findGamesBySeasonId(Long seasonId) throws InstanceNotFoundException;

    //no pasar al front. Usar las dos anteriores
    List<Game> findGamesByTeamIdAndSeasonId(Long teamId, Long seasonId) throws InstanceNotFoundException;

    void removeGame(Long gameId) throws InstanceNotFoundException;

    void removePlayerToGame(Long playerId, Long gameId) throws InstanceNotFoundException;

    Game updateGame(Long gameId, LocalDateTime gameDate, String rival, String description) throws InstanceNotFoundException;
}