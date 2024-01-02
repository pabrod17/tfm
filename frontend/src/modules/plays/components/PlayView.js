import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as actionsTeams from '../../teams/actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import ballCancha from '../../players/components/ballCancha.jpg';
import libre from '../../players/components/libre.jpg';
import canchaAzul from '../../plays/components/canchaAzul.png';

const PlayView = () => {
    const play = useSelector(selectors.getPlay);
    const {playId} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();


    function PlayViewFunction({play, dispatch}){
        if(play){

            return (
                    
                <div class="">
                    <div class="card bg-dark text-white p-3" >
                        <div className="jijoneca">
                            <img className="canchazul  " src={canchaAzul}/>
                        </div>                        
                        <div class="card-header text-center"><FormattedMessage id="project.notes.fields.title"/>: {play.title}</div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.exercises.fields.typeOnly"/>: </p>
                            <h5 class="card-title">{play.playType}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.plays.fields.gesture"/>: </p>
                            <h5 class="card-title">{play.gesture}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.plays.fields.pointGuardText"/>: </p>
                            <h5 class="card-title">{play.pointGuardText}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.plays.fields.shootingGuardText"/>: </p>
                            <h5 class="card-title">{play.shootingGuardText}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.plays.fields.smallForwardText"/>: </p>
                            <h5 class="card-title">{play.smallForwardText}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.plays.fields.powerForwardText"/>: </p>
                            <h5 class="card-title">{play.powerForwardText}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.plays.fields.centerText"/>: </p>
                            <h5 class="card-title">{play.centerText}</h5>
                        </div>
                        <div class="card-footer bg-transparent border-success"><FormattedMessage id="project.plays.fields.play"/></div>
                    </div>
                </div>
            );


        }
        else{
            dispatch(actions.findPlayById(playId, () => history(`/plays/view/${playId}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }


    return(
        <div>
            <PlayViewFunction play={play} dispatch={dispatch}/>
        </div>
    );
}

export default PlayView;