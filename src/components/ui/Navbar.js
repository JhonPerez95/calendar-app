import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  const handleLogout = () => {
    history.push('/login');
  };
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Pedro</span>
      <button className=" btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
