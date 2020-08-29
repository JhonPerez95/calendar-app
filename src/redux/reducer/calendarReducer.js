import { types } from '../types/types';

// event = {
//   id: new Date().getTime(),
//   title: 'Cumpleaños del jefe',
//   start: moment().toDate(), // new Date();
//   end: moment().add(2, 'hours').toDate(),
//   bgcolor: '#fafafa',
//   note: 'Comprar la torta',
//   user: {
//     _id: '2144654',
//     name: 'Jainer',
//   },
// };

const initialState = {
  events: [],
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

    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((item) => item.id !== state.activeEvent.id),
        activeEvent: null,
      };
    case types.eventLoader:
      return {
        ...state,
        events: [...payload],
      };
    case types.eventLogout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
