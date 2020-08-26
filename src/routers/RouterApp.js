import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startCheking } from '../redux/actions/authActions';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const RouterApp = () => {
  const { checking, name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return <h4>Cargando...</h4>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes
            exact
            path="/login"
            component={LoginScreen}
            isAuth={!!name}
          />
          <PrivateRoutes
            exact
            path="/"
            component={CalendarScreen}
            isAuth={!!name}
          />
          <Redirect to="/" component={CalendarScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default RouterApp;
