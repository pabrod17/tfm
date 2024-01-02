import React from 'react';
import {useSelector} from 'react-redux';
import * as selectors from '../selectors';
import GameStatistics from './GameStatistics';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router';
import * as actions from '../actions';

const FindGameStatistics = () => {
    const {gameId} = useParams();//gameId
    const gameStatistics = useSelector(selectors.getGameStatistics);
    const dispatch = useDispatch();
    const history = useNavigate();

    return(
        <div>
            <div>
                <GameStatistics gameStatistics={gameStatistics} gameId={gameId}/>
            </div>
        </div>    
    );
}

export default FindGameStatistics;