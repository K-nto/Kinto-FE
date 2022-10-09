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
