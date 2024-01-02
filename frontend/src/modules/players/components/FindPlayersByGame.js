import React from 'react';
import {useSelector} from 'react-redux';
import * as selectors from '../selectors';
import Player from './Player';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router';
import * as actions from '../actions';
import PlayersByGame from './PlayersByGame';
import {FormattedMessage} from 'react-intl';

const FindPlayersByGame = () => {
    const {id} = useParams();//teamId
    const {gameId} = useParams();//gameId

    const players = useSelector(selectors.getAllPlayers);

    const dispatch = useDispatch();
    const history = useNavigate();


    const pointGuard = "Base";
    const shootingGuard = "Escolta";
    const smallForward = "Alero";
    const powerForward = "AlaPivot";
    const center = "Pivot";


    const muscle = "Muscular";
    const tendon = "Tendinosa";
    const joint = "Articular";
    const spine = "ColumnaVertebral";
    const psychological  = "Psicologica";
    
    const handleSetPosition = (id, position, dispatch) => {
        dispatch(actions.findPlayersByPositionAndTeam(id, position));
    }

    const handleSetLesionType = (id, typeLesion, dispatch) => {
        dispatch(actions.findPlayersWithOneTypeLesion(id, typeLesion));
    }

    const handlePlayersWithLesion = (id, position, dispatch) => {
        dispatch(actions.findPlayersrWithLesionOfTeam(id, position));
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history(`/players/addPlayer/${id}`)}>Add New Player</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Second group">
                        <button className="button dni"  onClick={() => history(`/players/dni/${id}`)}>Dni</button>
                    </div>
                    <div class="btn-group mr-5 mb-5 btn" role="group" aria-label="Third group">
                        <button className="button dni"  onClick={() => history(`/players/completedName/${id}`)}>Name and Surnames</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion"><FormattedMessage id="project.players.fields.position"/> 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetPosition(id, pointGuard, dispatch)}><FormattedMessage id="project.players.fields.pointGuard"/></a>
                            <a type="button" onClick={() => handleSetPosition(id, shootingGuard, dispatch)}><FormattedMessage id="project.players.fields.shootingGuard"/></a>
                            <a type="button"  onClick={() => handleSetPosition(id, smallForward, dispatch)}><FormattedMessage id="project.players.fields.smallForward"/></a>
                            <a type="button" onClick={() => handleSetPosition(id, powerForward, dispatch)}><FormattedMessage id="project.players.fields.powerForward"/></a>
                            <a type="button" onClick={() => handleSetPosition(id, center, dispatch)}><FormattedMessage id="project.players.fields.center"/> </a>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fourth group">
                        <button className="button lesion" onClick={() => handlePlayersWithLesion(id, pointGuard, dispatch)}><FormattedMessage id="project.lesion.fields.withLesion"/></button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion"><FormattedMessage id="project.lesion.fields.lesionType"/>
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetLesionType(id, muscle, dispatch)}><FormattedMessage id="project.lesion.fields.muscle"/></a>
                            <a type="button" onClick={() => handleSetLesionType(id, tendon, dispatch)}><FormattedMessage id="project.lesion.fields.tendon"/></a>
                            <a type="button" onClick={() => handleSetLesionType(id, joint, dispatch)}><FormattedMessage id="project.lesion.fields.joint"/></a>
                            <a type="button" onClick={() => handleSetLesionType(id, spine, dispatch)}><FormattedMessage id="project.lesion.fields.spine"/></a>
                            <a type="button" onClick={() => handleSetLesionType(id, psychological, dispatch)}><FormattedMessage id="project.lesion.fields.psychological"/></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <PlayersByGame players={players.players} id={id} gameId={gameId}/>
            </div>
        </div>    
    );
}

export default FindPlayersByGame;