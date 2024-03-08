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

const handleRemoveStretching = (id, dispatch, history) => {
    dispatch(actions.removeStretching(id, () => history(`/stretchings/home`)));
    window.location.reload('true');
}

const handleUpdateStretching = (id, dispatch, history) => {
  dispatch(actions.findStretchingById(id, () => history(`/stretchings/update/${id}`)));
}

const handleViewStretching = (id, dispatch, history) => {
    dispatch(actions.findStretchingById(id, () => history(`/stretchings/view/${id}`)));
}

function StretchingsList({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findAllStretchings(() => history('/stretchings/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div key={item.id}>
          <div>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card_stretching">
                    <img src={estiramientos} alt="Person" class="card__image_stretching"></img>
                    <span class="title">{item.stretchingName}</span>
                    <div class="buttons">
                      <button class="post">{item.stretchingType}</button>
                    </div>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card_stretching">
                    <a href="#" class="button">
                      <span class="desc">{item.description}</span>
                    </a>
                  </div>
                  <ul class="social-icons trashgrande trash_position">
                  <li><a type="button" onClick={() => handleRemoveStretching(item.id, dispatch, history)}>
                    <i class="fa fa-trash"></i></a></li>
                  </ul>
                  <ul class="social-icons configgrande config_position">
                      <li><a type="button" onClick={() => handleUpdateStretching(item.id, dispatch, history)}>
                      <i class="fa fa-wrench"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>;
        });
      }
}

const Stretchings = ({stretchings}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    return(
        <div className="card-group lesions_contaner">
          <StretchingsList items={stretchings} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

Stretchings.propTypes = {
    stretchings: PropTypes.array
};

export default Stretchings;