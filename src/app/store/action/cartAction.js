import axios from "@/app/utils/axios";
import {
  setCartRequest,
  setCartSuccess,
  setCartFail,
  updateLocalCart,
} from "../reducer/cartReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
      return token;
    }
  }
  return null;
};

// Fetch Cart Action
export const fetchCart = () => async (dispatch, getState) => {
  dispatch(setCartRequest());

  try {
    const token = getToken();

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/cart/get-all-cart-product", config);

      dispatch(setCartSuccess(data.cartItems || []));
    } else {
      const { cartItems } = getState().cart;
      dispatch(setCartSuccess(cartItems));
    }
  } catch (error) {
    dispatch(
      setCartFail(error?.response?.data?.message || "Failed to fetch cart"),
    );
  }
};

// Add to Cart Action
export const addToCartAction =
  (product, quantity) => async (dispatch, getState) => {
    dispatch(setCartRequest());

    try {
      const token = getToken();

      const newItem = {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.media?.[0]?.url,
        quantity,
      };

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.post(
          "/cart/create-cart",
          {
            productId: product._id,
            quantity,
          },
          config,
        );

        await dispatch(fetchCart());

        return {
          success: true,
          payload: data,
        };
      }

      const { cartItems } = getState().cart;

      const existingItem = cartItems.find(
        (item) => item.product === product._id,
      );

      let updatedCart = [...cartItems];

      if (existingItem) {
        updatedCart = updatedCart.map((item) =>
          item.product === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      } else {
        updatedCart.push(newItem);
      }

      dispatch(updateLocalCart(updatedCart));
      dispatch(setCartSuccess(updatedCart));

      return {
        success: true,
      };
    } catch (error) {
      dispatch(
        setCartFail(error?.response?.data?.message || "Failed to add to cart"),
      );

      return {
        success: false,
        message: error?.response?.data?.message || "Failed to add to cart",
      };
    }
  };

export const mergeLocalCart = () => async (dispatch) => {
  try {
    const token = getToken();

    if (!token) return;

    const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (localCart.length === 0) {
      dispatch(fetchCart());
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    for (const item of localCart) {
      await axios.post(
        "/cart/create-cart",
        {
          productId: item.product,
          quantity: item.quantity,
        },
        config,
      );
    }

    localStorage.removeItem("cartItems");

    dispatch(updateLocalCart([]));

    dispatch(fetchCart());
  } catch (error) {
    console.log(error);
  }
};
