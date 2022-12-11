import axios from "axios";
import { appStore } from "../../App";
import {
  ADDRESS_COOKIE,
  AUTH_HASH_COOKIE,
  KINTO_SERVICE_URL,
  USERS_ROUTE,
} from "../../config";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "../../helpers/cookieManager";
import { USER_LOG_OUT } from "../../store/user/user.actions";

const getAuthHash = (address, privateKey) => {
  //@TODO: Hash function
  return address;
};

export const logout = () => {
  // dispatch logout action
  deleteCookie(ADDRESS_COOKIE);
  deleteCookie(AUTH_HASH_COOKIE);
  appStore.dispatch({ type: USER_LOG_OUT });
};

export const requestLogin = async (address, privateKey, rememberMe = false) => {
  const authHash = privateKey
    ? getAuthHash(address, privateKey)
    : getCookie(AUTH_HASH_COOKIE);

  console.log(address);
  console.log(privateKey);
  const userInfo = await axios
    .get(`${KINTO_SERVICE_URL}/${USERS_ROUTE}/${address}`, {
      headers: {
        authorization: authHash,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error("Dirección o contraseña incorrectas");
    });

  if (rememberMe) {
    setCookie(ADDRESS_COOKIE, address);
    setCookie(AUTH_HASH_COOKIE, authHash);
  }

  return {
    ...userInfo,
    address,
    privateKey,
    authHash,
  };
};

export const requestRegister = async (address, privateKey) => {
  const authHash = privateKey
    ? getAuthHash(address, privateKey)
    : getCookie(AUTH_HASH_COOKIE);

  console.log(address);
  console.log(privateKey);
  const userInfo = await axios
    .post(
      `${KINTO_SERVICE_URL}/${USERS_ROUTE}`,
      {
        address: address,
        secret: privateKey,
      },
      {
        headers: {
          authorization: authHash,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error("Dirección o contraseña incorrectas");
    });

  return {
    ...userInfo,
    address,
    privateKey,
    authHash,
  };
};
