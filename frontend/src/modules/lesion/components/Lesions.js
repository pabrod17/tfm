import React, { useEffect, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import { FormattedMessage } from 'react-intl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const handleRemoveLesion = (id, dispatch, history) => {
  dispatch(actions.removeLesion(id, () => history(`/lesion/home`)));
  window.location.reload('true');
}

const handleUpdateLesion = (id, dispatch, history) => {
  dispatch(actions.findLesionById(id, () => history(`/lesion/update/${id}`)));
}

const handleViewLesion = (id, dispatch, history) => {
  dispatch(actions.findLesionById(id, () => history(`/lesion/view/${id}`)));
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'rgba(0, 89, 255, 0.25)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const LesionCard = ({ dispatch, history, item, handleOpenDescriptionModal, handleOpenMedicationModal }) => {
  return (
    <div key={item.id}>
      <div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card">
                <img src={lesionPierna} alt="Person" className="card__image_lesion"></img>
                <span className="title">{item.lesionName}</span>
                <div className="buttons">
                  <button className="post">{item.lesionType}</button>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card">
                <a onClick={() => handleOpenDescriptionModal(item.description)} class="scroll_efect">
                  <span className="desc">{item.description}</span>
                </a>
                <hr></hr>
                <a onClick={() => handleOpenMedicationModal(item.medication)} class="button_apple scroll_efect_objective" >
                  <span class="desc">{item.medication}</span>
                </a>
                <hr></hr>
              </div>
              <ul class="social-icons trashgrande trash_position">
                <li><a type="button" onClick={() => handleRemoveLesion(item.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
              </ul>
              <ul class="social-icons configgrande config_position">
                <li><a type="button" onClick={() => handleUpdateLesion(item.id, dispatch, history)}>
                  <i class="fa fa-wrench"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LesionsList({ items, fallback, dispatch, history, openDescription, openMedication, handleOpenDescription, handleOpenMedication, handleClose }) {
  if (!items || items.length === 0) {
    dispatch(actions.findAllLesion(() => history('/lesion/home')));
    return fallback;
  } else {
    return items.map(item => (
      <LesionCard dispatch={dispatch} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} handleOpenMedicationModal={handleOpenMedication} />
    ));
  }
}

const Lesions = ({ lesions }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [modalDescription, setModalDescription] = useState('');
  const [modalMedication, setModalMedication] = useState('');
  const [openDescription, setOpenDescription] = React.useState(false);
  const [openMedication, setOpenMedication] = React.useState(false);

  const handleOpenDescription = (description) => {
    setModalDescription(description);
    setOpenDescription(true);
  };

  const handleOpenMedication = (medication) => {
    setModalMedication(medication);
    setOpenMedication(true);
  };

  const handleClose = () => {
    setModalDescription('');
    setModalMedication('');
    setOpenDescription(false);
    setOpenMedication(false);
  };

  return (

    <div className="card-group lesions_contaner">

      <LesionsList items={lesions} fallback={"Loading..."} dispatch={dispatch} history={history}
        openDescription={openDescription} openMedication={openMedication} handleOpenDescription={handleOpenDescription} handleOpenMedication={handleOpenMedication}
      />
      {(openDescription || openMedication) && (
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
            <h2 id="child-modal-title" className="color_modal_title_lesion" sx={{ mb: '100px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h2>
            <p id="child-modal-description">
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
      {openMedication && (
        <Modal
          open={openMedication}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-objective"
        >
          <Box sx={{ ...style, width: "auto" }}>
            <h2 id="child-modal-title" className="color_modal_title_lesion" sx={{ mb: '100px' }} ><FormattedMessage id="project.lesion.fields.medication" />:</h2>
            <p id="child-modal-objective">
              {modalMedication}
            </p>
          </Box>
        </Modal>
      )}
    </div>
  )
};

Lesions.propTypes = {
  lesions: PropTypes.array
};

export default Lesions;