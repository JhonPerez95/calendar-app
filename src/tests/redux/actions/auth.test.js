import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { startLogin } from '../../../redux/actions/authActions';
import { types } from '../../../redux/types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Test the actions Auth', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('should call actions startLogin ', async () => {
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
});
