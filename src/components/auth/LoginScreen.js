import React from 'react';
import './login.css';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../redux/actions/authActions';
import Swal from 'sweetalert2';

//TODO: Hacer validaciones

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formLogin, handleInputChange] = useForm({
    lEmail: 'jainer@gmail.com',
    lPassword: '123456',
  });
  const [formRegister, handleInputRegister] = useForm({
    rName: 'Paola',
    rEmail: 'paola@gmail.com',
    rPassword1: '123456',
    rPassword2: '123456',
  });

  const { lEmail, lPassword } = formLogin;
  const { rName, rEmail, rPassword1, rPassword2 } = formRegister;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (rPassword1 !== rPassword2) {
      Swal.fire('Error !', 'Las contraseñas no son iguales', 'error');
    }
    dispatch(startRegister(rName, rEmail, rPassword1));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleInputRegister}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleInputRegister}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword1"
                value={rPassword1}
                onChange={handleInputRegister}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword2"
                value={rPassword2}
                onChange={handleInputRegister}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
