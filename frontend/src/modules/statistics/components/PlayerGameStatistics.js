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

const handleUpdatePlayerGameStatistics = (playerId, gameId, dispatch, history) => {
    dispatch(actions.findStatisticsByPlayerAndGame(playerId, gameId, () => history(`/statistics/playerGame/update/${playerId}${gameId}`)));
  }
  const handleRemovePlayerGameStatistics = (playerId, gameId, dispatch, history) => {
    dispatch(actions.removeStatisticsToPlayerOfGame(playerId, gameId, () => history(`/games/home`)));
    window.location.reload('true');
    }

function PlayerGameStatisticsFunction({playerGameStatistics, playerId, gameId, dispatch, history}){
    if(playerGameStatistics){

        return (
                

                <div class="card bg-dark text-white p-3" >
                    <h2 class="card-header text-center"><FormattedMessage id="project.statistics.fields.statistics"/>:</h2>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalPoints"/></h5>
                        <p class="card-text">{playerGameStatistics.totalPoints}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.minutes"/></h5>
                        <p class="card-text">{playerGameStatistics.minutes}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.threePointShots"/></h5>
                        <p class="card-text">{playerGameStatistics.threePointShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.setShots"/></h5>
                        <p class="card-text">{playerGameStatistics.setShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.freeShots"/></h5>
                        <p class="card-text">{playerGameStatistics.freeShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.failThreePointShots"/></h5>
                        <p class="card-text">{playerGameStatistics.failThreePointShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.failSetShots"/></h5>
                        <p class="card-text">{playerGameStatistics.failSetShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.failFreeShots"/></h5>
                        <p class="card-text">{playerGameStatistics.failFreeShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.rebounds"/></h5>
                        <p class="card-text">{playerGameStatistics.rebounds}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.blockedShot"/></h5>
                        <p class="card-text">{playerGameStatistics.blockedShot}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.assists"/></h5>
                        <p class="card-text">{playerGameStatistics.assists}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.personalFouls"/></h5>
                        <p class="card-text">{playerGameStatistics.personalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.technicalFouls"/></h5>
                        <p class="card-text">{playerGameStatistics.technicalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.unsportsmanlikeFouls"/></h5>
                        <p class="card-text">{playerGameStatistics.unsportsmanlikeFouls}</p>
                    </div>
                    

                    <div class="card-body">
                    <button className="btn-player draw-border" onClick={() => handleUpdatePlayerGameStatistics(playerId, gameId, dispatch, history)}><FormattedMessage id="project.statistics.fields.update"/></button>
                    <a type="button" onClick={() => handleRemovePlayerGameStatistics(playerId, gameId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a>
                    </div>
                </div>
        );
    }
    else{
        dispatch(actions.findStatisticsByPlayerAndGame(playerId, gameId, () => history(`/statistics/playerGame/${playerId}${gameId}`)));
        return(
            <div className="spinner-border color-byTeamName" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>        
        );
    }
}














const PlayerGameStatistics = ({playerGameStatistics, playerId, gameId}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    return(
        <div className="card-group">
          <PlayerGameStatisticsFunction playerGameStatistics={playerGameStatistics} playerId={playerId} gameId={gameId} dispatch = {dispatch} history={history} />
        </div>
    )
}
export default PlayerGameStatistics;