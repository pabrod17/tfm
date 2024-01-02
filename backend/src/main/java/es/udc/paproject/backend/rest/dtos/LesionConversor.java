package es.udc.paproject.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Lesion;

public class LesionConversor {

    public LesionConversor() {
    }
    
    public final static LesionDto toLesionDto(Lesion lesion) {
        return new LesionDto(lesion.getId(), lesion.getLesionName(), lesion.getDescription(),
        lesion.getMedication(), lesion.getLesionType());
    }

    public final static List<LesionDto> toLesionDtos(List<Lesion> lesions) {
        return lesions.stream().map(c -> toLesionDto(c)).collect(Collectors.toList());
    }
}