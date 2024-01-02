package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface GameExerciseDao extends PagingAndSortingRepository<GameExercise, Long> {
    
    List<GameExercise> findByGameId(Long gameId);
}