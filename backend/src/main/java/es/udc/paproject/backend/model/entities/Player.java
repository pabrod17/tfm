package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Player {

    private Long id;
    private String playerName;
    private String primaryLastName;
    private String secondLastName;
    private Position position;
    private String trends;
    private String phoneNumber;
    private String email;
    private String dni;
    private Team team;

    private Integer totalPoints;
    private Integer totalThreePointShots;
    private Integer totalSetShots;
    private Integer totalFreeShots;

    private Integer totalFailThreePointShots;
    private Integer totalfailSetShots;
    private Integer totalfailFreeShots;

    private Integer totalRebounds;
    private Integer totalBlockedShot;
    private Integer totalAssists;
    private Integer totalPersonalFouls;
    private Integer totalTechnicalFouls;
    private Integer totalUnsportsmanlikeFouls;

    private boolean injured;

    public Player() {
    }
    
    public Player(String playerName, String primaryLastName, String secondLastName, Position position,
            String trends, String phoneNumber, String email, String dni, Team team) {
        this.playerName = playerName;
        this.primaryLastName = primaryLastName;
        this.secondLastName = secondLastName;
        this.position = position;
        this.trends = trends;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dni = dni;
        this.team = team;
    }

    public Player(String playerName, String primaryLastName, String secondLastName, Position position, String trends,
            String phoneNumber, String email, String dni, Team team, Integer totalPoints, Integer totalThreePointShots,
            Integer totalSetShots, Integer totalFreeShots, Integer totalFailThreePointShots, Integer totalfailSetShots,
            Integer totalfailFreeShots, Integer totalRebounds, Integer totalBlockedShot, Integer totalAssists,
            Integer totalPersonalFouls, Integer totalTechnicalFouls, Integer totalUnsportsmanlikeFouls,
            boolean injured) {
        this.playerName = playerName;
        this.primaryLastName = primaryLastName;
        this.secondLastName = secondLastName;
        this.position = position;
        this.trends = trends;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dni = dni;
        this.team = team;
        this.totalPoints = totalPoints;
        this.totalThreePointShots = totalThreePointShots;
        this.totalSetShots = totalSetShots;
        this.totalFreeShots = totalFreeShots;
        this.totalFailThreePointShots = totalFailThreePointShots;
        this.totalfailSetShots = totalfailSetShots;
        this.totalfailFreeShots = totalfailFreeShots;
        this.totalRebounds = totalRebounds;
        this.totalBlockedShot = totalBlockedShot;
        this.totalAssists = totalAssists;
        this.totalPersonalFouls = totalPersonalFouls;
        this.totalTechnicalFouls = totalTechnicalFouls;
        this.totalUnsportsmanlikeFouls = totalUnsportsmanlikeFouls;
        this.injured = injured;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPrimaryLastName() {
        return primaryLastName;
    }

    public void setPrimaryLastName(String primaryLastName) {
        this.primaryLastName = primaryLastName;
    }

    public String getSecondLastName() {
        return secondLastName;
    }

    public void setSecondLastName(String secondLastName) {
        this.secondLastName = secondLastName;
    }

    public String getPosition() {
        return position.name();
    }

    public void setPosition(String position) {
        this.position = Position.valueOf(position);
    }

    public String getTrends() {
        return trends;
    }

    public void setTrends(String trends) {
        this.trends = trends;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name= "teamId")
    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
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

    public Integer getTotalFailThreePointShots() {
        return totalFailThreePointShots;
    }

    public void setTotalFailThreePointShots(Integer totalFailThreePointShots) {
        this.totalFailThreePointShots = totalFailThreePointShots;
    }

    public Integer getTotalfailSetShots() {
        return totalfailSetShots;
    }

    public void setTotalfailSetShots(Integer totalfailSetShots) {
        this.totalfailSetShots = totalfailSetShots;
    }

    public Integer getTotalfailFreeShots() {
        return totalfailFreeShots;
    }

    public void setTotalfailFreeShots(Integer totalfailFreeShots) {
        this.totalfailFreeShots = totalfailFreeShots;
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

    public boolean isInjured() {
        return injured;
    }

    public void setInjured(boolean injured) {
        this.injured = injured;
    }
}