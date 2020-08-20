import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import RouterApp from './routers/RouterApp';

const AppCalendar = () => {
  return (
    <Provider store={store}>
      <RouterApp />
    </Provider>
  );
};

export default AppCalendar;
