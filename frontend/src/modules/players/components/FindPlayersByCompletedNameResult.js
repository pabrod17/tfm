import React from 'react';
import {useSelector} from 'react-redux';
import * as selectors from '../selectors';
import PlayersCompletedName from './PlayersCompletedName';
import {useParams} from 'react-router-dom';

const FindPlayersByCompletedNameResult = () => {
    const {id} = useParams();
    const {playerName} = useParams();
    const {primaryLastName} = useParams();
    const {secondLastName} = useParams();

    const players = useSelector(selectors.getAllPlayers);

    return(
        <PlayersCompletedName players={players.players} id={id} playerName={playerName} primaryLastName={primaryLastName} secondLastName={secondLastName}/>
    );
}

export default FindPlayersByCompletedNameResult;