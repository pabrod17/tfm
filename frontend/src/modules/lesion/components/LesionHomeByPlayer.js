import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import LesionsByPlayer from './LesionsByPlayer';
import {useParams} from 'react-router-dom';

const LesionHomeByPlayer = () => {

    const lesions = useSelector(selectors.getAllLesion);
    const dispatch = useDispatch();
    const history = useNavigate();
    const {playerId} = useParams();


    // const muscle = "Muscle";
    // const tendon = "Tendon";
    // const joint = "Joint";
    // const spine = "Spine";
    // const psychological  = "Psychological";

    // const handleSetTypeLesion = (lesionType, dispatch) => {
    //     dispatch(actions.findLesionByType(lesionType));
    // }






    return(
        <div>
            {/* <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Type Lesion 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypeLesion(muscle, dispatch)}>Muscle</a>
                            <a type="button" onClick={() => handleSetTypeLesion(tendon, dispatch)}>Tendon</a>
                            <a type="button"  onClick={() => handleSetTypeLesion(joint, dispatch)}>Joint</a>
                            <a type="button" onClick={() => handleSetTypeLesion(spine, dispatch)}>Spine</a>
                            <a type="button" onClick={() => handleSetTypeLesion(psychological, dispatch)}>Psychological</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div>
                <LesionsByPlayer lesions={lesions.lesions} playerId={playerId}/>
            </div>
        </div>

    );

}

export default LesionHomeByPlayer;