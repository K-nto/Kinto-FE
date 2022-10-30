import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ADDRESS_COOKIE, AUTH_HASH_COOKIE } from "../../config";
import { getCookie } from "../../helpers/cookieManager";
import { selectAuthenticated } from "../../store/app/app.selector";
import { USER_LOG_IN } from "../../store/user/user.actions";
import Button from "../common/Buttons/Button";
import "./Login.css";
import { requestLogin } from "./Login.utils";

export const Login = () => {
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authenticated = useSelector(selectAuthenticated);

  const dispatch = useDispatch();

  const dispatchLogin = async () => {
    await requestLogin(address, password, rememberMe)
      .then((addressInfo) => {
        dispatch({ type: USER_LOG_IN, payload: addressInfo });
      })
      .catch((err) => setErrorMessage(err.message));
  };

  useEffect(() => {
    const addressFromCookie = getCookie(ADDRESS_COOKIE);
    const authHashCookie = getCookie(AUTH_HASH_COOKIE);
    if (addressFromCookie && authHashCookie) {
      setAddress(addressFromCookie);
      dispatchLogin();
    }
  });

  if (authenticated) return <Navigate to="/files" />;

  const loginEvent = async (e) => {
    setErrorMessage("");
    e.preventDefault();
    if (!address || !password) {
      setErrorMessage("Por favor, introduce dirección y contraseña");
      return;
    }

    await dispatchLogin();
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
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label htmlFor="rememberMe"> Recordar información? </label>
          <div className="checkboxContainer">
            <input
              id="rememberMe"
              type="checkbox"
              onChange={(e) => setRememberMe(e.target.value)}
            ></input>{" "}
            <h5>Recuérdame</h5>
          </div>
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
