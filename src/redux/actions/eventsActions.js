import { types } from '../types/types';
import { fetchToken } from '../../helpers/fetchApi';
import Swal from 'sweetalert2';
import { prepareEvents, prepareEvent } from '../../helpers/prepareEvents';

const eventAddNew = (event) => {
  return { type: types.eventAddNew, payload: event };
};

export const eventSetActive = (event) => {
  return { type: types.eventSetActive, payload: event };
};

export const eventClearActive = () => {
  return { type: types.eventClearActive };
};

const eventUpdated = (event) => {
  return {
    type: types.eventUpdate,
    payload: event,
  };
};

const eventDeleted = () => {
  return {
    type: types.eventDeleted,
  };
};

const eventLoader = (events) => {
  return {
    type: types.eventLoader,
    payload: events,
  };
};

export const eventLogut = () => {
  return {
    type: types.eventLogout,
  };
};

export const eventStartAddEvent = (evento) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const res = await fetchToken('event/', evento, 'POST');
      const body = await res.json();

      if (body.ok) {
        evento = { ...body.data, user: { uid, name } };
        const e = prepareEvent(evento);
        dispatch(eventAddNew(e));
      } else {
        console.log(body);
        Swal.fire('Error!!', 'Valida si ingreso todos los campos', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error!!', error, 'error');
    }
  };
};

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchToken('event');
      const body = await res.json();

      if (body.ok) {
        const e = prepareEvents(body.events);
        dispatch(eventLoader(e));
      } else {
        Swal.fire('Error!', 'Error al consultar en la base de datos', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const res = await fetchToken(`event/${event.id}`, event, 'PUT');
      const body = await res.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire('Error!', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartDeleted = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const res = await fetchToken(`event/${id}`, {}, 'DELETE');
      const body = await res.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire('Error!', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
