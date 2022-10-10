import { USER_LOG_IN, USER_LOG_OUT } from "./user.actions";

const initialState = { name: "Guest" };

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOG_IN:
      return {
        ...state,
        name: action.payload.name,
      };
    case USER_LOG_OUT: {
      return {
        ...state,
        name: undefined,
      };
    }
    default:
      return { ...state };
  }
}
