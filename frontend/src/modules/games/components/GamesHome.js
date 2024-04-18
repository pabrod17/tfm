import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import Games from './Games';
import * as selectorsTeams from '../../teams/selectors';
import * as selectorsSeasons from '../../seasons/selectors';
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

const GamesHome = () => {
    
    const dispatch = useDispatch();
    const history = useNavigate();
    const games = useSelector(selectors.getAllGames);
    const team = useSelector(selectorsTeams.getTeam);
    const season = useSelector(selectorsSeasons.getSeason);

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

            if(team == null) {
                if(season == null){
                    dispatch(actions.findGamesByTwoDates(
                        formattedStartDate, formattedEndDate,
                        errors => setBackendErrors(errors),
                    ));
                } else{
                    dispatch(actions.findGamesByTwoDatesAndSeasonId(
                        season.id, formattedStartDate, formattedEndDate,
                        errors => setBackendErrors(errors),
                    ));
                }
            } else{
                if(season == null){
                    dispatch(actions.findGamesByTwoDatesAndTeamId(
                        team.id,formattedStartDate, formattedEndDate,
                        errors => setBackendErrors(errors),
                    ));
                } else{
                    dispatch(actions.findGamesByTwoDatesAndTeamIdOrSeasonId(
                        team.id, season.id, formattedStartDate, formattedEndDate,
                        errors => setBackendErrors(errors),
                    ));
                }
            }
    }

    const handleSetAllGames = (dispatch) => {
        dispatch(actions.findGamesByUserId(() => history('/games/home')));
    }

    return(
<div className=''>
            <Box
                sx={{
                    maxWidth: { xs: 320, sm: 480 },
                    bgcolor: 'background.dark',
                    borderRadius: 4,
                    margin: 'auto',  // Centra horizontalmente
                    marginTop: '50px', // Ajusta la distancia desde la parte superior según sea necesario
                    textAlign: 'center', // Centra el contenido dentro del Box
                }}>
<div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
                <DateRangePicker
                    startDate={startDate}
                    startDateId="s_id"
                    endDate={endDate}
                    endDateId="e_id"
                    onDatesChange={({ startDate, endDate }) => {
                        console.log("ayuuiuiiii: ", startDate);
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }}
                    focusedInput={dateInput}
                    onFocusChange={(e) => setDateInput(e)}
                    dateFormat={dateFormat}
                    renderCalendarInfo={() => (
                        <DatePresets
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat={dateFormat}
                            handlePresets={(start, end) => {
                                setStartDate(start);
                                setEndDate(end);
                            }}
                        />
                    )}
                />
            </div>
            <div className="mt-3">
                <button type="button" className="button_all_buscar" onClick={handleSubmit}>
                <FormattedMessage id="project.global.buttons.find" />
                </button>
                <button type="button" className="button_all" onClick={() => handleSetAllGames(dispatch)}>
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
                        fontSize: "70px",
                        bgcolor: "linear-gradient(147deg,#ffffff ,#4400f9,#000000 35% 70%,#660bd8,#ffffff)",
                        color: "white"
                    }}
                        onClick={() => history(`/games/addGame`)}
                    >
                    </AddCircleOutlineIcon>
                </IconButton>
            </Box>
            <Games games={games.games} />
        </div>
    );

}

export default GamesHome;