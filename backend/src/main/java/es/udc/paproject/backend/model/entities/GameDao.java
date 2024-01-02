package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface GameDao extends PagingAndSortingRepository<Game, Long> {

    List<Game> findBySeasonTeamId(Long seasonTeamId);
}