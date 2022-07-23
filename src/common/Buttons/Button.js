const Button = (props) => {
  const { icon, style, label, height, width, iconSize } = props;
  return (
    <button
      className={style}
      style={{ height: height, width: width, fontSize: iconSize }}
    >
      <i class={`fi ${icon}`}></i>
      {label && <h5>{label}</h5>}
    </button>
  );
};

export default Button;
