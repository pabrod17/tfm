package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface GameStretchingDao extends PagingAndSortingRepository<GameStretching, Long> {
    
    List<GameStretching> findByGameId(Long gameId);
}