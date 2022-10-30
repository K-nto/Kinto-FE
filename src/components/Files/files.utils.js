import axios from "axios";
import CryptoJS from "crypto-js";
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

export async function postFile(address, authHash, formData) {
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
    .catch((e) => {
      throw e;
    });
}

export async function uploadFiles(
  address,
  privateKey,
  authHash,
  fileList,
  callback
) {
  if (fileList.length > 1) throw new Error("Only one file at a time!");
  if (fileList[0].size > 1024 * 1024)
    throw new Error("File is too big to be encrypted!, we're working on it :)");
  if (fileList[0].name.indexOf("}") !== -1)
    throw new Error("Invalid file name");
  const reader = new FileReader();
  const formData = new FormData();
  const metadata = {
    name: fileList[0].name,
    type: fileList[0].type,
    address: address,
  };
  reader.onloadend = async function () {
    const result = reader.result ?? "";
    const encryptedData = CryptoJS.AES.encrypt(result, privateKey);
    formData.append("fileData", encryptedData.toString());
    formData.append("name", metadata.name);
    formData.append("type", metadata.type);
    formData.append("address", address);
    const uploadedFiles = await postFile(address, authHash, formData);
    callback(uploadedFiles);
  };
  console.log(fileList[0]);
  reader.readAsDataURL(fileList[0]);

  // return await axios
  //   .post(
  //     `${KINTO_SERVICE_URL}/${USERS_ROUTE}/${address}/${FILES_ROUTE}`,
  //     formData,
  //     {
  //       headers: {
  //         authorization: authHash,
  //       },
  //       onUploadProgress: (ProgressEvent) => {
  //         let progress =
  //           Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
  //           "%";
  //         console.log(progress);
  //         // setProgess(progress);
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     return res.data.map((file) =>
  //       file.type === "directory" ? file : { ...file, type: getFileType(file) }
  //     );
  //   })
  //   .catch((e) => console.log(e));
}
