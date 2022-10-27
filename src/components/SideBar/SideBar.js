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

const SideBar = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  async function handleUploadFiles(e) {
    dispatch({ type: SET_FILES_LOADING });
    const result = await uploadFiles(currentUser, e.target.files);

    dispatch({
      type: PUSH_TO_FILES_LIST,
      payload: {
        files: result,
      },
    });
    dispatch({ type: SET_FILES_LOADED });
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
    </div>
  );
};

export default SideBar;
