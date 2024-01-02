package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

@Entity
public class Lesion {
    private Long id;
    private String lesionName;
    private String description;
    private String medication;
    private LesionType lesionType;
    @Version
    private Integer version;
    
    public Lesion() {
    }

    public Lesion(String lesionName, String description, String medication, LesionType lesionType) {
        this.lesionName = lesionName;
        this.description = description;
        this.medication = medication;
        this.lesionType = lesionType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
        return lesionType.name();
    }

    public void setLesionType(String lesionType) {
        this.lesionType = LesionType.valueOf(lesionType);
    }
    
    @Version
    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}