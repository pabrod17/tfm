package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface TrainingStretchingDao extends PagingAndSortingRepository<TrainingStretching, Long> {
    
    List<TrainingStretching> findByTrainingId(Long trainingId);

}