import { LOGIN, AUTH_FAIL } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  reason: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
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
