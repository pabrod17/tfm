import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import StretchingsByPlayer from './StretchingsByPlayer';
import {useParams} from 'react-router-dom';

const StretchingsHomeByPlayer = () => {

    const stretchings = useSelector(selectors.getAllStretchings);
    const dispatch = useDispatch();
    const history = useNavigate();
    const {playerId} = useParams();

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
                <StretchingsByPlayer stretchings={stretchings.stretchings} playerId={playerId}/>
            </div>
        </div>
    );
}

export default StretchingsHomeByPlayer;