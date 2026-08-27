"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchOrderbyID } from "@/app/store/action/orderAction";

const Page = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, error } = useSelector((state) => state.order);

  console.log("Redux Order:", order);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderbyID(id));
    }
  }, [dispatch, id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  if (error?.length) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error[0]}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        Order not found.
      </div>
    );
  }
  return (
    <div className="w-full h-screen overflow-auto mx-auto p-6 space-y-6">
      {!order ? (
        <div className="text-center text-gray-500">
          Loading order details...
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Order Details</h1>
                <p className="text-gray-500">Order ID: {order._id}</p>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.orderStatus}
                </span>

                <p className="text-sm text-gray-500 mt-2">
                  {order.createdAt &&
                    new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Customer & Shipping */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold text-lg mb-4">
                Customer Information
              </h2>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {order.user?.name || "N/A"}
                </p>

                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {order.user?.email || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>

              {order.shippingAddress ? (
                <div className="space-y-2 text-gray-700">
                  {/* Name */}
                  <p className="font-semibold text-gray-900">
                    {order.shippingAddress.name || "N/A"}
                  </p>

                  {/* Mobile */}
                  <p>
                    <span className="font-medium">Mobile:</span>{" "}
                    {order.shippingAddress.mobileNumber || "N/A"}
                  </p>

                  {/* Address */}
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {order.shippingAddress.addressline || "N/A"}
                  </p>

                  {/* Locality */}
                  <p>
                    <span className="font-medium">Locality:</span>{" "}
                    {order.shippingAddress.locality || "N/A"}
                  </p>

                  {/* City */}
                  <p>
                    <span className="font-medium">City:</span>{" "}
                    {order.shippingAddress.city || "N/A"}
                  </p>

                  {/* State */}
                  <p>
                    <span className="font-medium">State:</span>{" "}
                    {order.shippingAddress.state || "N/A"}
                  </p>

                  {/* Pincode */}
                  <p>
                    <span className="font-medium">Pincode:</span>{" "}
                    {order.shippingAddress.pincode || "N/A"}
                  </p>

                  {/* Landmark */}
                  {order.shippingAddress.landmark && (
                    <p>
                      <span className="font-medium">Landmark:</span>{" "}
                      {order.shippingAddress.landmark}
                    </p>
                  )}

                  {/* Alternate Number */}
                  {order.shippingAddress.alternateNumber && (
                    <p>
                      <span className="font-medium">Alternate Mobile:</span>{" "}
                      {order.shippingAddress.alternateNumber}
                    </p>
                  )}

                  {/* Address Type */}
                  <p>
                    <span className="font-medium">Address Type:</span>{" "}
                    {order.shippingAddress.addressType || "Home"}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Shipping address not available.</p>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Ordered Products</h2>
            </div>

            {order.products?.length > 0 ? (
              order.products.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between p-6 border-b last:border-none"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.product?.name || "Product"}
                    </h3>

                    <p className="text-gray-500">
                      Brand: {item.product?.brand || "N/A"}
                    </p>

                    <p className="text-gray-500">
                      SKU: {item.variant?.sku || "N/A"}
                    </p>

                    <p className="text-gray-500">
                      Quantity: {item.quantity || 0}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl">₹{item.price || 0}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-6 text-gray-500">No products found</p>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal || 0}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ₹{order.discount || 0}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingCost || 0}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{order.tax || 0}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{order.totalPrice || 0}</span>
              </div>

              <div className="flex justify-between mt-4">
                <span>Payment Status</span>

                <span
                  className={`font-semibold ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
