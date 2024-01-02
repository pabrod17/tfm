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

const handleUpdateGameStatistics = (gameId, dispatch, history) => {
    dispatch(actions.findStatisticsByGame(gameId, () => history(`/statistics/game/update/${gameId}`)));
  }
  const handleRemoveGameStatistics = (gameId, dispatch, history) => {
    dispatch(actions.removeStatisticsToGame(gameId, () => history(`/games/home`)));
}

function GameStatisticsFunction({gameStatistics, gameId, dispatch, history}){
    if(gameStatistics){

        return (
                

                <div class="card bg-dark text-white p-3" >
                    <h2 class="card-header text-center"><FormattedMessage id="project.statistics.fields.statistics"/>:</h2>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalPoints"/></h5>
                        <p class="card-text">{gameStatistics.totalPoints}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.duration"/></h5>
                        <p class="card-text">{gameStatistics.durationMinutes}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalThreePointShots"/></h5>
                        <p class="card-text">{gameStatistics.totalThreePointShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalSetShots"/></h5>
                        <p class="card-text">{gameStatistics.totalSetShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalFreeShots"/></h5>
                        <p class="card-text">{gameStatistics.totalFreeShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalRebounds"/></h5>
                        <p class="card-text">{gameStatistics.totalRebounds}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalBlockedShot"/></h5>
                        <p class="card-text">{gameStatistics.totalBlockedShot}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalAssists"/></h5>
                        <p class="card-text">{gameStatistics.totalAssists}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalPersonalFouls"/></h5>
                        <p class="card-text">{gameStatistics.totalPersonalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalTechnicalFouls"/></h5>
                        <p class="card-text">{gameStatistics.totalTechnicalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFouls"/></h5>
                        <p class="card-text">{gameStatistics.totalUnsportsmanlikeFouls}</p>
                    </div>






                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalPointsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalPointsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalThreePointShotsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalThreePointShotsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalSetShotsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalSetShotsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalFreeShotsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalFreeShotsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalReboundsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalReboundsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalBlockedShotRival"/></h5>
                        <p class="card-text">{gameStatistics.totalBlockedShotsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalAssistsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalAssistsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalPersonalFoulsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalPersonalFoulsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalTechnicalFoulsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalTechnicalFoulsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFoulsRival"/></h5>
                        <p class="card-text">{gameStatistics.totalUnsportsmanlikeFoulsRival}</p>
                    </div>

                    <div class="card-body">
                    <button className="btn-player draw-border" onClick={() => handleUpdateGameStatistics(gameId, dispatch, history)}>Update</button>
                    <a type="button" onClick={() => handleRemoveGameStatistics(gameId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a>
                    </div>
                </div>
        );
    }
    else{
        dispatch(actions.findStatisticsByGame(gameId, () => history(`/statistics/game/${gameId}`)));
        return(
            <div className="spinner-border color-byTeamName" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>        
        );
    }
}


const GameStatistics = ({gameStatistics, gameId}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    return(
        <div className="card-group">
          <GameStatisticsFunction gameStatistics={gameStatistics} gameId={gameId} dispatch = {dispatch} history={history} />
        </div>
    )
}
export default GameStatistics;