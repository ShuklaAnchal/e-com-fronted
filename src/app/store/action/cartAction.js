import axios from "@/app/utils/axios";
import {
  setCartRequest,
  setCartSuccess,
  setCartFail,
  updateLocalCart,
} from "../reducer/cartReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");
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

      // Normalize: API may return product as a nested object or just an id
      const rawItems = data.cartItems || data.items || [];
      const normalized = rawItems.map((item) => {
        const prod = item.product;
        const isPopulated = prod && typeof prod === "object";

        // Variant may be populated or just an id
        const variantObj =
          item.variant && typeof item.variant === "object"
            ? item.variant
            : null;
        const variantLabel =
          item.variantLabel ||
          variantObj?.attributes?.[0]?.value ||
          variantObj?.sku ||
          null;

        return {
          product: isPopulated ? prod._id : prod,
          name: item.name || (isPopulated ? prod.name : ""),
          price: item.price ?? (isPopulated ? prod.price : 0),
          mrp: item.mrp ?? null,
          image:
            item.image ||
            (isPopulated
              ? prod.images?.[0] || prod.media?.[0]?.url
              : null),
          quantity: item.quantity || 1,
          variantId: item.variantId || variantObj?._id || null,
          variantLabel,
        };
      });

      dispatch(setCartSuccess(normalized));
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

      // Price & variant info from the selected variant's pricing object
      const variant = product.selectedVariant || null;
      const variantPrice =
        variant?.pricing?.sellingPrice ??
        variant?.pricing?.mrp ??
        product.price ??
        0;
      const variantMrp = variant?.pricing?.mrp ?? null;
      const variantId = variant?._id ?? null;
      // Human-readable label e.g. "500ml", "Red", "Large"
      const variantLabel =
        variant?.attributes?.[0]?.value ||
        variant?.sku ||
        null;

      const newItem = {
        product: product._id,
        name: product.name,
        price: variantPrice,
        mrp: variantMrp,
        image:
          product.images?.[0] ||
          product.media?.[0]?.url ||
          variant?.images?.[0] ||
          null,
        quantity,
        variantId,
        variantLabel,
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
            variantId,
            price: variantPrice,
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

// Remove from Cart Action
export const removeFromCartAction = (productId) => async (dispatch, getState) => {
  dispatch(setCartRequest());

  try {
    const token = getToken();

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/cart/delete-cart-product/${productId}`, config);

      await dispatch(fetchCart());

      return { success: true };
    }

    // Guest: remove from localStorage
    const { cartItems } = getState().cart;
    const updatedCart = cartItems.filter((item) => item.product !== productId);

    dispatch(updateLocalCart(updatedCart));
    dispatch(setCartSuccess(updatedCart));

    return { success: true };
  } catch (error) {
    dispatch(
      setCartFail(error?.response?.data?.message || "Failed to remove from cart"),
    );
    return { success: false };
  }
};

// Update Cart Quantity Action
export const updateCartQuantityAction =
  (productId, quantity) => async (dispatch, getState) => {
    if (quantity < 1) return;

    dispatch(setCartRequest());

    try {
      const token = getToken();

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.put(
          `/cart/update-cart-product/${productId}`,
          { quantity },
          config,
        );

        await dispatch(fetchCart());

        return { success: true };
      }

      // Guest: update in localStorage
      const { cartItems } = getState().cart;
      const updatedCart = cartItems.map((item) =>
        item.product === productId ? { ...item, quantity } : item,
      );

      dispatch(updateLocalCart(updatedCart));
      dispatch(setCartSuccess(updatedCart));

      return { success: true };
    } catch (error) {
      dispatch(
        setCartFail(
          error?.response?.data?.message || "Failed to update cart quantity",
        ),
      );
      return { success: false };
    }
  };
