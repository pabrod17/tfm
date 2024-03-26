package es.udc.paproject.backend.rest.dtos;

public class TeamDto {
    
    private Long id;
    private String teamName;

    private String arenaName;

    private String ownerName;

    private String description;

    public TeamDto() {
    }

    public TeamDto(Long id, String teamName, String arenaName, String ownerName, String description) {
        this.id = id;
        this.teamName = teamName;
        this.arenaName = arenaName;
        this.ownerName = ownerName;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getArenaName() {
        return arenaName;
    }

    public void setArenaName(String arenaName) {
        this.arenaName = arenaName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}