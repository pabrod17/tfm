// MIT License

// Copyright (c) 2018 Martin Beierling

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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



    const combineDrawing = (canvasRef) => {
        
        const background = canvasRef.current.canvasContainer.children[0]; 
        const width = background.width;
        const height = background.height;
        console.log("ancho: ", width)
        console.log("alto: ", height)
        // const width = canvasRef.current.props.canvasWidth;
        // const height = canvasRef.current.props.canvasHeight;
        const drawing = canvasRef.current.canvasContainer.children[1]; 
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        

    
        // composite now
        canvas.getContext('2d').drawImage(background, 0, 0);
        canvas.getContext('2d').globalAlpha = 1.0; 
        canvas.getContext('2d').drawImage(drawing, 0, 0);
    
        const dataUri = canvas.toDataURL('image/jpeg', 1.0);
        const data = dataUri.split(',')[1];
        const mimeType = dataUri.split(';')[0].slice(5);
    
        const bytes = window.atob(data);
        const buf = new ArrayBuffer(bytes.length);
        const arr = new Uint8Array(buf);
    
        for (let i = 0; i < bytes.length; i++) {
            arr[i] = bytes.charCodeAt(i);
        }
    
        const blob = new Blob([arr], { type: mimeType });
        return { blob: blob, dataUri: dataUri };
    }

    const saveImage = (blob, filename) => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
    
        const url = window.URL.createObjectURL(combineDrawing(canvasDrawRef).blob);
        a.href = url;
        a.download = "hola.png";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // const saveImage4 = () => {
      
    //       const image = canvasDrawRef.current.canvasContainer.children[0].toDataURL();
    //       console.log(canvasDrawRef.current.canvasContainer.children)
    //       console.log(canvasDrawRef.current.canvasContainer.children[0].length);
    //       const drawing = canvasDrawRef.current.canvasContainer.children[6].toDataURL();

    //       const link = document.createElement('a');
    //       link.href = drawing;
    //       link.download = 'canvas.png';
    //       link.click();
    //   };

    //   const saveImage3 = () => {
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
        
    //     // Obtener el tamaño del lienzo
    //     const width = 1600;
    //     const height = 1000;
        
    //     // Establecer el tamaño del lienzo
    //     canvas.width = width;
    //     canvas.height = height;
        
    //     // Dibujar el fondo en el lienzo
    //     const backgroundImage = new Image();
    //     backgroundImage.src = canvasDrawRef.current.canvasContainer.children[0].toDataURL(); // Fondo
    //     context.drawImage(backgroundImage, 1, 1, width, height);
    //     console.log(backgroundImage);
    //     // Dibujar el dibujo en el lienzo
    //     const drawingImage = new Image();
    //     drawingImage.src = canvasDrawRef.current.canvasContainer.children[1].toDataURL(); // Dibujo
    //     context.drawImage(drawingImage, 0, 0, width, height);
    //     console.log(context);

    //     // Obtener la URL de los datos del lienzo combinado
    //     const combinedDataURL = context.canvas.toDataURL('image/png');
        
    //     // Crear un enlace para descargar la imagen combinada
    //     const link = document.createElement('a');
    //     link.href = combinedDataURL;
    //     link.download = 'combined_canvas.png';
    //     link.click();
    // };



    //   const saveImage2 = () => {
    //     /* const uri = refDraw[0].current.toDataURL();
    //     console.log(uri); */
    //     const data = canvasDrawRef.current.getSaveData();
    //     console.log(data);
    
    //     const image = canvasDrawRef.current.canvasContainer.childNodes[1].toDataURL();
    
    //     const testIMG = canvasDrawRef.current.canvasContainer.children[1].toDataURL();
    
    //     console.log(testIMG);
    
    //     const d = canvasDrawRef.current.canvasContainer.children[1].toDataURL();
    //     const w = window.open("about:blank", "image from canvas");
    //     const img = require("./courtDraw2.png");
    //     w.document.write(
    //       "<img src='" +
    //         d +
    //         "' style='background-image: url( " +
    //         img +
    //         "); background-size: contain;background-repeat: no-repeat;  ' alt='Exporting'/>"
    //     );
    //     /* const uri = data.toDataURL();
    //     console.log(uri); */
    //   };



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
            width={"83vw"} // El ancho inicial es del 80% del ancho de la ventana
            height={"90vh"} // El alto inicial es del 80% del alto de la ventana
            p={5}
            m={9}
            ml={0}
            mr={0}
            pt={3}
            pl={3}
            pr={3}
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
                        <FormattedMessage id="project.global.buttons.undo"/>
                    </button>
                    <button
                        className="button_all_buscar_draw"
                        onClick={() => {
                            canvasDrawRef.current.clear();
                        }}
                    >
                        <FormattedMessage id="project.global.buttons.clear"/>
                    </button>
                    <input
                        style={{ background: { canvas }, width: "60px", height: "40px" }}
                        type="color"
                        value={canvas}
                        onChange={(event) => {
                            setBrush(event.target.value);
                        }}
                    />
                    <button className='button_download_board' onClick={saveImage}><FormattedMessage id="project.global.buttons.download"/></button>
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