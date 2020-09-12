import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Provider } from 'react-redux';
import Swal from 'sweetalert2';
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messagges-es';

// Mock Fuctions
// jest.mock('../../../redux/actions/authActions', () => ({
//   startLogin: jest.fn(),
//   startRegister: jest.fn(),
// }));
// jest.mock('sweetalert2', () => ({
//   fire: jest.fn(),
// }));

// Config Store Redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: { checking: false, uid: '123', name: 'test' },
  calendar: { events: [] },
  ui: { modalOpen: false },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe('Test the component CalendarScreen', () => {
  test('should render correct', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should show calendar ', () => {
    const calendarMessage = wrapper.find('Calendar').prop('messages');
    expect(calendarMessage).toEqual(messages);
  });
});
