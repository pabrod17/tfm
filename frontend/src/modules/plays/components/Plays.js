import React, { useEffect, useState, createContext } from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import * as actionsPlayers from '../../players/actions';
import {FormattedDate} from 'react-intl';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const handleRemovePlay = (playId, id, dispatch, history) => {
    dispatch(actions.removePlayToTeam(playId, id, () => history(`/plays/home/${id}`)));
    window.location.reload('true');
}

const handleUpdatePlay = (id, dispatch, history) => {
    dispatch(actions.findPlayById(id, () => history(`/plays/update/${id}`)));
  }

  const handleAddPlayToTeam = (playId, teamId, id, dispatch, history) => {
      if(id != teamId){
        dispatch(actions.addPlayToTeam(teamId, playId, () => history(`/plays/home/${id}`)));
      }
  }

  const handleViewPlay = (playId, dispatch, history) => {
    dispatch(actions.findPlayById(playId, () => history(`/plays/view/${playId}`)));
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    background: 'linear-gradient(-45deg, #061700 10%, #239304 100% )',  // Cambiado a background
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  
  };

  const PlayCard = ({ dispatch, history, item, handleOpenDescriptionModal, handleOpenMedicationModal }) => {
    return (
      <div key={item.id}>
        <div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card_play">
                  <img src={notaLapiz} alt="Person" className="card__image_game"></img>
                  <span class="title">{item.title}</span>
                  <div className="buttons">
                  <button class="post">
                  {item.playType}
                 </button>
                 </div>
                    </div>
                  </div>
                  <div class="flip-card-back">
            <div class="card_play">
            <span class="title">{item.gesture} &nbsp;
            </span>
            <hr></hr>
                    <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple">
                    <span class="desc desc2 scroll_efect_training">{item.description}</span>
            </a>
            <hr></hr>
                    </div>
                    <ul class="social-icons configgrande config_position">
                        <li><a type="button" onClick={() => handleUpdatePlay(item.id, dispatch, history)}>
                        <i class="fa fa-wrench"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  };

function PlaysList({ items, fallback, dispatch, history, openDescription, handleOpenDescription, handleClose }) {
  if (!items || items.length === 0) {
    dispatch(actions.findPlaysByUserId( () => history(`/plays/home`)));
    return fallback;
  } else {
    return items.map(item => (
      <PlayCard dispatch={dispatch} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    ));
  }
}





const Plays = ({plays, id}) => {
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
        <div className="card-group">
          <PlaysList items={plays} fallback={"Loading..."} dispatch = {dispatch} history={history} openDescription={openDescription} handleOpenDescription={handleOpenDescription} />
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
          <Box sx={{ ...style, width: "auto" }}>
            <h2 id="child-modal-title" className="color_modal_title_play" sx={{ mb: '100px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h2>
            <p id="child-modal-description">
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
        </div>
    )
};

Plays.propTypes = {
    plays: PropTypes.array
};

export default Plays;