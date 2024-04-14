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
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { useParams } from 'react-router-dom';
import { Errors } from '../../common';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CanvasDraw from "react-canvas-draw";
import { Box, Button, FilledInput, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as selectors from '../selectors';
import * as actions from '../actions';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "dayjs/locale/es"
import { GiBasketballBall } from "react-icons/gi";
import { daysToWeeks } from 'date-fns';
import { FaPeopleGroup } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { GiRoundStar } from "react-icons/gi";

import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';


dayjs.locale("es");

const CalendarHome = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();

  const localizer = dayjsLocalizer(dayjs)

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEvent, setSelectEvent] = useState(null);

  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };
  const handleSelectedEvent = (event) => {
    if (event.type == "General") {
      setShowModal(true);
      setSelectEvent(event);
      setEventTitle(event.title);
      setStartDate(dayjs(event.start));
      setFinishDate(dayjs(event.end));
    }
  };

  const saveEvent = () => {
    if (selectEvent) {
      const updatedEvent = { ...selectEvent, title: eventTitle };
      const updatedEvents = events.map((event) =>
        event === selectEvent ? updatedEvent : event
      );
      setEvents(updatedEvents);
      dispatch(actions.updateEvent(selectEvent.id, eventTitle, dateConversor(startDate), dateConversor(finishDate),
        () => reloadWindow(),
      ));
    } else {
      // const newEvent = {
      //   title: eventTitle,
      //   start: selectedDate,
      //   end: dayjs(selectedDate).toDate()
      //     .add(1, "hours")
      //     .toDate(),
      // };
      // setEvents([...events, newEvent]);

      dispatch(actions.addEvent(eventTitle, dateConversor(startDate), dateConversor(finishDate),
        () => reloadWindow(),
      ));

    }
    setShowModal(false);
    setEventTitle("");
    setSelectEvent(null);
    setStartDate(null);
    setFinishDate(null);
  };

  const reloadWindow = () => {
    setShowModal(false);
    setEventTitle("");
    setSelectEvent(null);
    setStartDate(null);
    setFinishDate(null);
    dispatch(actions.findEventsByUserId(() => history('/calendar/home')));
  }

  const deleteEvents = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle('');
      setSelectEvent(null);
      setStartDate(null);
      setFinishDate(null);
      dispatch(actions.removeEvent(selectEvent.id, () => history(`/calendar/home`)));
      window.location.reload('true');
    }
  }

  const reloadWindowDeletedEvent = () => {
    history('/calendar/home');
    dispatch(actions.findEventsByUserId(() => history('/calendar/home')));
    window.location.reload('true');
  }

  function dateConversor(eventDate) {
    const dateObj = new Date(eventDate);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    console.log("SANCANDOOOO FECHA:; ", formattedDate)

    return formattedDate;
  }
















  // const handleClick = () =>{
  //     const data = canvasDrawRef.current.getSaveData();
  //     console.log(data);
  //     secondCanvasRef.current.loadSaveData(data, true);
  // }

  const eventsListAll = useSelector(selectors.getAllEvents);

  useEffect(() => {
    if (!eventsListAll.events) {
      dispatch(actions.findEventsByUserId(() => history(`/calendar/home`)));
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
      setStartDate(null);
      setFinishDate(null);
    }
  }, [dispatch, eventsListAll, history, id]);

  const finalEvents = [
  ];

  if (eventsListAll.events) {
    eventsListAll.events.map(event => {
      finalEvents.push({
        id: event.id,
        title: event.title,
        start: dayjs(event.startDate).toDate(),
        end: dayjs(event.finishDate).toDate(),
        allDay: false, //TRUE si el evento dura todo el dia
        type: event.eventType
      });
    })
  }

  const components = {
    event: (props) => {
      const { type } = props.event;
      if (type == "Game") {
        return <div style={{ textAlign: "center", background: "#a11212" }}>
          <GiBasketballBall style={{ fontSize: "25px", marginRight: "10px" }} />
          <span style={{ fontSize: "20px", verticalAlign: "middle" }}>{props.title}</span>
        </div>
      } else if (type == "Training") {
        return <div style={{ textAlign: "center", background: "#f05c00" }}>
          <FaPeopleGroup style={{ fontSize: "25px", marginRight: "10px" }} />
          <span style={{ fontSize: "20px", verticalAlign: "middle" }}>{props.title}</span>
        </div>
      } else {
        return <div style={{ textAlign: "center", background: "#3bc01a" }}>
          <FaStar style={{ fontSize: "25px", marginRight: "10px" }} />
          <span style={{ fontSize: "20px", verticalAlign: "middle" }}>{props.title}</span>
        </div>
      }
    }
  }


  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };


  //   const handleSelectSlot = (start) => {
  //     this.getModalData(start);
  //     this.setState({ modalOpen: true });
  //     this.setState({ valueIntoModal: start.start });
  //   };
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
      ml={0}
      sx={{
        border: '2px solid grey',
        background: "linear-gradient(180deg, #329617 0%, #062C76 70% )",
        background: "linear-gradient(180deg, #232526 0%, #414345 70% )",
        background: "linear-gradient(180deg, #1CB5E0 0%, #000046 70% )",
        background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 70% )",
        background: "linear-gradient(180deg, #302b63 0%, #0f0c29 70% )",
        background: "linear-gradient(180deg, #396afc 0%, #041263 70% )",
        background: "linear-gradient(180deg, #ed58cf 0%, #333399 70% )",
        background: "linear-gradient(180deg, #df252c 0%, #061161 70% )",
        background: "linear-gradient(360deg, transparent, #8E2DE2)",
        background: "linear-gradient(180deg, #15141A 0%, #15141A 70% )",
        background: "radial-gradient(circle, #15141A 70%, #df252c 100%)",
        background: "radial-gradient(circle, #2b2931 80%, #15141A 100%)",
        background: "linear-gradient(180deg, #2b2931 10%, #15141A 70% )",
        background: "linear-gradient(360deg, transparent, #8E2DE2)",


        background: "linear-gradient(180deg, #2b2931 10%, #15141A 70% )",
        background: "linear-gradient(180deg, #15141A 0%, #15141A 70% )",
        background: "linear-gradient(180deg, #302b63 0%, #0f0c29 70% )",
        background: "linear-gradient(180deg, #1CB5E0 0%, #000046 15% )",
        background: "linear-gradient(180deg, #2b2931 0%, #15141A 15% )",
        background: "linear-gradient(180deg, #232526 0%, #414345 70% )",



        background: "linear-gradient(180deg, #2b2931 10%, #15141A 70% )",
        background: "linear-gradient(180deg, #302b63 0%, #0f0c29 70% )",

        
        



        borderRadius: "20px",
        flexWrap: 'wrap',
        flexDirection: 'column',
        borderColor: "black",
        boxShadow: "0 10px 50px rgb(0, 0, 0)"
      }}
    >
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }} style={{ height: '100%' }}>
        <Grid item md={12} style={{ height: '100%' }}>
          {/* <CanvasDraw
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
                    /> */}

          <Calendar
            localizer={localizer}
            events={finalEvents}
            min={dayjs("2023-12-23T08:00:00").toDate()}
            max={dayjs("2023-12-23T23:00:00").toDate()}
            formats={{
              dayHeaderFormat: date => {
                return dayjs(date).format("DD/MM/YYYY")
              }
            }}
            components={components}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectedEvent}
          >
          </Calendar>
          {showModal && (
            <div
              className="modal"
              style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">

                    <h4 className="margin_training_form" style={{ fontSize: "20px", marginTop: "0px", marginLeft: "40%" }}>
                      {selectEvent ? "Edit Event" : "Add Event"}
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setShowModal(false);
                        setEventTitle("");
                        setSelectEvent(null);
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h4 class="margin_training_form" style={{ fontSize: "20px", marginTop: "0px" }}
                    ><FormattedMessage id="project.notes.fields.title" /></h4>
                    <input
                      type="text"
                      className="form-control"
                      id="eventTitle"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                    <h4 class="margin_training_form" style={{ fontSize: "20px", marginTop: "10px" }}
                    ><FormattedMessage id="project.seasons.fields.startDate" /></h4>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                          sx={{
                            border: '2px solid grey',
                            background: "linear-gradient(180deg, #302b63 0%, #0f0c29 70% )",
                            borderRadius: "20px",
                            colorAdjust: "#00bfff",
                            '& label': { color: 'white' },
                            '& input': { color: 'white' },
                            borderColor: "black",
                            boxShadow: "0 10px 10px rgb(0, 0, 0)"
                          }}
                          label={<FormattedMessage id="project.global.fields.date" />}
                          autoFocus
                          required
                          value={startDate}
                          onChange={(newDate) => {

                            console.log("AHORA: ", newDate.toISOString())
                            //console.log("formattedDate:", newDate.$d.toISOString());

                            setStartDate(newDate)
                            console.log("formattedDate:", newDate);


                          }


                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>

                    <h4 class="margin_training_form" style={{ fontSize: "20px", marginTop: "10px" }}
                    ><FormattedMessage id="project.seasons.fields.endDate" /></h4>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                          sx={{
                            border: '2px solid grey',
                            background: "linear-gradient(180deg, #302b63 0%, #0f0c29 70% )",
                            borderRadius: "20px",
                            colorAdjust: "#00bfff",
                            '& label': { color: 'white' },
                            '& input': { color: 'white' },
                            borderColor: "black",
                            boxShadow: "0 10px 10px rgb(0, 0, 0)"
                          }}
                          label={<FormattedMessage id="project.global.fields.date" />}
                          autoFocus
                          required
                          value={finishDate}
                          onChange={(newDate) => {

                            console.log("AHORA: ", newDate.toISOString())
                            //console.log("formattedDate:", newDate.$d.toISOString());

                            setFinishDate(newDate)
                            console.log("formattedDate:", newDate);


                          }


                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="modal-footer">
                    {selectEvent && (
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={deleteEvents}
                      >
                        Delete Events
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={saveEvent}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );

}

export default CalendarHome;