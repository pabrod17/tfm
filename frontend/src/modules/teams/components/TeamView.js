import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import * as selectorsUsers from '../../users/selectors';
import {FormattedMessage} from 'react-intl';

import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import basketball from './basketball.jpg';
import * as actionSeasons from '../../seasons/actions';
import * as actionPlayers from '../../players/actions';
import * as actionPlays from '../../plays/actions';
import * as actionTrainings from '../../trainings/actions';
import * as actionGames from '../../games/actions';

import avatar from '../../players/components/avatar.jpg';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import bigBall from '../../trainings/components/bigBall.jpg';
import redAzul from '../../games/components/naranja.jpg';

//http://envato.jayasankarkr.in/code/profile/assets/img/profile-6.jpg

// https://freefrontend.com/bootstrap-cards/

// https://codepen.io/mrsahar/pen/jRjmdL

// https://pixabay.com/es/images/search/basketball/?pagi=8



const TeamView = () => {
    const user = useSelector(selectorsUsers.getUser);

    const {id} = useParams();
    const team = useSelector(selectors.getTeam);
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleFindSeasonsToTeam = (id, dispatch, history) => {
        dispatch(actionSeasons.findSeasonsToTeam(id, () => history('/seasons/all/result')));
    }

    const handleFindTrainingsToTeam = (id, dispatch, history) => {
        dispatch(actionTrainings.findTrainingsByTeamId(id, () => history('/trainings/home')));
        history('/trainings/home');
    }

    const handleFindGamesToTeam = (id, dispatch, history) => {
        dispatch(actionGames.findGamesByTeamId(id, () => history('/games/home')));
    }

    const handlePlayersHome = (id, dispatch, history) => {
        dispatch(actionPlayers.findAPlayersOfTeam(id, () => history(`/players/home/${id}`)));
        history(`/players/home/${id}`);
    }

    const handlePlaysHome = (id, dispatch, history) => {
        dispatch(actionPlays.findPlaysByTeamId(id, () => history(`/plays/home/${id}`)));
        history(`/plays/home/${id}`);
    }

    function TeamView({team, dispatch}){
        if(team){

            return (



                <div className="card-columns hola">
                    
                    <div class="">
                    <div class="card hola pequeño text-center">
                        <img src={notaLapiz} alt="Person" class="card__image jugando"></img>
                        <p class="card__name" type="button" onClick={() => handlePlaysHome(team.id, dispatch, history)}><FormattedMessage id='project.plays.fields.plays'/></p>
                        <div class="grid-container">
                        </div>
                    </div>



                    <div class="card hola pequeño text-center">
                        <img src={avatar} alt="Person" class="card__image"></img>
                        <p class="card__name" type="button" onClick={() => handlePlayersHome(team.id, dispatch, history)}><FormattedMessage id='project.players.fields.players'/></p>
                        <div class="grid-container">
                        </div>
                    </div>


                    <div class="card hola pequeño text-center">
                        <img src={notaLapiz} alt="Person" class="card__image tempora"></img>
                        <p class="card__name" type="button" onClick={() => handleFindSeasonsToTeam(team.id, dispatch, history)}><FormattedMessage id='project.seasons.fields.seasons'/></p>
                        <div class="grid-container">
                        </div>
                    </div>


                    <div class="card hola pequeño text-center">
                        <img src={bigBall} alt="Person" class="card__image entreno"></img>
                        <p class="card__name" type="button" onClick={() => handleFindTrainingsToTeam(team.id, dispatch, history)}><FormattedMessage id='project.trainings.fields.trainings'/></p>
                        <div class="grid-container">
                        </div>
                    </div>

                    <div class="card hola pequeño text-center">
                        <img src={redAzul} alt="Person" class="card__image partidito"></img>
                        <p class="card__name" type="button" onClick={() => handleFindGamesToTeam(team.id, dispatch, history)}><FormattedMessage id='project.games.fields.games'/></p>
                        <div class="grid-container">
                        </div>
                    </div>

                    </div>
                </div>

            );







                // <div className="">
                //         <main className="">
                //             <div class="main__container">

                //             <div class="main__title">
                //                 <img src="assets/hello.svg" alt="" />
                //                 <div class="main__greeting">
                //                 <h1>Team</h1>
                //                 <p>{team.teamName}</p>
                //                 </div>
                //             </div>
                //             <div class="main__cards">
                //                 <div class="card-view">
                //                 <i class="fa fa-users fa-2x text-yellow" aria-hidden="true"></i>
                //                 <div class="card_inner">
                //                     <p class="text-primary-p" type="button" onClick={() => handlePlayersHome(team.id, dispatch, history)}>Players</p>
                //                     <span class="font-bold text-title">578</span>
                //                 </div>
                //                 </div>
                                
                //                 <div class="card-view">
                //                 <i class="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
                //                 <div class="card_inner">
                //                     <p class="text-primary-p" type="button" onClick={() => handleFindSeasonsToTeam(team.id, dispatch, history)}>Seasons</p>
                //                     <span class="font-bold text-title">2467</span>
                //                 </div>
                //                 </div>

                //                 <div class="card-view">
                //                 <i class="fa fa-file-image fa-2x text-white" aria-hidden="true"></i>
                //                 <div class="card_inner">
                //                     <p class="text-primary-p" type="button" onClick={() => handlePlaysHome(team.id, dispatch, history)}>Plays</p>
                //                     <span class="font-bold text-title">340</span>
                //                 </div>
                //                 </div>

                //                 <div class="card-view">
                //                 <i
                //                     class="fa fa-user fa-2x text-green"
                //                     aria-hidden="true"
                //                 ></i>
                //                 <div class="card_inner">
                //                     <p class="text-primary-p">User</p>
                //                     <span class="font-bold text-title">{user.firstName}</span>
                //                 </div>
                //                 </div>
                //             </div>
                //             <div class="charts">
                //                 <div class="charts__left">
                //                 <div class="charts__left__title">
                //                     <div>
                //                     <h1>Calendar</h1>
                //                     <p>Spain</p>
                //                     </div>
                //                     <i class="fa fa-usd" aria-hidden="true"></i>
                //                 </div>
                //                 <div id="apex1"></div>
                //                 </div>

                //                 <div class="charts__right">
                //                 <div class="charts__right__title">
                //                     <div>
                //                     <h1>Stats Reports</h1>
                //                     <p>Cupertino, California, USA</p>
                //                     </div>
                //                     <i class="fa fa-usd" aria-hidden="true"></i>
                //                 </div>

                //                 <div class="charts__right__cards">
                //                     <div class="card1">
                //                     <h1>Income</h1>
                //                     <p>$75,300</p>
                //                     </div>

                //                     <div class="card2">
                //                     <h1>Sales</h1>
                //                     <p>$124,200</p>
                //                     </div>

                //                     <div class="card3">
                //                     <h1>Users</h1>
                //                     <p>3900</p>
                //                     </div>

                //                     <div class="card4">
                //                     <h1>Orders</h1>
                //                     <p>1881</p>
                //                     </div>
                //                 </div>
                //                 </div>
                //             </div>
                //             </div>
                //         </main>
                // </div>
























                
                // <div className="col-md-4">
                //     <h4 class="text-center color-byTeamName"><strong>TEAM</strong></h4>
                //     {/* <div class="profile-card-6"><img src="https://cdn.pixabay.com/photo/2016/03/27/20/58/sky-1284256_960_720.jpg" class="img img-responsive"/> */}
                //     <div class="profile-card-6"><img src="https://cdn.pixabay.com/photo/2021/01/18/10/59/basketball-5927762_960_720.jpg" class="img img-responsive"/>
  
                //         <div class="profile-name">{team.teamName}</div>
                //         <div class="profile-position">TEAM</div>
                //         <div class="profile-overview">
                //             <div class="profile-overview">
                //                 <div class="">
                //                     <div class="col-xs-4">
                //                         <h3>1</h3>
                //                         <p>Players</p>
                //                     </div>
                //                     <div class="col-xs-4">
                //                         {/* <h3>50</h3> */}
                //                         <button className="btn btn-primary" type="button" onClick={() => handleFindSeasonsToTeam(team.id, dispatch, history)}>Seasons</button>
                //                     </div>
                //                     <div class="col-xs-4">
                //                         <h3>35</h3>
                //                         <p>Plays</p>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>

           // );

        }
        else{
            dispatch(actions.findTeamById(id, () => history(`/teams/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
          <TeamView team={team} dispatch={dispatch}/>
        </div>
    );

};
export default TeamView;