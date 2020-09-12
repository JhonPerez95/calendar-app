import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Provider } from 'react-redux';
import LoginScreen from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../redux/actions/authActions';
import Swal from 'sweetalert2';

// Mock Fuctions
jest.mock('../../../redux/actions/authActions', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

// Config Store Redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);
describe('test the component LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render correct', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call dispatch login', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'test@gmail.com',
      },
    });

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456',
      },
    });

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenCalledWith('test@gmail.com', '123456');
  });

  test('should  throw error if passwords they are different', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123457',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error !',
      'Las contraseñas no son iguales',
      'error'
    );
  });

  test('should call action starRegister password same', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });
    expect(startRegister).toHaveBeenCalled();
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
