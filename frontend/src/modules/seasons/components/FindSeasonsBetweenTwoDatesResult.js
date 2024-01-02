import React from 'react';
import {useSelector} from 'react-redux';

import * as selectors from '../selectors';
import SeasonsBetweenTwoDates from './SeasonsBetweenTwoDates';
import {useParams} from 'react-router-dom';

const FindSeasonsBetweenTwoDatesResult = () => {
    const {startDate, endDate} = useParams();

    const seasons = useSelector(selectors.getAllSeasons);

    return(
        <SeasonsBetweenTwoDates seasons = {seasons.seasons} startDate = {startDate} endDate = {endDate}/>
    );
}


export default FindSeasonsBetweenTwoDatesResult;