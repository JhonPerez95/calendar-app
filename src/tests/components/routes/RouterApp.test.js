import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Provider } from 'react-redux';
import RouterApp from '../../../routers/RouterApp';

// Mock Fuctions

// Config Store Redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();

describe('Test the component RouterApp', () => {
  test('should render correct', () => {
    const initState = { auth: { checking: true } };
    let store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <RouterApp />
      </Provider>
    );
    expect(wrapper.find('h4').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render route public', () => {
    const initState = { auth: { checking: false } };
    let store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <RouterApp />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('should render route private', () => {
    const initState = {
      auth: { checking: false, uid: '123', name: 'test' },
      calendar: { events: [] },
      ui: { modalOpen: false },
    };
    let store = mockStore(initState);
    // store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <RouterApp />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
