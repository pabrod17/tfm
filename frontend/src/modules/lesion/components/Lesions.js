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
import users, { LoginNew, Login } from '../../users';

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
  width: 603,
  bgcolor: 'rgba(0, 89, 255, 0.25)',
  border: '2px solid #000',
  boxShadow: 16.08,
  p: 2.68,
  borderRadius: "13.4px",
};



const LesionCard = ({userLogged, dispatch, history, item, handleOpenDescriptionModal, handleOpenMedicationModal }) => {
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
                <a onClick={() => handleOpenDescriptionModal(item.description)} class="without_underline">
                  <span className="desc desc25555555  scroll_efect" style={{marginBottom:"-10px"}}>{item.description}</span>
                </a>
                <hr></hr>
                <a onClick={() => handleOpenMedicationModal(item.medication)} class="button_apple" >
                  <span class="desc desc2232323  scroll_efect_lesion">{item.medication}</span>
                </a>
                <hr></hr>
              </div>
              {userLogged.role === "ADMIN" && (
              <ul class="social-icons trashgrande trash_position">
                <li><a type="button" onClick={() => handleRemoveLesion(item.id, dispatch, history)}>
                <i class="fa fa-trash" style={{fontSize:"15px"}}></i></a></li>
              </ul>
              )}
              <ul class="social-icons configgrande config_position">
                <li><a type="button" onClick={() => handleUpdateLesion(item.id, dispatch, history)}>
                <i class="fa fa-wrench" style={{fontSize:"14.7px"}}></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LesionsList({userLogged, items, fallback, dispatch, history, openDescription, openMedication, handleOpenDescription, handleOpenMedication, handleClose }) {
  if (!items || items.length === 0) {
    dispatch(actions.findAllLesion(() => history('/lesion/home')));
    return fallback;
  } else {
    return items.map(item => (
      <LesionCard userLogged={userLogged} dispatch={dispatch} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} handleOpenMedicationModal={handleOpenMedication} />
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
  const userLogged = useSelector(users.selectors.getUser);

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

      <LesionsList userLogged={userLogged} items={lesions} fallback={"Loading..."} dispatch={dispatch} history={history}
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
          <Box sx={{ ...style, width: "auto", maxWidth: "40vw" }}>
            <h5 id="child-modal-title" className="color_modal_title_lesion" sx={{ mb: '67px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h5>
            <p id="child-modal-description" style={{ overflowWrap: 'break-word', fontSize:"8px" }}>
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
          <Box sx={{ ...style, width: "auto", maxWidth: "40vw" }}>
            <h5 id="child-modal-title" className="color_modal_title_lesion" sx={{ mb: '67px' }} ><FormattedMessage id="project.lesion.fields.medication" />:</h5>
            <p id="child-modal-objective" style={{ overflowWrap: 'break-word', fontSize:"8px" }}>
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