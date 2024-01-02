import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import StretchingsByGame from './StretchingsByGame';
import {useParams} from 'react-router-dom';

const StretchingsHomeByGame = () => {

    const stretchings = useSelector(selectors.getAllStretchings);
    const dispatch = useDispatch();
    const history = useNavigate();
    const {gameId} = useParams();

    const hamstrings = "Isquiotibiales";
    const buttocks = "Gluteos";
    const calf = "Gemelos";
    const adductors = "Adductores";
    const shoulder  = "Hombro";
    const quadriceps = "Cuadriceps";
    const back = "Espalda";
    const pectoral = "Pectoral";
    const crotch = "Ingle";
    const triceps  = "Triceps";

    return(
        <div>
            <div>
                <StretchingsByGame stretchings={stretchings.stretchings} gameId={gameId}/>
            </div>
        </div>
    );

}

export default StretchingsHomeByGame;