import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as actionsTeams from '../../teams/actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import ballCancha from '../../players/components/ballCancha.jpg';
import libre from '../../players/components/libre.jpg';
import estira from '../../players/components/estira.gif';
import * as selectorsTeams from '../../teams/selectors';
import {FormattedMessage} from 'react-intl';


const PlayerView = () => {
    const player = useSelector(selectors.getPlayer);
    const team = useSelector(selectorsTeams.getTeam);

    const {id, playerId} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    

    const handleClearTotalStatistics = (playerId, dispatch, history) => {
        dispatch(actions.clearTotalStatistics(playerId, () => history(`/players/view/${id}${playerId}`)));
        window.location.reload('true');
    }


    function PlayerViewFunction({player, dispatch}){
        if(player){

            if(!team) {
                dispatch(actionsTeams.findTeamById(id, () => history(`/players/view/${id}${playerId}`)));
                return(
                    <div className="spinner-border color-byTeamName" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>        
                );
            }

            return (

            <div className="row">
                    <div class="card bg-dark text-white p-3" >

                        <div class="card-header text-center font-weight-bold">
                            <h1><FormattedMessage id="project.statistics.fields.statistics"/></h1>
                            </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalPoints"/>: </p>
                            <h5 class="card-title">{player.totalPoints}</h5>

                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalThreePointShots"/>: </p>
                            <h5 class="card-title">{player.totalThreePointShots}</h5>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalSetShots"/>: </p>
                            <h5 class="card-title">{player.totalSetShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalFreeShots"/>: </p>
                            <h5 class="card-title">{player.totalFreeShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalFailThreePointShots"/>: </p>
                            <h5 class="card-title">{player.totalFailThreePointShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalfailSetShots"/>: </p>
                            <h5 class="card-title">{player.totalfailSetShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalfailFreeShots"/>: </p>
                            <h5 class="card-title">{player.totalfailFreeShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalRebounds"/>: </p>
                            <h5 class="card-title">{player.totalRebounds}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalBlockedShot"/>: </p>
                            <h5 class="card-title">{player.totalBlockedShot}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalAssists"/>: </p>
                            <h5 class="card-title">{player.totalAssists}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalPersonalFouls"/>: </p>
                            <h5 class="card-title">{player.totalPersonalFouls}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalTechnicalFouls"/>: </p>
                            <h5 class="card-title">{player.totalTechnicalFouls}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFouls"/>: </p>
                            <h5 class="card-title">{player.totalUnsportsmanlikeFouls}</h5>
                        </div>
                        <div class="card-footer bg-transparent border-success">
                            <button type="button" onClick={() => handleClearTotalStatistics(player.id, dispatch, history)}><FormattedMessage id="project.players.fields.clear"/></button>
                        </div>
                    </div>



                    <div class="card bg-dark text-white p-3 ml-5" >
                        <div className="jijoneca">
                        <img className="holas  " src={avatar}/>

                        </div>

                        <div class="card-header text-center"><FormattedMessage id="project.players.fields.name"/>: {player.playerName}</div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.players.fields.primaryLastName"/>: </p>
                            <h5 class="card-title">{player.primaryLastName}</h5>

                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.players.fields.secondLastName"/>: </p>
                            <h5 class="card-title">{player.secondLastName}</h5>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.players.fields.email"/>: </p>
                            <h5 class="card-title">{player.email}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.players.fields.phoneNumber"/>: </p>
                            <h5 class="card-title">{player.phoneNumber}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.players.fields.dni"/>: </p>
                            <h5 class="card-title">{player.dni}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.players.fields.position"/>: </p>
                            <h5 class="card-title">{player.position}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.players.fields.trends"/>: </p>
                            <h5 class="card-title">{player.trends}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><FormattedMessage id="project.teams.fields.team"/>: </p>
                            <h5 class="card-title">{team.teamName}</h5>
                        </div>
                        <div class="card-footer bg-transparent border-success"><FormattedMessage id="project.players.fields.player"/></div>
                    </div>
            </div>

            );


        }
        else{
            dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history(`/players/view/${id}${playerId}`)));
            dispatch(actionsTeams.findTeamById(id, () => history(`/players/view/${id}${playerId}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
            <PlayerViewFunction player={player} dispatch={dispatch}/>
        </div>
    );
};

export default PlayerView;