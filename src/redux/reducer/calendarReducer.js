import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
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
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: payload,
      };
    default:
      return state;
  }
};
