import axios from "axios";
import post from "axios";
import { KINTO_SERVICE_URL, USERS_ROUTE, FILES_ROUTE } from "../config";

export function sortFiles(files) {
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

function getFileExtension(name) {
  return name.slice(name.indexOf("."));
}
export function getFileType(file) {
  switch (getFileExtension(file.name)) {
    case ".doc":
    case ".docx":
    case ".rtf":
      return "doc";
    case ".pdf":
      return "pdf";
    case ".xlsx":
    case ".xls":
      return "xlsx";
    case ".jpg":
    case ".png":
      return "photo";
    case ".gif":
      return "gif";
    case ".mov":
    case ".mp4":
    case ".avi":
      return "video";
    default:
      return "file";
  }
}

export function filterFoldersFromFiles(rawFiles) {
  const filteredFolders = [];
  const filteredFiles = [];

  rawFiles.forEach((element) => {
    // @TODO: All CIDs return the same!!! will have to come as strings from BE
    element.type === "directory"
      ? filteredFolders.push(element)
      : filteredFiles.push({ ...element, type: getFileType(element) });
  });
  console.log(filteredFiles);
  return { filteredFolders, filteredFiles };
}

export async function uploadFiles(currentUser, fileList) {
  const formData = new FormData();
  if (fileList.length > 1) return "Only one file at a time!";
  formData.append("file", fileList[0]);
  return await axios
    .post(
      `${KINTO_SERVICE_URL}/${USERS_ROUTE}/guest/${FILES_ROUTE}`,
      formData,
      {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          console.log(progress);
          // setProgess(progress);
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));
}
