import { useEffect, useState } from "react";
import { KINTO_SERVICE_URL, USERS_ROUTE, FILES_ROUTE } from "./../../config";
import { filterFoldersFromFiles, sortFiles } from "./files.utils";
import File from "../File/File";
import Folder from "../Folder/Folder";
import "../common/Section.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";

const Files = () => {
  // we'll get one array (or tree?) of files and folders
  // we must query an API for that
  // when we get a response, we must filter files and folders for each section
  // an Effect linked to the user and the selected folder to request new files and cache them
  // an effect linked to the "whole data" property that filters folders and files separately
  // if file set type according to file name / extension from data. Will probably have to include mimetype somewhere
  const currentUser = useSelector(selectUser);
  const [fileList, setFileList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    requestFileList();
  }, []);

  // @TODO: userId! not name
  async function requestFileList() {
    setStatus("loading");
    const res = await fetch(
      `${KINTO_SERVICE_URL}/${USERS_ROUTE}/${currentUser.name}/${FILES_ROUTE}`
    );

    const rawFiles = await res.json();

    const { filteredFolders, filteredFiles } = filterFoldersFromFiles(
      sortFiles(rawFiles)
    );

    setFolderList(filteredFolders);
    setFileList(filteredFiles);
    setStatus("loaded");
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
