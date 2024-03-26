package es.udc.paproject.backend.rest.dtos;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Season;

public class SeasonConversor {

    public SeasonConversor() {
    }

    public final static SeasonDto toSeasonDto(Season season) {
      return new SeasonDto(season.getId(), toDate(season.getStartDate()), toDate(season.getEndDate()),
      season.getSeasonName(), season.getDescription());
    }

    public final static List<SeasonDto> toSeasonDtos(List<Season> seasons) {
      return seasons.stream().map(c -> toSeasonDto(c)).collect(Collectors.toList());
    }

    public final static Date toDate(LocalDateTime localDateTime) {
      Date date = Date.from( localDateTime.atZone( ZoneId.systemDefault()).toInstant());
      return date;
    }

    public final static LocalDateTime toLocalDateTime(Date date) {
      LocalDateTime localDateTime = Instant.ofEpochMilli( date.getTime()).atZone( ZoneId.systemDefault()).toLocalDateTime();      
      return localDateTime;
    }

    public final static Season toSeason(SeasonDto seasonDto){
      return new Season(toLocalDateTime(seasonDto.getStartDate()), toLocalDateTime(seasonDto.getEndDate()), seasonDto.getSeasonName(), seasonDto.getDescription());
    }

    public final static Season toSeasonUpdate(SeasonDto seasonDto){
      Season season = new Season(toLocalDateTime(seasonDto.getStartDate()), toLocalDateTime(seasonDto.getEndDate()), seasonDto.getSeasonName(), seasonDto.getDescription());
      season.setId(seasonDto.getId());
      return season;
    }
}