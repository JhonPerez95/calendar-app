import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import moment from 'moment';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import {
  eventStartUpdate,
  eventClearActive,
  eventStartAddEvent,
} from '../../../redux/actions/eventsActions';
import Swal from 'sweetalert2';

// Mock Fuctions
jest.mock('../../../redux/actions/eventsActions', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActive: jest.fn(),
  eventStartAddEvent: jest.fn(),
}));
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

// Config Store Redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const lastDate = now.clone().add(1, 'hours');

const initState = {
  auth: { checking: false, uid: '123', name: 'test' },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Title Test',
      notes: 'notes test',
      start: now.toDate(),
      end: lastDate.toDate(),
    },
  },
  ui: { modalOpen: true },
};

let store = mockStore(initState);
store.dispatch = jest.fn();
Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Test the component CalendarModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should exits calendarModal', () => {
    // expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('should call actions startUpdate y closeModal', () => {
    act(() => {
      wrapper.find('form').prop('onSubmit')({
        preventDefault() {},
      });
      expect(eventStartUpdate).toHaveBeenCalledWith(
        initState.calendar.activeEvent
      );

      expect(eventClearActive).toHaveBeenCalled();
    });
  });

  test('should call error id not exist tittle', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    expect(eventStartUpdate).not.toHaveBeenCalled();
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
      true
    );
  });

  test('should create new event', () => {
    const initState = {
      auth: { checking: false, uid: '123', name: 'test' },
      calendar: {
        events: [],
        activeEvent: null,
      },
      ui: { modalOpen: true },
    };

    let store = mockStore(initState);
    store.dispatch = jest.fn();
    Storage.prototype.setItem = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'test creat new event',
      },
    });
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(eventClearActive).toHaveBeenCalled();
    expect(eventStartAddEvent).toHaveBeenCalled();

    // expect(eventStartAddEvent).toHaveBeenCalledWith({
    //   end: expect.anything(),
    //   start: expect.anything(),
    //   title: 'test creat new event',
    //   notes: '',
    // });s
  });

  test('should validator dates', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'test creat new event',
      },
    });
    const today = new Date();
    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    });
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error!',
      'Fecha final debe ser mayor a la inical',
      'error'
    );
  });
});
