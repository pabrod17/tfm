package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Play;
import es.udc.paproject.backend.model.entities.PlayDao;
import es.udc.paproject.backend.model.entities.PlayTeam;
import es.udc.paproject.backend.model.entities.PlayTeamDao;
import es.udc.paproject.backend.model.entities.PlayType;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.TeamDao;
import es.udc.paproject.backend.model.exceptions.IncorrectPlayTypeException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedPlayException;
@Service
@Transactional
public class PlayServiceImpl implements PlayService {

    @Autowired
    private PlayDao playDao;

    @Autowired
    private PlayTeamDao playTeamDao;

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Override
    public Play addPlay(Long teamId, String title, String playType, String gesture, String pointGuardText, String shootingGuardText,
            String smallForwardText, String powerForwardText, String centerText) throws IncorrectPlayTypeException,
            InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        Team team = teamDao.findById(teamId).get();

        if (!playType.equals("Ataque") && !playType.equals("Defensa")) {
            throw new IncorrectPlayTypeException(playType);
        }

        PlayType playTypeEnum = PlayType.valueOf(playType);
        Play play = new Play(title, playTypeEnum, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText);
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

        List<PlayTeam> playTeams = playTeamDao.findByTeamId(teamId);

        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null && playTeam.getPlay().getId() == playId) {
                throw new UsedPlayException(playTeam.getPlay().getTitle());
            }
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
        
        userService.loginFromId(userId);

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
            throw new InstanceNotFoundException("project.entities.play");
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
    public List<Play> findPlaysByTypeAndTeam(Long teamId, String playType) throws InstanceNotFoundException,
            IncorrectPlayTypeException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        if (!playType.equals("Ataque") && !playType.equals("Defensa")) {
            throw new IncorrectPlayTypeException(playType);
        }

        List<PlayTeam> playTeams = playTeamDao.findByTeamId(teamId);

        if (playTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        List<Play> plays = new ArrayList<>();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null && playTeam.getPlay().getPlayType().equals(playType)) {
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
    public Play updatePlay(Long playId, String title, String playType, String gesture,
            String pointGuardText, String shootingGuardText, String smallForwardText, String powerForwardText,
            String centerText) throws InstanceNotFoundException, IncorrectPlayTypeException {

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
            playDao.save(updatedPlay);
        }

        return updatedPlay;
    }


}