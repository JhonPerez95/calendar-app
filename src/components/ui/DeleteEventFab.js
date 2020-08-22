import React from 'react';
import { eventDeleted } from '../../redux/actions/eventsActions';
import { useDispatch } from 'react-redux';

const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const handleDeleted = () => {
    dispatch(eventDeleted());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handleDeleted}>
      <i className="fas fa-trash "></i>
      <span> Borrar</span>
    </button>
  );
};

export default DeleteEventFab;
