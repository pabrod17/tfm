package es.udc.paproject.backend.rest.dtos;

import java.util.Date;

public class NoteDto {
    
    private Long id;
    private String title;
    private String description;
    private Date noteDate;
    private Long playerId;

    public NoteDto() {
    }

    public NoteDto(Long id, String title, String description, Date noteDate, Long playerId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.noteDate = noteDate;
        this.playerId = playerId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getNoteDate() {
        return noteDate;
    }

    public void setNoteDate(Date noteDate) {
        this.noteDate = noteDate;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }
}