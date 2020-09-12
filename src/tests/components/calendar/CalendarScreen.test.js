import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { act } from '@testing-library/react';
import { Provider } from 'react-redux';

import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messagges-es';
import { types } from '../../../redux/types/types';
import {
  eventSetActive,
  eventStartLoading,
} from '../../../redux/actions/eventsActions';

// Mock Fuctions
jest.mock('../../../redux/actions/eventsActions', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));
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
Storage.prototype.setItem = jest.fn();

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
    const calendar = wrapper.find('Calendar');
    const calendarMessage = calendar.prop('messages');
    expect(calendarMessage).toEqual(messages);

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal,
    });

    calendar.prop('onSelectEvent')({ start: 'Test date' });
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'Test date' });

    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    });
  });
});
