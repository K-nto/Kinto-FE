import "./Button.css";
import { useEffect, useState } from "react";

const Button = (props) => {
  const { icon, style, label, height, width, iconSize, onClick, type } = props;
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (props.disabled) {
      setDisabled(disabled);
    }
  }, []);
  return !disabled ? (
    <button
      type={type ? type : "button"}
      value={label}
      className={style}
      style={{ height: height, width: width, fontSize: iconSize }}
      onClick={(e) => (onClick ? onClick(e) : undefined)}
    >
      <i className={`fi ${icon}`} style={{ fontSize: iconSize }}></i>
      {label && <h5>{label}</h5>}
    </button>
  ) : (
    <button
      className={style}
      style={{ height: height, width: width, fontSize: iconSize }}
      disabled
    >
      <i className={`fi ${icon}`}></i>
      {label && <h5>{label}</h5>}
    </button>
  );
};

export default Button;
