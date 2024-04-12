import React, { useEffect, useState, createContext } from 'react';
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
import * as actionStatistics from '../../statistics/actions';
import * as actionStretchings from '../../stretchings/actions';
import * as selectorsStretchings from '../../stretchings/selectors';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import perfil1 from './avatar.jpg'; //1920x1200
import perfil2 from './perfil2.jpeg'; //1920x1200
import perfil3 from './perfil8.jpeg'; //1920x1200
import perfil4 from './perfil9.png'; //1920x1200


const handleFindTrainingsToPlayer = (playerId, dispatch, history) => {
    dispatch(actionTrainings.findTrainingsByPlayerId(playerId, () => history('/trainings/home')));
    // history('/trainings/home');
  }
  
  const handleFindGamesToPlayer = (playerId, dispatch, history) => {
    dispatch(actionGames.findGamesByPlayerId(playerId, () => history('/games/home')));
    // history('/trainings/home');
  }
  
  const handleRemovePlayer = (playerId, gameId, id, dispatch, history) => {
    dispatch(actions.removePlayer(playerId, id, () => history(`/players/home/game/${id}${gameId}`)));
    window.location.reload('true');
  }

  const handleRemove = (playerId, dispatch, history) => {
    dispatch(actions.removePlayer(playerId, () => history(`/players/home`)));
    window.location.reload('true');
  }

  const handleRemovePlayerToGame = (playerId, gameId, id, dispatch, history) => {
    dispatch(actionGames.removePlayerToGame(playerId, gameId, () => window.location.reload()));
  }
  
  const handleUpdatePlayer = (playerId, id, dispatch, history) => {
    dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history(`/players/update/${id}`)));
  }
  
  const handleViewPlayer = (playerId, id, dispatch, history) => {
    dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history(`/players/view/${id}${playerId}`)));
  }
  
  const handleChangeTeam = (playerId, id, dispatch, history) => {
    dispatch(actions.changePlayerToTeam(id, playerId, () => history(`/players/home/${id}`)));
    dispatch(actionsTeams.findTeamById(id));
    window.location.reload('true');
  }
  
  const handleAddLesionToPlayer = (playerId, lesionId, id, dispatch, history) => {
    dispatch(actionsLesion.addLesionToPlayer(playerId, lesionId, () => history(`/players/home/${id}`)));
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
    dispatch(actionTrainings.addPlayerToTraining(playerId, trainingId, () => history(`/players/home/${id}`)));
  }


  const handleAddNewGameToPlayer = (playerId, gameId, id, dispatch, history) => {
    dispatch(actionGames.addPlayerToGame(playerId, gameId, () => history(`/players/home/${id}`)));
  }

  const handleAddPlayerGameStatistics = (playerId, gameId, dispatch, history) => {
    history(`/statistics/addPlayerGameStatistics/${playerId}${gameId}`);
  }
  
  const handleFindPlayerGameStatistics = (playerId, gameId, dispatch, history) => {
    dispatch(actionStatistics.findStatisticsByPlayerAndGame(playerId, gameId, () => history(`/statistics/playerGame/${playerId}${gameId}`)));
  }

  const handleFindStretchingsByPlayer = (playerId, dispatch, history) => {
    dispatch(actionStretchings.findStretchingsByPlayerId(playerId, () => history(`/stretchings/home/player/${playerId}`)));
  }
  
  const handleAddStretchingToPlayer = (playerId, stretchingId, id, gameId, dispatch, history) => {
    dispatch(actionStretchings.addStretchingToPlayer(playerId, stretchingId, () => history(`/players/home/game/${id}${gameId}`)));
  }


//   function PlayersList({ items, stretchingsList, gameId, gamesList, trainingsList, lesionList, teamsList, id, fallback, dispatch, history}) {
//     if (!items || items.length === 0) {
//         dispatch(actions.findPlayersByGame(gameId, () => history(`/players/home/game/${id}${gameId}`)));
    
//         return fallback;
//     } else {
//         return items.map(item => {
//           return <div className="images-teams" key={item.id}>
            
