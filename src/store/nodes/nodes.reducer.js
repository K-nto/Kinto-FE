import {
  SET_NODES_LIST,
  PUSH_TO_NODES_LIST,
  SET_NODES_LOADING,
  SET_NODES_LOADED,
} from "./nodes.actions";

const initialState = {
  nodeList: [],
  nodeStatus: "unloaded",
};

// TODO: Set node dates to String
export function nodesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NODES_LIST:
      return {
        ...state,
        nodeList: action.payload.nodeList,
      };
    case PUSH_TO_NODES_LIST:
      return {
        ...state,
        nodeList: [...state.nodeList, ...action.payload.nodes],
      };
    case SET_NODES_LOADING:
      return {
        ...state,
        fileStatus: "loading",
      };
    case SET_NODES_LOADED:
      return {
        ...state,
        fileStatus: "loaded",
      };
    default:
      return { ...state };
  }
}
