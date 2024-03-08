import React, { useEffect, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import * as selectors from '../selectors';
import Lesions from './Lesions';
import { Pager } from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, IconButton, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const LesionHomeByType = () => {

    const lesionsSearch = useSelector(selectors.getLesionsSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const { lesionType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

    console.log("TUPOSSSSS: ", value)
    console.log("TUPOSSSSS: ", tabValue)
    const muscle = "Muscular";
    const tendon = "Tendinosa";
    const joint = "Articular";
    const spine = "ColumnaVertebral";
    const psychological = "Psicologica";

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
        setPage(page - 1);
        dispatch(actions.previousFindLesionByTypeResultPage(lesionType, page));
    }

    const nextFindLesionByTypeResultPage = (lesionType, dispatch) => {
        setPage(page + 1);
        dispatch(actions.nextFindLesionByTypeResultPage(lesionType, page));
    }

    const handleSetTypeLesion = (lesionType, dispatch) => {
        dispatch(actions.findLesionByTypePage({ page: page, lesionType: lesionType }));
        history(`/lesion/home/type/${lesionType}/${value}`);
    }

    const handleSetAllLesion = (dispatch) => {
        dispatch(actions.findAllLesionPage({ page: page }));
        history(`/lesion/home`);
    }

    return (
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
                    <Tab value={0} sx={{ color: '#40FF00', fontSize: "20px" }} onClick={() => handleSetAllLesion(dispatch)} label="All" />
                    <Tab value={1} sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeLesion(muscle, dispatch)} label={<FormattedMessage id="project.lesion.fields.muscle"/>} />
                    <Tab value={2} sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeLesion(tendon, dispatch)} label={<FormattedMessage id="project.lesion.fields.tendon"/>} />
                    <Tab value={3} sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeLesion(joint, dispatch)} label={<FormattedMessage id="project.lesion.fields.joint"/>} />
                    <Tab value={4} sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeLesion(spine, dispatch)} label={<FormattedMessage id="project.lesion.fields.spine"/>} />
                    <Tab value={5} sx={{ color: '#ffffff', fontSize: "20px" }} onClick={() => handleSetTypeLesion(psychological, dispatch)} label={<FormattedMessage id="project.lesion.fields.psychological"/>} />

                </Tabs>
            </Box>
            <Box
                sx={{
                    maxWidth: { xs: 320, sm: 480 },
                    margin: 'auto',  // Centra horizontalmente
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>
                <IconButton >
                    <AddCircleOutlineIcon sx={{
                        margin: 'auto',  // Centra horizontalmente
                        textAlign: 'center', // Centra el contenido dentro del Box
                        fontSize: "70px",
                        bgcolor: "linear-gradient(147deg,#ffffff ,#4400f9,#000000 35% 70%,#660bd8,#ffffff)",
                        color: "white"
                    }}
                        onClick={() => history(`/lesion/addLesion`)}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
                <Pager
                    back={{
                        enabled: lesionsSearch && lesionsSearch.criteria && lesionsSearch.criteria.page >= 1,
                        onClick: () => previousFindLesionByTypeResultPage(lesionType, dispatch)
                    }}
                    next={{
                        enabled: lesionsSearch && lesionsSearch.result && lesionsSearch.result.existMoreItems,

                        onClick: () => nextFindLesionByTypeResultPage(lesionType, dispatch)
                    }} />
            </Box>

            <div>
                {lesionsSearch && lesionsSearch.result && (
                    <Lesions lesions={lesionsSearch.result.items} />
                )}
            </div>
        </div>

    );

}

export default LesionHomeByType;