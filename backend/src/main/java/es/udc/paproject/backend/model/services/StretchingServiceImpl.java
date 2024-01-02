package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;

import es.udc.paproject.backend.model.entities.PlayerStretchingDao;
import es.udc.paproject.backend.model.entities.Stretching;
import es.udc.paproject.backend.model.entities.StretchingDao;
import es.udc.paproject.backend.model.entities.StretchingType;
import es.udc.paproject.backend.model.entities.Training;
import es.udc.paproject.backend.model.entities.TrainingDao;
import es.udc.paproject.backend.model.entities.TrainingStretching;
import es.udc.paproject.backend.model.entities.TrainingStretchingDao;
import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.GameDao;
import es.udc.paproject.backend.model.entities.GameStretching;
import es.udc.paproject.backend.model.entities.GameStretchingDao;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.entities.PlayerStretching;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedStretchingException;
@Service
@Transactional
public class StretchingServiceImpl implements StretchingService {

    @Autowired
    private StretchingDao stretchingDao;

    @Autowired
    private PlayerStretchingDao playerStretchingDao;

    @Autowired
    private PlayerDao playerDao;

    @Autowired
    private TrainingStretchingDao trainingStretchingDao;

    @Autowired
    private TrainingDao trainingDao;

    @Autowired
    private  GameStretchingDao gameStretchingDao;

    @Autowired
    private  GameDao gameDao;

    @Override
    public Stretching addStretching(String stretchingName, String description, String stretchingType)
            throws InstanceNotFoundException {

        if (!stretchingType.equals("Isquiotibiales") && !stretchingType.equals("Gluteos") 
                && !stretchingType.equals("Gemelos") && !stretchingType.equals("Adductores")
                && !stretchingType.equals("Hombro") && !stretchingType.equals("Cuadriceps") 
                && !stretchingType.equals("Espalda") && !stretchingType.equals("Pectoral") && !stretchingType.equals("Ingle") 
                && !stretchingType.equals("Triceps")) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        StretchingType stretchingTypeEnum = StretchingType.valueOf(stretchingType);
        Stretching stretching = new Stretching(stretchingName, description, stretchingTypeEnum);
        stretchingDao.save(stretching);

        return stretching;
    }

    @Override
    public void addStretchingToPlayer(Long playerId, Long stretchingId) throws InstanceNotFoundException {
        
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        Player player = playerDao.findById(playerId).get();
        Stretching stretching = stretchingDao.findById(stretchingId).get();

        PlayerStretching playerStretching = new PlayerStretching(player, stretching);
        playerStretchingDao.save(playerStretching);
    }

