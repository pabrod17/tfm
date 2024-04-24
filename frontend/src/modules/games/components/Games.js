import React, { useEffect, useState, createContext } from 'react';
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
import naranja from '../../games/components/ballunsplash.jpeg';
import * as actionsStatistics from '../../statistics/actions';
import * as actionStretchings from '../../stretchings/actions';
import * as selectorsStretchings from '../../stretchings/selectors';
import * as actionExercises from '../../exercises/actions';
import * as selectorsExercises from '../../exercises/selectors';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  background: 'linear-gradient(-45deg, #120b4e 0%, #900C0C 100% )',  // Cambiado a background
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",

};

const GameCardUser = ({ dispatch, history, item, handleOpenDescriptionModal }) => {
  return (
    <div key={item.id}>
      <div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card_game">
                <img src={naranja} alt="Person" className="card__image_game"></img>
                <span class="title">{item.rival}</span>
                <div className="buttons">
                <button class="post">{
                <FormattedDate
                   value={ item.gameDate }
                   year="numeric"
                   month="long"
                   day="numeric"
               /> }
               </button>
               </div>
                  </div>
                </div>
                <div class="flip-card-back">
            <div class="card_game">
          <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple">
            <span class="desc3 scroll_efect_stretching">{item.description}</span>
          </a>
          <hr></hr>
            </div>
                  <ul class="social-icons trashgrande trash_position">
                  <li><a type="button" onClick={() => handleRemoveGame(item.id, dispatch, history)}>
                    <i class="fa fa-trash"></i></a></li>
                  </ul>
                  <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateGame(item.id, dispatch, history)}>
                      <i class="fa fa-wrench"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};











  
  function GamesListUser({ items, exercisesList, stretchingsList, fallback, dispatch, history, handleOpenDescription }) {
    if (!items) {
      dispatch(actions.findGamesByUserId(() => history('/games/home')));
      return fallback;
    } else {
      return items.map(item => (
        <GameCardUser dispatch={dispatch} exercisesList={exercisesList} stretchingsList={stretchingsList} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
      ));
    }
  }


const Games = ({games}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const team = useSelector(selectorsTeams.getTeam);
    const player = useSelector(selectorsPlayers.getPlayer);
    const stretchings = useSelector(selectorsStretchings.getAllStretchings);
    const exercises = useSelector(selectorsExercises.getAllExercises);
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

        return(
          <div className="card-group lesions_contaner">
          <GamesListUser items={games} exercisesList={exercisesList} stretchingsList={stretchingsList} fallback={"Loading..."} dispatch = {dispatch} history={history} handleOpenDescription={handleOpenDescription}/>
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
            <h2 id="child-modal-title" className="color_modal_title_game" sx={{ mb: '100px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h2>
            <p id="child-modal-description" style={{ overflowWrap: 'break-word' }}>
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
          </div>
      );


}

Games.propTypes = {
    games: PropTypes.array
};

export default Games;