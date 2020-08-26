import { fetchNoToken, fetchToken } from '../../helpers/fetchApi';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const res = await fetchNoToken('auth', { email, password }, 'POST');
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init', new Date().getTime());
      dispatch(login(body.user));
    } else {
      Swal.fire('Error!', body.msg, 'error');
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const res = await fetchNoToken(
      'auth/new',
      { name, email, password },
      'POST'
    );
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init', new Date().getTime());
      dispatch(register(body.user));
    } else {
      Swal.fire('Error!', body.msg, 'error');
    }
  };
};

export const startCheking = () => {
  return async (dispatch) => {
    const res = await fetchToken('auth/renew');
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init', new Date().getTime());
      dispatch(login(body.user));
    } else {
      dispatch(checking());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const login = (user) => {
  return {
    type: types.authLogin,
    payload: user,
  };
};

const register = (user) => {
  return {
    type: types.authStartRegister,
    payload: user,
  };
};

const checking = () => ({
  type: types.authCheckingFinish,
});

const logout = () => {
  return {
    type: types.authLogout,
  };
};
