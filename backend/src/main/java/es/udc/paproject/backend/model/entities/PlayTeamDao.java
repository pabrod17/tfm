package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayTeamDao extends PagingAndSortingRepository<PlayTeam, Long> {
    
    List<PlayTeam> findByTeamId(Long teamId);
}