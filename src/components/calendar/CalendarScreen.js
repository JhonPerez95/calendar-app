import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarModal } from './CalendarModal';
import Navbar from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messagges-es';
import CalendarEvent from './CalendarEvent';
import { uiOpenModal } from '../../redux/actions/uiActions';
import { eventSetActive } from '../../redux/actions/eventsActions';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  // Events
  const onDoubleClick = () => {
    dispatch(uiOpenModal());
  };
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  // Style
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };
    return {
      style,
    };
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
    </div>
  );
};

export default CalendarScreen;
