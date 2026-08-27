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

    if (!token) {
      const { cartItems } = getState().cart;

      dispatch(setCartSuccess(cartItems || []));

      return {
        success: true,
        cartItems: cartItems || [],
      };
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/cart/get-all-cart-product", config);

    // ======================================================
    // GET ITEMS FROM API
    // ======================================================

    const rawItems = data?.cart?.items || [];

    // ======================================================
    // NORMALIZE CART ITEMS
    // ======================================================

    const normalized = rawItems.map((item) => {
      const product =
        item.productId && typeof item.productId === "object"
          ? item.productId
          : null;

      return {
        // Product ID
        product: product?._id || item.productId || null,

        // Variant ID
        variantId: item.variantId || null,

        // Product information
        name: item.name || product?.name || "Product",

        // Price saved by backend
        price: Number(item.price || 0),

        // MRP
        mrp: Number(item.mrp || 0),

        // Image
        image:
          item.image ||
          product?.images?.[0]?.url ||
          product?.images?.[0] ||
          "/candle.png",

        // Quantity
        quantity: Number(item.quantity || 1),

        // SKU
        sku: item.sku || "",

        // Variant label
        variantLabel: item.variantLabel || item.sku || null,
      };
    });

    dispatch(setCartSuccess(normalized));

    return {
      success: true,
      cartItems: normalized,
    };
  } catch (error) {
    console.error("FETCH CART ERROR:", error?.response?.data || error);

    const message = error?.response?.data?.message || "Failed to fetch cart";

    dispatch(setCartFail(message));

    return {
      success: false,
      message,
    };
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
        variant?.attributes?.[0]?.value || variant?.sku || null;

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
export const removeFromCartAction =
  ({ productId, variantId }) =>
  async (dispatch, getState) => {
    dispatch(setCartRequest());
    try {
      const token = getToken();

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete(
          "/cart/remove-single-product-cart",
          {
            ...config,
            data: {
              productId,
              variantId,
            },
          },
        );

        const updatedCart = response?.data?.cart;

        dispatch(setCartSuccess(updatedCart?.items || []));

        return {
          success: true,
          cart: updatedCart,
        };
      }

      // =====================================================
      // GUEST CART
      // =====================================================

      const { cartItems = [] } = getState().cart;

      const updatedCart = cartItems.filter(
        (item) => item.product !== productId,
      );

      dispatch(updateLocalCart(updatedCart));

      dispatch(setCartSuccess(updatedCart));

      return {
        success: true,
        cart: updatedCart,
      };
    } catch (error) {
      console.error("REMOVE FROM CART ERROR:", error?.response?.data || error);

      dispatch(
        setCartFail(
          error?.response?.data?.message || "Failed to remove from cart",
        ),
      );

      return {
        success: false,
        message: error?.response?.data?.message || "Failed to remove from cart",
      };
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

        await axios.patch(
          "/cart/update-cart-quintity",
          {
            productId,
            quantity,
          },
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
