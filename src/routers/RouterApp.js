import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startCheking } from '../redux/actions/authActions';

const RouterApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={CalendarScreen} />
          <Redirect to="/" component={CalendarScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default RouterApp;
