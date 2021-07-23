import Product from "../../models/product";

// Constants
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
const BASE_URL = "http://192.168.0.199:8080/product";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      // Request for products from server
      const res = await fetch(`${BASE_URL}/fetch-products`);
      if (!res.ok) {
        throw new Error("Request to fetch products failed");
      }
      const products = await res.json();
      // Convert data recieved
      const loadedProducts = [];
      products.forEach((product) => {
        loadedProducts.push(
          new Product(
            product._id,
            "u1",
            product.title,
            product.imageUrl,
            product.description,
            product.price
          )
        );
      });
      // Update redux store
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, payload: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // Send a request to server
    const res = await fetch(`${BASE_URL}/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
      }),
    });
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
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
