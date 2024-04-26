package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.exceptions.IncorrectPlayTypeException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedPlayException;
@Service
@Transactional
public class PlayServiceImpl implements PlayService {

    @Autowired
    private PlayDao playDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PlayTeamDao playTeamDao;

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Override
    public Play addPlay(Long teamId, String title, String playType, String gesture, String pointGuardText, String shootingGuardText,
            String smallForwardText, String powerForwardText, String centerText, String description) throws IncorrectPlayTypeException,
            InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        Team team = teamDao.findById(teamId).get();

        if (!playType.equals("Ataque") && !playType.equals("Defensa")) {
            throw new IncorrectPlayTypeException(playType);
        }

        PlayType playTypeEnum = PlayType.valueOf(playType);
        Play play = new Play(title, playTypeEnum, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText, description);
        PlayTeam playTeam = new PlayTeam(play, team);
        playTeamDao.save(playTeam);
        return play;
    }

    @Override
    public void addPlayToTeam(Long teamId, Long playId) throws InstanceNotFoundException, UsedPlayException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        Play play = playDao.findById(playId).get();
        Team team = teamDao.findById(teamId).get();
        PlayTeam playTeam = new PlayTeam(play, team);

        playTeamDao.save(playTeam);
    }

    @Override
    public Play findPlayById(Long playId) throws InstanceNotFoundException {

        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        Play play = playDao.findById(playId).get();
        return play;
    }

    @Override
    public List<Play> findPlaysByUserId(Long userId) throws InstanceNotFoundException {
        
        //userService.loginFromId(userId);

        User user = userDao.findById(userId).get();
        if(user.getRole().name().equals("ADMIN")) {
            List<Play> plays = (List<Play>) playDao.findAll();
            plays = plays.stream().distinct().collect(Collectors.toList());
            return plays;
        }



        List<Team> teams = teamService.findAllTeams(userId);
        List<PlayTeam> playTeams = (List<PlayTeam>) playTeamDao.findAll();

        List<Play> plays = new ArrayList<>();
        for (PlayTeam playTeam : playTeams) {
            for (Team team : teams) {
                if(playTeam.getTeam() != null && team.getId() == playTeam.getTeam().getId()){
                    plays.add(playTeam.getPlay());
                }
            }
        }

        if (plays.isEmpty()) {
            return plays;
        }
        
        plays = plays.stream().distinct().collect(Collectors.toList());
        return plays;
    }

    @Override
    public List<Play> findPlaysByTeamId(Long teamId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        List<PlayTeam> playTeams = playTeamDao.findByTeamId(teamId);

        if (playTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        List<Play> plays = new ArrayList<>();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null) {
                plays.add(playTeam.getPlay());
            }
        }

        if (plays.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.play");
        }
        
        plays = plays.stream().distinct().collect(Collectors.toList());
        return plays;
    }

    @Override
    public List<Play> findPlaysByType(Long userId, String playType) throws InstanceNotFoundException,
            IncorrectPlayTypeException {


        User user = userDao.findById(userId).get();
        List<SeasonTeam> seasonTeams = new ArrayList<>();
        if(user.getRole().name().equals("ADMIN")) {
            seasonTeams = (List<SeasonTeam>) seasonTeamDao.findAll();
        } else {
            seasonTeams = seasonTeamDao.findByUserId(user.getId());
        }




        List<Play> plays = new ArrayList<>();

        if (!playType.equals("Ataque") && !playType.equals("Defensa")) {
            throw new IncorrectPlayTypeException(playType);
        }

        for (SeasonTeam seasonTeam : seasonTeams) {
            if (seasonTeam.getTeam() != null) {
                List<PlayTeam> playTeams = playTeamDao.findByTeamId(seasonTeam.getTeam().getId());
                for (PlayTeam playTeam : playTeams) {
                    if(playTeam.getPlay() != null && playTeam.getPlay().getPlayType().equals(playType)) {
                        plays.add(playTeam.getPlay());
                    }
                }
            }
        }

        if (plays.isEmpty()) {
            return plays;
        }

        plays = plays.stream().distinct().collect(Collectors.toList());
        return plays;
    }

    @Override
    public void removePlayToTeam(Long playId, Long teamId) throws InstanceNotFoundException {

        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }
        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        Long id = (long) -1;
        List<PlayTeam> playTeams = (List<PlayTeam>) playTeamDao.findAll();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getTeam() != null && playTeam.getPlay() != null && playTeam.getPlay().getId() == playId) {
                id = playTeam.getPlay().getId();
            }
            if(playTeam.getTeam() != null && playTeam.getPlay() != null && playTeam.getPlay().getId() == playId && playTeam.getTeam().getId() == teamId) {
                playTeamDao.delete(playTeam);
            }
        }

        if(id == -1){
            Play play = playDao.findById(playId).get();
            playDao.delete(play);
        }
    }

    @Override
    public void removePlay(Long playId) throws InstanceNotFoundException {

        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }
            Play play = playDao.findById(playId).get();
            playDao.delete(play);
    }

    @Override
    public Play updatePlay(Long playId, String title, String playType, String gesture,
            String pointGuardText, String shootingGuardText, String smallForwardText, String powerForwardText,
            String centerText, String description) throws InstanceNotFoundException, IncorrectPlayTypeException {

        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        if (!playType.equals("Ataque") && !playType.equals("Defensa")) {
            throw new IncorrectPlayTypeException(playType);
        }

        Play updatedPlay = null;
        Long id = (long) -1;
        List<PlayTeam> playTeams = (List<PlayTeam>) playTeamDao.findAll();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null && playTeam.getPlay().getId() == playId) {
                id = playTeam.getPlay().getId();
                updatedPlay = playTeam.getPlay();
                if(updatedPlay.getTitle() != null)
                    updatedPlay.setTitle(title);
                if(updatedPlay.getPlayType() != null)
                    updatedPlay.setPlayType(playType);
                if(updatedPlay.getGesture() != null)
                    updatedPlay.setGesture(gesture);
                if(updatedPlay.getPointGuardText() != null)
                    updatedPlay.setPointGuardText(pointGuardText);
                if(updatedPlay.getShootingGuardText() != null)
                    updatedPlay.setShootingGuardText(shootingGuardText);
                if(updatedPlay.getSmallForwardText() != null)
                    updatedPlay.setSmallForwardText(smallForwardText);
                if(updatedPlay.getPowerForwardText() != null)
                    updatedPlay.setPowerForwardText(powerForwardText);
                if(updatedPlay.getCenterText() != null)
                    updatedPlay.setCenterText(centerText);
                if(updatedPlay.getDescription() != null)
                    updatedPlay.setDescription(description);
                playTeamDao.save(playTeam);
            }
        }

        if(id == -1){
            updatedPlay = playDao.findById(playId).get();
            if(updatedPlay.getTitle() != null)
                updatedPlay.setTitle(title);
            if(updatedPlay.getPlayType() != null)
                updatedPlay.setPlayType(playType);
            if(updatedPlay.getGesture() != null)
                updatedPlay.setGesture(gesture);
            if(updatedPlay.getPointGuardText() != null)
                updatedPlay.setPointGuardText(pointGuardText);
            if(updatedPlay.getShootingGuardText() != null)
                updatedPlay.setShootingGuardText(shootingGuardText);
            if(updatedPlay.getSmallForwardText() != null)
                updatedPlay.setSmallForwardText(smallForwardText);
            if(updatedPlay.getPowerForwardText() != null)
                updatedPlay.setPowerForwardText(powerForwardText);
            if(updatedPlay.getCenterText() != null)
                updatedPlay.setCenterText(centerText);
            if(updatedPlay.getDescription() != null)
                updatedPlay.setDescription(description);
            playDao.save(updatedPlay);
        }

        return updatedPlay;
    }


}