import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ({ isAuth, component: Component, ...all }) => {
  return (
    <Route
      {...all}
      component={(props) =>
        !isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PublicRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PublicRoutes;
