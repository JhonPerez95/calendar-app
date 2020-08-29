import { types } from '../types/types';

const initialState = {
  checking: true,
  // uid: null,
  // name:null
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.authLogin:
      return {
        ...state,
        ...payload,
        checking: false,
      };
    case types.authStartRegister:
      return {
        ...state,
        checking: false,
        ...payload,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.authLogout:
      return { ...initialState, checking: false };
    default:
      return state;
  }
};
