package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Lesion;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedLesionException;

public interface LesionService {
    
    Lesion addLesion(String lesionName, String description, String medication, String lesionType) throws InstanceNotFoundException;

    void addLesionToPlayer(Long playerId, Long lesionId) throws InstanceNotFoundException;

    Lesion findLesionById(Long lesionId) throws InstanceNotFoundException;

    Block<Lesion> findAllLesion(int page, int size) throws InstanceNotFoundException;

    List<Lesion> findAllLesion() throws InstanceNotFoundException;

    Block<Lesion> findLesionByType(String lesionType, int page, int size) throws InstanceNotFoundException;

    List<Lesion> findLesionByType(String lesionType) throws InstanceNotFoundException;

    List<Lesion> findLesionByPlayer(Long playerId) throws InstanceNotFoundException;

    void removeLesion(Long lesionId) throws InstanceNotFoundException, UsedLesionException;

    void removeLesionToPlayer(Long playerId, Long lesionId) throws InstanceNotFoundException;

    Lesion updateLesion(Long lesionId, String lesionName, String description, String medication, String lesionType) throws InstanceNotFoundException;
}