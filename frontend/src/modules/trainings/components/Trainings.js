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
  width: 900,
  background: 'linear-gradient(-45deg, #0f0c29 0%, #302b63 100% )',  // Cambiado a background
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",

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


const TrainingCardUser = ({ dispatch, history, item, handleOpenDescriptionModal }) => {
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
            <span class="title">{obtenerHoraFormateada(item.durationMinutes)} &nbsp;
            </span>
            <hr></hr>
          <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple">
            <span class="desc desc2 scroll_efect_training">{item.description}</span>
          </a>
          <hr></hr>
            </div>
                  <ul class="social-icons trashgrande trash_position">
                  <li><a type="button" onClick={() => handleRemoveTraining(item.id, dispatch, history)}>
                    <i class="fa fa-trash"></i></a></li>
                  </ul>
                  <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateTraining(item.id, dispatch, history)}>
                      <i class="fa fa-wrench"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

const TrainingCard = ({ dispatch, history, item, handleOpenDescriptionModal, handleOpenMedicationModal }) => {
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
                  <span class="desc">{item.durationMinutes}</span>
                <a href="#" class="button">
                <span class="title">{item.durationMinutes} &nbsp;
            <FormattedMessage id="project.statistics.fields.minutes"/>
          </span>
                </a>
                  </div>
                  <ul class="social-icons trashgrande trash_position">
                  <li><a type="button" onClick={() => handleRemoveTraining(item.id, dispatch, history)}>
                    <i class="fa fa-trash"></i></a></li>
                  </ul>
                  <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateTraining(item.id, dispatch, history)}>
                      <i class="fa fa-wrench"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

function TrainingsList({ items, exercisesList, stretchingsList, teamId, fallback, dispatch, history, handleOpenDescription }) {
  if (!items || items.length === 0) {
    dispatch(actions.findTrainingsByUserId(() => history('/trainings/home')));
    return fallback;
  } else {
    return items.map(item => (
      <TrainingCard dispatch={dispatch} exercisesList={exercisesList} stretchingsList={stretchingsList} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    ));
  }
}

function TrainingsListUser({ items, exercisesList, stretchingsList, fallback, dispatch, history, handleOpenDescription }) {
  if (!items || items.length === 0) {
    dispatch(actions.findTrainingsByUserId(() => history('/trainings/home')));
    return fallback;
  } else {
    return items.map(item => (
      <TrainingCardUser dispatch={dispatch} exercisesList={exercisesList} stretchingsList={stretchingsList} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    ));
  }
}

const Trainings = ({trainings}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    
    const team = useSelector(selectorsTeams.getTeam);
    const stretchings = useSelector(selectorsStretchings.getAllStretchings);
    const exercises = useSelector(selectorsExercises.getAllExercises);

    const exercisesList = exercises.exercises;
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

    if(!exercisesList) {
        dispatch(actionExercises.findAllExercises(() => history('/trainings/home')));
        return "Loading...";
    }
    
    const stretchingsList = stretchings.stretchings;

    if(!stretchingsList) {
        dispatch(actionStretchings.findAllStretchings(() => history('/trainings/home')));
        return "Loading...";
    }


    if (!team) {
      return(
        <div className="card-group lesions_contaner">
        <TrainingsListUser items={trainings} exercisesList={exercisesList} stretchingsList={stretchingsList} fallback={"Loading..."} dispatch = {dispatch} history={history} handleOpenDescription={handleOpenDescription}/>
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
            <h2 id="child-modal-title" className="color_modal_title_training" sx={{ mb: '100px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h2>
            <p id="child-modal-description">
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
        </div>
    );
  } else {
      return(
          <div className="card-group lesions_contaner">
          <TrainingsList items={trainings} exercisesList={exercisesList} stretchingsList={stretchingsList}  teamId={team.id} fallback={"Loading..."} dispatch = {dispatch} history={history} handleOpenDescription={handleOpenDescription}/>
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
            <h2 id="child-modal-title" className="color_modal_title_training" sx={{ mb: '100px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h2>
            <p id="child-modal-description">
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
          </div>
      );
  };
}
Trainings.propTypes = {
    trainings: PropTypes.array
};

export default Trainings;