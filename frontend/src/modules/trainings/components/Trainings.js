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
import {FormattedDate} from 'react-intl';
import * as actionsPlayers from '../../players/actions';
import * as selectorsPlayers from '../../players/selectors';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import bigBall from '../../trainings/components/bigBall.jpg';
import * as actionStretchings from '../../stretchings/actions';
import * as selectorsStretchings from '../../stretchings/selectors';
import * as actionExercises from '../../exercises/actions';
import * as selectorsExercises from '../../exercises/selectors';

const handleViewTraining = (id, dispatch, history) => {
    dispatch(actions.findTrainingById(id, () => history(`/trainings/view/${id}`)));
}

const handleRemoveTraining = (id, dispatch, history) => {
    dispatch(actions.removeTraining(id, () => history(`/trainings/home`)));
}

const handleUpdateTraining = (id, dispatch, history) => {
    dispatch(actions.findTrainingById(id, () => history(`/trainings/update/${id}`)));
}

const handleFindPlayersByTraining = (trainingId, id, dispatch, history) => {
  dispatch(actions.findTrainingById(trainingId, () => console.log(trainingId)));
  dispatch(actionsPlayers.findPlayersByTraining(trainingId, () => history(`/players/home/training/${id}${trainingId}`)));
}

const handleFindStretchingsByTraining = (trainingId, dispatch, history) => {
  dispatch(actionStretchings.findStretchingsByTrainingId(trainingId, () => history(`/stretchings/home/training/${trainingId}`)));
}

const handleAddStretchingToTraining = (trainingId, stretchingId, dispatch, history) => {
  dispatch(actionStretchings.addStretchingToTraining(trainingId, stretchingId, () => history('/trainings/home')));
}

const handleFindExercisesByTraining = (trainingId, dispatch, history) => {
  dispatch(actionExercises.findExercisesByTrainingId(trainingId, () => history(`/exercises/home/training/${trainingId}`)));
}

const handleAddExerciseToTraining = (trainingId, exerciseId, dispatch, history) => {
  dispatch(actionExercises.addExerciseToTraining(trainingId, exerciseId, () => history('/trainings/home')));
}


function TrainingsList({ items, exercisesList, stretchingsList, teamId, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findTrainingsByUserId(() => history('/trainings/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola trainjeje">
                <img src={bigBall} alt="Person" class="card__image entreno"></img>
                <p class="card__name">{item.objective}</p>
                <p class="card__name">                
                <FormattedDate
                    value={ item.trainingDate }
                    year="numeric"
                    month="long"
                    day="numeric"
                /> 
                </p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveTraining(item.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewTraining(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateTraining(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>

                {/* <div class="dropdown">
                <button class="btn-player draw-border">Change Team</button>
                            <div class="dropdown-content">
                            {playersList.map(team => 
                                        <a type="button" onClick={() => handleFindPlayersByTraining(item.id, team.id, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                </div> */}
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.stretchings.fields.addStretching"/></button>
                            <div class="dropdown-content">
                            {stretchingsList.map(stretching => 
                                        <a type="button" onClick={() => handleAddStretchingToTraining(item.id, stretching.id, dispatch, history)}> 
                                            {stretching.id} : {" Rival: "}{stretching.stretchingName}
                                        </a>)}
                            </div>
                </div>
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.exercises.fields.addExercise"/></button>
                            <div class="dropdown-content">
                            {exercisesList.map(exercise => 
                                        <a type="button" onClick={() => handleAddExerciseToTraining(item.id, exercise.id, dispatch, history)}> 
                                            {exercise.id} : {exercise.exerciseName}
                                        </a>)}
                            </div>
                </div>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindPlayersByTraining(item.id, teamId,dispatch, history)}><FormattedMessage id="project.players.fields.players"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindStretchingsByTraining(item.id, dispatch, history)}><FormattedMessage id="project.stretchings.fields.myStretchings"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindExercisesByTraining(item.id, dispatch, history)}><FormattedMessage id="project.exercises.fields.myExercises"/></button>
              </div>
            </div>
          </div>;
        });
      }
}

