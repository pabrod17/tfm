package es.udc.paproject.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Play;

public class PlayConversor {

    public PlayConversor() {
    }

    public final static PlayDto toPlayDto(Play play) {
        return new PlayDto(play.getId(), play.getTitle(), play.getPlayType(),
        play.getGesture(), play.getPointGuardText(), play.getShootingGuardText(),
        play.getSmallForwardText(), play.getPowerForwardText(), play.getCenterText());
    }

    public final static List<PlayDto> toPlayDtos(List<Play> plays) {
        return plays.stream().map(c -> toPlayDto(c)).collect(Collectors.toList());
    }
}