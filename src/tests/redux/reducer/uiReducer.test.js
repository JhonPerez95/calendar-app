import '@testing-library/jest-dom';
import { uiReducer } from '../../../redux/reducer/uiReducer';
import { uiOpenModal, uiCloseModal } from '../../../redux/actions/uiActions';

const initState = {};

describe('Tests the uiReducer', () => {
  test('should return state deafult', () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test('should open and close modal', () => {
    const openAction = uiOpenModal();
    let state = uiReducer(initState, openAction);

    expect(state).toEqual({ modalOpen: true });

    const closeAction = uiCloseModal();
    const stateClose = uiReducer(initState, closeAction);

    expect(stateClose).toEqual({ modalOpen: false });
  });
});
