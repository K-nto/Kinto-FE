import { SET_ACTIVE_SECTION } from "./app.actions";

const initialState = {
  section: "files",
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_SECTION:
      return {
        ...state,
        section: action.payload,
      };
    default:
      return { ...state };
  }
}
