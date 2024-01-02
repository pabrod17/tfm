import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import {FormattedMessage} from 'react-intl';

const NoteView = () => {

    const note = useSelector(selectors.getNote);
    const {noteId} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();

    function NoteViewFunction({note, dispatch}){
        if(note){

            return (
                    

                    <div class="card hola  text-center" >
                        <img className="holas" src={notaLapiz}/>
                        <div class="card-body">
                            <h5 class="card__name">{note.title}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><FormattedMessage id="project.exercises.fields.description"/></h5>
                            <p class="card-text">{note.description}</p>
                        </div>
                        <div class="card-body">
                        </div>
                    </div>



            );


        }
        else{
            dispatch(actions.findNoteById(noteId, () => history(`/notes/view/${noteId}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
            <NoteViewFunction note={note} dispatch={dispatch}/>
        </div>
    );
}

export default NoteView;