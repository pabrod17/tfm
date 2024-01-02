import React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import * as actionsSeasons from '../../seasons/actions';
import basketball from './basketball.jpg';
import blue from './blue.jpg';
import logoBalonOscuro from './logoBalonOscuro.jpg'
import moon from './moon.jpg'
import balon from './balon.png'

import * as actions from '../actions';

const FindTeams = () => {

    const dispatch = useDispatch();
    const history = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findAllTeams());
        history('/teams/all/result');
    }

    const handleAddTeamToSeason = (dispatch, history ) => {
        dispatch(actions.findAllTeams());
        history('/teams/addTeamToSeason');;
    }

    return (

        <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>




            <div class="gallery button-container">

                <figure class="gallery__item gallery__item--1">
                    <img src={logoBalonOscuro} class="gallery__img pixel" alt="Image 1"/>
                        <button type="submit" className="btn-neon2">
                        <FormattedMessage id="project.teams.fields.allTeams"/>
                        </button>
                </figure>
                <figure class="gallery__item gallery__item--2">
                    <img src={logoBalonOscuro} class="gallery__img pixel" alt="Image 1"/>
                    <Link className="btn-neon3" to="/teams/all/name">
                    <FormattedMessage id="project.teams.fields.teamName"/>
                    </Link>
                </figure>
                <figure class="gallery__item gallery__item--3">
                    <img src={moon} class="gallery__img pixel" alt="Image 1"/>
                    <Link className="btn-neon4" to="/teams/new">
                    <FormattedMessage id="project.teams.fields.addTeam"/>
                    </Link>
                </figure>
                <figure class="gallery__item gallery__item--4">
                    <img src={moon} class="gallery__img pixel" alt="Image 1"/>
                    <button className="btn-neon5" type="button" 
                        onClick={() => handleAddTeamToSeason(dispatch, history)}>
                    <FormattedMessage id="project.teams.fields.addTeamToSeason"/>
                    </button>
                </figure>
            </div>

{/* 
            <button type="submit" className="btn--primary">
                <FormattedMessage id='ALL TEAMS'/>
            </button>

            <Link className="btn--secundary" to="/teams/all/name">
                <FormattedMessage id='TEAM NAME'/>
            </Link>

            <Link className="btn--third" to="/teams/new">
                <FormattedMessage id='Add New Team'/>
            </Link> */}
{/* esto no */}
            {/* <Link className="btn--secundary--seasons" to="/teams/addTeamToSeason">
                <FormattedMessage id='Add Team To Season'/>
            </Link> */}
{/* esto si */}
            {/* <button className="btn--secundary--seasons" type="button" 
                onClick={() => handleAddTeamToSeason(dispatch, history)}>
                    <FormattedMessage id='Add Team To Season'/>
            </button> */}

        </form>
    );
}

export default FindTeams;