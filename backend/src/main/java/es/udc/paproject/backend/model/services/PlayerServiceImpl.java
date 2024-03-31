package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.util.*;

@Service
@Transactional
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private PlayerDao playerDao;

    @Autowired
    private TrainingDao trainingDao;

    @Autowired
    private PlayerTrainingDao playerTrainingDao;

    @Autowired
    private GameDao gameDao;

    @Autowired
    private PlayerGameStatisticsDao playerGameStatisticsDao;

    @Autowired
    private PlayerLesionDao playerLesionDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Override
    public Player addPlayer(Long teamId, String playerName, String primaryLastName, String secondLastName,
            String position, String trends, String phoneNumber, String email, String dni)
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!Validations.isValidDni(dni)) {
            throw new IncorrectDniException(dni);
        }
        if (!Validations.isValidEmail(email)) {
            throw new IncorrectEmailException(email);
        }
        if (!Validations.isValidPhoneNumber(phoneNumber)) {
            throw new IncorrectPhoneNumberException(phoneNumber);
        }
        if (!position.equals("Base") && !position.equals("Escolta") && !position.equals("Alero")
                && !position.equals("AlaPivot") && !position.equals("Pivot")) {
            throw new InstanceNotFoundException("project.entities.Position");
        }

        Optional<Team> team = teamDao.findById(teamId);
        Position positionEnum = Position.valueOf(position); // paso string a enum

        Player player = new Player(playerName, primaryLastName, secondLastName, positionEnum, trends, phoneNumber,
                email, dni, team.get(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        playerDao.save(player);
        return player;
    }

    @Override
    public void changePlayerToTeam(Long playerId, Long teamId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        Player player = playerDao.findById(playerId).get();

        if (teamId != playerDao.findById(playerId).get().getTeam().getId()) {
            player.setTeam(teamDao.findById(teamId).get());
        }
        playerDao.save(player);
    }

    @Override
    public void clearTotalStatistics(Long playerId) throws InstanceNotFoundException {
        
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        Player player = playerDao.findById(playerId).get();
        player.setTotalPoints(0);
        player.setTotalThreePointShots(0);
        player.setTotalSetShots(0);
        player.setTotalFreeShots(0);

        player.setTotalFailThreePointShots(0);
        player.setTotalfailSetShots(0);
        player.setTotalfailFreeShots(0);

        player.setTotalRebounds(0);
        player.setTotalBlockedShot(0);
        player.setTotalAssists(0);
        player.setTotalPersonalFouls(0);
        player.setTotalTechnicalFouls(0);
        player.setTotalUnsportsmanlikeFouls(0);

        playerDao.save(player);
        System.out.println("HOLA --> " + player.getTotalAssists());
    }

    @Override
    public List<Player> findAPlayersOfTeam(Long teamId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        List<Player> players = playerDao.findByTeamId(teamId);

        if (players.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        return players;
    }

    @Override
    public List<Player> findPlayersByUserId(Long userId) throws InstanceNotFoundException {

        if (!userDao.existsById(userId)) {
            throw new InstanceNotFoundException("project.entities.user");
        }

        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(userId);

        List<Player> players = new ArrayList<>();
        List<Player> players2 = new ArrayList<>();

        for(SeasonTeam seasonTeam : seasonTeams){
            if(seasonTeam.getTeam() != null) {
                players2 = playerDao.findByTeamId(seasonTeam.getTeam().getId());
                for(Player player : players2){
                    players.add(player);
                }
            }
        }

        if (players.isEmpty()) {
            return players;
        }

        players = players.stream().distinct().collect(Collectors.toList());
        return players;
    }

    @Override//Function de apoyo
    public Player findPlayerByIdOfTeam(Long playerId, Long teamId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        Player playerResult = null;
        List<Player> players = playerDao.findByTeamId(teamId);
        for (Player player : players) {
            if(player.getId() == playerId){
                playerResult = player;
            }
        }

        if(playerResult == null){
            throw new InstanceNotFoundException("project.entities.player");
        }

        return playerResult;
    }

    @Override
    public List<Player> findPlayersByCompletedNameOfTeam(Long teamId, String name, String primaryLastName,
            String secondLastName) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        List<Player> playersResult = new ArrayList<>();
        List<Player> players = playerDao.findByTeamId(teamId);

        for (Player player : players) {

            if (!name.isEmpty() && !primaryLastName.isEmpty() && !secondLastName.isEmpty()) {
                if (player.getPlayerName().equals(name) && player.getPrimaryLastName().equals(primaryLastName)
                        && player.getSecondLastName().equals(secondLastName)) {
                    playersResult.add(player);
                }
                continue;
            }

            if (name.isEmpty()) {
                if (!primaryLastName.isEmpty()) {
                    if (!secondLastName.isEmpty()) {
                        if (player.getPrimaryLastName().equals(primaryLastName)
                                && player.getSecondLastName().equals(secondLastName)) {
                            playersResult.add(player);
                            continue;
                        }
                    } else {
                        if (player.getPrimaryLastName().equals(primaryLastName)) {
                            playersResult.add(player);
                            continue;
                        }
                    }
                } else {
                    if (player.getSecondLastName().equals(secondLastName)) {
                        playersResult.add(player);
                        continue;
                    }
                }
            } else {
                if (!primaryLastName.isEmpty()) {
                    if (!secondLastName.isEmpty()) {
                        if (player.getPrimaryLastName().equals(primaryLastName)
                                && player.getSecondLastName().equals(secondLastName)
                                && player.getPlayerName().equals(name)) {
                            playersResult.add(player);
                            continue;
                        }
                    } else {
                        if (player.getPrimaryLastName().equals(primaryLastName)
                                && player.getPlayerName().equals(name)) {
                            playersResult.add(player);
                            continue;
                        }
                    }
                } else {
                    if (!secondLastName.isEmpty()) {
                        if (player.getSecondLastName().equals(secondLastName) && player.getPlayerName().equals(name)) {
                            playersResult.add(player);
                            continue;
                        }
                    } else {
                        if (player.getPlayerName().equals(name)) {
                            playersResult.add(player);
                            continue;
                        }
                    }
                }
            }
        }

        if(playersResult.isEmpty()){
            throw new InstanceNotFoundException("project.entities.player");
        }

        return playersResult;
    }

    @Override
    public Player findPlayerByDniOfTeam(Long teamId, String dni) throws InstanceNotFoundException, IncorrectDniException {

        if (!Validations.isValidDni(dni)) {
            throw new IncorrectDniException(dni);
        }

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        Player playerFound = null;
        List<Player> players = playerDao.findByTeamId(teamId);

        for (Player player : players) {
            if (player.getDni().equals(dni)) {
                playerFound = player;
            }
        }

        if (playerFound == null) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        return playerFound;
    }

    @Override
    public List<Player> findPlayersByTraining(Long trainingId) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }
        List<Player> players = new ArrayList<>();

        List<PlayerTraining> playerTrainings =playerTrainingDao.findByTrainingId(trainingId);
        for (PlayerTraining playerTraining : playerTrainings) {
            if (playerTraining.getPlayer() != null) {
                players.add(playerTraining.getPlayer());
            }
        }

        if (players.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        return players;
    }

    @Override
    public List<Player> findPlayersByGame(Long gameId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        List<Player> players = new ArrayList<>();
        List<PlayerGameStatistics> playerGameStatistics =playerGameStatisticsDao.findByGameId(gameId);
        for (PlayerGameStatistics playerGameStatistic : playerGameStatistics) {
            if (playerGameStatistic.getPlayer() != null) {
                players.add(playerGameStatistic.getPlayer());
            }
        }

        if (players.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        return players;
    }

    @Override
    public List<Player> findPlayersByPositionAndTeam(Long teamId, String position) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!position.equals("Base") && !position.equals("Escolta") && !position.equals("Alero")
                && !position.equals("AlaPivot") && !position.equals("Pivot")) {
            throw new InstanceNotFoundException("project.entities.Position");
        }
        //Position positionEnum = Position.valueOf(position); //paso string a enum
        List<Player> players = playerDao.findByTeamIdAndPosition(teamId, position);

        if (players.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        return players;
    }

    @Override
    public List<Player> findPlayersrWithLesionOfTeam(Long teamId) throws InstanceNotFoundException {
        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        List<Player> playersResult = new ArrayList<>();
        List<Player> players = playerDao.findByTeamId(teamId);
        if (players.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        List<PlayerLesion> playersWithLesion = (List<PlayerLesion>) playerLesionDao.findAll();
        if (playersWithLesion.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        for (Player player : players) {
            for (PlayerLesion playerLesion : playersWithLesion) {
                if(playerLesion.getPlayer() != null && player.getId() == playerLesion.getPlayer().getId()){
                    playersResult.add(player);
                }
            }
        }

        if (playersResult.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        playersResult = playersResult.stream().distinct().collect(Collectors.toList());
        return playersResult;
    }

    @Override
    public List<Player> findPlayersWithOneTypeLesion(String typeLesion, Long teamId) throws InstanceNotFoundException {
        
        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        if (!typeLesion.equals("Muscular") && !typeLesion.equals("Tendinosa") && !typeLesion.equals("Articular")
        && !typeLesion.equals("ColumnaVertebral") && !typeLesion.equals("Psicologica")) {
            throw new InstanceNotFoundException("project.entities.LesionType");
        }
        // LesionType typeLesionEnum = LesionType.valueOf(typeLesion);
        List<Player> playersResult = new ArrayList<>();
        List<Player> players = playerDao.findByTeamId(teamId);

        if (players.isEmpty()) {
            System.out.println("HOLA1");
            throw new InstanceNotFoundException("project.entities.player");
        }
        List<PlayerLesion> playersWithLesion = (List<PlayerLesion>) playerLesionDao.findAll();
        if (playersWithLesion.isEmpty()) {
            System.out.println("HOLA2");

            throw new InstanceNotFoundException("project.entities.player");
        }
        
        
        for (Player player : players) {
            for (PlayerLesion playerLesion : playersWithLesion) {
                System.out.println("PROBANDO---" + player.getId() + " ---- " + playerLesion.getPlayer().getId() + "------" + playerLesion.getLesion().getLesionType());

                if (player.getId() == playerLesion.getPlayer().getId() && playerLesion.getLesion().getLesionType().equals(typeLesion)){
                    System.out.println("PROBANDO" + typeLesion);

                    playersResult.add(player);
                }
            }
        }

        if (playersResult.isEmpty()) {
            System.out.println("HOLA3" + typeLesion);

            throw new InstanceNotFoundException("project.entities.player");
        }

        playersResult = playersResult.stream().distinct().collect(Collectors.toList());
        return playersResult;
    }
    
    @Override
    public void removePlayer(Long teamId, Long playerId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        //No busco dentro de los player de team porque el player que actualizara ya estara dentro del team del usuario
        Player player = playerDao.findById(playerId).get();
        List<PlayerLesion> playerLesions = playerLesionDao.findByPlayerId(playerId);

        if (playerLesions.isEmpty()) {
            playerDao.delete(player);
        }

        for (PlayerLesion playerLesion : playerLesions) {
            if(playerLesion.getPlayer().getId() == playerId) {
            playerLesionDao.delete(playerLesion);
            //CASCADETYPE.ALL en PLAYER para cuando borre de playerLesion se borre de Player
            
            // TENGO CASCADETYPE.PERSIST EN Lesion de PlayerLesion
            // Para que asi si borro una fila con con lesion, que la lesion
            // no se borre en la table Lesion, solo en la tabla PlayerLesion
            }
        }
    }

    @Override
    public Player updatePlayer(Long teamId, Long playerId, String playerName, String primaryLastName,
            String secondLastName, String position, String trends, String phoneNumber, String email, String dni)
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        System.out.println("PIIII --> " + position);
        System.out.println("HOLA --> " + position);

        if (position != null &&!position.equals("Base") && !position.equals("Escolta") && !position.equals("Alero")
                && !position.equals("AlaPivot") && !position.equals("Pivot")) {
            throw new InstanceNotFoundException("project.entities.Position");
        }

        if (!Validations.isValidDni(dni)) {
            throw new IncorrectDniException(dni);
        }
        if (!Validations.isValidEmail(email)) {
            throw new IncorrectEmailException(email);
        }
        if (!Validations.isValidPhoneNumber(phoneNumber)) {
            throw new IncorrectPhoneNumberException(phoneNumber);
        }
        //No busco dentro de los player de team porque el player que actualizara ya estara dentro del team del usuario
        Player player = playerDao.findById(playerId).get();

        if (player.getTeam() != null && player.getTeam().getId() != teamId){
            if (!teamDao.existsById(teamId)) {
                throw new InstanceNotFoundException("project.entities.team");
            }
            player.setTeam(teamDao.findById(teamId).get());
        } else {
            if(player.getTeam() == null){
                if (!teamDao.existsById(teamId)) {
                    throw new InstanceNotFoundException("project.entities.team");
                }
                player.setTeam(teamDao.findById(teamId).get());
            }
        }

        if(playerName != null)
            player.setPlayerName(playerName);
        if(primaryLastName != null)
            player.setPrimaryLastName(primaryLastName);
        if(secondLastName != null)
            player.setSecondLastName(secondLastName);
        //Position positionEnum = Position.valueOf(position); // paso string a enum
        if(position != null)
            player.setPosition(position);
        if(trends != null)
            player.setTrends(trends);
        if(phoneNumber != null)
            player.setPhoneNumber(phoneNumber);
        if(email != null)
            player.setEmail(email);
        if(dni != null)
            player.setDni(dni);
        playerDao.save(player);

        return player;
    }
}