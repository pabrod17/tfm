import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';

const LesionView = () => {

    const lesion = useSelector(selectors.getOneLesion);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();


    function LesionViewFunction({lesion, dispatch}){
        if(lesion){

            return (
                    

                    <div class="card hola  text-center" >
                        <img className="holas" src={lesionPierna}/>
                        <div class="card-body">
                            <h5 class="card__name">{lesion.lesionName}</h5>
                            <h5 class="card-title"><FormattedMessage id="project.exercises.fields.typeOnly"/>: {lesion.lesionType}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><FormattedMessage id="project.exercises.fields.description"/></h5>
                            <p class="card-text">{lesion.description}</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><FormattedMessage id="project.lesion.fields.medication"/></h5>
                            <p class="card-text">{lesion.medication}</p>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">

                        </div>
                    </div>



            );


        }
        else{
            dispatch(actions.findLesionById(id, () => history(`/lesion/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
            <LesionViewFunction lesion={lesion} dispatch={dispatch}/>
        </div>
    );
}

export default LesionView;