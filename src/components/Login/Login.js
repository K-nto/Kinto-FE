import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthenticated } from "../../store/app/app.selector";
import { USER_LOG_IN } from "../../store/user/user.actions";
import Button from "../common/Buttons/Button";
import "./Login.css";
import { requestLogin } from "./Login.utils";

export const Login = () => {
  const [address, setaddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const authenticated = useSelector(selectAuthenticated);

  const dispatch = useDispatch();

  if (authenticated) return <Navigate to="/files" />;

  const loginEvent = async (e) => {
    setErrorMessage("");
    e.preventDefault();
    if (!address || !password) {
      setErrorMessage("Por favor, introduce dirección y contraseña");
      return;
    }

    await requestLogin(address, password)
      .then((addressInfo) => {
        dispatch({ type: USER_LOG_IN, payload: addressInfo });
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div className="loginContent">
      <div className="loginForm">
        <h2>Bienvenido/a a Kinto!</h2>
        <h4>Inicia sesión</h4>
        <form>
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            placeholder="Dirección"
            onChange={(e) => setaddress(e.target.value)}
          ></input>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <div className="buttonContainer">
            <Button style="secondary" label="Registrate"></Button>
            <Button
              style="primary"
              label="Inicia sesión"
              onClick={loginEvent}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};
