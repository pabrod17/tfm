package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayerLesionDao extends PagingAndSortingRepository<PlayerLesion, Long> {

    List<PlayerLesion> findByPlayerId(Long playerId);
}