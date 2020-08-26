import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [value, setValue] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setValue({ ...value, [target.name]: target.value });
  };

  const resetInput = () => {
    setValue(initialState);
  };

  return [value, handleInputChange, resetInput];
};

export default useForm;
