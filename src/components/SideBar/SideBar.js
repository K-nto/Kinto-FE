import FileInput from "../common/FileInput/FileInput";
import SectionSelector from "../SectionSelector/SectionSelector";
import { uploadFiles } from "../Files/files.utils";
import "./SideBar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import {
  PUSH_TO_FILES_LIST,
  SET_FILES_LOADED,
  SET_FILES_LOADING,
} from "../../store/files/files.actions";
import SpaceIndicator from "./SpaceIndicator/SpaceIndicator";

const SideBar = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const addFilesToState = (files) => {
    // wrap this & error handling in a callback
    dispatch({
      type: PUSH_TO_FILES_LIST,
      payload: {
        files: files,
      },
    });
    dispatch({ type: SET_FILES_LOADED });
  };
  async function handleUploadFiles(e) {
    dispatch({ type: SET_FILES_LOADING });
    await uploadFiles(
      currentUser.address,
      currentUser.privateKey,
      currentUser.authHash,
      e.target.files,
      addFilesToState
    ).catch((e) => {
      console.error("Error uploading files: " + e.message);
      dispatch({ type: SET_FILES_LOADED });
    });
  }
  return (
    <div className="sidebar">
      <FileInput label="Subir archivo" onChange={handleUploadFiles} />
      <SectionSelector
        sections={[
          { value: "files", route: "/files", label: "Mi unidad" },
          { value: "nodes", route: "/nodes", label: "Mis nodos" },
        ]}
      />
      <SpaceIndicator />
    </div>
  );
};

export default SideBar;
