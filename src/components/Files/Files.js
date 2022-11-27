import { useEffect } from "react";
import { KINTO_SERVICE_URL, USERS_ROUTE, FILES_ROUTE } from "./../../config";
import { getFileType } from "./files.utils";
import File from "./File/File";
import Folder from "./Folder/Folder";
import "../common/Section.css";
import "./Files.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import {
  selectFileList,
  selectFileStatus,
  selectFolderList,
} from "../../store/files/files.selector";
import {
  SET_FILES_LIST,
  SET_FILES_LOADED,
  SET_FILES_LOADING,
} from "../../store/files/files.actions";
import { NavLink } from "react-router-dom";
import { SET_ACTIVE_SECTION } from "../../store/app/app.actions";
import axios from "axios";

const Files = () => {
  // we'll get one array (or tree?) of files and folders
  // we must query an API for that
  // when we get a response, we must filter files and folders for each section
  // an Effect linked to the user and the selected folder to request new files and cache them
  // an effect linked to the "whole data" property that filters folders and files separately
  // if file set type according to file name / extension from data. Will probably have to include mimetype somewhere
  const currentUser = useSelector(selectUser);
  const fileList = useSelector(selectFileList);
  const folderList = useSelector(selectFolderList);
  const status = useSelector(selectFileStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.availableSpace > 0) requestFileList();
  }, []);

  // @TODO: userId! not name
  async function requestFileList() {
    dispatch({ type: SET_FILES_LOADING });
    console.log("Authhash: " + currentUser.authHash);
    const rawFiles = await axios
      .get(
        `${KINTO_SERVICE_URL}/${USERS_ROUTE}/${currentUser.address}/${FILES_ROUTE}`,
        {
          headers: {
            authorization: currentUser.authHash,
          },
        }
      )
      .then((res) => res.data);

    dispatch({
      type: SET_FILES_LIST,
      payload: {
        dirList: rawFiles.map((file) =>
          file.type === "directory"
            ? file
            : { ...file, type: getFileType(file) }
        ),
      },
    });
    dispatch({ type: SET_FILES_LOADED });
  }

  return (
    <div className="section">
      <h1>Unidad de {currentUser.name}</h1>{" "}
      {currentUser.availableSpace === 0 && (
        <div className="container noAvailableSpace">
          <h3>
            Hey! Parece que todavía no tienes espacio disponible en tu unidad.
            Crea tu primer nodo haciendo click{" "}
            <NavLink
              to="/nodes"
              onClick={() =>
                dispatch({
                  type: SET_ACTIVE_SECTION,
                  payload: "nodes",
                })
              }
            >
              aquí
            </NavLink>{" "}
            o contrata 100 GB desde USD 1 <NavLink to="/buy">aquí</NavLink>!
          </h3>
        </div>
      )}
      {/** TODO: make reflect the current folder/file route */}
      {folderList.length > 0 && (
        <div>
          {" "}
          <h2>Carpetas</h2>
          <div className="container">
            {status === "loading" && <span> Cargando... </span>}
            {status === "loaded" &&
              folderList.map((folder) => (
                <Folder key={folder.id} data={folder} />
              ))}
          </div>
        </div>
      )}{" "}
      <div>
        {currentUser.availableSpace !== 0 && <h2>Archivos</h2>}
        <div
          className={
            "container " +
            (status === "loaded" && fileList.length === 0 ? "empty" : "")
          }
        >
          {status === "loading" && <span> Cargando... </span>}

          {currentUser.availableSpace !== 0 &&
            status === "loaded" &&
            fileList.length > 0 &&
            fileList.map((file) => <File key={file.id} data={file} />)}
          {status === "loaded" && fileList.length === 0 && (
            <h1>
              Sube tu primer archivo a la nube haciendo click en el botón de la
              esquina superior izquierda!
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;
