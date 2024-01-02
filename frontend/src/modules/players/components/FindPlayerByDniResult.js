import React from 'react';
import {useSelector} from 'react-redux';
import * as selectors from '../selectors';
import Player from './Player';
import {useParams} from 'react-router-dom';

const FindPlayerByDniResult = () => {
    const {dni} = useParams();
    const {id} = useParams();
    const player = useSelector(selectors.getPlayer);

    return(
        <Player player={player} dni={id} dni={id}/>
    );

}

export default FindPlayerByDniResult;