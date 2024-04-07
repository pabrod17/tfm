package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.User;

import java.time.LocalDateTime;
import java.util.Date;

public class CalendarEventDato {

    private Long id;

    private String title;

    private Date startDate;

    private Date finishDate;

    private Long user;

    public CalendarEventDato() {
    }

    public CalendarEventDato(Long id, String title, Date startDate, Date finishDate, Long user) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.user = user;
    }

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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }
}
