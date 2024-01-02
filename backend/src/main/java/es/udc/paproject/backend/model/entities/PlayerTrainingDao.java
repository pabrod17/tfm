package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayerTrainingDao extends PagingAndSortingRepository<PlayerTraining, Long> {
    
    List<PlayerTraining> findByTrainingId(Long trainingId);

    List<PlayerTraining> findByPlayerId(Long playerId);

}