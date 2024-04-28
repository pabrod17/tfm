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

const handleRemoveExerciseToGame = (id, gameId, dispatch, history) => {
    dispatch(actions.removeExerciseToGame(gameId, id, () => window.location.reload()));
}

const handleUpdateExercise = (id, dispatch, history) => {
  dispatch(actions.findExerciseById(id, () => history(`/exercises/update/${id}`)));
}

// const handleViewExercise = (id, dispatch, history) => {
//     dispatch(actions.findExerciseById(id, () => history(`/exercises/view/${id}`)));
// }

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 603,
  bgcolor: 'rgba(255, 0, 0, 0.25)',
  border: '2px solid #000',
  boxShadow: 16.08,
  p: 2.68,
  borderRadius: "13.4px",
};

const ExerciseCard = ({ dispatch, gameId, history, item, handleOpenDescriptionModal, handleOpenObjectiveModal }) => {
  return (
    <div key={item.id}>
      <div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card_exercise">
                <img src={exercise} alt="Person" className="card__image_exercise"></img>
                <span className="title">{item.exerciseName}</span>
                <div className="buttons">
                  <button className="post">{item.exerciseType}</button>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card_exercise">
                <a onClick={() => handleOpenDescriptionModal(item.description)} class="without_underline">
                  <span className="desc desc25555555 scroll_efect">{item.description}</span>
                </a>
                <hr></hr>
                <a onClick={() => handleOpenObjectiveModal(item.objective)} class="button_apple" >
                  <span class="desc desc2232323 scroll_efect_lesion">{item.objective}</span>
                </a>
                <hr></hr>
              </div>
              <ul class="social-icons trashgrande trash_position">
                <li><a type="button" onClick={() => handleRemoveExerciseToGame(item.id, gameId, dispatch, history)}>
                <i class="fa fa-trash" style={{fontSize:"16px"}}></i></a></li>
              </ul>
              <ul class="social-icons configgrande config_position">
                <li><a type="button" onClick={() => handleUpdateExercise(item.id, dispatch, history)}>
                <i class="fa fa-wrench" style={{fontSize:"15px"}}></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ExercisesList({ items, gameId, fallback, dispatch, history, openDescription, openObjective, handleOpenDescription, handleOpenObjective, handleClose }) {
  if (!items || items.length === 0) {
    // dispatch(actions.findExercisesByTrainingId(trainingId, () => history(`/trainings/update/${trainingId}/exercise`)));
    // return fallback;
  } else {
    return items.map(item => (
      <ExerciseCard dispatch={dispatch} gameId={gameId} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} handleOpenObjectiveModal={handleOpenObjective} />
    ));
  }
}

const ExercisesByGame = ({exercises, gameId}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [modalDescription, setModalDescription] = useState('');
    const [modalObjective, setModalObjective] = useState('');
    const [openDescription, setOpenDescription] = React.useState(false);
    const [openObjective, setOpenObjective] = React.useState(false);
  
    const handleOpenDescription = (description) => {
      setModalDescription(description);
      setOpenDescription(true);
    };
  
    const handleOpenObjective = (objective) => {
      setModalObjective(objective);
      setOpenObjective(true);
    };
  
    const handleClose = () => {
      setModalDescription('');
      setModalObjective('');
      setOpenDescription(false);
      setOpenObjective(false);
    };

    return(
<div className="card-group lesions_contaner">
      <ExercisesList items={exercises} gameId={gameId} fallback={"Loading..."} dispatch={dispatch} history={history} openDescription={openDescription} openObjective={openObjective} handleOpenDescription={handleOpenDescription} handleOpenObjective={handleOpenObjective} />
      {(openDescription || openObjective) && (
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
          <h5 id="child-modal-title" className="color_modal_title" sx={{ mb: '67px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h5>
          <p id="child-modal-description" style={{ overflowWrap: 'break-word', fontSize:"8px" }}>
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
      {openObjective && (
        <Modal
          open={openObjective}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-objective"
        >
          <Box sx={{ ...style, width: "auto", maxWidth: "40vw" }}>
          <h5 id="child-modal-title" className="color_modal_title" sx={{ mb: '67px' }} ><FormattedMessage id="project.exercises.fields.objective" />:</h5>
          <p id="child-modal-objective" style={{ overflowWrap: 'break-word', fontSize:"8px" }}>
              {modalObjective}
            </p>
          </Box>
        </Modal>
      )}
    </div>
    )
};

export default ExercisesByGame;