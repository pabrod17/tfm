package es.udc.paproject.backend.rest.dtos;

import java.util.Date;

public class SeasonDto {
    
    private Long id;
    private Date startDate;
    private Date endDate;
    private String calendario;

    public SeasonDto() {
    }

    public SeasonDto(Long id, Date startDate, Date endDate, String calendario) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.calendario = calendario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getCalendario() {
        return calendario;
    }

    public void setCalendario(String calendario) {
        this.calendario = calendario;
    }
}