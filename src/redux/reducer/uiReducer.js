import { types } from '../types/types';

const initialState = {
  modalOpen: false,
};

export const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
      };

    default:
      return state;
  }
};
