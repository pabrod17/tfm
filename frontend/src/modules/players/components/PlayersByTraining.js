import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import * as actionsLesion from '../../lesion/actions';
import * as selectorsLesion from '../../lesion/selectors';
import * as actionsNotes from '../../notes/actions';
import * as actionTrainings from '../../trainings/actions';
import * as selectorsTrainings from '../../trainings/selectors';
import * as actionGames from '../../games/actions';
import * as selectorsGames from '../../games/selectors';
import * as actionStretchings from '../../stretchings/actions';
import * as selectorsStretchings from '../../stretchings/selectors';

const handleFindTrainingsToPlayer = (playerId, dispatch, history) => {
    dispatch(actionTrainings.findTrainingsByPlayerId(playerId, () => history('/trainings/home')));
    // history('/trainings/home');
  }

  const handleFindGamesToPlayer = (playerId, id, dispatch, history) => {
    dispatch(actions.findPlayerByIdOfTeam(playerId,id, () => console.log(playerId)));
    dispatch(actionGames.findGamesByPlayerId(playerId, () => history('/games/home')));
    // history('/trainings/home');
  }
  
  const handleRemovePlayer = (playerId, trainingId, id, dispatch, history) => {
    dispatch(actions.removePlayer(playerId, id, () => history(`/players/home/training/${id}${trainingId}`)));
    window.location.reload('true');
  }

  const handleRemovePlayerToTraining = (playerId, trainingId, id, dispatch, history) => {
    dispatch(actionTrainings.removePlayerToTraining(playerId, trainingId, () => history(`/players/home/training/${id}${trainingId}`)));
    window.location.reload('true');
  }
  
  const handleUpdatePlayer = (playerId, id, dispatch, history) => {
    dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history(`/players/update/${id}`)));
  }
  
  const handleViewPlayer = (playerId, id, dispatch, history) => {
    dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history(`/players/view/${id}${playerId}`)));
  }
  
  const handleChangeTeam = (playerId, id, trainingId, dispatch, history) => {
    dispatch(actions.changePlayerToTeam(id, playerId, () => history(`/players/home/training/${id}${trainingId}`)));
    dispatch(actionsTeams.findTeamById(id));
    window.location.reload('true');
  }
  
  const handleAddLesionToPlayer = (playerId, lesionId, id, trainingId, dispatch, history) => {
    dispatch(actionsLesion.addLesionToPlayer(playerId, lesionId, () => history(`/players/home/training/${id}${trainingId}`)));
  }
  
  const handleFindLesionByPlayer = (playerId, dispatch, history) => {
    dispatch(actionsLesion.findLesionByPlayer(playerId, () => history(`/lesion/home/player/${playerId}`)));
  }
  
  const handleFindNotesByPlayer = (playerId, id, dispatch, history) => {
    console.log("player(12) --> " + playerId);
    console.log("team(1) --> " + id);
    dispatch(actionsNotes.findNotesByPlayer(playerId, () => history(`/notes/home/${id}${playerId}`)));
  }
  
  const handleAddNewTrainingToPlayer = (playerId, trainingId, id, dispatch, history) => {
    dispatch(actionTrainings.addPlayerToTraining(playerId, trainingId, () => history(`/players/home/training/${id}${trainingId}`)));
  }

  const handleAddNewGameToPlayer = (playerId, gameId, id, trainingId, dispatch, history) => {
    dispatch(actionGames.addPlayerToGame(playerId, gameId, () => history(`/players/home/training/${id}${trainingId}`)));
  }
  
  const handleFindStretchingsByPlayer = (playerId, dispatch, history) => {
    dispatch(actionStretchings.findStretchingsByPlayerId(playerId, () => history(`/stretchings/home/player/${playerId}`)));
  }
  
  const handleAddStretchingToPlayer = (playerId, stretchingId, id, trainingId, dispatch, history) => {
    dispatch(actionStretchings.addStretchingToPlayer(playerId, stretchingId, () => history(`/players/home/training/${id}${trainingId}`)));
  }
  

  function PlayersList({ items, stretchingsList, gamesList, trainingId, trainingsList, lesionList, teamsList, id, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findPlayersByTraining(trainingId, () => history(`/players/home/training/${id}${trainingId}`)));
    
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola trainingplayer">
                <img src={avatar} alt="Person" class="card__image"></img>
                <p class="card__name">{item.playerName}</p>
                <div class="grid-container">
                </div>
                <ul class="social-icons">
                  <li><a type="button" onClick={() => handleRemovePlayer(item.id, trainingId, id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewPlayer(item.id, id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                  <li><a type="button" onClick={() => handleUpdatePlayer(item.id, id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  {/* <li><a href="#"><i class="fa fa-codepen"></i></a></li> */}
                  {item.injured ?   
                      <i class="fa fa-wheelchair injured"><FormattedMessage id="project.lesion.fields.injured"/></i>:  
                      ''}
                </ul>
                <button class="btn-player draw-border" onClick={() => history(`/notes/addNote/${item.id}`)}><FormattedMessage id="project.notes.fields.addNote"/></button>
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.lesion.fields.addLesion"/></button>
                  <div class="dropdown-content">
                              {lesionList.map(lesion => 
                                          <a type="button" onClick={() => handleAddLesionToPlayer(item.id, lesion.id, id, trainingId, dispatch, history)}> 
                                              {lesion.id} : {"  "}{lesion.lesionName}
                                          </a>)}
                    </div>
                    </div>

                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.teams.fields.changeTeam"/></button>
                            <div class="dropdown-content">
                            {teamsList.map(team => 
                                        <a type="button" onClick={() => handleChangeTeam(item.id, team.id, trainingId, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                </div>

                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.trainings.fields.addTraining"/></button>
                            <div class="dropdown-content">
                            {trainingsList.map(training => 
                                        <a type="button" onClick={() => handleAddNewTrainingToPlayer(item.id, training.id, id, dispatch, history)}> 
                                            {training.id} : {"  "}{training.objective}
                                        </a>)}
                            </div>
                </div>
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.games.fields.addGame"/></button>
                            <div class="dropdown-content">
                            {gamesList.map(game => 
                                        <a type="button" onClick={() => handleAddNewGameToPlayer(item.id, game.id, id, trainingId, dispatch, history)}> 
                                            {game.id} : {" Rival: "}{game.rival}
                                        </a>)}
                            </div>
                </div>
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.stretchings.fields.addStretching"/></button>
                            <div class="dropdown-content">
                            {stretchingsList.map(stretching => 
                                        <a type="button" onClick={() => handleAddStretchingToPlayer(item.id, stretching.id, id, trainingId, dispatch, history)}> 
                                            {stretching.id} : {" Rival: "}{stretching.stretchingName}
                                        </a>)}
                            </div>
                </div>
                <button class="btn-player draw-border" onClick={() => handleFindNotesByPlayer(item.id, id, dispatch, history)}><FormattedMessage id="project.notes.fields.myNotes"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindLesionByPlayer(item.id, dispatch, history)}><FormattedMessage id="project.lesion.fields.myLesion"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindTrainingsToPlayer(item.id, dispatch, history)}><FormattedMessage id="project.trainings.fields.myTrainings"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleRemovePlayerToTraining(item.id, trainingId, id, dispatch, history)}><FormattedMessage id="project.trainings.fields.removeTraining"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindGamesToPlayer(item.id, id, dispatch, history)}><FormattedMessage id="project.games.fields.myGames"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindStretchingsByPlayer(item.id, dispatch, history)}><FormattedMessage id="project.stretchings.fields.myStretchings"/></button>

              </div>
            </div>

          </div>;
        });
      }
}

const PlayersByTraining = ({players, id, trainingId}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const teams = useSelector(selectorsTeams.getAllTeams);
    const lesions = useSelector(selectorsLesion.getAllLesion);
    const trainings = useSelector(selectorsTrainings.getAllTrainings);
    const games = useSelector(selectorsGames.getAllGames);
    const stretchings = useSelector(selectorsStretchings.getAllStretchings);


    const stretchingsList = stretchings.stretchings;

    if(!stretchingsList) {
        dispatch(actionStretchings.findAllStretchings(() => history(`/players/home/${id}`)));
        return "Loading...";
    }
    
    const gamesList = games.games;

    if(!gamesList) {
        dispatch(actionGames.findGamesByTeamId(id, () => history(`/players/home/${id}`)));
        return "Loading...";
    }

    const trainingsList = trainings.trainings;

    if(!trainingsList) {
        dispatch(actionTrainings.findTrainingsByTeamId(id, () => history(`/players/home/training/${id}${trainingId}`)));
        return "Loading...";
    }
    

    const teamsList = teams.teams;

    if(!teamsList) {
        dispatch(actionsTeams.findAllTeams());
        return "Loading...";
    }
    
    const lesionList = lesions.lesions;

    if(!lesionList) {
        dispatch(actionsLesion.findAllLesion());
        return "Loading...";
    }

    return(
        <div className="card-group">
          <PlayersList items={players} stretchingsList={stretchingsList} gamesList={gamesList} trainingId={trainingId} trainingsList={trainingsList} lesionList={lesionList} teamsList={teamsList} id={id} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

PlayersByTraining.propTypes = {
    playersByTraining: PropTypes.array
};


export default PlayersByTraining;


