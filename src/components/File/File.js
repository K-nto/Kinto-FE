import axios from "axios";
import { saveAs } from "file-saver";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FILES_ROUTE, KINTO_SERVICE_URL, USERS_ROUTE } from "../../config";
import { selectUser } from "../../store/user/user.selector";
import "./File.css";

const getIconFromType = (type) => {
  switch (type) {
    case "doc":
      return {
        class: "fi fi-br-document",
        color: "#2487F6",
      };
    case "pdf":
      return {
        class: "fi fi-br-document",
        color: "#FA1B1B",
      };
    case "photo":
      return {
        class: "fi fi-br-jpg",
        color: "#FFB300",
      };
    case "xlsx":
      return {
        class: "fi fi-br-file-spreadsheet",
        color: "#2DA573",
      };
    case "gif":
      return {
        class: "fi fi-br-gif",
        color: "#ED6412",
      };
    case "audio":
      return {
        class: "fi fi-br-music-file",
        color: "#2FB1FF",
      };
    case "video":
      return {
        class: "fi fi-br-file-video",
        color: "#5703E4",
      };
    default:
      return {
        class: "fi fi-br-file",
        color: "#bdbdbd",
      };
  }
};

const File = (props) => {
  const { data } = props;
  const currentUser = useSelector(selectUser);
  const { name, type, size, id } = data;
  const [icon, setIcon] = useState(getIconFromType(type));

  const requestFile = () => {
    axios
      .get(
        `${KINTO_SERVICE_URL}/${USERS_ROUTE}/${currentUser.name}/${FILES_ROUTE}/${id}`,
        { responseType: "blob" }
      )
      .then((response) => {
        saveAs(response.data, name);
      })
      .catch((e) => console.log(e));
  };

  return (
    <button className="file" onClick={requestFile}>
      <div className="icon">
        <i className={`${icon.class}`} style={{ color: icon.color }}></i>
      </div>
      <div className="footer">
        <i className={`${icon.class}`}></i>
        <h5>{name}</h5>
      </div>
    </button>
  );
};
export default File;
