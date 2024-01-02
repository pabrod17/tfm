import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import * as actionsPlayers from '../../players/actions';
import {FormattedDate} from 'react-intl';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';

const handleRemovePlay = (playId, id, dispatch, history) => {
    dispatch(actions.removePlayToTeam(playId, id, () => history(`/plays/home/${id}`)));
    window.location.reload('true');
}

const handleUpdatePlay = (playId, id, dispatch, history) => {
    dispatch(actions.findPlayById(playId, () => history(`/plays/update/${id}`)));
  }

  const handleAddPlayToTeam = (playId, teamId, id, dispatch, history) => {
      if(id != teamId){
        dispatch(actions.addPlayToTeam(teamId, playId, () => history(`/plays/home/${id}`)));
      }
  }

  const handleViewPlay = (playId, dispatch, history) => {
    dispatch(actions.findPlayById(playId, () => history(`/plays/view/${playId}`)));
  }

function PlaysList({ items, id, teamsList, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findPlaysByTeamId(id, () => history(`/plays/home/${id}`)));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={notaLapiz} alt="Person" class="card__image jugando"></img>
                <p class="card__name">{item.title}</p>
                <div class="grid-container">
                </div>
                <ul class="social-icons jugadagrande">
                <li><a type="button" onClick={() => handleRemovePlay(item.id, id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewPlay(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdatePlay(item.id, id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <div class="dropdown">
                <button class="btn-player draw-border"><FormattedMessage id="project.teams.fields.changeTeam"/></button>
                            <div class="dropdown-content">
                            {teamsList.map(team => 
                                        <a type="button" onClick={() => handleAddPlayToTeam(item.id, team.id, id, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                </div>
              </div>
            </div>
          </div>;
        });
      }
}





const Plays = ({plays, id}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const teams = useSelector(selectorsTeams.getAllTeams);

    const teamsList = teams.teams;

    if(!teamsList) {
        dispatch(actionsTeams.findAllTeams());
        return "Loading...";
    }

    return(
        <div className="card-group">
          <PlaysList items={plays} id={id} teamsList={teamsList} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
}

Plays.propTypes = {
    plays: PropTypes.array
};

export default Plays;