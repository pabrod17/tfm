package es.udc.paproject.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Stretching;

public class StretchingConversor {

    public StretchingConversor() {
    }
    
    public final static StretchingDto toStretchingDto(Stretching stretching) {
        return new StretchingDto(stretching.getId(), stretching.getStretchingName(),
        stretching.getDescription(), stretching.getStretchingType());
    }

    public final static List<StretchingDto> toStretchingDtos(List<Stretching> stretchings) {
        return stretchings.stream().map(c -> toStretchingDto(c)).collect(Collectors.toList());
    }
}