import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import Card from "react-bootstrap/Card";
import logo21 from './red5.jpeg';
import {FormattedMessage} from 'react-intl';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import logo22 from './logo3.jpeg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  background: 'linear-gradient(-45deg, #ff4800 0%, #000000 60% )',  // Cambiado a background
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",

};

const CardTeam = ({ dispatch, history, item, handleOpenDescriptionModal }) => {
  return (
    <div key={item.id}>
      <div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card_team">
                <img src={logo22} alt="Person" className="card__image_team"></img>
                <span class="title">{item.teamName}</span>
                <div className="buttons">
                <button class="post">
                    {item.arenaName}
                  </button>
               </div>
                  </div>
                </div>
                <div class="flip-card-back">
            <div class="card_team">
            <span class="title">{item.ownerName} &nbsp;
            </span>
            <hr></hr>
          <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple">
            <span class="desc desc3 scroll_efect_team">{item.description}</span>
          </a>
          <hr></hr>
            </div>
                  <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateItem(item.id, dispatch, history)}>
                      <i class="fa fa-wrench"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
  }

const handleUpdateItem = (id, dispatch, history) => {
  dispatch(actions.findTeamById(id, () => history(`/teams/update/${id}`)));
}

function TeamItem({ item, playerId, fallback, dispatch, history, handleOpenDescription }) {
  if (!item) {
    return fallback;
  } else {
    return (
      <CardTeam dispatch={dispatch} history={history} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    );
  }
}


const Team = ({team, playerId}) => {
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
          <TeamItem item={team} playerId={playerId} fallback={"Loading..."} dispatch = {dispatch} history={history} handleOpenDescription={handleOpenDescription} />
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
            <p id="child-modal-description">
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
          </div>
    )

};

export default Team;