package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GameStatistics {

    private Long id;
    private Integer totalPoints;
    private Integer durationMinutes;
    private Integer totalThreePointShots;
    private Integer totalSetShots;
    private Integer totalFreeShots;
    private Integer totalRebounds;
    private Integer totalBlockedShot;
    private Integer totalAssists;
    private Integer totalPersonalFouls;
    private Integer totalTechnicalFouls;
    private Integer totalUnsportsmanlikeFouls;

    private Integer totalPointsRival;
    private Integer totalThreePointShotsRival;
    private Integer totalSetShotsRival;
    private Integer totalFreeShotsRival;
    private Integer totalReboundsRival;
    private Integer totalBlockedShotsRival;
    private Integer totalAssistsRival;
    private Integer totalPersonalFoulsRival;
    private Integer totalTechnicalFoulsRival;
    private Integer totalUnsportsmanlikeFoulsRival;

    public GameStatistics() {
    }

    public GameStatistics(Integer totalPoints, Integer durationMinutes, Integer totalThreePointShots, Integer totalSetShots,
            Integer totalFreeShots, Integer totalRebounds, Integer totalBlockedShot, Integer totalAssists,
            Integer totalPersonalFouls, Integer totalTechnicalFouls, Integer totalUnsportsmanlikeFouls,
            Integer totalPointsRival, Integer totalThreePointShotsRival, Integer totalSetShotsRival,
            Integer totalFreeShotsRival, Integer totalReboundsRival, Integer totalBlockedShotsRival,
            Integer totalAssistsRival, Integer totalPersonalFoulsRival, Integer totalTechnicalFoulsRival,
            Integer totalUnsportsmanlikeFoulsRival) {
        this.totalPoints = totalPoints;
        this.durationMinutes = durationMinutes;
        this.totalThreePointShots = totalThreePointShots;
        this.totalSetShots = totalSetShots;
        this.totalFreeShots = totalFreeShots;
        this.totalRebounds = totalRebounds;
        this.totalBlockedShot = totalBlockedShot;
        this.totalAssists = totalAssists;
        this.totalPersonalFouls = totalPersonalFouls;
        this.totalTechnicalFouls = totalTechnicalFouls;
        this.totalUnsportsmanlikeFouls = totalUnsportsmanlikeFouls;
        this.totalPointsRival = totalPointsRival;
        this.totalThreePointShotsRival = totalThreePointShotsRival;
        this.totalSetShotsRival = totalSetShotsRival;
        this.totalFreeShotsRival = totalFreeShotsRival;
        this.totalReboundsRival = totalReboundsRival;
        this.totalBlockedShotsRival = totalBlockedShotsRival;
        this.totalAssistsRival = totalAssistsRival;
        this.totalPersonalFoulsRival = totalPersonalFoulsRival;
        this.totalTechnicalFoulsRival = totalTechnicalFoulsRival;
        this.totalUnsportsmanlikeFoulsRival = totalUnsportsmanlikeFoulsRival;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Integer getTotalThreePointShots() {
        return totalThreePointShots;
    }

    public void setTotalThreePointShots(Integer totalThreePointShots) {
        this.totalThreePointShots = totalThreePointShots;
    }

    public Integer getTotalSetShots() {
        return totalSetShots;
    }

    public void setTotalSetShots(Integer totalSetShots) {
        this.totalSetShots = totalSetShots;
    }

    public Integer getTotalFreeShots() {
        return totalFreeShots;
    }

    public void setTotalFreeShots(Integer totalFreeShots) {
        this.totalFreeShots = totalFreeShots;
    }

    public Integer getTotalRebounds() {
        return totalRebounds;
    }

    public void setTotalRebounds(Integer totalRebounds) {
        this.totalRebounds = totalRebounds;
    }

    public Integer getTotalBlockedShot() {
        return totalBlockedShot;
    }

    public void setTotalBlockedShot(Integer totalBlockedShot) {
        this.totalBlockedShot = totalBlockedShot;
    }

    public Integer getTotalAssists() {
        return totalAssists;
    }

    public void setTotalAssists(Integer totalAssists) {
        this.totalAssists = totalAssists;
    }

    public Integer getTotalPersonalFouls() {
        return totalPersonalFouls;
    }

    public void setTotalPersonalFouls(Integer totalPersonalFouls) {
        this.totalPersonalFouls = totalPersonalFouls;
    }

    public Integer getTotalTechnicalFouls() {
        return totalTechnicalFouls;
    }

    public void setTotalTechnicalFouls(Integer totalTechnicalFouls) {
        this.totalTechnicalFouls = totalTechnicalFouls;
    }

    public Integer getTotalUnsportsmanlikeFouls() {
        return totalUnsportsmanlikeFouls;
    }

    public void setTotalUnsportsmanlikeFouls(Integer totalUnsportsmanlikeFouls) {
        this.totalUnsportsmanlikeFouls = totalUnsportsmanlikeFouls;
    }

    public Integer getTotalPointsRival() {
        return totalPointsRival;
    }

    public void setTotalPointsRival(Integer totalPointsRival) {
        this.totalPointsRival = totalPointsRival;
    }

    public Integer getTotalThreePointShotsRival() {
        return totalThreePointShotsRival;
    }

    public void setTotalThreePointShotsRival(Integer totalThreePointShotsRival) {
        this.totalThreePointShotsRival = totalThreePointShotsRival;
    }

    public Integer getTotalSetShotsRival() {
        return totalSetShotsRival;
    }

    public void setTotalSetShotsRival(Integer totalSetShotsRival) {
        this.totalSetShotsRival = totalSetShotsRival;
    }

    public Integer getTotalFreeShotsRival() {
        return totalFreeShotsRival;
    }

    public void setTotalFreeShotsRival(Integer totalFreeShotsRival) {
        this.totalFreeShotsRival = totalFreeShotsRival;
    }

    public Integer getTotalReboundsRival() {
        return totalReboundsRival;
    }

    public void setTotalReboundsRival(Integer totalReboundsRival) {
        this.totalReboundsRival = totalReboundsRival;
    }

    public Integer getTotalBlockedShotsRival() {
        return totalBlockedShotsRival;
    }

    public void setTotalBlockedShotsRival(Integer totalBlockedShotsRival) {
        this.totalBlockedShotsRival = totalBlockedShotsRival;
    }

    public Integer getTotalAssistsRival() {
        return totalAssistsRival;
    }

    public void setTotalAssistsRival(Integer totalAssistsRival) {
        this.totalAssistsRival = totalAssistsRival;
    }

    public Integer getTotalPersonalFoulsRival() {
        return totalPersonalFoulsRival;
    }

    public void setTotalPersonalFoulsRival(Integer totalPersonalFoulsRival) {
        this.totalPersonalFoulsRival = totalPersonalFoulsRival;
    }

    public Integer getTotalTechnicalFoulsRival() {
        return totalTechnicalFoulsRival;
    }

    public void setTotalTechnicalFoulsRival(Integer totalTechnicalFoulsRival) {
        this.totalTechnicalFoulsRival = totalTechnicalFoulsRival;
    }

    public Integer getTotalUnsportsmanlikeFoulsRival() {
        return totalUnsportsmanlikeFoulsRival;
    }

    public void setTotalUnsportsmanlikeFoulsRival(Integer totalUnsportsmanlikeFoulsRival) {
        this.totalUnsportsmanlikeFoulsRival = totalUnsportsmanlikeFoulsRival;
    }
}