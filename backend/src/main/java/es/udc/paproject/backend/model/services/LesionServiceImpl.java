package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Lesion;
import es.udc.paproject.backend.model.entities.LesionDao;
import es.udc.paproject.backend.model.entities.LesionType;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.entities.PlayerLesion;
import es.udc.paproject.backend.model.entities.PlayerLesionDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedLesionException;

@Service
@Transactional
public class LesionServiceImpl implements LesionService {

    @Autowired
    private LesionDao lesionDao;

    @Autowired
    private PlayerLesionDao playerLesionDao;

    @Autowired
    private PlayerDao playerDao;

    @Override
    public Lesion addLesion(String lesionName, String description, String medication, String lesionType)
            throws InstanceNotFoundException {

        if (!lesionType.equals("Muscular") && !lesionType.equals("Tendinosa") && !lesionType.equals("Articular")
                && !lesionType.equals("ColumnaVertebral") && !lesionType.equals("Psicologica")) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }
        LesionType lesionTypeEnum = LesionType.valueOf(lesionType);
        Lesion lesion = new Lesion(lesionName, description, medication, lesionTypeEnum);
        lesionDao.save(lesion);

        return lesion;
    }

    @Override
    public void addLesionToPlayer(Long playerId, Long lesionId) throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        if (!lesionDao.existsById(lesionId)) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        Player player = playerDao.findById(playerId).get();

        Lesion lesion = lesionDao.findById(lesionId).get();
        PlayerLesion playerLesion = new PlayerLesion(lesion, player);

        playerLesionDao.save(playerLesion);
        player.setInjured(true);
        playerDao.save(player);
    }

    @Override
    public Lesion findLesionById(Long lesionId) throws InstanceNotFoundException {
        
        if (!lesionDao.existsById(lesionId)) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }
        Lesion lesion = lesionDao.findById(lesionId).get();
        return lesion;
    }

    @Override
    public List<Lesion> findLesionByPlayer(Long playerId) throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<PlayerLesion> playerLesions = playerLesionDao.findByPlayerId(playerId);

        if (playerLesions.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        List<Lesion> lesions = new ArrayList<>();
        for (PlayerLesion playerLesion : playerLesions) {
            if(playerLesion.getLesion() != null) {
                lesions.add(playerLesion.getLesion());
            }
        }
        
        if (lesions.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        lesions = lesions.stream().distinct().collect(Collectors.toList());
        return lesions;
    }

    @Override
    public Block<Lesion> findAllLesion(int page, int size) throws InstanceNotFoundException {


        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Slice<Lesion> slice = lesionDao.findAll(PageRequest.of(page, size, sort));

        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public List<Lesion> findAllLesion() throws InstanceNotFoundException {

        List<Lesion> lesions = new ArrayList<>();
        lesions = (List<Lesion>) lesionDao.findAll();

        if (lesions.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        return lesions;
    }


    @Override
    public Block<Lesion> findLesionByType(String lesionType, int page, int size) throws InstanceNotFoundException {



        Slice<Lesion> slice = lesionDao.findByLesionTypeOrderById(lesionType, PageRequest.of(page, size));


        // List<Lesion> lesions = new ArrayList<>();
        // lesions = lesionDao.findByLesionType(lesionType);

        // if (lesions.isEmpty()) {
        //     throw new InstanceNotFoundException("project.entities.lesion");
        // }

        return new Block<>(slice.getContent(), slice.hasNext());
    }


    @Override
    public List<Lesion> findLesionByType(String lesionType) throws InstanceNotFoundException {

        List<Lesion> lesions = new ArrayList<>();
        lesions = lesionDao.findByLesionType(lesionType);

        if (lesions.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }
        
        return lesions;
    }

    @Override
    public void removeLesion(Long lesionId) throws InstanceNotFoundException, UsedLesionException {
        
        if (!lesionDao.existsById(lesionId)) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        List<PlayerLesion> playerLesions = (List<PlayerLesion>) playerLesionDao.findAll();

        for (PlayerLesion playerLesion : playerLesions) {
            if(playerLesion.getLesion() != null && playerLesion.getLesion().getId() == lesionId){
                throw new UsedLesionException(playerLesion.getLesion().getLesionName());
            }
        }

        Lesion lesion = lesionDao.findById(lesionId).get();

        lesionDao.delete(lesion);
    }

    @Override
    public void removeLesionToPlayer(Long playerId, Long lesionId) throws InstanceNotFoundException {

        if (!lesionDao.existsById(lesionId)) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        
        List<PlayerLesion> playerLesions = (List<PlayerLesion>) playerLesionDao.findAll();
        for (PlayerLesion playerLesion : playerLesions) {
            if(playerLesion.getLesion() != null && playerLesion.getLesion().getId() == lesionId && playerLesion.getPlayer().getId() == playerId){
                playerLesionDao.delete(playerLesion);
            }
        }

        List<PlayerLesion> playerLesions2 = playerLesionDao.findByPlayerId(playerId);
        if (playerLesions2.isEmpty()) {
            Player player = playerDao.findById(playerId).get();
            player.setInjured(false);
            playerDao.save(player);
        }
    }

    @Override
    public Lesion updateLesion(Long lesionId, String lesionName, String description, String medication, String lesionType)
            throws InstanceNotFoundException {

        if (!lesionDao.existsById(lesionId)) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        if (lesionType !=null && !lesionType.equals("Muscular") && !lesionType.equals("Tendinosa") && !lesionType.equals("Articular")
                && !lesionType.equals("ColumnaVertebral") && !lesionType.equals("Psicologica")) {
            throw new InstanceNotFoundException("project.entities.lesion");
        }

        Lesion existingLesion = null;
        Long id = (long) -1;
        List<PlayerLesion> playerLesions = (List<PlayerLesion>) playerLesionDao.findAll();
        for (PlayerLesion playerLesion : playerLesions) {
            if(playerLesion.getLesion() != null && playerLesion.getLesion().getId() == lesionId){
                id = playerLesion.getLesion().getId();
                existingLesion = playerLesion.getLesion();
                if(lesionName != null)
                existingLesion.setLesionName(lesionName);
                if(description != null)
                existingLesion.setDescription(description);
                if(medication != null)
                existingLesion.setMedication(medication);
                if(lesionType != null)
                existingLesion.setLesionType(lesionType);
                lesionDao.save(existingLesion);

                PlayerLesion playerLesion2 = playerLesionDao.findById(playerLesion.getId()).get();
                if(lesionName != null)
                playerLesion2.getLesion().setLesionName(lesionName);
                if(description != null)
                playerLesion2.getLesion().setDescription(description);
                if(medication != null)
                playerLesion2.getLesion().setMedication(medication);
                if(lesionType != null)
                playerLesion2.getLesion().setLesionType(lesionType);
                playerLesionDao.save(playerLesion2);
            }

        }

        if(id == -1){
            existingLesion = lesionDao.findById(lesionId).get();
            if(lesionName != null)
            existingLesion.setLesionName(lesionName);
            if(description != null)
            existingLesion.setDescription(description);
            if(medication != null)
            existingLesion.setMedication(medication);
            // LesionType lesionTypeEnum = LesionType.valueOf(lesionType);
            if(lesionType != null)
            existingLesion.setLesionType(lesionType);
            lesionDao.save(existingLesion);
        }
        return existingLesion;
    }
}