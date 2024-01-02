import React from 'react';
import {useSelector} from 'react-redux';
import * as selectors from '../selectors';
import PlayerGameStatistics from './PlayerGameStatistics';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router';
import * as actions from '../actions';

const FindPlayerGameStatistics = () => {
    const {playerId} = useParams();//gameId
    const {gameId} = useParams();//gameId
    const playerGameStatistics = useSelector(selectors.getPlayerGameStatistics);
    const dispatch = useDispatch();
    const history = useNavigate();

    return(
        <div>
            <div>
                <PlayerGameStatistics playerGameStatistics={playerGameStatistics} playerId={playerId} gameId={gameId}/>
            </div>
        </div>    
    );
}

export default FindPlayerGameStatistics;