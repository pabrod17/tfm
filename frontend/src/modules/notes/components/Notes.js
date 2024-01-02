import React from 'react';
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
//https://formatjs.io/docs/react-intl/components/

const handleViewPlayer = (playerId, id, dispatch, history) => {


    dispatch(actionsPlayers.findPlayerByIdOfTeam(playerId, id, () => history(`/players/view/${id}${playerId}`)));
}

const handleRemoveNote = (noteId, id, playerId, dispatch, history) => {
    dispatch(actions.removeNote(noteId, () => history(`/notes/home/${id}${playerId}`)));
    window.location.reload('true');
}

const handleUpdateNote = (noteId, id, dispatch, history) => {
    dispatch(actions.findNoteById(noteId, () => history(`/notes/update/${id}${noteId}`)));
}

const handleViewNote = (noteId, dispatch, history) => {
    dispatch(actions.findNoteById(noteId, () => history(`/notes/view/${noteId}`)));
  }

function NotesList({ items, playerId, id, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findNotesByPlayer(playerId, () => history(`/notes/home/${id}${playerId}`)));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={notaLapiz} alt="Person" class="card__image"></img>
                <p class="card__name">{item.title}</p>
                <p class="card__name">                <FormattedDate
                    value={ item.endDate }
                    year="numeric"
                    month="long"
                    day="numeric"
                /> 
                </p>

                <div class="grid-container">
                </div>
                <ul class="social-icons">
                <li><a type="button" onClick={() => handleRemoveNote(item.id, id, playerId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewNote(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateNote(item.id, id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <button class="btn-player draw-border" onClick={() => handleViewPlayer(playerId, id, dispatch, history)}><FormattedMessage id="project.players.fields.player"/></button>
              </div>
            </div>
          </div>;
        });
      }
}


const Notes = ({notes, playerId, id}) => {
    const dispatch = useDispatch();
    const history = useNavigate();


    return(
        <div className="card-group">
          <NotesList items={notes} playerId={playerId} id={id} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
}

export default Notes;