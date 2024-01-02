package es.udc.paproject.backend.model.entities;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface TeamDao extends PagingAndSortingRepository<Team, Long>{

    Optional<Team> findByTeamName(String teamName);
    
    boolean existsByTeamName(String teamName);

}