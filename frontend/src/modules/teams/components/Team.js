import React from 'react';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import logo22 from './logo22.png';
import {FormattedMessage} from 'react-intl';


function TeamName({team, teamName, dispatch, history}){

  if(team){

    return(
      <div className="images-teams centrado-update-add">
          
          <Card className="images-teams" style={{ width: '20rem' }}>
          <img class="card-img-top" src={logo22} alt="Card image cap"/>
            <Card.Body>
              <Card.Title className="link-color"><FormattedMessage id='project.seasons.fields.name'/>: {team.teamName}</Card.Title>
                      <button className="btn btn-primary" type="button" 
                        onClick={() => handleRemoveItem(team.id, dispatch, history)}>
                        <span className="fas fa-trash-alt"></span>
                      </button>
                       <button className="btn btn-secondary" type="button" 
                        onClick={() => history('/teams/update')}>
                        <span className="fas fa-pencil-alt"></span>
                      </button>
                      <button className="btn btn-info" type="button" 
                        onClick={() => history(`/teams/view/${team.id}`)}>
                        {"View"}
                      </button>
            </Card.Body>
          </Card>
      </div>
    );
  } else{
      dispatch(actions.findTeamByName(teamName));
      return(
        <div className="centrado-update-add">

          <div className="spinner-border color-byTeamName" role="status">
          <span className="visually-hidden centrado-update-add">Loading...</span>
          </div>  
          </div>
      );
    }
}

const handleRemoveItem = (id, dispatch, history ) => {
  dispatch(actions.removeTeam(id, () => history('/')));
}

  const Team = ({team, teamName}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    if(!team){
      return (
        <div className="alert alert-info color-alert" role="alert">
            <FormattedMessage id='project.teams.FindTeamByName.noTeam'/>
        </div>
       );
    }


    return(
        <div>
          <TeamName team={team} teamName={teamName} dispatch={dispatch} history={history} />
        </div>
    )
};

export default Team;