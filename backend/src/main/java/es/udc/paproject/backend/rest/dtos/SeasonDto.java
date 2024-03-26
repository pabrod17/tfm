package es.udc.paproject.backend.rest.dtos;

import java.util.Date;

public class SeasonDto {
    
    private Long id;
    private Date startDate;
    private Date endDate;
    private String seasonName;

    private String description;

    public SeasonDto() {
    }

    public SeasonDto(Long id, Date startDate, Date endDate, String seasonName, String description) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.seasonName = seasonName;
        this.description = description;
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

    public String getSeasonName() {
        return seasonName;
    }

    public void setSeasonName(String seasonName) {
        this.seasonName = seasonName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}