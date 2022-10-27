import { ADD_USER_CAPACITY, USER_LOG_IN, USER_LOG_OUT } from "./user.actions";

const initialState = {
  address: undefined,
  privateKey: undefined,
  name: undefined,
  availableSpace: undefined,
  usedSpace: undefined,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOG_IN:
      return {
        ...state,
        address: action.payload.address,
        name: action.payload.name,
        availableSpace: action.payload.availableSpace,
        usedSpace: action.payload.usedSpace,
      };
    case USER_LOG_OUT: {
      return {
        ...state,
        initialState,
      };
    }
    case ADD_USER_CAPACITY: {
      return {
        ...state,
        availableSpace: state.availableSpace + action.payload,
      };
    }
    default:
      return { ...state };
  }
}
