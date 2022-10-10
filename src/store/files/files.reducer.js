import { SET_LOADING, SET_FILES, SET_DIRECTORY } from "./files.actions";

const initialState = {
  dirname: "/",
  fileList: [],
  folderList: [],
  status: "unloaded",
};
export function filesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        fileList: action.payload.fileList,
        folderList: action.payload.folderList,
        status: "loaded",
      };
    case SET_LOADING:
      return {
        ...state,
        fileList: [],
        folderList: [],
        status: "loading",
      };
    case SET_DIRECTORY:
      return {
        ...state,
        dirname: action.payload.dirname,
        fileList: [],
        folderList: [],
        status: "loading",
      };
    default:
      return { ...state };
  }
}
