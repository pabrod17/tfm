package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface TrainingExerciseDao extends PagingAndSortingRepository<TrainingExercise, Long> {
    
    List<TrainingExercise> findByTrainingId(Long trainingId);
}