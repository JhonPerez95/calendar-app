import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { startLogout } from '../../redux/actions/authActions';
import { eventLogut } from '../../redux/actions/eventsActions';

const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(eventLogut());
  };
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <button className=" btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