    @Override
    public void addStretchingToTraining(Long trainingId, Long stretchingId) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }
        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }
        Training training = trainingDao.findById(trainingId).get();
        Stretching stretching = stretchingDao.findById(stretchingId).get();

        TrainingStretching trainingStretching = new TrainingStretching(training, stretching);
        trainingStretchingDao.save(trainingStretching);
    }

    @Override
    public void addStretchingToGame(Long gameId, Long stretchingId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }
        Game game = gameDao.findById(gameId).get();
        Stretching stretching = stretchingDao.findById(stretchingId).get();

        GameStretching gameStretching = new GameStretching(game, stretching);
        gameStretchingDao.save(gameStretching);
    }

    @Override
    public Stretching findStretchingById(Long stretchingId) throws InstanceNotFoundException {

        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }
        Stretching stretching = stretchingDao.findById(stretchingId).get();

        return stretching;
    }

    @Override
    public List<Stretching> findAllStretchings() throws InstanceNotFoundException {

        List<Stretching> stretchings = new ArrayList<>();
        stretchings = (List<Stretching>) stretchingDao.findAll();

        if (stretchings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        return stretchings;
    }

    @Override
    public Block<Stretching> findAllStretchings(int page, int size) throws InstanceNotFoundException {
        
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Slice<Stretching> slice = stretchingDao.findAll(PageRequest.of(page, size, sort));
        
        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public Block<Stretching> findStretchingsByType(String stretchingType, int page, int size)
            throws InstanceNotFoundException {
        
        Slice<Stretching> slice = stretchingDao.findByStretchingTypeOrderById(stretchingType, PageRequest.of(page, size));

        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public List<Stretching> findStretchingsByType(String stretchingType) throws InstanceNotFoundException {

        List<Stretching> stretchings = new ArrayList<>();
        stretchings = stretchingDao.findByStretchingType(stretchingType);
        
        if (stretchings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        return stretchings;
    }

    @Override
    public List<Stretching> findStretchingsByPlayerId(Long playerId) throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<PlayerStretching> playerStretchings = playerStretchingDao.findByPlayerId(playerId);
        if (playerStretchings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        List<Stretching> stretchings = new ArrayList<>();
        for (PlayerStretching playerStretching : playerStretchings) {
            if(playerStretching.getStretching() != null) {
                stretchings.add(playerStretching.getStretching());
            }
        }

        if (stretchings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        stretchings = stretchings.stream().distinct().collect(Collectors.toList());
        return stretchings;
    }

    @Override
    public List<Stretching> findStretchingsByTrainingId(Long trainingId) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }

        List<TrainingStretching> trainingStretchings = trainingStretchingDao.findByTrainingId(trainingId);
        if (trainingStretchings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        List<Stretching> stretchings = new ArrayList<>();
        for (TrainingStretching trainingStretching : trainingStretchings) {
            if(trainingStretching.getStretching() != null) {
                stretchings.add(trainingStretching.getStretching());
            }
        }

        if (stretchings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        stretchings = stretchings.stream().distinct().collect(Collectors.toList());
        return stretchings;
    }

    @Override
    public List<Stretching> findStretchingsByGameId(Long gameId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        List<GameStretching> gameStretchings = gameStretchingDao.findByGameId(gameId);
        if (gameStretchings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        List<Stretching> stretchings = new ArrayList<>();
        for (GameStretching gameStretching : gameStretchings) {
            if(gameStretching.getStretching() != null) {
                stretchings.add(gameStretching.getStretching());
            }
        }

        if (stretchings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        stretchings = stretchings.stream().distinct().collect(Collectors.toList());
        return stretchings;
    }

    @Override
    public void removeStretching(Long stretchingId) throws InstanceNotFoundException, UsedStretchingException {

        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        List<GameStretching> gameStretchings = (List<GameStretching>) gameStretchingDao.findAll();
        for (GameStretching gameStretching : gameStretchings) {
            if(gameStretching.getStretching() != null && gameStretching.getStretching().getId() == stretchingId){
                throw new UsedStretchingException(gameStretching.getStretching().getStretchingName());
            }
        }

        List<TrainingStretching> trainingStretchings = (List<TrainingStretching>) trainingStretchingDao.findAll();
        for (TrainingStretching trainingStretching : trainingStretchings) {
            if(trainingStretching.getStretching() != null && trainingStretching.getStretching().getId() == stretchingId){
                throw new UsedStretchingException(trainingStretching.getStretching().getStretchingName());
            }
        }

        List<PlayerStretching> playerStretchings = (List<PlayerStretching>) playerStretchingDao.findAll();
        for (PlayerStretching playerStretching : playerStretchings) {
            if(playerStretching.getStretching() != null && playerStretching.getStretching().getId() == stretchingId){
                throw new UsedStretchingException(playerStretching.getStretching().getStretchingName());
            }
        }

        Stretching stretching = stretchingDao.findById(stretchingId).get();

        stretchingDao.delete(stretching);
    }

    @Override
    public void removeStretchingToPlayer(Long stretchingId, Long playerId) throws InstanceNotFoundException {
        
        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<PlayerStretching> playerStretchings = (List<PlayerStretching>) playerStretchingDao.findAll();
        for (PlayerStretching playerStretching : playerStretchings) {
            if(playerStretching.getStretching() != null && playerStretching.getStretching().getId() == stretchingId && playerStretching.getPlayer().getId() == playerId){
                playerStretchingDao.delete(playerStretching);
            }
        }
    }

    @Override
    public void removeStretchingToTraining(Long stretchingId, Long trainingId) throws InstanceNotFoundException {
        
        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }
        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }


        List<TrainingStretching> trainingStretchings = (List<TrainingStretching>) trainingStretchingDao.findAll();
        for (TrainingStretching trainingStretching : trainingStretchings) {
            if(trainingStretching.getStretching() != null && trainingStretching.getStretching().getId() == stretchingId && trainingStretching.getTraining().getId() == trainingId){
                trainingStretchingDao.delete(trainingStretching);
            }
        }
    }

    @Override
    public void removeStretchingToGame(Long stretchingId, Long gameId) throws InstanceNotFoundException {

        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }
        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }


        List<GameStretching> gameStretchings = (List<GameStretching>) gameStretchingDao.findAll();
        for (GameStretching gameStretching : gameStretchings) {
            if(gameStretching.getStretching() != null && gameStretching.getStretching().getId() == stretchingId && gameStretching.getGame().getId() == gameId){
                gameStretchingDao.delete(gameStretching);
            }
        }
    }

    @Override
    public Stretching updatStretching(Long stretchingId, String stretchingName, String description,
            String stretchingType) throws InstanceNotFoundException {

        if (!stretchingDao.existsById(stretchingId)) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        if (!stretchingType.equals("Isquiotibiales") && !stretchingType.equals("Gluteos") 
                && !stretchingType.equals("Gemelos") && !stretchingType.equals("Adductores")
                && !stretchingType.equals("Hombro") && !stretchingType.equals("Cuadriceps") 
                && !stretchingType.equals("Espalda") && !stretchingType.equals("Pectoral") && !stretchingType.equals("Ingle") 
                && !stretchingType.equals("Triceps")) {
            throw new InstanceNotFoundException("project.entities.stretching");
        }

        Stretching existingStretching = null;
        Long id = (long) -1;
        List<GameStretching> gameStretchings = (List<GameStretching>) gameStretchingDao.findAll();
        for (GameStretching gameStretching : gameStretchings) {
            if(gameStretching.getStretching() != null && gameStretching.getStretching().getId() == stretchingId){
                id = gameStretching.getStretching().getId();
                existingStretching = gameStretching.getStretching();
                if(stretchingName != null)
                    existingStretching.setStretchingName(stretchingName);
                if(description != null)
                    existingStretching.setDescription(description);
                if(stretchingType != null)
                    existingStretching.setStretchingType(stretchingType);
                stretchingDao.save(existingStretching);

                GameStretching gameStretching2 = gameStretchingDao.findById(gameStretching.getId()).get();
                if(stretchingName != null)
                    gameStretching2.getStretching().setStretchingName(stretchingName);
                if(description != null)
                    gameStretching2.getStretching().setDescription(description);
                if(stretchingType != null)
                    gameStretching2.getStretching().setStretchingType(stretchingType);
                gameStretchingDao.save(gameStretching2);
            }
        }

        List<TrainingStretching> trainingStretchings = (List<TrainingStretching>) trainingStretchingDao.findAll();
        for (TrainingStretching trainingStretching : trainingStretchings) {
            if(trainingStretching.getStretching() != null && trainingStretching.getStretching().getId() == stretchingId){
                id = trainingStretching.getStretching().getId();
                existingStretching = trainingStretching.getStretching();
                if(stretchingName != null)
                    existingStretching.setStretchingName(stretchingName);
                if(description != null)
                    existingStretching.setDescription(description);
                if(stretchingType != null)
                    existingStretching.setStretchingType(stretchingType);
                stretchingDao.save(existingStretching);

                TrainingStretching trainingStretching2 = trainingStretchingDao.findById(trainingStretching.getId()).get();
                if(stretchingName != null)
                    trainingStretching2.getStretching().setStretchingName(stretchingName);
                if(description != null)
                    trainingStretching2.getStretching().setDescription(description);
                if(stretchingType != null)
                    trainingStretching2.getStretching().setStretchingType(stretchingType);
                trainingStretchingDao.save(trainingStretching2);
            }
        }

        List<PlayerStretching> playerStretchings = (List<PlayerStretching>) playerStretchingDao.findAll();
        for (PlayerStretching playerStretching : playerStretchings) {
            if(playerStretching.getStretching() != null && playerStretching.getStretching().getId() == stretchingId){
                id = playerStretching.getStretching().getId();
                existingStretching = playerStretching.getStretching();
                if(stretchingName != null)
                    existingStretching.setStretchingName(stretchingName);
                if(description != null)
                    existingStretching.setDescription(description);
                if(stretchingType != null)
                    existingStretching.setStretchingType(stretchingType);
                stretchingDao.save(existingStretching);

                PlayerStretching playerStretching2 = playerStretchingDao.findById(playerStretching.getId()).get();
                if(stretchingName != null)
                    playerStretching2.getStretching().setStretchingName(stretchingName);
                if(description != null)
                    playerStretching2.getStretching().setDescription(description);
                if(stretchingType != null)
                    playerStretching2.getStretching().setStretchingType(stretchingType);
                playerStretchingDao.save(playerStretching2);
            }
        }

        if(id == -1){
            existingStretching = stretchingDao.findById(stretchingId).get();
            if(stretchingName != null)
                existingStretching.setStretchingName(stretchingName);
            if(description != null)
                existingStretching.setDescription(description);
            if(stretchingType != null)
                existingStretching.setStretchingType(stretchingType);
            stretchingDao.save(existingStretching);
        }
        return existingStretching;
    }
}