import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import Lesions from './Lesions';
import {Pager} from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const LesionHome = () => {

    const lesionsSearch = useSelector(selectors.getLesionsSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const [value, setValue] = useState(0);


    const muscle = "Muscular";
    const tendon = "Tendinosa";
    const joint = "Articular";
    const spine = "ColumnaVertebral";
    const psychological  = "Psicologica";
    console.log("subida " + page);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    if(!lesionsSearch){
        console.log("HOLA");
        dispatch(actions.findAllLesionPage({page: page}, () => console.log("ADIOS")));
        
        return "Loading...";

    } 

    const previousFindAllLesionResultPage = (dispatch) => {
        console.log("bajo " + page);

        setPage(page-1);
        dispatch(actions.previousFindAllLesionResultPage(page)); 
    }

    const nextFindAllLesionResultPage = (dispatch) => {
        console.log("subo " + page);
        setPage(page+1);
        dispatch(actions.nextFindAllLesionResultPage(page));

    }



    const handleSetTypeLesion = (tabValue, handleChange, lesionType, dispatch) => {
        setValue(tabValue);

        dispatch(actions.findLesionByTypePage({page: 0, lesionType: lesionType}));
        history(`/lesion/home/type/${lesionType}/${tabValue}`);
    }
    // console.log("hola --> " +lesionsSearch.criteria.page );
    const handleSetAllLesion = (dispatch) => {
        dispatch(actions.findAllLesionPage({page: page}));
        history(`/lesion/home`);
}
    return(
        <div>
            <Box 
            sx={{ 
                maxWidth: { xs: 320, sm: 480 }, 
                bgcolor: 'background.dark',
                boxShadow: 1,
                borderRadius: 2,



                }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab sx={{ color: '#40FF00' }} onClick={() => handleSetAllLesion(dispatch)} label="All"/>
        <Tab sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(1, handleChange, muscle, dispatch)} label={muscle}/>
        <Tab sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(2, handleChange, tendon, dispatch)} label={tendon}/>
        <Tab sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(3, handleChange, joint, dispatch)} label={joint}/>
        <Tab sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(4, handleChange, spine, dispatch)} label={spine}/>
        <Tab sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(5, handleChange, psychological, dispatch)} label={psychological}/>

      </Tabs>
    </Box>
            <div>
                <Lesions lesions={lesionsSearch.result.items}/>
                {/* <Pager 
                back={{
                    enabled: lesionsSearch.criteria.page >= 1,
                    onClick: () => previousFindAllLesionResultPage(dispatch) }}
                next={{
                    enabled: lesionsSearch.result.existMoreItems,

                    onClick: () => nextFindAllLesionResultPage(dispatch)}}/> */}
            </div>
        </div>

    );

}

export default LesionHome;