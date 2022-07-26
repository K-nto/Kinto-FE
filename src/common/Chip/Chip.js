import { useEffect, useState } from "react";
import "./Chip.css";

const Chip = (props) => {
  const [color, setColor] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.color) setColor(props.color);
    if (props.value) setValue(props.value);
  }, []);
  console.log(color);
  return (
    <span className="chip" style={{ backgroundColor: `var(${color})` }}>
      {value}
    </span>
  );
};

export default Chip;
