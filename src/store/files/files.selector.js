import { sortByName } from "../../components/Files/files.utils";

export const selectDirList = (state) => state.files.dirList;
export const selectFileList = (state) =>
  state.files.dirList
    .filter((file) => file.type !== "directory")
    .sort(sortByName);

export const selectFolderList = (state) =>
  state.files.dirList
    .filter((file) => file.type === "directory")
    .sort(sortByName);
export const selectFileStatus = (state) => state.files.fileStatus;
export const selectDirname = (state) => state.files.dirname;
