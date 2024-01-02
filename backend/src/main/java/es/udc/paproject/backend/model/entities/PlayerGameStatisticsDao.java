package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayerGameStatisticsDao extends PagingAndSortingRepository<PlayerGameStatistics, Long> {
    
    List<PlayerGameStatistics> findByGameId(Long gameId);

    List<PlayerGameStatistics> findByPlayerId(Long playerId);

    List<PlayerGameStatistics> findByPlayerIdAndGameId(Long playerId, Long gameId);
}
