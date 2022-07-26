import "./Folder.css";
const Folder = (props) => {
  const { data } = props;
  const { name } = data;
  return (
    <button className="folder">
      <i className="fi fi-br-folder"></i>
      <h5>{name}</h5>
    </button>
  );
};

export default Folder;
