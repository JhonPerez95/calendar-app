import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import {
  startLogin,
  startRegister,
  startCheking,
} from '../../../redux/actions/authActions';
import { types } from '../../../redux/types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../../helpers/fetchApi';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Tests the actions Auth', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('should call actions startLogin  correct', async () => {
    await store.dispatch(startLogin('test@gmail.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: expect.any(Object),
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init',
      expect.any(Number)
    );
    // console.log(localStorage.setItem.mock.calls[0][1]);
    // token = localStorage.setItem.mock.calls[0][1]
  });

  test('should  call actions starlogin incorrect', async () => {
    await store.dispatch(startLogin('test@gmail.com', '2421'));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error!',
      'Password incorrecta !!',
      'error'
    );

    await store.dispatch(startLogin('test@gmail3.com', '123456'));
    actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error!',
      'El email test@gmail3.com no existe',
      'error'
    );
  });

  test('should call startRegister correct', async () => {
    fetchModule.fetchNoToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          msg: 'Usuario creado',
          user: {
            uid: '123',
            name: 'test',
          },
          token: 'asdasdasdasdasdas',
        };
      },
    }));
    await store.dispatch(startRegister('test1', 'test1@gmail.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authStartRegister,
      payload: expect.any(Object),
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init',
      expect.any(Number)
    );
  });

  test('should call startCheking', async () => {
    fetchModule.fetchToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          msg: 'Usuario creado',
          user: {
            uid: '123',
            name: 'test',
          },
          token: 'asdasdasdasdasdas',
        };
      },
    }));
    await store.dispatch(startCheking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: expect.any(Object),
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      'asdasdasdasdasdas'
    );
  });
});
