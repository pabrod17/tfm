import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findAllTeamsCompleted = teams => ({
    type: actionTypes.FIND_ALL_TEAMS_COMPLETED,
    teams
});

export const findAllTeams = () => dispatch => {
    backend.teamService.findAllTeams(
        teams => dispatch(findAllTeamsCompleted(teams))
    );
}

const findTeamtByIdCompleted = team => ({
    type: actionTypes.FIND_TEAM_BY_ID_COMPLETED,
    team
});

export const findTeamById = (id, onSuccess) => dispatch => {
    backend.teamService.findTeamById(id,
        team => {dispatch(findTeamtByIdCompleted(team));
        onSuccess();
        }
    );
}


const findTeamtByNameCompleted = team => ({
    type: actionTypes.FIND_TEAM_BY_NAME_COMPLETED,
    team
});

export const findTeamByName = teamName => dispatch => {
    backend.teamService.findTeamByName(teamName,
        team => dispatch(findTeamtByNameCompleted(team)));
}





const findTeamsByNameCompleted = teams => ({
    type: actionTypes.FIND_TEAMS_BY_NAME_COMPLETED,
    teams
});

export const findTeamsByName = (name, onSuccess, onErrors) => dispatch => {
    backend.teamService.findTeamsByName(name,
        teams => {
            dispatch(findTeamsByNameCompleted(teams));
        },
        onSuccess,
        onErrors
    );
};

const findTeamsByArenaCompleted = teams => ({
    type: actionTypes.FIND_TEAMS_BY_ARENA_COMPLETED,
    teams
});

export const findTeamsByArena = (arena, onSuccess, onErrors) => dispatch => {
    backend.teamService.findTeamsByArena(arena,
        teams => {
            dispatch(findTeamsByArenaCompleted(teams));
        },
        onSuccess,
        onErrors
    );
};

const findTeamsByOwnerCompleted = teams => ({
    type: actionTypes.FIND_TEAMS_BY_OWNER_COMPLETED,
    teams
});


export const findTeamsByOwner = (owner, onSuccess, onErrors) => dispatch => {
    backend.teamService.findTeamsByOwner(owner,
        teams => {
            dispatch(findTeamsByOwnerCompleted(teams));
        },
        onSuccess,
        onErrors
    );
};








const updateTeamCompleted = team => ({
    type: actionTypes.UPDATE_TEAM_COMPLETED,
    team
});

export const updateTeam =  (id, name, arenaName, ownerName, description, onSuccess, onErrors) => dispatch =>{
    backend.teamService.updateTeam(id, name, arenaName, ownerName, description,
        team => {
            dispatch(updateTeamCompleted(team));
            onSuccess();
        },
        onErrors);
}

const addTeamCompleted = team => ({
    type: actionTypes.ADD_TEAM_COMPLETED,
    team
});

export const addTeam =  (name, arenaName, ownerName, description, onSuccess, onErrors) => dispatch =>{
    backend.teamService.addTeam(name, arenaName, ownerName, description,
        team => {
            dispatch(addTeamCompleted(team));
            onSuccess();
        },
        onErrors);
}

export const removeTeam = (id, onSuccess, onErrors) => {
    backend.teamService.removeTeam(id, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_TEAM_COMPLETED};

}

export const addTeamToSeason = (seasonId, teamId, onSuccess, onErrors) => {
    backend.teamService.addTeamToSeason(seasonId, teamId, onSuccess, onErrors);
    return {type: actionTypes.ADD_TEAM_TO_SEASON_COMPLETED};
}

const findTeamsToSeasonCompleted =teamsBySeasonId => ({
    type: actionTypes.FIND_TEAMS_TO_SEASON_COMPLETED,
    teamsBySeasonId
});

export const findTeamsToSeason = (seasonId, onSuccess, onErrors) => dispatch => {
    backend.teamService.findTeamsToSeason(seasonId,
        teams => { dispatch(findTeamsToSeasonCompleted(teams));
            onSuccess();
        },
        onErrors);
}

export const removeTeamToSeason = (seasonId, teamId, onSuccess, onErrors) => {
    backend.teamService.removeTeamToSeason(seasonId, teamId, onSuccess(), onErrors);
    return {type: actionTypes.REMOVE_TEAM_TO_SEASON_COMPLETED};
}