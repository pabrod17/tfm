import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import Stretchings from './Stretchings';
import {Pager} from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, IconButton, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const StretchingsHomeByType = () => {

    const stretchingsSearch = useSelector(selectors.getStretchingsSearch);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const { stretchingType, tabValue } = useParams();
    const [value, setValue] = useState(parseInt(tabValue, 10) || 0);

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!stretchingsSearch) {
            console.log("HOLA");
            dispatch(actions.findStretchingsByTypePage({ page: page, stretchingType: stretchingType }));
        }
    }, [page, stretchingsSearch, dispatch, stretchingType]);

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
        dispatch(actions.findStretchingsByTypePage({page: page, stretchingType: stretchingType}));
        history(`/stretchings/home/type/${stretchingType}/${value}`);
    }

    const handleSetAllStretching = (dispatch) => {
        dispatch(actions.findAllStretchingsPage({ page: page }));
        history(`/stretchings/home`);
    }

    return(

<div className=''>

<Box
    sx={{
        maxWidth: { xs: 320, sm: 430 },
        bgcolor: 'background.dark',
        boxShadow: 1,
        borderRadius: 4,
        margin: 'auto',  // Centra horizontalmente
        marginTop: '33.5px', // Ajusta la distancia desde la parte superior según sea necesario
        textAlign: 'center', // Centra el contenido dentro del Box
    }}>
    <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
    >
        <Tab value={0} sx={{ color: '#40FF00', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetAllStretching(dispatch)} label="All" />
        <Tab value={1} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(hamstrings, dispatch)} label={<FormattedMessage id="project.stretchings.fields.hamstrings" />} />
        <Tab value={2} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(buttocks, dispatch)} label={<FormattedMessage id="project.stretchings.fields.buttocks" />} />
        <Tab value={3} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(calf, dispatch)} label={<FormattedMessage id="project.stretchings.fields.calf" />} />
        <Tab value={4} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(adductors, dispatch)} label={<FormattedMessage id="project.stretchings.fields.adductors" />} />
        <Tab value={5} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(shoulder, dispatch)} label={<FormattedMessage id="project.stretchings.fields.shoulder" />} />
        <Tab value={6} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(quadriceps, dispatch)} label={<FormattedMessage id="project.stretchings.fields.quadriceps" />} />
        <Tab value={7} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(back, dispatch)} label={<FormattedMessage id="project.stretchings.fields.back" />} />
        <Tab value={8} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(pectoral, dispatch)} label={<FormattedMessage id="project.stretchings.fields.pectoral" />} />
        <Tab value={9} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(crotch, dispatch)} label={<FormattedMessage id="project.stretchings.fields.crotch" />} />
        <Tab value={10} sx={{ color: '#ffffff', fontSize: "17px", paddingBottom:"7px" }} onClick={() => handleSetTypeStretching(triceps, dispatch)} label={<FormattedMessage id="project.stretchings.fields.triceps" />} />

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
            fontSize: "46.9px",
            bgcolor: "linear-gradient(147deg,#ffffff ,#4400f9,#000000 35% 70%,#660bd8,#ffffff)",
            color: "white"
        }}
            onClick={() => history(`/stretchings/addStretching`)}
        >
        </AddCircleOutlineIcon>
    </IconButton>
    <Pager
        back={{
            enabled: stretchingsSearch && stretchingsSearch.criteria && stretchingsSearch.criteria.page >= 1,
            onClick: () => previousFindStretchingsByTypeResultPage(stretchingType, dispatch)
        }}
        next={{
            enabled: stretchingsSearch && stretchingsSearch.result && stretchingsSearch.result.existMoreItems,

            onClick: () => nextFindStretchingsByTypeResultPage(stretchingType, dispatch)
        }} />
</Box>

<div>
    {stretchingsSearch && stretchingsSearch.result && (
        <Stretchings stretchings={stretchingsSearch.result.items} />
    )}
</div>
</div>


















    );

}

export default StretchingsHomeByType;