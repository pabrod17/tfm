import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import {Errors} from '../../common';
import Plays from './Plays';


const PlaysHome = () => {
    const {id} = useParams();
    const plays = useSelector(selectors.getPlays);
    const dispatch = useDispatch();
    const history = useNavigate();
    
    const attack = "Ataque";
    const defense = "Defensa";


    const handleSetTypePlay = (id, playType, dispatch) => {
        console.log(playType);
        dispatch(actions.findPlaysByTypeAndTeam(id, playType));
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history(`/plays/addPlay/${id}`)}><FormattedMessage id="project.plays.fields.addPlay"/></button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion"><FormattedMessage id="project.exercises.fields.typeOnly"/>
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypePlay(id, attack, dispatch)}><FormattedMessage id="project.plays.fields.attack"/></a>
                            <a type="button" onClick={() => handleSetTypePlay(id, defense, dispatch)}><FormattedMessage id="project.plays.fields.defense"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Plays plays={plays.plays} id={id}/>
            </div>
        </div>

    );

}

export default PlaysHome;