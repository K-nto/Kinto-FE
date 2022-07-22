import "./../Buttons.css";

const IconOnlyButton = (props) => {
  const { icon, style, buttonSize, iconSize } = props;
  return (
    <button
      className={style}
      style={{ height: buttonSize, width: buttonSize, fontSize: iconSize }}
    >
      <i class={`fi ${icon}`}></i>
    </button>
  );
};
export default IconOnlyButton;
