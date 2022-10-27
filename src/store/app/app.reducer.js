import { USER_LOG_IN, USER_LOG_OUT } from "../user/user.actions";
import { SET_ACTIVE_SECTION } from "./app.actions";

const initialState = {
  section: "login",
  authenticated: false,
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOG_IN: {
      return {
        ...state,
        authenticated: true,
        section: "files",
      };
    }
    case USER_LOG_OUT: {
      return {
        ...state,
        authenticated: false,
        section: "login",
      };
    }
    case SET_ACTIVE_SECTION:
      return {
        ...state,
        section: action.payload,
      };
    default:
      return { ...state };
  }
}
