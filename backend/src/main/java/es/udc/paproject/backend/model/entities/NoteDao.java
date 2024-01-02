package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface NoteDao extends PagingAndSortingRepository<Note, Long> {
    
    List<Note> findByPlayerId(Long playerId);

}