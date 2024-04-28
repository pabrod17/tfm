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

  const handleRemovePlayToTeam = (id, teamId, dispatch, history) => {
    dispatch(actions.removePlayToTeam(id, teamId, () => window.location.reload()));
    window.location.reload();
}

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 603,
    background: 'linear-gradient(-45deg, #41AF24 0%, #062C76 50% )',  // Cambiado a background
    border: '2px solid #000',
    boxShadow: 16.08,
    p: 2.68,
    borderRadius: "13.4px",

  };

  const PlayCard = ({ dispatch, teamId, history, item, handleOpenDescriptionModal, handleOpenMedicationModal }) => {
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
            <span class="title" style={{marginBottom:"0px"}}>{item.gesture} &nbsp;
            </span>
            <hr></hr>
            <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple" style={{marginTop:"-5px", marginBottom:"-5px"}}>
                    <span class="desc desc3 scroll_efect_training">{item.description}</span>
            </a>
            <hr></hr>
                    </div>
                    <ul class="social-icons trashgrande trash_position">
                        <li><a type="button" onClick={() => handleRemovePlayToTeam(item.id, teamId, dispatch, history)}>
                        <i class="fa fa-trash" style={{fontSize:"16px"}}></i></a></li>
                    </ul>
                    <ul class="social-icons configgrande config_position">
                        <li><a type="button" onClick={() => handleUpdatePlay(item.id, dispatch, history)}>
                        <i class="fa fa-wrench" style={{fontSize:"15px"}}></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  };

function PlaysList({ items, teamId, fallback, dispatch, history, openDescription, handleOpenDescription, handleClose }) {
  if (!items || items.length === 0) {
    // dispatch(actions.findPlaysByUserId( () => history(`/plays/home`)));
    // return fallback;
  } else {
    return items.map(item => (
      <PlayCard dispatch={dispatch} teamId={teamId} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    ));
  }
}





const PlaysByTeam = ({plays, teamId}) => {
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
          <PlaysList items={plays} teamId={teamId} fallback={"Loading..."} dispatch = {dispatch} history={history} openDescription={openDescription} handleOpenDescription={handleOpenDescription} />
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
          <h5 id="child-modal-title" className="color_modal_title_play" sx={{ mb: '67px' }} ><FormattedMessage id="project.exercises.fields.description" />:</h5>
            <p id="child-modal-description" style={{ overflowWrap: 'break-word', fontSize:"8px" }}>
              {modalDescription}
            </p>
          </Box>
        </Modal>
      )}
        </div>
    )
};

PlaysByTeam.propTypes = {
    plays: PropTypes.array
};

export default PlaysByTeam;