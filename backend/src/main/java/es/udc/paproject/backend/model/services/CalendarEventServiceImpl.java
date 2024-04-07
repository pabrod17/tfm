package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CalendarEventServiceImpl implements CalendarEventService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private CalendarEventDao calendarEventDao;

    @Override
    public CalendarEvent addCalendarEvent(Long userId, String title, LocalDateTime startDate, LocalDateTime finishDate) throws InstanceNotFoundException {

        Optional<User> user = userDao.findById(userId);

        if (!user.isPresent()) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }

        return calendarEventDao.save(new CalendarEvent(title, startDate, finishDate, EventType.General, user.get()));
    }

    @Override
    public CalendarEvent findCalendarEventById(Long calendarEventId) throws InstanceNotFoundException {

        if (!calendarEventDao.existsById(calendarEventId)) {
            throw new InstanceNotFoundException("project.entities.calendarEvent");
        }

        CalendarEvent calendarEvent = calendarEventDao.findById(calendarEventId).get();

        return calendarEvent;
    }

    @Override
    public List<CalendarEvent> findCalendarEventsByUserId(Long userId) throws InstanceNotFoundException {
        Optional<User> user = userDao.findById(userId);

        List<CalendarEvent> calendarEvents = new ArrayList<>();


        if (!user.isPresent()) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }

        calendarEvents = calendarEventDao.findByUserId(userId).stream().distinct().collect(Collectors.toList());;

        return calendarEvents;
    }

    @Override
    public void removeCalendarEvent(Long calendarEventId) throws InstanceNotFoundException {
        if (!calendarEventDao.existsById(calendarEventId)) {
            throw new InstanceNotFoundException("project.entities.calendarEvent");
        }
        CalendarEvent calendarEvent = calendarEventDao.findById(calendarEventId).get();
        calendarEventDao.delete(calendarEvent);
    }

    @Override
    public CalendarEvent updateCalendarEvent(Long calendarEventId, String title, LocalDateTime startDate, LocalDateTime finishDate) throws InstanceNotFoundException {
        if (!calendarEventDao.existsById(calendarEventId)) {
            throw new InstanceNotFoundException("project.entities.calendarEvent");
        }
        CalendarEvent calendarEvent = calendarEventDao.findById(calendarEventId).get();

        if(title != null)
            calendarEvent.setTitle(title);
        if(startDate != null)
            calendarEvent.setStartDate(startDate);
        if(finishDate != null)
            calendarEvent.setFinishDate(finishDate);

        return calendarEventDao.save(calendarEvent);
    }
}
