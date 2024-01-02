package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Stretching;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedStretchingException;

public interface StretchingService {
    
    Stretching addStretching(String stretchingName, String description, String stretchingType) throws InstanceNotFoundException;

    void addStretchingToPlayer(Long playerId, Long stretchingId) throws InstanceNotFoundException;

    void addStretchingToTraining(Long trainingId, Long stretchingId) throws InstanceNotFoundException;

    void addStretchingToGame(Long gameiId, Long stretchingId) throws InstanceNotFoundException;

    Stretching findStretchingById(Long stretchingId) throws InstanceNotFoundException;

    List<Stretching> findAllStretchings() throws InstanceNotFoundException;

    Block<Stretching> findAllStretchings(int page, int size) throws InstanceNotFoundException;

    Block<Stretching> findStretchingsByType(String stretchingType, int page, int size) throws InstanceNotFoundException;

    List<Stretching> findStretchingsByType(String stretchingType) throws InstanceNotFoundException;

    List<Stretching> findStretchingsByPlayerId(Long playerId) throws InstanceNotFoundException;

    List<Stretching> findStretchingsByTrainingId(Long trainingId) throws InstanceNotFoundException;

    List<Stretching> findStretchingsByGameId(Long gameId) throws InstanceNotFoundException;

    void removeStretching(Long stretchingId) throws InstanceNotFoundException, UsedStretchingException;

    void removeStretchingToPlayer(Long stretchingId, Long playerId) throws InstanceNotFoundException;

    void removeStretchingToTraining(Long stretchingId, Long trainingId) throws InstanceNotFoundException;

    void removeStretchingToGame(Long stretchingId, Long gameId) throws InstanceNotFoundException;

    Stretching updatStretching(Long stretchingId, String stretchingName, String description, String stretchingType) throws InstanceNotFoundException;
}