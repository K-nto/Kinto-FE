import axios from "axios";
import { KINTO_SERVICE_URL, USERS_ROUTE, FILES_ROUTE } from "../../config";

export function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}

function getFileExtension(name) {
  return name.slice(name.lastIndexOf(".")).toLocaleLowerCase();
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

export async function uploadFiles(address, authHash, fileList) {
  const formData = new FormData();
  if (fileList.length > 1) return "Only one file at a time!";
  formData.append("file", fileList[0]);
  return await axios
    .post(
      `${KINTO_SERVICE_URL}/${USERS_ROUTE}/${address}/${FILES_ROUTE}`,
      formData,
      {
        headers: {
          authorization: authHash,
        },
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
      return res.data.map((file) =>
        file.type === "directory" ? file : { ...file, type: getFileType(file) }
      );
    })
    .catch((e) => console.log(e));
}
