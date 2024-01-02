package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlayDao extends PagingAndSortingRepository<Play, Long>{
    
    List<Play> findByPlayType(String playType);
}