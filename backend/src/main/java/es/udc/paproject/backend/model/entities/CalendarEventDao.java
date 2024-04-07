package es.udc.paproject.backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CalendarEventDao extends PagingAndSortingRepository<CalendarEvent, Long>  {

    List<CalendarEvent> findByUserId(Long userId);

}
