import Button from "../common/Buttons/Button";
import SectionSelector from "../SectionSelector/SectionSelector";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Button
        icon="fi-br-add-document"
        iconSize="24px"
        style="secondary"
        label="Subir archivo"
      />
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
