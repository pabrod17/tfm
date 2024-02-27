import React, {useEffect, useState, createContext} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import Lesions from './Lesions';
import {Pager} from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Toolbar } from '@mui/material';

const LesionHomeByType = () => {

    const lesionsSearch = useSelector(selectors.getLesionsSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const {lesionType, tabValue} = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

console.log("TUPOSSSSS: ",value )
console.log("TUPOSSSSS: ",tabValue )
    const muscle = "Muscular";
    const tendon = "Tendinosa";
    const joint = "Articular";
    const spine = "ColumnaVertebral";
    const psychological  = "Psicologica";

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect(() => {
        if (!lesionsSearch) {
          console.log("HOLA");
          dispatch(actions.findLesionByTypePage({ page: page, lesionType: lesionType }));
        }
      }, [page, lesionsSearch, dispatch, lesionType]);

    const previousFindLesionByTypeResultPage = (lesionType, dispatch) => {
        setPage(page-1);
        dispatch(actions.previousFindLesionByTypeResultPage(lesionType, page));
    }

    const nextFindLesionByTypeResultPage = (lesionType, dispatch) => {
        setPage(page+1);
        dispatch(actions.nextFindLesionByTypeResultPage(lesionType, page));
    }

    const handleSetTypeLesion = (lesionType, dispatch) => {
            console.log("hoalalalallala 22222")
            dispatch(actions.findLesionByTypePage({page: page, lesionType: lesionType}));
            history(`/lesion/home/type/${lesionType}/${value}`);
        }

    const handleSetAllLesion = (dispatch) => {
        dispatch(actions.findAllLesionPage({page: page}));
        history(`/lesion/home`);
}
    // console.log("hola --> " +lesionsSearch.criteria.page );

    return(
        <div className=''>

            <Box
                sx={{
                    maxWidth: { xs: 320, sm: 480 },
                    bgcolor: 'background.dark',
                    boxShadow: 1,
                    borderRadius: 4,
                    margin: 'auto',  // Centra horizontalmente
                    marginTop: '50px', // Ajusta la distancia desde la parte superior según sea necesario
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab value={0} sx={{ color: '#40FF00' }} onClick={() => handleSetAllLesion(dispatch)} label="All"/>
        <Tab value={1} sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(muscle, dispatch)} label={muscle}/>
        <Tab value={2} sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(tendon, dispatch)} label={tendon}/>
        <Tab value={3} sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(joint, dispatch)} label={joint}/>
        <Tab value={4} sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(spine, dispatch)} label={spine}/>
        <Tab value={5} sx={{ color: '#ffffff' }} onClick={() => handleSetTypeLesion(psychological, dispatch)} label={psychological}/>

      </Tabs>
      </Box>
      <Box
                sx={{
                    maxWidth: { xs: 320, sm: 480 },
                    margin: 'auto',  // Centra horizontalmente
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>
    <Button
    sx={{
        margin: 'auto',  // Centra horizontalmente
        marginTop: '15px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}
    
    
    variant="contained" color="primary" >
        Tu Botón
      </Button>
      </Box>

            <div>
                {lesionsSearch && lesionsSearch.result && (
                <Lesions lesions={lesionsSearch.result.items}/>
                )}
                {/* <Pager 
                back={{
                    enabled: lesionsSearch.criteria.page >= 1,
                    onClick: () => previousFindLesionByTypeResultPage(lesionType, dispatch) }}
                next={{
                    enabled: lesionsSearch.result.existMoreItems,

                    onClick: () => nextFindLesionByTypeResultPage(lesionType, dispatch)}}/> */}
            </div>
        </div>

    );

}

export default LesionHomeByType;