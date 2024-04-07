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
import { PlayAnimatordHome } from '..';

const Court = ({ children, onPositionSelect }) => {
    const [backgroundImage, setBackgroundImage] = useState(drawCourt2); // Imagen inicial

    const style = {
      border: "1px solid black",
      width: "100%",
      height: "100%",
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(10, 1fr)",
      gridTemplateRows: "repeat(6, 1fr)",
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat', // Evita la repetición de la imagen de fondo
      backgroundSize: 'cover',
      overflowX: 'hidden',
    };
  
    return (
      <div style={style} className="court">
        {[...Array(60)].map((_, index) => (
          <div
            key={index}
            style={{
              border: "1px dashed rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              position: "relative",
              "&:hover": {
                backgroundColor: "lightgray",
              },
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "lightgray")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            onClick={(e) => onPositionSelect(index)}
          />
        ))}
        {children}
      </div>
    );
  };
  
  const Player = ({ id,color, position, onClick, isSelected }) => {
    const style = {
      width: "5%",
      height: "10%",
      backgroundColor: isSelected ? "green" : color,
      position: "absolute",
      top: position.top + "px",
      left: position.left + "px",
      transition: "top 0.5s, left 0.5s",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "red",
      },
    };
  
    return (
      <div
        style={style}
        onClick={() => onClick(id)}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "red")}
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = isSelected ? "green" : color)
        }
      />
    );
  };
  
  const PlayAnimatorHome = () => {
    const [players, setPlayers] = useState([
      {
        id: 1,
        position: { top: 0, left: 0 },
        steps: [],
        color:"orange"
      },
      {
        id: 2,
        position: { top: 160, left: 0 },
        steps: [],
        color:"blue"
      },
      // Add more players as needed
    ]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlayerClick = (playerId) => {
      setSelectedPlayer(playerId);
    };
  
    const handlePositionSelect = (index) => {
      if (selectedPlayer !== null) {
        const courtElement = document.querySelector(".court");
        if (courtElement) {
          const courtWidth = courtElement.clientWidth;
          const courtHeight = courtElement.clientHeight;
    
          const column = index % 10;
          const row = Math.floor(index / 10);
          const top = (row * courtHeight) / 6; // Altura del campo dividida por el número de filas
          const left = (column * courtWidth) / 10; // Ancho del campo dividido por el número de columnas
    
          setPlayers((players) =>
            players.map((player) =>
              player.id === selectedPlayer
                ? {
                    ...player,
                    position: { top, left },
                  }
                : player
            )
          );
          setSelectedPlayer(null);
        }
      }
    };
  
    const addStep = () => {
      // Add the current positions as a new step for all players
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({
          ...player,
          steps: [...player.steps, player.position],
        }))
      );
      // Increment step index to newly added step
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
    };
  
    const goToNextStep = () => {
      setCurrentStepIndex((prevIndex) => {
        // Ensure we don't go beyond the last step
        const maxIndex = players[0].steps.length - 1;
        return prevIndex < maxIndex ? prevIndex + 1 : maxIndex;
      });
    };
  
    const goToPreviousStep = () => {
      setCurrentStepIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };
  
    // Update player positions when step index changes
    useEffect(() => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({
          ...player,
          position: player.steps[currentStepIndex] || player.position,
        }))
      );
    }, [currentStepIndex]);
  
    const playSteps = () => {
      // Start from the first step
      setCurrentStepIndex(0);
      setIsPlaying(true);
    };
  
    const stopPlaying = () => {
      setIsPlaying(false);
    };
  
    useEffect(() => {
      let intervalId;
      if (isPlaying) {
        intervalId = setInterval(() => {
          setCurrentStepIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            // Stop playing if we've reached the last step
            if (nextIndex >= players[0].steps.length) {
              setIsPlaying(false);
              return prevIndex;
            }
            return nextIndex;
          });
        }, 1000); // Move to the next step every second
      }
      // Cleanup interval on component unmount or when stopping play
      return () => clearInterval(intervalId);
    }, [isPlaying, players]);
  
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
            ml={0}
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
          
            <Grid container columns={{ xs: 12, sm: 12, md: 12 }} style={{ height: '100%' }}>
              
                <Grid item md={12} style={{ height: '100%' }}>
                  



        <button onClick={addStep}>Add Step</button>
        <button onClick={goToPreviousStep} disabled={currentStepIndex === 0}>
          Previous Step
        </button>
        <button
          onClick={goToNextStep}
          disabled={currentStepIndex === players[0].steps.length - 1}
        >
          Next Step
        </button>
        <button onClick={playSteps} disabled={isPlaying}>
          Play
        </button>
        <button onClick={stopPlaying} disabled={!isPlaying}>
          Stop 
        </button>

        
        <Court onPositionSelect={handlePositionSelect}>
          {players.map((player) => (
            <Player
              key={player.id}
              id={player.id}
              position={player.position}
              onClick={handlePlayerClick}
              isSelected={player.id === selectedPlayer}
              color={player.color}
            />
          ))}
        </Court>
        <p style={{ fontSize: "50px", marginRight:"100%" }}>{currentStepIndex}</p>
                </Grid>

            </Grid>
        </Box>








      
    );
  };
  
  export default PlayAnimatorHome;