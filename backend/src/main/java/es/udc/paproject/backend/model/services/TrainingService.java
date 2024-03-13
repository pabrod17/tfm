package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Training;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.exceptions.UsedTrainingException;

public interface TrainingService {
    
    //Busco un SeasonTeam con el teamId y cojo ese
    Training addTraining(Long teamId, Long seasonId, LocalDateTime trainingDate, String durationMinutes, String description, String objective) throws InstanceNotFoundException;

    void addPlayerToTraining(Long trainingId, Long playerId) throws InstanceNotFoundException;

    Training findTrainingById(Long trainingId) throws InstanceNotFoundException;

    List<Training> findTrainingsByUserId(Long userId) throws InstanceNotFoundException;

    List<Training> findTrainingsByPlayerId(Long playerId) throws InstanceNotFoundException;

    List<Training> findTrainingsByTwoDatesAndTeamIdOrSeasonId(Long userId, Long teamId, Long seasonId, LocalDateTime startDate, LocalDateTime endDate) throws StartDateAfterEndDateException, InstanceNotFoundException;

    List<Training> findTrainingsByTeamId(Long teamId) throws InstanceNotFoundException;

    List<Training> findTrainingsBySeasonId(Long seasonId) throws InstanceNotFoundException;
    //no pasar al front. Usar las dos anteriores
    List<Training> findTrainingsByTeamIdAndSeasonId(Long teamId, Long seasonId) throws InstanceNotFoundException;

    void removeTraining(Long trainingId) throws InstanceNotFoundException, UsedTrainingException;
    
    void removePlayerToTraining(Long playerId, Long trainingId) throws InstanceNotFoundException, UsedTrainingException;

    Training updateTraining(Long trainingId, LocalDateTime trainingDate, String durationMinutes, String description, String objective) throws InstanceNotFoundException;
}
