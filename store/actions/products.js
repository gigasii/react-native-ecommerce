import Product from "../../models/product";

// Constants
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
const BASE_URL = "http://192.168.0.199:8080/product";
const VALIDATION_RESULT = 0;
const VALIDATION_FAILED_REASON = 1;

// Verify the server status of the respond
const validateRespond = async (res) => {
  let message = "Request unable to be carried out";
  // Validation failed cause of authentication
  if (!res.ok && res.status == 401) {
    const data = await res.json();
    message = data.message;
  }
  return [res.ok, message];
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // Request for products from server
    const res = await fetch(`${BASE_URL}/fetch-products`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    const result = await validateRespond(res);
    // Validation
    if (!result[VALIDATION_RESULT]) {
      const error = new Error(result[VALIDATION_FAILED_REASON]);
      error.code = res.status;
      throw error;
    }
    const products = await res.json();
    // Convert data recieved
    const loadedProducts = [];
    products.forEach((product) => {
      loadedProducts.push(
        new Product(
          product._id,
          product.ownerId,
          product.title,
          product.imageUrl,
          product.description,
          product.price
        )
      );
    });
    // Update redux store
    const userId = getState().auth.userId;
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    // Send a request to server
    const res = await fetch(`${BASE_URL}/delete-product/${productId}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    // Validation
    const result = await validateRespond(res);
    if (!result[VALIDATION_RESULT]) {
      throw new Error(result[VALIDATION_FAILED_REASON]);
    }
    // Update redux store
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    // Send a request to server
    const res = await fetch(`${BASE_URL}/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      }),
    });
    // Validation
    const result = await validateRespond(res);
    if (!result[VALIDATION_RESULT]) {
      throw new Error(result[VALIDATION_FAILED_REASON]);
    }
    // Update redux store
    const product = await res.json();
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: product._id,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    // Send a request to server
    const res = await fetch(`${BASE_URL}/update-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
      body: JSON.stringify({
        id,
        title,
        description,
        imageUrl,
      }),
    });
    // Validation
    const result = await validateRespond(res);
    if (!result[VALIDATION_RESULT]) {
      throw new Error(result[VALIDATION_FAILED_REASON]);
    }
    // Updates redux store
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
