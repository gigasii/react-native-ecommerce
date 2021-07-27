export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
const BASE_URL = "http://192.168.0.199:8080/account";

export const signup = (email, password) => {
  return async (dispatch) => {
    // Request for orders from server
    const res = await fetch(`${BASE_URL}/create-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    // Validation failed
    if (res.status == 400) {
      throw new Error(result.message);
    }
    // Update redux store
    dispatch({
      type: SIGNUP,
      userId: result._id,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    // Request for orders from server
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    // Validation failed
    if (res.status == 400) {
      throw new Error(result.message);
    }
    // Update redux store
    dispatch({
      type: LOGIN,
      token: result.token,
      userId: result.id,
    });
  };
};