//             <div class="">
//               <div class="card hola gameplayer">
//                 <img src={avatar} alt="Person" class="card__image"></img>
//                 <p class="card__name">{item.playerName}</p>
//                 <div class="grid-container">
//                 </div>
//                 <ul class="social-icons">
//                   <li><a type="button" onClick={() => handleRemovePlayer(item.id, gameId, id, dispatch, history)}>
//                   <i class="fa fa-trash"></i></a></li>
                  
//                   <li><a type="button" onClick={() => handleViewPlayer(item.id, id, dispatch, history)}>
//                     <i class="fa fa-address-book"></i></a></li>
//                   <li><a type="button" onClick={() => handleUpdatePlayer(item.id, id, dispatch, history)}>
//                     <i class="fa fa-wrench"></i></a></li>
//                   {/* <li><a href="#"><i class="fa fa-codepen"></i></a></li> */}
//                   {item.injured ?   
//                       <i class="fa fa-wheelchair injured"><FormattedMessage id="project.lesion.fields.injured"/></i>:  
//                       ''}
//                 </ul>
//                 <button class="btn-player draw-border" onClick={() => history(`/notes/addNote/${item.id}`)}><FormattedMessage id="project.notes.fields.addNote"/></button>
//                 <div class="dropdown">
//                 <button class="btn-player draw-border"><FormattedMessage id="project.lesion.fields.addLesion"/></button>
//                   <div class="dropdown-content">
//                               {lesionList.map(lesion => 
//                                           <a type="button" onClick={() => handleAddLesionToPlayer(item.id, lesion.id, id, dispatch, history)}> 
//                                               {lesion.id} : {"  "}{lesion.lesionName}
//                                           </a>)}
//                     </div>
//                     </div>

//                 <div class="dropdown">
//                 <button class="btn-player draw-border"><FormattedMessage id="project.teams.fields.changeTeam"/></button>
//                             <div class="dropdown-content">
//                             {teamsList.map(team => 
//                                         <a type="button" onClick={() => handleChangeTeam(item.id, team.id, dispatch, history)}> 
//                                             {team.id} : {"  "}{team.teamName}
//                                         </a>)}
//                             </div>
//                 </div>

//                 <div class="dropdown">
//                 <button class="btn-player draw-border"><FormattedMessage id="project.trainings.fields.addTraining"/></button>
//                             <div class="dropdown-content">
//                             {trainingsList.map(training => 
//                                         <a type="button" onClick={() => handleAddNewTrainingToPlayer(item.id, training.id, id, dispatch, history)}> 
//                                             {training.id} : {"  "}{training.objective}
//                                         </a>)}
//                             </div>
//                 </div>
//                 <div class="dropdown">
//                 <button class="btn-player draw-border"><FormattedMessage id="project.games.fields.addGame"/></button>
//                             <div class="dropdown-content">
//                             {gamesList.map(game => 
//                                         <a type="button" onClick={() => handleAddNewGameToPlayer(item.id, game.id, id, dispatch, history)}> 
//                                             {game.id} : {" Rival: "}{game.rival}
//                                         </a>)}
//                             </div>
//                 </div>
//                 <div class="dropdown">
//                 <button class="btn-player draw-border"><FormattedMessage id="project.stretchings.fields.addStretching"/></button>
//                             <div class="dropdown-content">
//                             {stretchingsList.map(stretching => 
//                                         <a type="button" onClick={() => handleAddStretchingToPlayer(item.id, stretching.id, id, gameId, dispatch, history)}> 
//                                             {stretching.id} : {" Rival: "}{stretching.stretchingName}
//                                         </a>)}
//                             </div>
//                 </div>
//                 <button class="btn-player draw-border" onClick={() => handleFindNotesByPlayer(item.id, id, dispatch, history)}><FormattedMessage id="project.notes.fields.myNotes"/></button>
//                 <button class="btn-player draw-border" type="button" onClick={() => handleFindLesionByPlayer(item.id, dispatch, history)}><FormattedMessage id="project.lesion.fields.myLesion"/></button>
//                 <button class="btn-player draw-border" type="button" onClick={() => handleFindTrainingsToPlayer(item.id, dispatch, history)}><FormattedMessage id="project.trainings.fields.myTrainings"/></button>
//                 <button class="btn-player draw-border" type="button" onClick={() => handleFindGamesToPlayer(item.id, dispatch, history)}><FormattedMessage id="project.games.fields.myGames"/></button>
//                 <button class="btn-player draw-border" type="button" onClick={() => handleRemovePlayerToGame(item.id, gameId, id, dispatch, history)}><FormattedMessage id="project.games.fields.removeGame"/></button>
//                 <button className="btn-player draw-border" onClick={() => handleFindPlayerGameStatistics(item.id, gameId, dispatch, history)}><FormattedMessage id="project.statistics.fields.playerGameStatistics"/></button>
//                 <button className="btn-player draw-border" onClick={() => handleAddPlayerGameStatistics(item.id, gameId, dispatch, history)}><FormattedMessage id="project.statistics.fields.addGameStatistics"/></button>
//                 <button class="btn-player draw-border" type="button" onClick={() => handleFindStretchingsByPlayer(item.id, dispatch, history)}><FormattedMessage id="project.stretchings.fields.myStretchings"/></button>
//               </div>
//             </div>

