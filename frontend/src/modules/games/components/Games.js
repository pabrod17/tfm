import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import {FormattedDate} from 'react-intl';
import * as actionsPlayers from '../../players/actions';
import * as selectorsPlayers from '../../players/selectors';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import bigBall from '../../trainings/components/bigBall.jpg';
import naranja from '../../games/components/naranja.jpg';
import * as actionsStatistics from '../../statistics/actions';
import * as actionStretchings from '../../stretchings/actions';
import * as selectorsStretchings from '../../stretchings/selectors';
import * as actionExercises from '../../exercises/actions';
import * as selectorsExercises from '../../exercises/selectors';

const handleViewGame = (id, dispatch, history) => {
    dispatch(actions.findGameById(id, () => history(`/games/view/${id}`)));
}

const handleRemoveGame = (id, dispatch, history) => {
    dispatch(actions.removeGame(id, () => history(`/games/home`)));
    window.location.reload('true');
}

const handleRemoveGameToPlayer = (gameId, playerId, dispatch, history) => {
  dispatch(actions.removePlayerToGame(playerId, gameId, () => console.log(gameId)));
  window.location.reload('true');
  dispatch(actions.findGamesByPlayerId(playerId, () => history(`/games/home`)));
}

const handleUpdateGame = (id, dispatch, history) => {
    dispatch(actions.findGameById(id, () => history(`/games/update/${id}`)));
}

const handleFindPlayersByGame = (gameId, id, dispatch, history) => {
  dispatch(actions.findGameById(gameId, () => console.log(gameId)));
  dispatch(actionsPlayers.findPlayersByGame(gameId, () => history(`/players/home/game/${id}${gameId}`)));
}

const handleAddGameStatistics = (gameId, dispatch, history) => {
  history(`/statistics/addGameStatistics/${gameId}`);
}

const handleFindGameStatisticsByGame = (gameId, dispatch, history) => {
  dispatch(actionsStatistics.findStatisticsByGame(gameId, () => history(`/statistics/game/${gameId}`)));
}

const handleFindStretchingsByGame = (gameId, dispatch, history) => {
  dispatch(actionStretchings.findStretchingsByGameId(gameId, () => history(`/stretchings/home/game/${gameId}`)));
}

const handleAddStretchingToGame = (gameId, stretchingId, dispatch, history) => {
  dispatch(actionStretchings.addStretchingToGame(gameId, stretchingId, () => history('/games/home')));
}

const handleFindExercisesByGame = (gameId, dispatch, history) => {
  dispatch(actionExercises.findExercisesByGameId(gameId, () => history(`/exercises/home/game/${gameId}`)));
}

const handleAddExerciseToGame = (gameId, exerciseId, dispatch, history) => {
  dispatch(actionExercises.addExerciseToGame(gameId, exerciseId, () => history('/games/home')));
}


function GamesList({ items, exercisesList, stretchingsList, player, teamId, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findGamesByUserId(() => history('/games/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola games">
                <img src={naranja} alt="Person" class="card__image partidito"></img>
                <p class="card__name"><FormattedMessage id="project.games.fields.rival"/>: {item.rival}</p>
                <p class="card__name">                
                <FormattedDate
                    value={ item.gameDate }
                    year="numeric"
                    month="long"
                    day="numeric"
                /> 
                </p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveGameToPlayer(item.id, player.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewGame(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateGame(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>

                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.stretchings.fields.addStretching"/></button>
                            <div class="dropdown-content">
                            {stretchingsList.map(stretching => 
                                        <a type="button" onClick={() => handleAddStretchingToGame(item.id, stretching.id, dispatch, history)}> 
                                            {stretching.id} : {" Rival: "}{stretching.stretchingName}
                                        </a>)}
                            </div>
                </div>
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.exercises.fields.addExercise"/></button>
                            <div class="dropdown-content">
                            {exercisesList.map(exercise => 
                                        <a type="button" onClick={() => handleAddExerciseToGame(item.id, exercise.id, dispatch, history)}> 
                                            {exercise.id} : {exercise.exerciseName}
                                        </a>)}
                            </div>
                </div>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindPlayersByGame(item.id, teamId,dispatch, history)}><FormattedMessage id="project.players.fields.players"/></button>
                <button className="btn-player draw-border" onClick={() => handleFindGameStatisticsByGame(item.id, dispatch, history)}><FormattedMessage id="project.statistics.fields.game"/></button>
                <button className="btn-player draw-border" onClick={() => handleAddGameStatistics(item.id, dispatch, history)}><FormattedMessage id="project.statistics.fields.addGameStatistics"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindStretchingsByGame(item.id, dispatch, history)}><FormattedMessage id="project.stretchings.fields.myStretchings"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindExercisesByGame(item.id, dispatch, history)}><FormattedMessage id="project.exercises.fields.myExercises"/></button>
              </div>
            </div>
          </div>;
        });
      }
}


