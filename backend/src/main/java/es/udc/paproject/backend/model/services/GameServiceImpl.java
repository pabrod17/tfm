package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.GameDao;
import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.entities.PlayerGameStatistics;
import es.udc.paproject.backend.model.entities.PlayerGameStatisticsDao;
import es.udc.paproject.backend.model.entities.SeasonDao;
import es.udc.paproject.backend.model.entities.SeasonTeam;
import es.udc.paproject.backend.model.entities.SeasonTeamDao;
import es.udc.paproject.backend.model.entities.TeamDao;
import es.udc.paproject.backend.model.entities.UserDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;

@Service
@Transactional
public class GameServiceImpl implements GameService {

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private SeasonDao seasonDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Autowired
    private PlayerDao playerDao;

    @Autowired
    private GameDao gameDao;

    @Autowired
    private PlayerGameStatisticsDao playerGameStatisticsDao;

    @Autowired
    private UserDao userDao;

    @Override
    public Game addGame(Long teamId, Long seasonId, LocalDateTime gameDate, String rival)
            throws InstanceNotFoundException {

        Game game = null;
        if(teamId == null && seasonId == null){
            game = new Game(gameDate, rival,null);
            gameDao.save(game);
        }else{

            if(teamId != null){
                if (!teamDao.existsById(teamId)) {
                    throw new InstanceNotFoundException("project.entities.team");
                }
            }
            if(seasonId != null){
                if (!seasonDao.existsById(seasonId)) {
                    throw new InstanceNotFoundException("project.entities.season");
                }
            }
            List<SeasonTeam> seasonTeams = new ArrayList<>();
            if(teamId != null){
                if(seasonId != null){
                    seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonIdAndTeamId(seasonId, teamId);
                } else{
                    seasonTeams = seasonTeamDao.findSeasonTeamsByTeamId(teamId);
                }
            } else{
                seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonId(seasonId);

            }
            game = new Game(gameDate, rival,seasonTeams.get(0));
            gameDao.save(game);
        }
        return game;
    }

    @Override
    public void addPlayerToGame(Long gameId, Long playerId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        Game game = gameDao.findById(gameId).get();
        Player player = playerDao.findById(playerId).get();

        PlayerGameStatistics playerGameStatistics = new PlayerGameStatistics(player, game);

        playerGameStatisticsDao.save(playerGameStatistics);
    }

    @Override
    public Game findGameById(Long gameId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        Game game = gameDao.findById(gameId).get();

        return game;
    }

    @Override
    public List<Game> findGamesByPlayerId(Long playerId) throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<Game> games = new ArrayList<>();
        List<PlayerGameStatistics> playerGameStatistics =playerGameStatisticsDao.findByPlayerId(playerId);
        for (PlayerGameStatistics playerGameStatistic : playerGameStatistics) {
            if (playerGameStatistic.getGame() != null) {
                games.add(playerGameStatistic.getGame());
            }
        }

        if (games.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        return games;
    }

    @Override
    public List<Game> findGamesByTwoDatesAndTeamIdOrSeasonId(Long userId, Long teamId, Long seasonId, LocalDateTime startDate,
            LocalDateTime endDate) throws StartDateAfterEndDateException, InstanceNotFoundException {
        
            if(startDate.isAfter(endDate)){
                throw new StartDateAfterEndDateException(startDate, endDate);
            }

            List<SeasonTeam> seasonTeams = new ArrayList<>();

            List<Game> games = new ArrayList<>();
            List<Game> games2 = new ArrayList<>();

            List<Game> gamesBySeasonTeamId = new ArrayList<>();

            if(teamId == null && seasonId == null) {
                seasonTeams = seasonTeamDao.findByUserId(userId);
                    for(SeasonTeam seasonTeam : seasonTeams){
                            games2 = gameDao.findBySeasonTeamId(seasonTeam.getId());
                            for(Game game : games2){
                                gamesBySeasonTeamId.add(game);
                            }
                    }
            }
            if(teamId != null){
                if(seasonId != null){
                    seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonIdAndTeamId(seasonId, teamId);
                    for(SeasonTeam seasonTeam : seasonTeams){
                            games2 = gameDao.findBySeasonTeamId(seasonTeam.getId());
                            for(Game game : games2){
                                gamesBySeasonTeamId.add(game);
                            }
                    }
                } else{
                        seasonTeams = seasonTeamDao.findSeasonTeamsByTeamId(teamId);
                        for(SeasonTeam seasonTeam : seasonTeams){
                                games2 = gameDao.findBySeasonTeamId(seasonTeam.getId());
                                for(Game game : games2){
                                    gamesBySeasonTeamId.add(game);
                                }
                        }
                }
            } else{
                    if(seasonId != null) {
                        seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonId(seasonId);
                        for(SeasonTeam seasonTeam : seasonTeams){
                                games2 = gameDao.findBySeasonTeamId(seasonTeam.getId());
                                for(Game game : games2){
                                    gamesBySeasonTeamId.add(game);
                                }
                        }
                    }

            }

            for (Game game : gamesBySeasonTeamId) {
                if(game.getGameDate().isAfter(startDate) && game.getGameDate().isBefore(endDate)) {
                    games.add(game);
                }
            }

            if (games.isEmpty()) {
                throw new InstanceNotFoundException("project.entities.game");
            }

            games = games.stream().distinct().collect(Collectors.toList());
            return games;
    }

