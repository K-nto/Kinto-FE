import FileInput from "../common/FileInput/FileInput";
import SectionSelector from "../SectionSelector/SectionSelector";
import { uploadFiles } from "../Files/files.utils";
import "./SideBar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";

const SideBar = () => {
  const currentUser = useSelector(selectUser);
  async function handleUploadFiles(e) {
    const result = await uploadFiles(currentUser, e.target.files);

    console.log(result);
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
