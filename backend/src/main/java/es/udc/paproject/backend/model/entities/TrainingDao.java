package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface TrainingDao extends PagingAndSortingRepository<Training, Long> {
    
    List<Training> findBySeasonTeamId(Long seasonTeamId);
}