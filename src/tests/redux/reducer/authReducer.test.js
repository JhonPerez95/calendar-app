import '@testing-library/jest-dom';
import { authReducer } from '../../../redux/reducer/authReducer';
import { types } from '../../../redux/types/types';

describe('Test the reducer authReducer', () => {
  const initState = {
    checking: true,
  };

  test('should return state default', () => {
    const resp = authReducer(initState, {});
    expect(resp).toEqual(resp);
  });

  test('should  action authLogin return state', () => {
    const action = {
      type: types.authLogin,
      payload: { uid: '123', name: 'Test' },
    };
    const resp = authReducer(initState, action);
    expect(resp).toEqual({ checking: false, ...action.payload });
  });

  test('should action authStartRegister ', () => {
    const action = {
      type: types.authStartRegister,
      payload: { uid: '123', name: 'Test' },
    };
    const resp = authReducer(initState, action);
    expect(resp).toEqual({ checking: false, ...action.payload });
  });

  test('should  action authCheckingFinish', () => {
    const action = {
      type: types.authCheckingFinish,
      payload: {},
    };
    const resp = authReducer(initState, action);
    expect(resp).toEqual({ checking: false, ...action.payload });
  });

  test('should action authLogout', () => {
    const action = {
      type: types.authLogout,
      payload: {},
    };
    const resp = authReducer(initState, action);
    expect(resp).toEqual({ checking: false, ...action.payload });
  });
});
