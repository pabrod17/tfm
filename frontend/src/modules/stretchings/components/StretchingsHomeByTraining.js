import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import StretchingsByTraining from './StretchingsByTraining';
import {useParams} from 'react-router-dom';

const StretchingsHomeByTraining = () => {

    const stretchings = useSelector(selectors.getAllStretchings);
    const dispatch = useDispatch();
    const history = useNavigate();
    const {trainingId} = useParams();

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
                <StretchingsByTraining stretchings={stretchings.stretchings} trainingId={trainingId}/>
            </div>
        </div>
    );
}

export default StretchingsHomeByTraining;