//           </div>;
//         });
//       }
// }





    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 900,
      bgcolor: 'rgb(59, 4, 26)',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      borderRadius: "20px",
    };
    
    const PlayerCard = ({ dispatch, history, item, handleOpenDescriptionModal, handleOpenMedicationModal }) => {
      return (
        <div key={item.id}>
          <div>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                {item.injured ? (
                <ul className="social-icons injuredhover injured_position">
                  <li>
                    <a type="button">
                    {/* <i className="fa fa-exclamation-triangle" style={{ top: '13px', left: '12px', fontSize: '20px'}}></i> */}
                    <i className="fa fa-exclamation-triangle" style={{ top: '10.5px', left: '10.5px', fontSize: '23px', color:"red" }}></i>
                    </a>
                  </li>
                </ul>
              ) : null}
                  <div className="card_player">
                    <img src={perfil2} alt="Person" className="card__image_player"></img>
                    <span className="title">{item.playerName} {item.primaryLastName}</span>
                    <div className="buttons">
                      <button className="post">{item.position}</button>
                    </div>
                    {/* Injured? */}
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="card_player">
                  <a class="button_apple ">
                      <span className="desc desc3 scroll_efect_stretching">{item.email}</span>
                    </a>
                    <hr></hr>
                    <a onClick={() => handleOpenDescriptionModal(item.trends)} class="button_apple ">
                      <span className="desc desc3 scroll_efect_stretching">{item.trends}</span>
                    </a>
                    <hr></hr>
                  </div>
                  <ul class="social-icons trashgrande trash_position">
                    <li><a type="button" onClick={() => handleRemovePlayer(item.id, dispatch, history)}>
                      <i class="fa fa-trash"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };


    function PlayersList({ items, fallback, dispatch, history, openDescription, handleOpenDescription}) {
      if (!items) {
        dispatch(actions.findPlayersByUserId(() => history('/players/home')));
        return fallback;
      } else {
        return items.map(item => (
          <PlayerCard dispatch={dispatch} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
        ));
      }
    }


const Players = ({players}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const [modalDescription, setModalDescription] = useState('');
    const [openDescription, setOpenDescription] = React.useState(false);
  
    const handleOpenDescription = (description) => {
      setModalDescription(description);
      setOpenDescription(true);
    };
  
    const handleClose = () => {
      setModalDescription('');
      setOpenDescription(false);
    };

    return(
        <div className="card-group lesions_contaner">
          <PlayersList items={players} fallback={"Loading..."} dispatch = {dispatch} history={history} openDescription={openDescription} handleOpenDescription={handleOpenDescription} />
          {(openDescription) && (
      <div className="modal-backdrop" onClick={handleClose}></div>
    )}
    {openDescription && (
      <Modal
        open={openDescription}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
          <Box sx={{ ...style, width: "auto", maxWidth: "40vw" }}>
          <h2 id="child-modal-title" className="color_modal_title_player" sx={{ mb: '100px' }} ><FormattedMessage id="project.players.fields.trends" />:</h2>
          <p id="child-modal-description" style={{ overflowWrap: 'break-word' }}>
            {modalDescription}
          </p>
        </Box>
      </Modal>
    )}
      </div>
  )
};

Players.propTypes = {
    players: PropTypes.array
};

export default Players;