import { useEffect } from "react";
import { KINTO_SERVICE_URL, USERS_ROUTE, FILES_ROUTE } from "./../../config";
import { getFileType } from "./files.utils";
import File from "../File/File";
import Folder from "../Folder/Folder";
import "../common/Section.css";
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
    requestFileList();
  }, []);

  // @TODO: userId! not name
  async function requestFileList() {
    dispatch({ type: SET_FILES_LOADING });
    const res = await fetch(
      `${KINTO_SERVICE_URL}/${USERS_ROUTE}/${currentUser.name}/${FILES_ROUTE}`
    );

    const rawFiles = await res.json();

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
      <h1>Mi unidad</h1>{" "}
      {/** TODO: make reflect the current folder/file route */}
      <h2>Carpetas</h2>
      <div className="container">
        {status === "loading" && <span> Cargando... </span>}
        {status === "loaded" &&
          folderList.map((folder) => <Folder key={folder.id} data={folder} />)}
      </div>
      <h2>Archivos</h2>
      <div className="container">
        {status === "loading" && <span> Cargando... </span>}

        {status === "loaded" &&
          fileList.map((file) => <File key={file.id} data={file} />)}
      </div>
    </div>
  );
};

export default Files;
