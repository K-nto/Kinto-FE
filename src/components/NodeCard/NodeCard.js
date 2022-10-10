import Chip from "../common/Chip/Chip";
import Button from "../common/Buttons/Button";
import { useEffect, useState } from "react";
import "./NodeCard.css";
const BYTES_IN_GB = 1073741824;
const NodeCard = (props) => {
  const { alias, id, type, status, lastSync, size, used, score } = props.data;
  const [disabled, setDisabled] = useState(false); // probably a hook dependant on status will be better
  const [statusColor, setStatusColor] = useState("--dark-gray");
  const [transformedId, setTransformedId] = useState("");
  const [transformedScore, setTransformedScore] = useState("--");
  const [lastSyncDate, setLastSyncDate] = useState("");
  const [transformedSize, setTransformedSize] = useState("-");
  const [transforemdUsed, setTransformedUsed] = useState("-");
  const [scoreBorderColor, setScoreBorderColor] = useState("--light-gray");

  useEffect(() => {
    if (id) {
      setTransformedId(transformId(id));
    }
    if (score) {
      setTransformedScore(scoreToPercentage(score));
      if (score <= 0.6) {
        setScoreBorderColor("--redrange-darken");
      } else if (score <= 0.85) {
        setScoreBorderColor("--lemon");
      } else {
        setScoreBorderColor("--lime");
      }
    }
    if (status) {
      setDisabled(status !== "online"); // TODO: Fix disabled state for card and buttons
      switch (status) {
        case "online":
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
    if (lastSync) {
      setLastSyncDate(new Date(lastSync).toISOString());
    }
    if (size) {
      setTransformedSize(bytesToGBTransform(size) + " GB");
    }
    if (used) {
      setTransformedUsed(bytesToGBTransform(used) + " GB");
    }
  }, []);

  const transformId = (id) => id.slice(0, 4) + "..." + id.slice(-4);
  const scoreToPercentage = (score) => score * 100 + "%";
  const bytesToGBTransform = (size) => (size / BYTES_IN_GB).toPrecision(2);

  return (
    <div className="nodeCard gridContainer">
      <div className="gridItem1">
        <div className="title">
          <h3>{alias}</h3> <span>{transformedId}</span>
        </div>
        <Chip value={type.toUpperCase()} color="--redrange-lighten" />
      </div>
      <div className="gridItem2">
        <div className="tableItem1">Estado:</div>
        <div className="tableItem2">
          <Chip value={status} color={statusColor} />
        </div>
        <div className="tableItem3"> Ultima actualización:</div>
        {/* TODO: Fix date */}
        <div className="tableItem4">{lastSyncDate}</div>
        <div className="tableItem5">
          <span>Tamaño: </span>
          {transformedSize}
        </div>
        <div className="tableItem6">
          <span>En uso: </span>
          {transforemdUsed}
        </div>
      </div>

      <div className="gridItem3">
        <Button
          icon="fi-br-power"
          style="secondary"
          label="Desconectar"
          disabled={disabled}
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
          className="score"
          style={{ borderColor: `var(${scoreBorderColor})` }}
        >
          {transformedScore}
        </div>
        Confianza
      </div>
    </div>
  );
};

export default NodeCard;