function GamesListUser({ items, exercisesList, stretchingsList, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findGamesByUserId(() => history('/games/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola gamesuser">
                <img src={naranja} alt="Person" class="card__image partidito"></img>
                <p class="card__name">Rival: {item.rival}</p>
                <p class="card__name">                
                <FormattedDate
                    value={ item.gameDate }
                    year="numeric"
                    month="long"
                    day="numeric"
                /> 
                </p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveGame(item.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewGame(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateGame(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
  
                {/* <div class="dropdown">
                <button class="btn-player draw-border">Change Team</button>
                            <div class="dropdown-content">
                            {playersList.map(team => 
                                        <a type="button" onClick={() => handleFindPlayersByTraining(item.id, team.id, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                </div> */}
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.stretchings.fields.addStretching"/></button>
                            <div class="dropdown-content">
                            {stretchingsList.map(stretching => 
                                        <a type="button" onClick={() => handleAddStretchingToGame(item.id, stretching.id, dispatch, history)}> 
                                            {stretching.id} : {" Rival: "}{stretching.stretchingName}
                                        </a>)}
                            </div>
                </div>
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.exercises.fields.addExercise"/></button>
                            <div class="dropdown-content">
                            {exercisesList.map(exercise => 
                                        <a type="button" onClick={() => handleAddExerciseToGame(item.id, exercise.id, dispatch, history)}> 
                                            {exercise.id} : {exercise.exerciseName}
                                        </a>)}
                            </div>
                </div>
                  <button className="btn-player draw-border" onClick={() => handleFindGameStatisticsByGame(item.id, dispatch, history)}><FormattedMessage id="project.statistics.fields.game"/></button>
                  <button className="btn-player draw-border" onClick={() => handleAddGameStatistics(item.id, dispatch, history)}><FormattedMessage id="project.statistics.fields.addGameStatistics"/></button>
                  <button class="btn-player draw-border" type="button" onClick={() => handleFindStretchingsByGame(item.id, dispatch, history)}><FormattedMessage id="project.stretchings.fields.myStretchings"/></button>
                  <button class="btn-player draw-border" type="button" onClick={() => handleFindExercisesByGame(item.id, dispatch, history)}><FormattedMessage id="project.exercises.fields.myExercises"/></button>
              </div>
            </div>
          </div>;
        });
      }
  }
















const Games = ({games}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const team = useSelector(selectorsTeams.getTeam);
    const player = useSelector(selectorsPlayers.getPlayer);
    const stretchings = useSelector(selectorsStretchings.getAllStretchings);
    const exercises = useSelector(selectorsExercises.getAllExercises);

    const exercisesList = exercises.exercises;

    if(!exercisesList) {
        dispatch(actionExercises.findAllExercises(() => history('/trainings/home')));
        return "Loading...";
    }

    const stretchingsList = stretchings.stretchings;

    if(!stretchingsList) {
        dispatch(actionStretchings.findAllStretchings(() => history('/games/home')));
        return "Loading...";
    }

    if (!team) {
        return(
          <div className="card-group">
          <GamesListUser items={games} exercisesList={exercisesList} stretchingsList={stretchingsList} fallback={"Loading..."} dispatch = {dispatch} history={history} />
          </div>
      );
    } else {
        return(
            <div className="card-group">
            <GamesList items={games} exercisesList={exercisesList} stretchingsList={stretchingsList} player={player} teamId={team.id} fallback={"Loading..."} dispatch = {dispatch} history={history} />
            </div>
        );
    };

}

Games.propTypes = {
    games: PropTypes.array
};

export default Games;