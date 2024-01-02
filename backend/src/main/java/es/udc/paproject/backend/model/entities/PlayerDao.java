package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayerDao extends PagingAndSortingRepository<Player, Long>{

    List<Player> findByTeamId(Long teamId);

    List<Player> findByTeamIdAndPosition(Long teamId, String position);
    
}