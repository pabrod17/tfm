import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import bigBall from '../../trainings/components/bigBall.jpg';
import {FormattedDate} from 'react-intl';
import naranja from '../../games/components/naranja.jpg';
import {FormattedMessage} from 'react-intl';

const GameView = () => {
    const game = useSelector(selectors.getOneGame);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();


    function GameViewFunction({game, dispatch}){
        if(game){

            return (
                    

                    <div class="card hola  text-center" >
                        <img className="holas partidito" src={naranja}/>
                        <div class="card-body">
                            <h5 class="card__name"><FormattedMessage id="project.games.fields.game"/></h5>
                            <h5 class="card-title"><FormattedMessage id="project.games.fields.rival"/>: {game.rival}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><FormattedMessage id="project.games.fields.date"/></h5>
                            <p class="card-text">
                                <FormattedDate
                                value={ game.gameDate }
                                year="numeric"
                                month="long"
                                day="numeric"/> 
                            </p>
                        </div>
                        <div class="card-body">

                        </div>
                    </div>



            );


        }
        else{
            dispatch(actions.findGameById(id, () => history(`/games/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }


    return(
        <div>
            <GameViewFunction game={game} dispatch={dispatch}/>
        </div>
    );
}

export default GameView;