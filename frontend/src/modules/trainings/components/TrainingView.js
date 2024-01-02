import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import bigBall from '../../trainings/components/bigBall.jpg';

const TrainingView = () => {

    const training = useSelector(selectors.getOneTraining);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();


    function TrainingViewFunction({training, dispatch}){
        if(training){

            return (
                    

                    <div class="card hola  text-center" >
                        <img className="holas entreno" src={bigBall}/>
                        <div class="card-body">
                            <h5 class="card__name"><FormattedMessage id="project.trainings.fields.training"/></h5>
                            <h5 class="card-title"><FormattedMessage id="project.trainings.fields.durationOnly"/>: {training.durationMinutes} minutos</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><FormattedMessage id="project.exercises.fields.description"/></h5>
                            <p class="card-text">{training.description}</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><FormattedMessage id="project.exercises.fields.objective"/></h5>
                            <p class="card-text">{training.objective}</p>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">

                        </div>
                    </div>



            );


        }
        else{
            dispatch(actions.findTrainingById(id, () => history(`/trainings/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }


    return(
        <div>
            <TrainingViewFunction training={training} dispatch={dispatch}/>
        </div>
    );
}

export default TrainingView;