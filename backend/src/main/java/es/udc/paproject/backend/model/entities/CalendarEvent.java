package es.udc.paproject.backend.model.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class CalendarEvent {

    private Long id;
    private String title;

    private LocalDateTime startDate;

    private LocalDateTime finishDate;

    private EventType eventType;

    private User user;

    public CalendarEvent() {
    }

    public CalendarEvent(String title, LocalDateTime startDate, LocalDateTime finishDate, EventType eventType, User user) {
        this.title = title;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.eventType = eventType;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(LocalDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public String getEventType() {
        return eventType.name();
    }

    public void setEventType(String eventType) {
        this.eventType = EventType.valueOf(eventType);
    }

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name= "userId", nullable = true)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
