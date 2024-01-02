package es.udc.paproject.backend.rest.dtos;

public class PlayerGameStatisticsDto {
    
    private Long id;
    private Integer totalPoints;
    private Integer minutes;
    private Integer threePointShots;
    private Integer setShots;
    private Integer freeShots;

    private Integer failThreePointShots;
    private Integer failSetShots;
    private Integer failFreeShots;

    private Integer rebounds;
    private Integer blockedShot;
    private Integer assists;
    private Integer personalFouls;
    private Integer technicalFouls;
    private Integer unsportsmanlikeFouls;

    public PlayerGameStatisticsDto() {
    }

    public PlayerGameStatisticsDto(Long id, Integer totalPoints, Integer minutes, Integer threePointShots,
            Integer setShots, Integer freeShots, Integer failThreePointShots, Integer failSetShots,
            Integer failFreeShots, Integer rebounds, Integer blockedShot, Integer assists, Integer personalFouls,
            Integer technicalFouls, Integer unsportsmanlikeFouls) {
        this.id = id;
        this.totalPoints = totalPoints;
        this.minutes = minutes;
        this.threePointShots = threePointShots;
        this.setShots = setShots;
        this.freeShots = freeShots;
        this.failThreePointShots = failThreePointShots;
        this.failSetShots = failSetShots;
        this.failFreeShots = failFreeShots;
        this.rebounds = rebounds;
        this.blockedShot = blockedShot;
        this.assists = assists;
        this.personalFouls = personalFouls;
        this.technicalFouls = technicalFouls;
        this.unsportsmanlikeFouls = unsportsmanlikeFouls;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }

    public Integer getThreePointShots() {
        return threePointShots;
    }

    public void setThreePointShots(Integer threePointShots) {
        this.threePointShots = threePointShots;
    }

    public Integer getSetShots() {
        return setShots;
    }

    public void setSetShots(Integer setShots) {
        this.setShots = setShots;
    }

    public Integer getFreeShots() {
        return freeShots;
    }

    public void setFreeShots(Integer freeShots) {
        this.freeShots = freeShots;
    }

    public Integer getFailThreePointShots() {
        return failThreePointShots;
    }

    public void setFailThreePointShots(Integer failThreePointShots) {
        this.failThreePointShots = failThreePointShots;
    }

    public Integer getFailSetShots() {
        return failSetShots;
    }

    public void setFailSetShots(Integer failSetShots) {
        this.failSetShots = failSetShots;
    }

    public Integer getFailFreeShots() {
        return failFreeShots;
    }

    public void setFailFreeShots(Integer failFreeShots) {
        this.failFreeShots = failFreeShots;
    }

    public Integer getRebounds() {
        return rebounds;
    }

    public void setRebounds(Integer rebounds) {
        this.rebounds = rebounds;
    }

    public Integer getBlockedShot() {
        return blockedShot;
    }

    public void setBlockedShot(Integer blockedShot) {
        this.blockedShot = blockedShot;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public Integer getPersonalFouls() {
        return personalFouls;
    }

    public void setPersonalFouls(Integer personalFouls) {
        this.personalFouls = personalFouls;
    }

    public Integer getTechnicalFouls() {
        return technicalFouls;
    }

    public void setTechnicalFouls(Integer technicalFouls) {
        this.technicalFouls = technicalFouls;
    }

    public Integer getUnsportsmanlikeFouls() {
        return unsportsmanlikeFouls;
    }

    public void setUnsportsmanlikeFouls(Integer unsportsmanlikeFouls) {
        this.unsportsmanlikeFouls = unsportsmanlikeFouls;
    }
}