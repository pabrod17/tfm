import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import Seasons from './Seasons';
import {Errors} from '../../common';
import {FormattedMessage} from 'react-intl';

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import DatePresets from "./DatePresets";
import { format } from 'date-fns'; // Importa la función format de date-fns
import Box from '@mui/material/Box';
import { Button, IconButton, Pagination, Stack, Toolbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SeasonsHome = () => {
    
    const dispatch = useDispatch();
    const history = useNavigate();
    const seasons = useSelector(selectors.getAllSeasons);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"; // Formato ISO 8601
    const [dateInput, setDateInput] = useState(null);

    const formattedStartDate = startDate ? startDate.toDate().toISOString() : null;
    const formattedEndDate = endDate ? endDate.toDate().toISOString() : null;

    const handleSubmit = event => {
        event.preventDefault();

        dispatch(actions.findSeasonsBetweenTwoDates(
            formattedStartDate,
            formattedEndDate,
            errors => setBackendErrors(errors),
        ));
    }

    const handleSetAllSeasons = (dispatch) => {
        dispatch(actions.findAllSeasons(() => history('/seasons/home')));
    }

    return(
<div className=''>
            <Box
                sx={{
                    maxWidth: { xs: 320, sm: 480 },
                    bgcolor: 'background.dark',
                    borderRadius: 4,
                    margin: 'auto',  // Centra horizontalmente
                    marginTop: '33.5px', // Ajusta la distancia desde la parte superior según sea necesario
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>
<div>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 2,
                  }} 
                  dateFormat={dateFormat}
                  onChange={(newValue) => 
                    {
                        console.log("PRIMERO: ", newValue);
                    
                        setStartDate(newValue)
                    }
                    }
                  
                  
                  />
        <DatePicker
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
          }}
          dateFormat={dateFormat}
          onChange={(newValue) => 
            {
                console.log("PRIMERO: ", newValue);
            
                setEndDate(newValue)
            }
            }
          
        />
      </DemoContainer>
    </LocalizationProvider>
            </div>
            <div className="mt-2">
                {/* <button type="button" className="button_all_buscar" onClick={handleSubmit}>
                <FormattedMessage id="project.global.buttons.find" />
                </button> */}
                <button type="button" className="button_all" onClick={() => handleSetAllSeasons(dispatch)}>
                    All
                </button>
            </div>
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
                        color: "white",
                        marginBottom:"-17px"
                    }}
                        onClick={() => history(`/seasons/addSeason`)}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
            </Box>
            <Seasons seasons={seasons.seasons} />
        </div>
    );

}

export default SeasonsHome;