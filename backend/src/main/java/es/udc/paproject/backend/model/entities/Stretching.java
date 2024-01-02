package es.udc.paproject.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;


@Entity
public class Stretching {
    
    private Long id;
    private String stretchingName;
    private String description;
    private StretchingType stretchingType;
    @Version
    private Integer version;
    
    public Stretching() {
    }

    public Stretching(String stretchingName, String description, StretchingType stretchingType) {
        this.stretchingName = stretchingName;
        this.description = description;
        this.stretchingType = stretchingType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStretchingName() {
        return stretchingName;
    }

    public void setStretchingName(String stretchingName) {
        this.stretchingName = stretchingName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStretchingType() {
        return stretchingType.name();
    }

    public void setStretchingType(String stretchingType) {
        this.stretchingType = StretchingType.valueOf(stretchingType);
    }
    
    @Version
    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}