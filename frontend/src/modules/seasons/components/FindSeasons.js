import React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import logoBalonOscuro from './logoBalonOscuro.jpg'
import moon from './moon.jpg'

import * as actions from '../actions';

const FindSeasons = () => {

    const dispatch = useDispatch();
    const history = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findAllSeasons());
        history('/seasons/all/result');
    }

    return(
        <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>
            



            <div class="gallery-seasons button-container">
                <figure class="gallery__item gallery__item--1-seasons">
                    <img src={logoBalonOscuro} class="gallery__imgSeasons pixel" alt="Image 1"/>
                        <button type="submit" className="btn-neon2-seasons">
                            <FormattedMessage id='project.seasons.fields.allSeasons'/>
                        </button>
                </figure>
                <figure class="gallery__item gallery__item--2-seasons">
                    <img src={logoBalonOscuro} class="gallery__imgSeasons pixel" alt="Image 1"/>
                    <Link className="btn-neon3" to="/seasons/betweenDates">
                    <FormattedMessage id='project.seasons.fields.seasonsBetweenTwoDates'/>
                    </Link>
                </figure>
                <figure class="gallery__item gallery__item--3-seasons">
                    <img src={moon} class="gallery__imgSeasons pixel" alt="Image 1"/>
                    <Link className="btn-neon5-seasons" to="/seasons/new">
                    <FormattedMessage id='project.seasons.fields.addSeason'/>
                    </Link>
                </figure>
            </div>




















            {/* <button type="submit" className="btn--primary--seasons">
                <FormattedMessage id='ALL SEASONS'/>
            </button>

            <Link className="btn--secundary--seasons" to="/seasons/betweenDates">
                <FormattedMessage id='SEASONS BETWEEN TWO DATES'/>
            </Link>

            <Link className="btn--third--seasons" to="/seasons/new">
                <FormattedMessage id='Add New Season'/>
            </Link> */}
        </form>
    );
}

export default FindSeasons;