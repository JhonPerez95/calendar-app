import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import DeleteEventFab from '../../../components/ui/DeleteEventFab';
import { Provider } from 'react-redux';
import { eventStartDeleted } from '../../../redux/actions/eventsActions';

// Mock Fuctions
jest.mock('../../../redux/actions/eventsActions', () => ({
  eventStartDeleted: jest.fn(),
}));

// Config Store Redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Test the component ui-DeleteEventFab', () => {
  const wrapper = mount(
    <Provider store={store}>
      <DeleteEventFab />
    </Provider>
  );

  test('should render correct', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call actions dispatch', () => {
    wrapper.find('button').prop('onClick')();

    expect(eventStartDeleted).toHaveBeenCalled();
    expect(eventStartDeleted).toHaveBeenCalledWith();
  });
});
