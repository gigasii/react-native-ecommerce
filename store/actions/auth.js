import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTH_FAIL = "AUTH_FAIL";
export const STORAGE_TOKEN_CREDENTIALS = "CREDENTIALS";
const BASE_URL = "http://192.168.0.199:8080/account";

// Store token credentials locally on device storage
const saveDataToStorage = (userId, token) => {
  AsyncStorage.setItem(
    STORAGE_TOKEN_CREDENTIALS,
    JSON.stringify({
      userId,
      token,
    })
  );
};

// Token authentication failed
export const tokenAuthFail = (message) => {
  return { type: AUTH_FAIL, reason: message };
};

// Logout action
export const logout = () => {
  AsyncStorage.removeItem(STORAGE_TOKEN_CREDENTIALS);
  return { type: LOGOUT };
};

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
    if (!res.ok) {
      throw new Error(result.message);
    }
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
    if (!res.ok) {
      throw new Error(result.message);
    }
    // Update redux store
    dispatch({
      type: LOGIN,
      token: result.token,
      userId: result.id,
    });
    // Store credentials
    saveDataToStorage(result.id, result.token);
  };
};

export const relog = (id, token) => {
  return async (dispatch) => {
    // Request for relog and check token
    const res = await fetch(`${BASE_URL}/relog`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Validation failed
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    // Update redux store
    dispatch({
      type: LOGIN,
      userId: id,
      token,
    });
    // Store credentials
    saveDataToStorage(id, token);
  };
};
