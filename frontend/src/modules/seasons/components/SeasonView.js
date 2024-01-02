import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as selectorsUsers from '../../users/selectors';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import {FormattedDate} from 'react-intl';
import * as actionsTeams from '../../teams/actions';
import avatar from '../../players/components/avatar.jpg';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import * as actionTrainings from '../../trainings/actions';
import * as actionGames from '../../games/actions';
import bigBall from '../../trainings/components/bigBall.jpg';
import redAzul from '../../games/components/naranja.jpg';
import {FormattedMessage} from 'react-intl';

const SeasonView = () => {
    const user = useSelector(selectorsUsers.getUser);

    const {id} = useParams();
    const season = useSelector(selectors.getSeason);
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleFindTrainingsToSeason = (id, dispatch, history) => {
        dispatch(actionTrainings.findTrainingsBySeasonId(id, () => history('/trainings/home')));
    }

    const handleFindGamesToSeason = (id, dispatch, history) => {
        dispatch(actionGames.findGamesBySeasonId(id, () => history('/games/home')));
    }


    const handleFindTeamsToSeason = (id, dispatch, history) => {
        dispatch(actionsTeams.findTeamsToSeason(id, () => history('/teams/all/result')));
    }

    function SeasonView({season, dispatch}){

            if(season){

                return (



                    <div className="card-columns hola">
                        
                        <div class="">
    
                            <div class="card hola pequeño text-center">
                                <img src={notaLapiz} alt="Person" class="card__image tempora"></img>
                                <p class="card__name" type="button" onClick={() => handleFindTeamsToSeason(season.id, dispatch, history)}><FormattedMessage id='project.teams.fields.teams'/></p>
                                <div class="grid-container">
                                </div>
                            </div>
        
        
                            <div class="card hola pequeño text-center">
                                <img src={bigBall} alt="Person" class="card__image entreno"></img>
                                <p class="card__name" type="button" onClick={() => handleFindTrainingsToSeason(season.id, dispatch, history)}><FormattedMessage id='project.trainings.fields.trainings'/></p>
                                <div class="grid-container">
                                </div>
                            </div>
        
                            <div class="card hola pequeño text-center">
                                <img src={redAzul} alt="Person" class="card__image partidito"></img>
                                <p class="card__name" type="button" onClick={() => handleFindGamesToSeason(season.id, dispatch, history)}><FormattedMessage id='project.games.fields.games'/></p>
                                <div class="grid-container">
                                </div>
                            </div>

                        </div>
                    </div>
    
                );























                // return (
                //     <div className="">
                //             <main className="">
                //                 <div class="main__container">
    
                //                 <div class="main__title">
                //                     <img src="assets/hello.svg" alt="" />
                //                     <div class="main__greeting">
                //                     <h1>Season</h1>
                //                     <p>{season.calendario}</p>
                //                     </div>
                //                 </div>
                //                 <div class="main__cards">
                //                     <div class="card-view">
                //                     <i class="fa fa-users fa-2x text-yellow" aria-hidden="true"></i>
                //                     <div class="card_inner">
                //                         <p class="text-primary-p">Players</p>
                //                         <span class="font-bold text-title">578</span>
                //                     </div>
                //                     </div>
    
                //                     <div class="card-view">
                //                     <i class="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
                //                     <div class="card_inner">
                //                         <p class="text-primary-p" type="button" onClick={() => handleFindTeamsToSeason(season.id, dispatch, history)}>Teams</p>
                //                         <span class="font-bold text-title">2467</span>
                //                     </div>
                //                     </div>
    
                //                     <div class="card-view">
                //                     <i class="fa fa-file-image fa-2x text-white" aria-hidden="true"></i>
                //                     <div class="card_inner">
                //                         <p class="text-primary-p">Games</p>
                //                         <span class="font-bold text-title">340</span>
                //                     </div>
                //                     </div>
    
                //                     <div class="card-view">
                //                     <i
                //                     class="fa fa-user fa-2x text-green"
                //                     aria-hidden="true"
                //                     ></i>
                //                     <div class="card_inner">
                //                         <p class="text-primary-p">User</p>
                //                         <span class="font-bold text-title">{user.firstName}</span>
                //                     </div>
                //                     </div>
                //                 </div>
                //                 <div class="charts">
                //                     <div class="charts__left">
                //                     <div class="charts__left__title">
                //                         <div>
                //                         <h1>Calendar</h1>
                //                         <p>Spain</p>
                //                         </div>
                //                         <i class="fa fa-usd" aria-hidden="true"></i>
                //                     </div>
                //                     <div id="apex1"></div>
                //                     </div>
    
                //                     <div class="charts__right">
                //                     <div class="charts__right__title">
                //                         <div>
                //                         <h1>Stats Reports</h1>
                //                         <p>Cupertino, California, USA</p>
                //                         </div>
                //                         <i class="fa fa-usd" aria-hidden="true"></i>
                //                     </div>
    
                //                     <div class="charts__right__cards">
                //                         <div class="card1">
                //                         <h1>Income</h1>
                //                         <p>$75,300</p>
                //                         </div>
    
                //                         <div class="card2">
                //                         <h1>Sales</h1>
                //                         <p>$124,200</p>
                //                         </div>
    
                //                         <div class="card3">
                //                         <h1>Users</h1>
                //                         <p>3900</p>
                //                         </div>
    
                //                         <div class="card4">
                //                         <h1>Orders</h1>
                //                         <p>1881</p>
                //                         </div>
                //                     </div>
                //                     </div>
                //                 </div>
                //                 </div>
                //             </main>
                //     </div>
                // );




























                // return(
                //     <div className="col-md-4">
                //         <h4 class="text-center color-byTeamName"><strong>SEASON</strong></h4>
                //         {/* <div class="profile-card-6"><img src="https://cdn.pixabay.com/photo/2016/03/27/20/58/sky-1284256_960_720.jpg" class="img img-responsive"/> */}
                //         <div class="profile-card-6"><img src="https://cdn.pixabay.com/photo/2021/01/18/10/59/basketball-5927762_960_720.jpg" class="img img-responsive"/>
    
                //             <div class="profile-name">
                //                 <FormattedDate
                //                     value={ season.startDate }
                //                     year="numeric"
                //                 />
                //             / 
                //                 <FormattedDate
                //                 value={ season.endDate }
                //                 year="numeric"
                //                 /> 
                //             </div>
                //             <div class="profile-position">SEASON</div>
                //             <div class="profile-overview">
                //                 <div class="profile-overview">
                //                     <div class="">
                //                         <div class="col-xs-4">
                //                             <h3>1</h3>
                //                             <p>Games</p>
                //                         </div>
                //                         <div class="col-xs-4">
                //                         {/* <h3>{teamsList.length}</h3> */}
                //                             <button className="btn btn-primary" type="button" onClick={() => handleFindTeamsToSeason(season.id, dispatch, history)}>Teams</button>
                //                         </div>
                //                         <div class="col-xs-4">
                //                             <h3>35</h3>
                //                             <p>Plays</p>
                //                         </div>
                //                     </div>
                //                 </div>
                //         </div>
                //         </div>
                //     </div>
                // );
            }
            else{
                dispatch(actions.findSeasonById(id, () => history(`/seasons/view/${id}`)));
                return(
                    <div className="spinner-border color-byTeamName" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>        
                );
            }
    }

    return(
        <div>
          <SeasonView season={season} dispatch={dispatch}/>
        </div>
    );
}

export default SeasonView;