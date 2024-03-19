package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Game;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class GameConversor {

    public GameConversor() {
    }
    
    public final static GameDto toGameDto(Game game) {
        return new GameDto(game.getId(),toDate(game.getGameDate()), game.getRival(),
        game.getSeasonTeam().getId(), game.getDescription());
    }

    public final static List<GameDto> toGameDtos(List<Game> games) {
        return games.stream().map(c -> toGameDto(c)).collect(Collectors.toList());
    }

    public final static Date toDate(LocalDateTime localDateTime) {
        Date date = Date.from( localDateTime.atZone( ZoneId.systemDefault()).toInstant());
        return date;
    }

    public final static LocalDateTime toLocalDateTime(Date date) {
        LocalDateTime localDateTime = Instant.ofEpochMilli( date.getTime()).atZone( ZoneId.systemDefault()).toLocalDateTime();      
        return localDateTime;
    }
}