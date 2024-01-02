import React from 'react';
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

const handleRemoveStretchingToPlayer = (id, playerId, dispatch, history) => {
    dispatch(actions.removeStretchingToPlayer(playerId, id, () => history(`/stretchings/home/player/${playerId}`)));
    window.location.reload('true');
}

const handleUpdateStretching = (id, dispatch, history) => {
    dispatch(actions.findStretchingById(id, () => history(`/stretchings/update/${id}`)));
}

const handleViewStretching = (id, dispatch, history) => {
    dispatch(actions.findStretchingById(id, () => history(`/stretchings/view/${id}`)));
}

function StretchingsList({ items, playerId, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findStretchingsByPlayerId(playerId, () => history(`/stretchings/home/player/${playerId}`)));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={estiramientos} alt="Person" class="card__image lesionando"></img>
                <p class="card__name">{item.stretchingName}</p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveStretchingToPlayer(item.id, playerId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewStretching(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateStretching(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <button class="btn-player draw-border">{item.stretchingType}</button>
              </div>
            </div>
          </div>;
        });
      }
}

const StretchingsByPlayer = ({stretchings, playerId}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    return(
        <div className="card-group">
          <StretchingsList items={stretchings} playerId={playerId} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

export default StretchingsByPlayer;

