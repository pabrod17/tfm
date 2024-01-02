import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import Stretchings from './Stretchings';
import {Pager} from '../../common';

const StretchingsHomeByType = () => {

    const stretchingsSearch = useSelector(selectors.getStretchingsSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const {stretchingType} = useParams();

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

    if(!stretchingsSearch){
        console.log("HOLA");
        dispatch(actions.findStretchingsByTypePage({page: page, stretchingType: stretchingType}));
        return "Loading...";
    } 

    const previousFindStretchingsByTypeResultPage = (dispatch) => {
        console.log("bajo " + page);
        setPage(page-1);
        console.log("bajada " + page);
        dispatch(actions.previousFindStretchingsByTypeResultPage(page));
    }

    const nextFindStretchingsByTypeResultPage = (dispatch) => {
        console.log("subo " + page);
        setPage(page+1);
        dispatch(actions.nextFindStretchingsByTypeResultPage(page));
    }







    const handleSetTypeStretching = (stretchingType, dispatch) => {
        dispatch(actions.findStretchingsByTypePage({page: 0, stretchingType: stretchingType}));
        history(`/stretchings/home/type/${stretchingType}`);
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history(`/stretchings/addStretching`)}><FormattedMessage id="project.stretchings.fields.addStretching"/></button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion"><FormattedMessage id="project.stretchings.fields.stretchingType"/> 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypeStretching(hamstrings, dispatch)}><FormattedMessage id="project.stretchings.fields.hamstrings"/></a>
                            <a type="button" onClick={() => handleSetTypeStretching(buttocks, dispatch)}><FormattedMessage id="project.stretchings.fields.buttocks"/></a>
                            <a type="button"  onClick={() => handleSetTypeStretching(calf, dispatch)}><FormattedMessage id="project.stretchings.fields.calf"/></a>
                            <a type="button" onClick={() => handleSetTypeStretching(adductors, dispatch)}><FormattedMessage id="project.stretchings.fields.adductors"/></a>
                            <a type="button" onClick={() => handleSetTypeStretching(shoulder, dispatch)}><FormattedMessage id="project.stretchings.fields.shoulder"/></a>
                            <a type="button" onClick={() => handleSetTypeStretching(quadriceps, dispatch)}><FormattedMessage id="project.stretchings.fields.quadriceps"/></a>
                            <a type="button" onClick={() => handleSetTypeStretching(back, dispatch)}><FormattedMessage id="project.stretchings.fields.back"/></a>
                            <a type="button"  onClick={() => handleSetTypeStretching(pectoral, dispatch)}><FormattedMessage id="project.stretchings.fields.pectoral"/></a>
                            <a type="button" onClick={() => handleSetTypeStretching(crotch, dispatch)}><FormattedMessage id="project.stretchings.fields.crotch"/></a>
                            <a type="button" onClick={() => handleSetTypeStretching(triceps, dispatch)}><FormattedMessage id="project.stretchings.fields.triceps"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Stretchings stretchings={stretchingsSearch.result.items}/>
                <Pager 
                back={{
                    enabled: stretchingsSearch.criteria.page >= 1,
                    onClick: () => previousFindStretchingsByTypeResultPage(stretchingType, dispatch) }}
                next={{
                    enabled: stretchingsSearch.result.existMoreItems,

                    onClick: () => nextFindStretchingsByTypeResultPage(stretchingType, dispatch)}}/>
            </div>
        </div>

    );

}

export default StretchingsHomeByType;