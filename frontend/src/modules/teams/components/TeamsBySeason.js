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
import exercise from '../../app/components/exercise.jpg';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import bigBall from '../../seasons/components/red5.jpeg';
import logo22 from './logo3.jpeg';

const handleRemoveTeamToSeason = (id, seasonId, dispatch, history) => {
    dispatch(actions.removeTeamToSeason(seasonId, id, () => window.location.reload()));
}

const handleUpdateItem = (id, dispatch, history) => {
  dispatch(actions.findTeamById(id, () => history(`/teams/update/${id}`)));
}

// const handleUpdateExercise = (id, dispatch, history) => {
//     dispatch(actions.findExerciseById(id, () => history(`/exercises/update/${id}`)));
// }

// const handleViewExercise = (id, dispatch, history) => {
//     dispatch(actions.findExerciseById(id, () => history(`/exercises/view/${id}`)));
// }

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 603,
  background: 'linear-gradient(-45deg, #ff4800 0%, #000000 60% )',  // Cambiado a background
  border: '2px solid #000',
  boxShadow: 16.08,
  p: 2.68,
  borderRadius: "13.4px",

};

const TeamCard = ({ dispatch, seasonId, history, item, handleOpenDescriptionModal, handleOpenOwnerNameModal }) => {
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
            <span class="title" style={{marginBottom:"0px"}}>{item.ownerName} &nbsp;
            </span>
            <hr></hr>
          <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple" style={{marginTop:"-5px", marginBottom:"-5px"}}>
            <span class="desc desc3 scroll_efect_team">{item.description}</span>
          </a>
                <hr></hr>
              </div>
              <ul class="social-icons trashgrande trash_position">
                <li><a type="button" onClick={() => handleRemoveTeamToSeason(item.id, seasonId, dispatch, history)}>
                <i class="fa fa-trash" style={{fontSize:"16px"}}></i></a></li>
              </ul>
              <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateItem(item.id, dispatch, history)}>
                      <i class="fa fa-wrench" style={{fontSize:"15px"}}></i></a></li>
                  </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function TeamsList({ items, seasonId, fallback, dispatch, history, openDescription, openOwnerName, handleOpenDescription, handleOpenOwnerName, handleClose }) {
  if (!items || items.length === 0) {
    // dispatch(actions.findExercisesByTrainingId(trainingId, () => history(`/trainings/update/${trainingId}/exercise`)));
    // return fallback;
  } else {
    return items.map(item => (
      <TeamCard dispatch={dispatch} seasonId={seasonId} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} handleOpenOwnerNameModal={handleOpenOwnerName} />
    ));
  }
}

const TeamsBySeason = ({teams, seasonId}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [modalDescription, setModalDescription] = useState('');
    const [modalOwnerName, setModalOwnerName] = useState('');
    const [openDescription, setOpenDescription] = React.useState(false);
    const [openOwnerName, setOpenOwnerName] = React.useState(false);
  
    const handleOpenDescription = (description) => {
      setModalDescription(description);
      setOpenDescription(true);
    };
  
    const handleOpenOwnerName = (ownerName) => {
      setModalOwnerName(ownerName);
      setOpenOwnerName(true);
    };
  
    const handleClose = () => {
      setModalDescription('');
      setModalOwnerName('');
      setOpenDescription(false);
      setOpenOwnerName(false);
    };

    return(
<div className="card-group lesions_contaner">
      <TeamsList items={teams} seasonId={seasonId} fallback={"Loading..."} dispatch={dispatch} history={history} openDescription={openDescription} openOwnerName={openOwnerName} handleOpenDescription={handleOpenDescription} handleOpenOwnerName={handleOpenOwnerName} />
      {(openDescription || openOwnerName) && (
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
            <h2 id="child-modal-title" className="color_modal_title" sx={{ mb: '100px' }} >Description:</h2>
            <p id="child-modal-description">
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
      {openOwnerName && (
        <Modal
          open={openOwnerName}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-objective"
        >
          <Box sx={{ ...style, width: "auto", maxWidth: "40vw" }}>
            <h2 id="child-modal-title" className="color_modal_title" sx={{ mb: '100px' }} >OwnerName:</h2>
            <p id="child-modal-objective">
              {modalOwnerName}
            </p>
          </Box>
        </Modal>
      )}
    </div>
    )
};

export default TeamsBySeason;