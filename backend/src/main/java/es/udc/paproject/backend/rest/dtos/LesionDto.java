package es.udc.paproject.backend.rest.dtos;

public class LesionDto {

    private Long id;
    private String lesionName;
    private String description;
    private String medication;
    private String lesionType;

    public LesionDto() {
    }

    public LesionDto(Long id, String lesionName, String description, String medication, String lesionType) {
        this.id = id;
        this.lesionName = lesionName;
        this.description = description;
        this.medication = medication;
        this.lesionType = lesionType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLesionName() {
        return lesionName;
    }

    public void setLesionName(String lesionName) {
        this.lesionName = lesionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public String getLesionType() {
        return lesionType;
    }

    public void setLesionType(String lesionType) {
        this.lesionType = lesionType;
    }
}