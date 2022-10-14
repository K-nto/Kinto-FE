import axios from "axios";
import { KINTO_NODES_URL, NODES_ROUTE, USERS_ROUTE } from "../../config";

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
