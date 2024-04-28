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
import estiramientos from './estiramientos.jpg'; //1920x1200
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const handleRemoveStretchingToPlayer = (id, playerId, dispatch, history) => {
    dispatch(actions.removeStretchingToPlayer(playerId, id, () => history(`/players/update/${playerId}/stretching/${5}`)));
    window.location.reload('true');
}

const handleUpdateStretching = (id, dispatch, history) => {
    dispatch(actions.findStretchingById(id, () => history(`/stretchings/update/${id}`)));
}

const handleViewStretching = (id, dispatch, history) => {
    dispatch(actions.findStretchingById(id, () => history(`/stretchings/view/${id}`)));
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 603,
  bgcolor: 'rgba(255, 0, 221, 0.25)',
  border: '2px solid #000',
  boxShadow: 16.08,
  p: 2.68,
  borderRadius: "13.4px",
};

const StretchingCard = ({ dispatch, playerId, history, item, handleOpenDescriptionModal, handleOpenMedicationModal }) => {
  return (
    <div key={item.id}>
      <div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card_stretching">
                <img src={estiramientos} alt="Person" className="card__image_stretching"></img>
                <span className="title">{item.stretchingName}</span>
                <div className="buttons">
                  <button className="post">{item.stretchingType}</button>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card_stretching">
                <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple ">
                  <span className="desc desc3 scroll_efect_stretching">{item.description}</span>
                </a>
                <hr></hr>
              </div>
              <ul class="social-icons trashgrande trash_position">
                <li><a type="button" onClick={() => handleRemoveStretchingToPlayer(item.id, playerId, dispatch, history)}>
                <i class="fa fa-trash" style={{fontSize:"16px"}}></i></a></li>
              </ul>
              <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateStretching(item.id, dispatch, history)}>
                      <i class="fa fa-wrench" style={{fontSize:"15px"}}></i></a></li>
                  </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function StretchingsList({ items, playerId, fallback, dispatch, history, openDescription, handleOpenDescription, handleClose }) {
  if (!items || items.length === 0) {
    // dispatch(actions.findStretchingsByTrainingId(trainingId, () => history(`/trainings/update/${trainingId}/stretching`)));
    // return fallback;
  } else {
    return items.map(item => (
      <StretchingCard dispatch={dispatch} playerId={playerId} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    ));
  }
}

const StretchingsByPlayer = ({stretchings, playerId}) => {
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
        <StretchingsList items={stretchings} playerId={playerId} fallback={"Loading..."} dispatch = {dispatch} history={history} openDescription={openDescription} handleOpenDescription={handleOpenDescription}/>
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
          <h5 id="child-modal-title" className="color_modal_title_stretching" sx={{ mb: '67px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h5>
          <p id="child-modal-description" style={{ overflowWrap: 'break-word', fontSize:"8px" }}>
            {modalDescription}
          </p>
        </Box>
      </Modal>
    )}
      </div>
  )
};
export default StretchingsByPlayer;