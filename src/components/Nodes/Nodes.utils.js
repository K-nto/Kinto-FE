import axios from "axios";
import { KINTO_NODES_URL, NODES_ROUTE, USERS_ROUTE } from "../../config";
import {
  SET_NODES_LIST,
  SET_NODES_LOADED,
  SET_NODES_LOADING,
} from "../../store/nodes/nodes.actions";
import { appStore } from "../../App";

export const refreshNodeList = async (address) => {
  const nodeList = await axios
    .get(`${KINTO_NODES_URL}/${USERS_ROUTE}/${address}/${NODES_ROUTE}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.message);
    });

  appStore.dispatch({ type: SET_NODES_LIST, payload: { nodeList } });
};
export const requestNodeList = async (address) => {
  appStore.dispatch({ type: SET_NODES_LOADING });
  await refreshNodeList(address);
  appStore.dispatch({ type: SET_NODES_LOADED });
};

export const updateNode = async (userId, entityId, updateData) => {
  if (!userId || !entityId) {
    throw new Error(
      "Por favor, vuelve a iniciar sesión e indica un tamaño de nodo"
    );
  }
  // @TODO: Validate updateData to only have alias, storage size and status
  return await axios.post(
    `${KINTO_NODES_URL}/${USERS_ROUTE}/${userId}/${NODES_ROUTE}/${entityId}`,
    updateData
  );
};

export const deleteNode = async (userId, entityId) => {
  if (!userId || !entityId) {
    throw new Error(
      "Por favor, vuelve a iniciar sesión e indica un tamaño de nodo"
    );
  }
  return await axios.delete(
    `${KINTO_NODES_URL}/${USERS_ROUTE}/${userId}/${NODES_ROUTE}/${entityId}`
  );
};

export const postNewNode = async (userId, size, alias = "") => {
  if (!userId || !size) {
    throw new Error(
      "Por favor, vuelve a iniciar sesión e indica un tamaño de nodo"
    );
  }
  return await axios
    .post(`${KINTO_NODES_URL}/${USERS_ROUTE}/${userId}/${NODES_ROUTE}`, {
      storage: size,
      alias: alias,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.message);
    });
};

export const exportToJsonFile = (jsonData) => {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = "node_configuration.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};
