import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import Card from "react-bootstrap/Card";
//Imagen para TEAMS
// import logo22 from './red5.jpeg';
import {FormattedDate} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import logo22 from '../../seasons/components/red3.jpeg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  background: 'linear-gradient(-45deg, #711ce0 0%, #000046 60% )',  // Cambiado a background
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",

};

const CardSeason = ({ dispatch, history, item, handleOpenDescriptionModal }) => {
  const formattedStartDate = new Date(item.startDate).getFullYear();
  const formattedEndDate = new Date(item.endDate).getFullYear();
  return (
    <div key={item.id}>
      <div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card_season">
                <img src={logo22} alt="Person" className="card__image_season"></img>
                <span class="title">{item.seasonName}</span>
                <div className="buttons">
                <button class="post">
                    {formattedStartDate} / {formattedEndDate}
                  </button>
               </div>
                  </div>
                </div>
                <div class="flip-card-back">
            <div class="card_season">
          <a onClick={() => handleOpenDescriptionModal(item.description)} class="button_apple">
            <span class="desc desc3 scroll_efect_stretching">{item.description}</span>
          </a>
          <hr></hr>
            </div>
                  <ul class="social-icons trashgrande trash_position">
                  <li><a type="button" onClick={() => handleRemoveSeason(item.id, dispatch, history)}>
                    <i class="fa fa-trash"></i></a></li>
                  </ul>
                  <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateSeason(item.id, dispatch, history)}>
                      <i class="fa fa-wrench"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
  }

const handleRemoveSeason = (id, dispatch, history) => {
  dispatch(actions.removeSeason(id, () => history('/seasons/home')));
  window.location.reload('true');
}

const handleUpdateSeason = (id, dispatch, history) => {
    dispatch(actions.findSeasonById(id, () => history(`/seasons/update/${id}`)));
  }

// const handleViewSeason = (id, dispatch, history) => {
//     dispatch(actions.findSeasonById(id, () => history(`/seasons/view/${id}`)));
//   }

// const handleViewSeason = (id, dispatch, history) => {
//     dispatch(actions.findSeasonById(id, () => handleFindTeamsToSeason(id, dispatch, history)));
//   }

// const handleFindTeamsToSeason = (id, dispatch, history) => {
//   dispatch(actionsTeams.findTeamsToSeason(id, () => history(`/seasons/view/${id}`)));
// }

function SeasonsList({ items, fallback, dispatch, history, handleOpenDescription }) {
  if (!items || items.length === 0) {
    dispatch(actions.findAllSeasons(() => history('/seasons/home')));
    return fallback;
  } else {
    return items.map(item => (
      <CardSeason dispatch={dispatch} history={history} key={item.id} item={item} handleOpenDescriptionModal={handleOpenDescription} />
    ));
  }
}

const Seasons = ({seasons}) => {
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
        <div class="card-group lesions_contaner">
            <SeasonsList items={seasons} fallback={"Loading..."} dispatch = {dispatch} history={history} handleOpenDescription={handleOpenDescription} />
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

};

Seasons.propTypes = {
    seasons: PropTypes.array
};

export default Seasons;