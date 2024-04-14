import React, { useEffect, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import { FormattedMessage } from 'react-intl';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import nota1 from './nota1.jpeg';
import nota2 from './nota2.jpeg';

import * as actionsPlayers from '../../players/actions';
import { FormattedDate } from 'react-intl';
//https://formatjs.io/docs/react-intl/components/
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const handleRemoveNote = (noteId, playerId, dispatch, history) => {
  dispatch(actions.removeNote(noteId, () => history(`/players/update/${playerId}/note/${6}`)));
  window.location.reload('true');
}

const handleUpdateNote = (noteId, playerId, dispatch, history) => {
  dispatch(actions.findNoteById(noteId, () => history(`/players/update/${playerId}/note/${6}`)));
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  background: 'linear-gradient(-45deg, #92675a 0%, #070707 100% )',  // Cambiado a background
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",

};

const CardNote = ({ dispatch, playerId, history, item, handleOpenDescriptionModal }) => {
  return (
    <div key={item.id}>
      <div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card_note">
                <img src={nota2} alt="Person" className="card__image_note"></img>
                <span class="title">{item.title}</span>
                <div className="buttons">
                  <button class="post">{
                    <FormattedDate
                      value={item.noteDate}
                      year="numeric"
                      month="long"
                      day="numeric"
                    />}
                  </button>
                </div>
              </div>
            </div>
            <div class="flip-card-back">
              <div class="card_note">
                <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple">
                  <span class="desc desc3 scroll_efect_stretching">{item.description}</span>
                </a>
                <hr></hr>
              </div>
              <ul class="social-icons trashgrande trash_position">
                <li><a type="button" onClick={() => handleRemoveNote(item.id, playerId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
              </ul>
              <ul class="social-icons configgrande config_position">
                <li><a type="button" onClick={() => handleUpdateNote(item.id, playerId, dispatch, history)}>
                  <i class="fa fa-wrench"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function NotesList({ items, playerId, fallback, dispatch, history, handleOpenDescription }) {
  if (!items || items.length === 0) {
    // dispatch(actions.findAllSeasons(() => history('/seasons/home')));
    // return fallback;
  } else {
    return items.map(item => (
      <CardNote dispatch={dispatch} playerId={playerId} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    ));
  }
}


const Notes = ({ notes, playerId, id }) => {
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

  return (
    <div class="card-group lesions_contaner">
      <NotesList items={notes} playerId={playerId} fallback={"Loading..."} dispatch={dispatch} history={history} handleOpenDescription={handleOpenDescription} />
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
  )
}

export default Notes;