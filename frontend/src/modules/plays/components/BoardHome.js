import React, { useEffect, useRef, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as selectors from '../selectors';
import { useParams } from 'react-router-dom';
import { Errors } from '../../common';
import Plays from './Plays';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CanvasDraw from "react-canvas-draw";
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import drawCourt from './drawCourt.png';
import drawCourt2 from './courtDraw2.png';

const BoardHome = () => {
    const { id } = useParams();
    const plays = useSelector(selectors.getPlays);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [value, setValue] = useState(0);
    const [canvas, setBrush] = useState("#FF0000");
    const [brush, setThick] = useState(50);
    const canvasDrawRef = useRef(null);
    const secondCanvasRef = useRef(null);

    // const handleClick = () =>{
    //     const data = canvasDrawRef.current.getSaveData();
    //     console.log(data);
    //     secondCanvasRef.current.loadSaveData(data, true);
    // }


    //Tabs para cambiar de color
    //negro, verde, rojo
    return (

        <Box
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            width={"80vw"} // El ancho inicial es del 80% del ancho de la ventana
            height={"80vh"} // El alto inicial es del 80% del alto de la ventana
            p={5}
            m={9}
            sx={{
                border: '2px solid grey',
                background: "linear-gradient(180deg, #329617 0%, #062C76 70% )",
                borderRadius: "20px",
                flexWrap: 'wrap',
                flexDirection: 'column',
                borderColor: "black",
                boxShadow: "0 10px 50px rgb(0, 0, 0)"
            }}
        >
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} style={{ height: '100%' }}>
                <Grid item md={12} style={{ height: '100%' }}>
                    <CanvasDraw
                        ref={canvasDrawRef}
                        brushRadius={7}
                        brushColor={canvas}
                        catenaryColor={canvas}
                        brushRadius={brush}
                        hideGrid={true}
                        imgSrc={drawCourt2}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </Grid>

                <Box display="flex" justifyContent="center" width="100%">
                    <button
                        className="button_all_draw"
                        onClick={() => {
                            canvasDrawRef.current.undo();
                        }}
                    >
                        UNDO
                    </button>

                    <input
                        style={{ background: { canvas }, width: "60px", height: "40px" }}
                        type="color"
                        value={canvas}
                        onChange={(event) => {
                            setBrush(event.target.value);
                        }}
                    />
                    <button
                        className="button_all_buscar_draw"
                        onClick={() => {
                            canvasDrawRef.current.clear();
                        }}
                    >
                        CLEAR
                    </button>
                    <input
                        min="2"
                        max="50"
                        type="range"
                        onChange={(event) => {
                            setThick(event.target.value);
                        }}
                        style={{
                            width: '100%',
                        }}
                    />
                    {/* <button
                    className="button_all_buscar_draw"
                    style={{
                        color:"red",
                        borderColor:"red"
                    }}
                        onClick={handleClick}
                    >
                        SAVE    
                    </button> */}
                </Box>
            </Grid>
        </Box>
    );

}

export default BoardHome;