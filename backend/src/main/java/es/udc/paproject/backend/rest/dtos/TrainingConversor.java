package es.udc.paproject.backend.rest.dtos;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Training;

public class TrainingConversor {
    
    public TrainingConversor() {
    }

    public final static TrainingDto toTrainingDto(Training training) {
        return new TrainingDto(training.getId(), toDate(training.getTrainingDate()), training.getDurationMinutes(),
        training.getDescription(), training.getObjective(), training.getSeasonTeam().getId());
    }

    public final static List<TrainingDto> toTrainingDtos(List<Training> trainings) {
        return trainings.stream().map(c -> toTrainingDto(c)).collect(Collectors.toList());
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