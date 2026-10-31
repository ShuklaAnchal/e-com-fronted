// Thin wrapper around the Meta Pixel `fbq` global loaded in layout.js.
// Safe to call anywhere: it no-ops on the server or if the pixel is blocked.

export const trackMetaEvent = (eventName, params) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  try {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  } catch (error) {
    console.error("META PIXEL ERROR:", error);
  }
};

// Cart/order items reference products either by id or as a populated object.
export const getMetaContentId = (product) => {
  if (!product) return null;
  if (typeof product === "string") return product;
  return product._id ?? product.id ?? null;
};

// Builds content_ids from cart or order items, skipping anything without an id.
export const getMetaContentIds = (items = []) =>
  items
    .map((item) =>
      getMetaContentId(item?.productId ?? item?.product ?? item?.productID),
    )
    .filter(Boolean)
    .map(String);
