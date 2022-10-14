import "./NodeCard.css";
import "./NewNodeCard.css";
import Button from "../../common/Buttons/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.selector";
import { postNewNode } from "../Nodes.utils";
import { PUSH_TO_NODES_LIST } from "../../../store/nodes/nodes.actions";
import { ADD_USER_CAPACITY } from "../../../store/user/user.actions";
const NewNodeCard = () => {
  const userInfo = useSelector(selectUser);
  const [creatingNode, setCreatingNode] = useState(false);
  const [alias, setAlias] = useState("");
  const [beingCreated, setRequestingNode] = useState(false);
  const dispatch = useDispatch();

  const requestNewNode = async () => {
    setRequestingNode(true);
    const newNodeInfo = await postNewNode(userInfo.address, 100, alias);

    // MOCKED
    dispatch({ type: PUSH_TO_NODES_LIST, payload: { nodes: [newNodeInfo] } });
    // TODO: fetch from the service
    dispatch({
      type: ADD_USER_CAPACITY,
      payload: newNodeInfo.availableSpaceForUser,
    });

    setRequestingNode(false);
    setCreatingNode(false);
  };
  if (creatingNode)
    return (
      creatingNode && (
        <div
          className={`nodeCard newNodeCard creatingNode ${
            beingCreated ? "beingCreated" : ""
          }`}
        >
          <Button
            style="secondary noPadding"
            icon="fi-br-cross"
            iconSize="8px"
            height="24px"
            width="24px"
            onClick={() => setCreatingNode(false)}
          />
          <label htmlFor="address">
            <h5>Alias (opcional)</h5>
          </label>
          <input
            type="text"
            id="alias"
            placeholder="Mi PC"
            onChange={(e) => setAlias(e.target.value)}
          ></input>
          <div className="newNodeInfo">
            <div>
              <h5> Tamaño:</h5> <h5 className="accent">100 GB</h5>
            </div>{" "}
            <div>
              <h5> Disponible para almacenamiento:</h5>{" "}
              <h5 className="accent">25GB</h5>
            </div>
          </div>
          <div className="submitContainer">
            <Button
              style="primary"
              icon="fi-br-plus-small"
              label="Crea tu nodo!"
              iconSize="24px"
              onClick={() => requestNewNode()}
            ></Button>
          </div>
        </div>
      )
    );

  return (
    <button
      onClick={() => setCreatingNode(true)}
      className="nodeCard newNodeCard"
    >
      <i className="fi fi-br-plus-small"></i>
      <h1>Crea un nuevo nodo</h1>
      <span>Aumenta tu capacidad de almacenamiento </span>
      <span>¡Gratis!</span>
    </button>
  );
};

export default NewNodeCard;
