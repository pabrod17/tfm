import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import Exercises from './Exercises';
import {Pager} from '../../common';

const ExercisesHome = () => {
    const exercisesSearch = useSelector(selectors.getExercisesSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);

    const tactic = "Tactico";
    const technique = "Tecnica";
    const physical = "Fisico";
    const globalized = "Global";
    const specific  = "Especifico";
    const psychological = "Psicologico";
    const strategy = "Estrategia";
    const preMatch = "PrePartido";
    console.log("subida " + page);

    if(!exercisesSearch){
        console.log("HOLA");
        dispatch(actions.findAllExercisesPage({page: page}, () => console.log("ADIOS")));
        
        return "Loading...";

    } 

    const previousFindAllExercisesResultPage = (dispatch) => {
        console.log("bajo " + page);
        setPage(page-1);
        console.log("bajada " + page);

        dispatch(actions.previousFindAllExercisesResultPage(page));
    }

    const nextFindAllExercisesResultPage = (dispatch) => {
        console.log("subo " + page);
        setPage(page+1);

        dispatch(actions.nextFindAllExercisesResultPage(page));
    }


    const handleSetTypeExercise = (exerciseType, dispatch) => {
        dispatch(actions.findExercisesByTypePage({page: page, exerciseType: exerciseType}));
        history(`/exercises/home/type/${exerciseType}`);
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history(`/exercises/addExercise`)}><FormattedMessage id="project.exercises.fields.addExercise"/></button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion"><FormattedMessage id="project.exercises.fields.type"/>
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                                    <a type="button" onClick={() => handleSetTypeExercise(tactic, dispatch)}><FormattedMessage id="project.exercises.fields.tactic"/></a>
                                    <a type="button" onClick={() => handleSetTypeExercise(technique, dispatch)}><FormattedMessage id="project.exercises.fields.technique"/></a>
                                    <a type="button" onClick={() => handleSetTypeExercise(physical, dispatch)}><FormattedMessage id="project.exercises.fields.physical"/></a>
                                    <a type="button" onClick={() => handleSetTypeExercise(globalized, dispatch)}><FormattedMessage id="project.exercises.fields.globalized"/></a>
                                    <a type="button" onClick={() => handleSetTypeExercise(specific, dispatch)}><FormattedMessage id="project.exercises.fields.specific"/></a>
                                    <a type="button" onClick={() => handleSetTypeExercise(psychological, dispatch)}><FormattedMessage id="project.exercises.fields.psychological"/></a>
                                    <a type="button" onClick={() => handleSetTypeExercise(strategy, dispatch)}><FormattedMessage id="project.exercises.fields.strategy"/></a>
                                    <a type="button" onClick={() => handleSetTypeExercise(preMatch, dispatch)}><FormattedMessage id="project.exercises.fields.preMatch"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Exercises exercises={exercisesSearch.result.items}/>
                <Pager 
                back={{
                    enabled: exercisesSearch.criteria.page >= 1,
                    onClick: () => previousFindAllExercisesResultPage(dispatch) }}
                next={{
                    enabled: exercisesSearch.result.existMoreItems,

                    onClick: () => nextFindAllExercisesResultPage(dispatch)}}/>
            </div>
        </div>

    );
}

export default ExercisesHome;