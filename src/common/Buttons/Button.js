import { useEffect, useState } from "react";

const Button = (props) => {
  const { icon, style, label, height, width, iconSize } = props;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (props.disabled) {
      setDisabled(disabled);
    }
  }, []);
  return !disabled ? (
    <button
      className={style}
      style={{ height: height, width: width, fontSize: iconSize }}
    >
      <i className={`fi ${icon}`}></i>
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
