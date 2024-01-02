package es.udc.paproject.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface SeasonTeamDao extends PagingAndSortingRepository<SeasonTeam, Long>{

    //Aqui accedo a los seasonTeam de una temporada y de ahi saco los teams de una temporada
    List<SeasonTeam> findSeasonTeamsBySeasonId(Long seasonId);

    List<SeasonTeam> findSeasonTeamsBySeasonIdAndTeamId(Long seasonId, Long teamId);

    List<SeasonTeam> findByUserId(Long userId);

    List<SeasonTeam> findSeasonTeamsByTeamId(Long teamId);

    boolean existsByTeamId(Long teamId);

    void deleteByTeamId(Long teamId);

    void deleteBySeasonId(Long seasonId);
}