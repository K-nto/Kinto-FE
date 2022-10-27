import {
  SET_FILES_LOADING,
  SET_FILES_LIST,
  SET_FILES_DIRECTORY,
  PUSH_TO_FILES_LIST,
  SET_FILES_LOADED,
} from "./files.actions";

const initialState = {
  dirname: "/",
  dirList: [],
  fileStatus: "unloaded",
};
export function filesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILES_LIST:
      return {
        ...state,
        dirList: action.payload.dirList,
      };
    case PUSH_TO_FILES_LIST:
      return {
        ...state,
        dirList: [...state.dirList, ...action.payload.files],
      };
    case SET_FILES_LOADING:
      return {
        ...state,
        fileStatus: "loading",
      };
    case SET_FILES_LOADED:
      return {
        ...state,
        fileStatus: "loaded",
      };
    case SET_FILES_DIRECTORY:
      return {
        ...state,
        dirname: action.payload.dirname,
        dirList: [],
      };
    default:
      return { ...state };
  }
}
