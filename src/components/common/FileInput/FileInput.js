import "./FileInput.css";
const FileInput = (props) => {
  const { label, onChange } = props;
  return (
    <label htmlFor="file-upload" className="custom-file-upload">
      <i className="fi fi-br-add-document"></i>
      {label && <h5>{label}</h5>}
      <input
        id="file-upload"
        type="file"
        onChange={(e) => (onChange ? onChange(e) : undefined)}
      ></input>
    </label>
  );
};

export default FileInput;
