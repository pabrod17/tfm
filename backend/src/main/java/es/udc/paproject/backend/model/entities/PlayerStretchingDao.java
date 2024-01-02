package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayerStretchingDao extends PagingAndSortingRepository<PlayerStretching, Long> {
    
    List<PlayerStretching> findByPlayerId(Long playerId);
}