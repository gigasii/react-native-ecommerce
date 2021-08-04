import { LOGIN, LOGOUT, AUTH_FAIL } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  reason: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        reason: null,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    case AUTH_FAIL:
      return {
        ...state,
        reason: action.reason,
      };
    default:
      return state;
  }
};
