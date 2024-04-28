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
import bigBall from '../../trainings/components/bigBall.jpg';
import * as actionStretchings from '../../stretchings/actions';
import * as selectorsStretchings from '../../stretchings/selectors';
import * as actionExercises from '../../exercises/actions';
import * as selectorsExercises from '../../exercises/selectors';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const handleViewTraining = (id, dispatch, history) => {
    dispatch(actions.findTrainingById(id, () => history(`/trainings/view/${id}`)));
}

const handleRemoveTraining = (id, dispatch, history) => {
    dispatch(actions.removeTraining(id, () => history(`/trainings/home`)));
}

const handleUpdateTraining = (id, dispatch, history) => {
    dispatch(actions.findTrainingById(id, () => history(`/trainings/update/${id}`)));
}

const handleFindPlayersByTraining = (trainingId, id, dispatch, history) => {
  dispatch(actions.findTrainingById(trainingId, () => console.log(trainingId)));
  dispatch(actionsPlayers.findPlayersByTraining(trainingId, () => history(`/players/home/training/${id}${trainingId}`)));
}

const handleFindStretchingsByTraining = (trainingId, dispatch, history) => {
  dispatch(actionStretchings.findStretchingsByTrainingId(trainingId, () => history(`/stretchings/home/training/${trainingId}`)));
}

const handleAddStretchingToTraining = (trainingId, stretchingId, dispatch, history) => {
  dispatch(actionStretchings.addStretchingToTraining(trainingId, stretchingId, () => history('/trainings/home')));
}

const handleFindExercisesByTraining = (trainingId, dispatch, history) => {
  dispatch(actionExercises.findExercisesByTrainingId(trainingId, () => history(`/exercises/home/training/${trainingId}`)));
}

const handleAddExerciseToTraining = (trainingId, exerciseId, dispatch, history) => {
  dispatch(actionExercises.addExerciseToTraining(trainingId, exerciseId, () => history('/trainings/home')));
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 603,
  background: 'linear-gradient(-45deg, #0f0c29 0%, #302b63 100% )',  // Cambiado a background
  border: '2px solid #000',
  boxShadow: 16.08,
  p: 2.68,
  borderRadius: "13.4px",

};

function obtenerHoraFormateada(fechaHoraString) {
  // Crear un objeto Date a partir de la cadena de texto
  var dateObj = new Date(fechaHoraString);

  // Obtener la hora y los minutos del objeto Date
  var hora = dateObj.getHours();
  var minutos = dateObj.getMinutes();

  // Formatear la hora y los minutos en un string HH:MM
  var horaFormateada = hora.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0');

  return horaFormateada;
}


const TrainingCardUser = ({ dispatch, history, seasonId, item, handleOpenDescriptionModal }) => {
  return (
    <div key={item.id}>
      <div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card_training">
                <img src={bigBall} alt="Person" className="card__image_training"></img>
                <span class="title">{item.objective}</span>
                <div className="buttons">
                <button class="post">{
                <FormattedDate
                   value={ item.trainingDate }
                   year="numeric"
                   month="long"
                   day="numeric"
               /> }
               </button>
               </div>
                  </div>
                </div>
                <div class="flip-card-back">
            <div class="card_training">
            <span class="title" style={{marginBottom:"0px"}}>{obtenerHoraFormateada(item.durationMinutes)} &nbsp;
            </span>
            <hr></hr>
            <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple" style={{marginTop:"-5px", marginBottom:"-5px"}}>
            <span class="desc desc2 scroll_efect_training">{item.description}</span>
          </a>
          <hr></hr>
            </div>
                  <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateTraining(item.id, dispatch, history)}>
                      <i class="fa fa-wrench" style={{fontSize:"15px"}}></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

function TrainingsListUser({seasonId, items, exercisesList, stretchingsList, fallback, dispatch, history, handleOpenDescription }) {
  if (!items || items.length === 0) {
    // dispatch(actions.findTrainingsBySeasonId(seasonId, () => history(`/seasons/update/${seasonId}/training/${1}`)));
    // return fallback;
  } else {
    return items.map(item => (
      <TrainingCardUser dispatch={dispatch} history={history} seasonId={seasonId} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    ));
  }
}

const TrainingsBySeason = ({trainings, seasonId}) => {
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
        <TrainingsListUser seasonId={seasonId} items={trainings} fallback={"Loading..."} dispatch = {dispatch} history={history} handleOpenDescription={handleOpenDescription}/>
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
            <h5 id="child-modal-title" className="color_modal_title_training" sx={{ mb: '67px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h5>
            <p id="child-modal-description" style={{ overflowWrap: 'break-word', fontSize:"8px" }}>
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
        </div>
    );
}

export default TrainingsBySeason;