    @Override
    public List<Game> findGamesByUserId(Long userId) throws InstanceNotFoundException {

        if (!userDao.existsById(userId)) {
            throw new InstanceNotFoundException("project.entities.user");
        }

        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(userId);

        List<Game> games = new ArrayList<>();
        List<Game> games2 = new ArrayList<>();

        for(SeasonTeam seasonTeam : seasonTeams){
            games2 = gameDao.findBySeasonTeamId(seasonTeam.getId());
            for(Game game : games2){
                games.add(game);
            }
        }

        if (games.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        games = games.stream().distinct().collect(Collectors.toList());
        return games;
    }

    @Override
    public List<Game> findGamesByTeamId(Long teamId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        List<SeasonTeam> seasonTeams = seasonTeamDao.findSeasonTeamsByTeamId(teamId);

        List<Game> games = new ArrayList<>();
        List<Game> games2 = new ArrayList<>();

        for(SeasonTeam seasonTeam : seasonTeams){
            games2 = gameDao.findBySeasonTeamId(seasonTeam.getId());
            for(Game game : games2){
                games.add(game);
            }
        }

        if (games.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        games = games.stream().distinct().collect(Collectors.toList());
        return games;
    }

    @Override
    public List<Game> findGamesBySeasonId(Long seasonId) throws InstanceNotFoundException {

        if (!seasonDao.existsById(seasonId)) {
            throw new InstanceNotFoundException("project.entities.season");
        }

        List<SeasonTeam> seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonId(seasonId);
        List<Game> games = new ArrayList<>();
        List<Game> games2 = new ArrayList<>();

        for(SeasonTeam seasonTeam : seasonTeams){
            games2 = gameDao.findBySeasonTeamId(seasonTeam.getId());
            for(Game game : games2){
                games.add(game);
            }
        }

        if (games.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.training");
        }

        games = games.stream().distinct().collect(Collectors.toList());
        return games;
    }

    @Override
    public List<Game> findGamesByTeamIdAndSeasonId(Long teamId, Long seasonId) throws InstanceNotFoundException {
        
        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!seasonDao.existsById(seasonId)) {
            throw new InstanceNotFoundException("project.entities.season");
        }

        List<SeasonTeam> seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonIdAndTeamId(seasonId, teamId);
        List<Game> games = new ArrayList<>();
        List<Game> games2 = new ArrayList<>();

        for(SeasonTeam seasonTeam : seasonTeams){
            games2 = gameDao.findBySeasonTeamId(seasonTeam.getId());
            for(Game game : games2){
                games.add(game);
            }
        }

        if (games.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.training");
        }

        games = games.stream().distinct().collect(Collectors.toList());
        return games;
    }

    @Override
    public void removeGame(Long gameId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        Game game = gameDao.findById(gameId).get();
        gameDao.delete(game);
    }

    @Override
    public void removePlayerToGame(Long playerId, Long gameId) throws InstanceNotFoundException {

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        List<PlayerGameStatistics> playerGameStatistics = (List<PlayerGameStatistics>) playerGameStatisticsDao.findAll();

        for (PlayerGameStatistics playerGameStatistic : playerGameStatistics) {
            if(playerGameStatistic.getGame() != null && playerGameStatistic.getGame().getId() == gameId && playerGameStatistic.getPlayer().getId() == playerId){
                playerGameStatisticsDao.delete(playerGameStatistic);
            }
        }
    }

    @Override
    public Game updateGame(Long gameId, LocalDateTime gameDate, String rival) throws InstanceNotFoundException {
        
        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        
        Game game = gameDao.findById(gameId).get();

        if(gameDate != null)
            game.setGameDate(gameDate);
        if(rival != null)
            game.setRival(rival);
        gameDao.save(game);
        return game;
    }
}