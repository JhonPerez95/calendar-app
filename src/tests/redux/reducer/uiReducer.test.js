import '@testing-library/jest-dom';
import { uiReducer } from '../../../redux/reducer/uiReducer';
import { types } from '../../../redux/types/types';
import { uiOpenModal } from '../../../redux/actions/uiActions';

const initState = {};

describe('Tests the uiReducer', () => {
  test('should return state deafult', () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test('should open and close modal', () => {
    const openAction = uiOpenModal();
    const state = uiReducer(initState, openAction);

    expect(state).toEqual({ modalOpen: true });

    const closeAction = uiOpenModal();
    const state = uiReducer(initState, closeAction);

    expect(state).toEqual({ modalOpen: false });
  });
});
