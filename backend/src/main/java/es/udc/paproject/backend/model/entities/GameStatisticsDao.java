package es.udc.paproject.backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface GameStatisticsDao extends PagingAndSortingRepository<GameStatistics, Long> {
    
}