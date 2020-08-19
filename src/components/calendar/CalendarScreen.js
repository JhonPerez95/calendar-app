import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarModal } from './CalendarModal';
import Navbar from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messagges-es';
import CalendarEvent from './CalendarEvent';

moment.locale('es');
const localizer = momentLocalizer(moment);
const events = [
  {
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), // new Date();
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    note: 'Comprar la torta',
    user: {
      _id: '2144654',
      name: 'Jainer',
    },
  },
];

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  // Events
  const onDoubleClick = (e) => {
    console.log(e);
  };
  const onSelectEvent = (e) => {
    console.log(e);
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
    </div>
  );
};

export default CalendarScreen;
