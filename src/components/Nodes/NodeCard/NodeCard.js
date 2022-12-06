import Chip from "../../common/Chip/Chip";
import Button from "../../common/Buttons/Button";
import { useEffect, useState } from "react";
import "./NodeCard.css";
import "../../common/colors.css";
import { deleteNode, requestNodeList, updateNode } from "../Nodes.utils";
const NodeCard = (props) => {
  const {
    alias,
    entityId,
    status,
    wallet,
    latestUpdateDate,
    contributedSpace,
    userAvailableSpace,
    confidence,
  } = props.data;
  const [disabled, setDisabled] = useState(false); // probably a hook dependant on status will be better
  const [statusColor, setStatusColor] = useState("--dark-gray");
  const [transformedId, setTransformedId] = useState("");
  const [transformedConfidence, setTransformedConfidence] = useState("--");
  const [transformedLatestUpdateDate, setTransformedLatestUpdateDate] =
    useState("");
  const [transformedContributedSpace, setTransformedContributedSpace] =
    useState("-");
  const [
    transforemdAvailableSpaceForUser,
    setTransformedAvailableSpaceForUser,
  ] = useState("-");
  const [confidenceBorderColor, setConfidenceBorderColor] =
    useState("--light-gray");
  useEffect(() => {
    if (entityId) {
      setTransformedId(transformId(entityId));
    }
    if (confidence) {
      setTransformedConfidence(confidenceToPercentage(confidence));
      if (confidence <= 60) {
        setConfidenceBorderColor("--redrange-darken");
      } else if (confidence <= 85) {
        setConfidenceBorderColor("--lemon");
      } else {
        setConfidenceBorderColor("--lime");
      }
    }
    if (status) {
      switch (status) {
        case "connected":
          setStatusColor("--lime-darken"); // TODO: Fix chip colors
          break;
        case "connecting":
          setStatusColor("--redrange-lighten");
          break;
        default:
          setStatusColor("--dark-gray");
          break;
      }
    }
    if (latestUpdateDate) {
      setTransformedLatestUpdateDate(latestUpdateDate);
    }
    if (contributedSpace) {
      setTransformedContributedSpace(contributedSpace + " GB");
    }
    if (userAvailableSpace) {
      setTransformedAvailableSpaceForUser(userAvailableSpace + " GB");
    }
  }, [props]);

  const transformId = (id) => id.slice(0, 4) + "..." + id.slice(-4);
  const confidenceToPercentage = (confidence) => confidence + "%";

  const disconnectEvent = async () => {
    if (status === "connected") {
      await updateNode(wallet, entityId, { status: "disconnected" });
    } else if (status === "disconnected") {
      await deleteNode(wallet, entityId);
    }
    await requestNodeList(wallet);
  };
  return (
    <div className="nodeCard gridContainer">
      <div className="gridItem1">
        <div className="title">
          <h3>{alias}</h3> <span>{transformedId}</span>
        </div>
      </div>
      <div className="gridItem2">
        <div className="tableItem1">Estado:</div>
        <div className="tableItem2">
          <Chip value={status} color={statusColor} />
        </div>
        <div className="tableItem3"> Ultima actualización:</div>
        {/* TODO: Fix date */}
        <div className="tableItem4">{transformedLatestUpdateDate}</div>
        <div className="tableItem5">
          <span>Tamaño: </span>
          {transformedContributedSpace}
        </div>
        <div className="tableItem6">
          <span>Disponible para el usuario: </span>
          {transforemdAvailableSpaceForUser}
        </div>
      </div>

      <div className="gridItem3">
        <Button
          icon={status === "connected" ? "fi-br-power" : "fi-br-cross"}
          style="secondary"
          label={status === "connected" ? "Desconectar" : "Eliminar"}
          disabled={disabled}
          onClick={disconnectEvent}
        />
        <Button
          icon="fi-br-settings-sliders"
          style="primary"
          label="Configurar"
          disabled={disabled}
        />
        <span>{disabled}</span>
      </div>
      <div className="gridItem4">
        <div
          className="confidence"
          style={{ borderColor: `var(${confidenceBorderColor})` }}
        >
          {transformedConfidence}
        </div>
        Confianza
      </div>
    </div>
  );
};

export default NodeCard;
