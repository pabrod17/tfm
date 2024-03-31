package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface PlayerService {
    
    Player addPlayer(Long teamId, String playerName, String primaryLastName, String secondLastName,
    String position, String trends, String phoneNumber, String email, String dni) throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException;

    void changePlayerToTeam(Long playerId, Long teamId) throws InstanceNotFoundException;

    void clearTotalStatistics(Long playerId) throws InstanceNotFoundException;

    List<Player> findPlayersByUserId(Long userId) throws InstanceNotFoundException;

    Player findPlayerByIdOfTeam(Long playerId, Long teamId) throws InstanceNotFoundException;

    Player findPlayerByDniOfTeam(Long teamId, String dni) throws InstanceNotFoundException, IncorrectDniException;
    //FALTA EN FRONT
    List<Player> findPlayersByTraining(Long trainingId) throws InstanceNotFoundException;
    //FALTA EN FRONT
    List<Player> findPlayersByGame(Long gameId) throws InstanceNotFoundException;

    List<Player> findPlayersByCompletedNameOfTeam(Long teamId, String name, String primaryLastName, String secondLastName) throws InstanceNotFoundException;
    
    List<Player> findAPlayersOfTeam(Long teamId) throws InstanceNotFoundException;

    List<Player> findPlayersByPositionAndTeam(Long teamId, String position) throws InstanceNotFoundException;

    List<Player> findPlayersrWithLesionOfTeam(Long teamId) throws InstanceNotFoundException;

    List<Player> findPlayersWithOneTypeLesion(String typeLesion, Long teamId) throws InstanceNotFoundException;

    void removePlayer(Long teamId, Long playerId) throws InstanceNotFoundException;

    Player updatePlayer(Long teamId, Long playerId, String playerName, String primaryLastName, String secondLastName,
    String position, String trends, String phoneNumber, String email, String dni) throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException;
}