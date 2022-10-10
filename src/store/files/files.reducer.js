import { SET_FILES_LOADING, SET_FILES, SET_DIRECTORY } from "./files.actions";

const initialState = {
  dirname: "/",
  fileList: [],
  folderList: [],
  fileStatus: "unloaded",
};
export function filesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        fileList: action.payload.fileList,
        folderList: action.payload.folderList,
        fileStatus: "loaded",
      };
    case SET_FILES_LOADING:
      return {
        ...state,
        fileList: [],
        folderList: [],
        fileStatus: "loading",
      };
    case SET_DIRECTORY:
      return {
        ...state,
        dirname: action.payload.dirname,
        fileList: [],
        folderList: [],
        fileStatus: "loading",
      };
    default:
      return { ...state };
  }
}
