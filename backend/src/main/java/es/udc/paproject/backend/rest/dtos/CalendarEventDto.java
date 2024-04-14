package es.udc.paproject.backend.rest.dtos;

import java.util.Date;

public class CalendarEventDto {

    private Long id;

    private String title;

    private Date startDate;

    private Date finishDate;

    String eventType;

    private Long user;

    private Long gameId;

    private Long trainingId;

    public CalendarEventDto() {
    }

    public CalendarEventDto(Long id, String title, Date startDate, Date finishDate, String eventType, Long user, Long gameId, Long trainingId) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.eventType = eventType;
        this.user = user;
        this.gameId = gameId;
        this.trainingId = trainingId;
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

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public Long getTrainingId() {
        return trainingId;
    }

    public void setTrainingId(Long trainingId) {
        this.trainingId = trainingId;
    }
}