function TrainingsListUser({ items, exercisesList, stretchingsList, fallback, dispatch, history}) {
  if (!items || items.length === 0) {
      dispatch(actions.findTrainingsByUserId(() => history('/trainings/home')));
      return fallback;
  } else {
      return items.map(item => {
        return <div className="images-teams" key={item.id}>
          
          <div class="">
            <div class="card hola trainjeje">
              <img src={bigBall} alt="Person" class="card__image entreno"></img>
              <p class="card__name">{item.objective}</p>
              <p class="card__name">                
              <FormattedDate
                  value={ item.trainingDate }
                  year="numeric"
                  month="long"
                  day="numeric"
              /> 
              </p>
              <div class="grid-container">
              </div>
              <ul class="social-icons lesiongrande">
              <li><a type="button" onClick={() => handleRemoveTraining(item.id, dispatch, history)}>
                <i class="fa fa-trash"></i></a></li>
                
                <li><a type="button" onClick={() => handleViewTraining(item.id, dispatch, history)}>
                  <i class="fa fa-address-book"></i></a></li>
                  <li><a type="button" onClick={() => handleUpdateTraining(item.id, dispatch, history)}>
                  <i class="fa fa-wrench"></i></a></li>
                <li><a href="#"><i class="fa fa-codepen"></i></a></li>
              </ul>

              {/* <div class="dropdown">
              <button class="btn-player draw-border">Change Team</button>
                          <div class="dropdown-content">
                          {playersList.map(team => 
                                      <a type="button" onClick={() => handleFindPlayersByTraining(item.id, team.id, dispatch, history)}> 
                                          {team.id} : {"  "}{team.teamName}
                                      </a>)}
                          </div>
              </div> */}
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.stretchings.fields.addStretching"/></button>
                            <div class="dropdown-content">
                            {stretchingsList.map(stretching => 
                                        <a type="button" onClick={() => handleAddStretchingToTraining(item.id, stretching.id, dispatch, history)}> 
                                            {stretching.id} : {" Rival: "}{stretching.stretchingName}
                                        </a>)}
                            </div>
                </div>
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.exercises.fields.addExercise"/></button>
                            <div class="dropdown-content">
                            {exercisesList.map(exercise => 
                                        <a type="button" onClick={() => handleAddExerciseToTraining(item.id, exercise.id, dispatch, history)}> 
                                            {exercise.id} : {exercise.exerciseName}
                                        </a>)}
                            </div>
                </div>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindStretchingsByTraining(item.id, dispatch, history)}><FormattedMessage id="project.stretchings.fields.myStretchings"/></button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindExercisesByTraining(item.id, dispatch, history)}><FormattedMessage id="project.exercises.fields.myExercises"/></button>
            </div>
          </div>
        </div>;
      });
    }
}


const Trainings = ({trainings}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    
    const team = useSelector(selectorsTeams.getTeam);
    const stretchings = useSelector(selectorsStretchings.getAllStretchings);
    const exercises = useSelector(selectorsExercises.getAllExercises);

    const exercisesList = exercises.exercises;

    if(!exercisesList) {
        dispatch(actionExercises.findAllExercises(() => history('/trainings/home')));
        return "Loading...";
    }
    
    const stretchingsList = stretchings.stretchings;

    if(!stretchingsList) {
        dispatch(actionStretchings.findAllStretchings(() => history('/trainings/home')));
        return "Loading...";
    }


    if (!team) {
      return(
        <div className="card-group">
        <TrainingsListUser items={trainings} exercisesList={exercisesList} stretchingsList={stretchingsList} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    );
  } else {
      return(
          <div className="card-group">
          <TrainingsList items={trainings} exercisesList={exercisesList} stretchingsList={stretchingsList}  teamId={team.id} fallback={"Loading..."} dispatch = {dispatch} history={history} />
          </div>
      );
  };
}
Trainings.propTypes = {
    trainings: PropTypes.array
};

export default Trainings;