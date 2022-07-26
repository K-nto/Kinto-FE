import File from "../File/File";
import Folder from "../Folder/Folder";
import "./../common/Section.css";

const folders = [
  {
    id: "1",
    name: "Fotos",
  },
  { id: "2", name: "Videos" },
  { id: "3", name: "Documentos" },
];

const files = [
  {
    id: "1",
    name: "Documento.docx",
    type: "doc",
    size: 1231203,
  },
  {
    id: "2",
    name: "Documento.pdf",
    type: "pdf",
    size: 123120323,
  },
  {
    id: "3",
    name: "Imagen.jpeg",
    type: "photo",
    size: 3211234,
  },
  {
    id: "4",
    name: "calculo.xlsx",
    type: "xlsx",
    size: 123120322,
  },
  {
    id: "5",
    name: "kitty.gif",
    type: "gif",
    size: 1231203,
  },
  {
    id: "6",
    name: "Danza Kuduro.mp3",
    type: "audio",
    size: 35432332,
  },
  {
    id: "7",
    name: "gameplay.mov",
    type: "video",
    size: 1231203,
  },
];

const Files = () => {
  // we'll get one array (or tree?) of files and folders
  // we must query an API for that
  // when we get a response, we must filter files and folders for each section
  // an Effect linked to the user and the selected folder to request new files and cache them
  // an effect linked to the "whole data" property that filters folders and files separately
  // if file set type according to file name / extension from data. Will probably have to include mimetype somewhere
  return (
    <div className="section">
      <h1>Mi unidad</h1>{" "}
      {/** TODO: make reflect the current folder/file route */}
      <h2>Carpetas</h2>
      <div className="container">
        {folders.map((folder) => (
          <Folder key={folder.id} data={folder} />
        ))}
      </div>
      <h2>Archivos</h2>
      <div className="container">
        {files.map((file) => (
          <File key={file.id} data={file} />
        ))}
      </div>
    </div>
  );
};

export default Files;
