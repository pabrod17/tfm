package es.udc.paproject.backend.rest.dtos;

public class StretchingDto {
    
    private Long id;
    private String stretchingName;
    private String description;
    private String stretchingType;

    public StretchingDto() {
    }

    public StretchingDto(Long id, String stretchingName, String description, String stretchingType) {
        this.id = id;
        this.stretchingName = stretchingName;
        this.description = description;
        this.stretchingType = stretchingType;
    }

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
        return stretchingType;
    }

    public void setStretchingType(String stretchingType) {
        this.stretchingType = stretchingType;
    }
}