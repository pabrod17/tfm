import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import * as selectors from '../selectors';
import Exercises from './Exercises';
import { Pager } from '../../common';

const ExercisesHomeByType = () => {
    const exercisesSearch = useSelector(selectors.getExercisesSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const { exerciseType } = useParams();

    const tactic = "Tactico";
    const technique = "Tecnica";
    const physical = "Fisico";
    const globalized = "Global";
    const specific = "Especifico";
    const psychological = "Psicologico";
    const strategy = "Estrategia";
    const preMatch = "PrePartido";

    useEffect(() => {
        if (!exercisesSearch) {
            console.log("HOLA");
            dispatch(actions.findExercisesByTypePage({ page: 0, exerciseType: exerciseType }));
        }
    }, [exercisesSearch, dispatch, exerciseType]);



    const handleSetTypeExercise = (exerciseType, dispatch) => {
        dispatch(actions.findExercisesByTypePage({ page: 0, exerciseType: exerciseType }));
        history(`/exercises/home/type/${exerciseType}`);
    }

    return (
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history(`/exercises/addExercise`)}><FormattedMessage id="project.exercises.fields.addExercise" /></button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion"><FormattedMessage id="project.exercises.fields.type" />
                                <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                                <a type="button" onClick={() => handleSetTypeExercise(tactic, dispatch)}><FormattedMessage id="project.exercises.fields.tactic" /></a>
                                <a type="button" onClick={() => handleSetTypeExercise(technique, dispatch)}><FormattedMessage id="project.exercises.fields.technique" /></a>
                                <a type="button" onClick={() => handleSetTypeExercise(physical, dispatch)}><FormattedMessage id="project.exercises.fields.physical" /></a>
                                <a type="button" onClick={() => handleSetTypeExercise(globalized, dispatch)}><FormattedMessage id="project.exercises.fields.globalized" /></a>
                                <a type="button" onClick={() => handleSetTypeExercise(specific, dispatch)}><FormattedMessage id="project.exercises.fields.specific" /></a>
                                <a type="button" onClick={() => handleSetTypeExercise(psychological, dispatch)}><FormattedMessage id="project.exercises.fields.psychological" /></a>
                                <a type="button" onClick={() => handleSetTypeExercise(strategy, dispatch)}><FormattedMessage id="project.exercises.fields.strategy" /></a>
                                <a type="button" onClick={() => handleSetTypeExercise(preMatch, dispatch)}><FormattedMessage id="project.exercises.fields.preMatch" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {exercisesSearch && exercisesSearch.result && (
                    <Exercises exercises={exercisesSearch.result.items} />
                )}
                {/* <Pager
                    back={{
                        enabled: exercisesSearch.criteria.page >= 1,
                        onClick: () => previousFindExercisesByTypeResultPage(exerciseType, dispatch)
                    }}
                    next={{
                        enabled: exercisesSearch.result.existMoreItems,

                        onClick: () => nextFindExercisesByTypeResultPage(exerciseType, dispatch)
                    }} /> */}
            </div>
        </div>

    );
}

export default ExercisesHomeByType;