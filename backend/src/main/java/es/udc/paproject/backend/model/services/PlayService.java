package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Play;
import es.udc.paproject.backend.model.exceptions.IncorrectPlayTypeException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedPlayException;

public interface PlayService {
    
    Play addPlay(Long teamId, String title, String playType, String gesture, String pointGuardText, String shootingGuardText,
    String smallForwardText, String powerForwardText, String centerText) throws IncorrectPlayTypeException, InstanceNotFoundException;

    void addPlayToTeam(Long teamId, Long playId) throws InstanceNotFoundException, UsedPlayException;

    Play findPlayById(Long playId) throws InstanceNotFoundException;

    List<Play> findPlaysByUserId(Long userId) throws InstanceNotFoundException;

    List<Play> findPlaysByTeamId(Long teamId) throws InstanceNotFoundException;

    List<Play> findPlaysByTypeAndTeam(Long teamId, String playType) throws InstanceNotFoundException, IncorrectPlayTypeException;

    void removePlayToTeam(Long playId, Long teamId) throws InstanceNotFoundException;

    Play updatePlay(Long playId, String title, String playType, String gesture, String pointGuardText, String shootingGuardText,
    String smallForwardText, String powerForwardText, String centerText) throws InstanceNotFoundException, IncorrectPlayTypeException;
}