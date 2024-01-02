import React from 'react';
import {useSelector} from 'react-redux';

import * as selectors from '../selectors';
import Seasons from './Seasons';

const FindSeasonsResult = () => {

    const seasons = useSelector(selectors.getAllSeasons);

    return(
        <Seasons seasons = {seasons.seasons}/>
    );
}

export default FindSeasonsResult;