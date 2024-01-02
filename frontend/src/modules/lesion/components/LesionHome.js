import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import Lesions from './Lesions';
import {Pager} from '../../common';

const LesionHome = () => {

    const lesionsSearch = useSelector(selectors.getLesionsSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);


    const muscle = "Muscular";
    const tendon = "Tendinosa";
    const joint = "Articular";
    const spine = "ColumnaVertebral";
    const psychological  = "Psicologica";
    console.log("subida " + page);

    if(!lesionsSearch){
        console.log("HOLA");
        dispatch(actions.findAllLesionPage({page: page}, () => console.log("ADIOS")));
        
        return "Loading...";

    } 

    const previousFindAllLesionResultPage = (dispatch) => {
        console.log("bajo " + page);

        setPage(page-1);
        console.log("bajada " + page);

        dispatch(actions.previousFindAllLesionResultPage(page));
    }

    const nextFindAllLesionResultPage = (dispatch) => {
        console.log("subo " + page);

        setPage(page+1);

        dispatch(actions.nextFindAllLesionResultPage(page));

    }



    const handleSetTypeLesion = (lesionType, dispatch) => {
        dispatch(actions.findLesionByTypePage({page: 0, lesionType: lesionType}));
        history(`/lesion/home/type/${lesionType}`);
    }
    // console.log("hola --> " +lesionsSearch.criteria.page );

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history(`/lesion/addLesion`)}><FormattedMessage id="project.lesion.fields.addLesion"/></button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion"><FormattedMessage id="project.lesion.fields.lesionType"/> 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypeLesion(muscle, dispatch)}><FormattedMessage id="project.lesion.fields.muscle"/></a>
                            <a type="button" onClick={() => handleSetTypeLesion(tendon, dispatch)}><FormattedMessage id="project.lesion.fields.tendon"/></a>
                            <a type="button"  onClick={() => handleSetTypeLesion(joint, dispatch)}><FormattedMessage id="project.lesion.fields.joint"/></a>
                            <a type="button" onClick={() => handleSetTypeLesion(spine, dispatch)}><FormattedMessage id="project.lesion.fields.spine"/></a>
                            <a type="button" onClick={() => handleSetTypeLesion(psychological, dispatch)}><FormattedMessage id="project.lesion.fields.psychological"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Lesions lesions={lesionsSearch.result.items}/>
                <Pager 
                back={{
                    enabled: lesionsSearch.criteria.page >= 1,
                    onClick: () => previousFindAllLesionResultPage(dispatch) }}
                next={{
                    enabled: lesionsSearch.result.existMoreItems,

                    onClick: () => nextFindAllLesionResultPage(dispatch)}}/>
            </div>
        </div>

    );

}

export default LesionHome;