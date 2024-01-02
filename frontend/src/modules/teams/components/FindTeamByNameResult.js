import React from 'react';
import {useSelector} from 'react-redux';
import * as selectors from '../selectors';
import Team from './Team';
import {useParams} from 'react-router-dom';



const FindTeamByNameResult = () => {
    const {teamName} = useParams();

    const team = useSelector(selectors.getTeam);
    return(
        <Team team={team} teamName={teamName}/>
    );
}

export default FindTeamByNameResult;