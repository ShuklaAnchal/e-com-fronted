"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "@/app/store/action/cartAction";
import { AddAddress } from "@/app/store/action/addressAction";

import {
  createOrder,
  createRazorpayOrder,
  verifyPayment,
} from "@/app/store/action/orderAction";

import { useAddress } from "@/app/hooks/addressHook";

import CheckoutHeader from "@/app/component/checkout/CheckoutHeader";
import ContactInformation from "@/app/component/checkout/CheckoutContact";
import DeliveryAddress from "@/app/component/checkout/DeliveryAddress";
import PaymentMethod from "@/app/component/checkout/PaymentMethod";
import OrderSummary from "@/app/component/checkout/OrderSummary";

const INITIAL_FORM = {
  name: "",
  mobileNumber: "",
  pincode: "",
  locality: "",
  addressline: "",
  city: "",
  state: "",
  landmark: "",
  alternateNumber: "",
  addressType: "Home",
};

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  /* =====================================================
     CART
  ===================================================== */

  const { cartItems = [], loading: cartLoading } = useSelector(
    (state) => state.cart || {},
  );

  /* =====================================================
     ADDRESS
  ===================================================== */

  const { address, loading: addressLoading, refreshAddress } = useAddress();

  const savedAddresses = address || [];

  /* =====================================================
     PAGE STATE
  ===================================================== */

  const [mounted, setMounted] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  /* =====================================================
     ADDRESS STATE
  ===================================================== */

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM);

  /* =====================================================
     PAYMENT
  ===================================================== */

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
      router.push("/login?redirect=/user/checkout");
      return;
    }

    dispatch(fetchCart());
  }, [dispatch, router]);

  /* =====================================================
     GET ADDRESS ID
  ===================================================== */

  const getAddressId = (item) => {
    return item?.id || item?._id || item?.addressId || null;
  };

  /* =====================================================
     SET FORM FROM SAVED ADDRESS
  ===================================================== */

  const setFormFromAddress = (savedAddress) => {
    if (!savedAddress) return;

    setFormData({
      name: savedAddress.name || savedAddress.fullName || "",

      mobileNumber: savedAddress.mobileNumber || savedAddress.mobile || "",

      pincode: savedAddress.pincode || "",

      locality: savedAddress.locality || "",

      addressline: savedAddress.addressline || savedAddress.address || "",

      city: savedAddress.city || "",

      state: savedAddress.state || "",

      landmark: savedAddress.landmark || "",

      alternateNumber: savedAddress.alternateNumber || "",

      addressType: savedAddress.addressType || "Home",
    });
  };

  /* =====================================================
     AUTO SELECT FIRST ADDRESS
  ===================================================== */

  useEffect(() => {
    if (addressLoading) return;

    if (savedAddresses.length === 0) {
      setSelectedAddressId(null);
      setShowNewAddressForm(true);
      return;
    }

    if (showNewAddressForm) return;

    if (selectedAddressId) return;

    const firstAddress = savedAddresses[0];

    const id = getAddressId(firstAddress);

    if (!id) return;

    setSelectedAddressId(id);

    setFormFromAddress(firstAddress);
  }, [addressLoading, savedAddresses, selectedAddressId, showNewAddressForm]);

  /* =====================================================
     SELECTED ADDRESS
  ===================================================== */

  const selectedAddress = useMemo(() => {
    if (!selectedAddressId) {
      return null;
    }

    return (
      savedAddresses.find((item) => getAddressId(item) === selectedAddressId) ||
      null
    );
  }, [savedAddresses, selectedAddressId]);

  /* =====================================================
     CLEAR ADDRESS FORM
  ===================================================== */

  const clearAddressForm = () => {
    setFormData({
      ...INITIAL_FORM,
    });
  };

  /* =====================================================
     SELECT SAVED ADDRESS
  ===================================================== */

  const handleSelectAddress = (savedAddress) => {
    const id = getAddressId(savedAddress);

    if (!id) {
      console.error("Address ID not found:", savedAddress);
      return;
    }

    setSelectedAddressId(id);

    setFormFromAddress(savedAddress);

    setShowNewAddressForm(false);
  };

  /* =====================================================
     ADD NEW ADDRESS
  ===================================================== */

  const handleAddNewAddress = () => {
    setSelectedAddressId(null);

    clearAddressForm();

    setShowNewAddressForm(true);
  };

  /* =====================================================
     USE SAVED ADDRESS
  ===================================================== */

  const handleUseSavedAddress = () => {
    if (savedAddresses.length === 0) {
      return;
    }

    handleSelectAddress(savedAddresses[0]);
  };

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     ADDRESS TYPE
  ===================================================== */

  const handleAddressTypeChange = (type) => {
    setFormData((previous) => ({
      ...previous,
      addressType: type,
    }));
  };

  /* =====================================================
     VALIDATE ADDRESS
  ===================================================== */

  const validateAddress = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return false;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      alert("Please enter a valid 10 digit mobile number.");
      return false;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("Please enter a valid 6 digit pincode.");
      return false;
    }

    if (!formData.locality.trim()) {
      alert("Please enter your locality.");
      return false;
    }

    if (!formData.addressline.trim()) {
      alert("Please enter your complete address.");
      return false;
    }

    if (!formData.city.trim()) {
      alert("Please enter your city.");
      return false;
    }

    if (!formData.state.trim()) {
      alert("Please enter your state.");
      return false;
    }

    if (
      formData.alternateNumber &&
      !/^\d{10}$/.test(formData.alternateNumber)
    ) {
      alert("Please enter a valid alternate number.");
      return false;
    }

    return true;
  };

  /* =====================================================
     SAVE NEW ADDRESS
  ===================================================== */

  const handleSaveNewAddress = async () => {
    if (!validateAddress()) {
      return;
    }

    try {
      setSavingAddress(true);

      const result = await dispatch(AddAddress(formData));

      console.log("ADD ADDRESS RESULT:", result);

      if (!result?.success) {
        alert(result?.message || "Unable to save address.");
        return;
      }

      await refreshAddress();

      setShowNewAddressForm(false);

      /*
       * refreshAddress updates savedAddresses.
       * We don't manually select an ID here.
       * The auto-selection effect will select
       * an address if necessary.
       */
    } catch (error) {
      console.error("SAVE ADDRESS ERROR:", error);

      alert("Something went wrong while saving the address.");
    } finally {
      setSavingAddress(false);
    }
  };

  /* =====================================================
     CART SUBTOTAL
  ===================================================== */

  const subtotal = useMemo(() => {
    return (
      cartItems.reduce((total, item) => {
        const price = Number(item?.price || 0);

        const quantity = Number(item?.quantity || 0);

        return total + price * quantity;
      }, 0) || 0
    );
  }, [cartItems]);

  /* =====================================================
     MRP TOTAL
  ===================================================== */

  const mrpTotal = useMemo(() => {
    return (
      cartItems.reduce((total, item) => {
        const mrp = Number(
          item?.mrp || item?.variantDetails?.pricing?.mrp || item?.price || 0,
        );

        const quantity = Number(item?.quantity || 0);

        return total + mrp * quantity;
      }, 0) || 0
    );
  }, [cartItems]);

  /* =====================================================
     DISCOUNT
  ===================================================== */

  const discount = Math.max(mrpTotal - subtotal, 0);

  /* =====================================================
     SHIPPING
  ===================================================== */

  const shippingCost = 0;

  /* =====================================================
     TAX
  ===================================================== */

  const tax = 0;

  /* =====================================================
     FINAL TOTAL
  ===================================================== */

  const total = useMemo(() => {
    return subtotal - discount + shippingCost + tax;
  }, [subtotal, discount, shippingCost, tax]);

  /* =====================================================
     CREATE SHIPPING ADDRESS
  ===================================================== */

  const buildShippingAddress = () => {
    if (selectedAddress) {
      return {
        addressId: getAddressId(selectedAddress),

        name: selectedAddress.name || selectedAddress.fullName || "",

        mobileNumber:
          selectedAddress.mobileNumber || selectedAddress.mobile || "",

        pincode: selectedAddress.pincode || "",

        locality: selectedAddress.locality || "",

        addressline:
          selectedAddress.addressline || selectedAddress.address || "",

        city: selectedAddress.city || "",

        state: selectedAddress.state || "",

        landmark: selectedAddress.landmark || "",

        alternateNumber: selectedAddress.alternateNumber || "",

        addressType: selectedAddress.addressType || "Home",
      };
    }

    return {
      ...formData,
      addressId: null,
    };
  };

  /* =====================================================
     CREATE RAZORPAY SCRIPT
  ===================================================== */

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve(false);
        return;
      }

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  /* =====================================================
     OPEN RAZORPAY
  ===================================================== */

  const openRazorpay = async ({ orderId, razorpayOrder }) => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      throw new Error("Razorpay SDK failed to load.");
    }

    /*
     * Your backend response may use different
     * property names. Adjust these according
     * to your /payment/create-order response.
     */

    const razorpayOrderId =
      razorpayOrder?.id ||
      razorpayOrder?.order?.id ||
      razorpayOrder?.razorpayOrder?.id;

    const razorpayAmount =
      razorpayOrder?.amount ||
      razorpayOrder?.order?.amount ||
      razorpayOrder?.razorpayOrder?.amount;

    const razorpayCurrency =
      razorpayOrder?.currency || razorpayOrder?.order?.currency || "INR";

    if (!razorpayOrderId) {
      console.error("RAZORPAY RESPONSE:", razorpayOrder);

      throw new Error("Razorpay order ID was not received from server.");
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: razorpayAmount || Math.round(total * 100),

      currency: razorpayCurrency,

      name: "DingwaniFoods",

      description: `Payment for Order ${orderId}`,

      order_id: razorpayOrderId,

      handler: async function (response) {
        try {
          setPlacingOrder(true);

          console.log("RAZORPAY SUCCESS:", response);

          const verificationData = {
            orderID: orderId,

            razorpay_order_id: response.razorpay_order_id,

            razorpay_payment_id: response.razorpay_payment_id,

            razorpay_signature: response.razorpay_signature,
          };

          const verifyResult = await dispatch(verifyPayment(verificationData));

          console.log("PAYMENT VERIFY RESULT:", verifyResult);

          if (!verifyResult?.success) {
            alert(verifyResult?.message || "Payment verification failed.");
            return;
          }

          /*
           * Payment is successfully verified.
           */

          router.push(`/user/order-success`);
        } catch (error) {
          console.error("PAYMENT VERIFICATION ERROR:", error);

          alert(error?.message || "Payment verification failed.");
        } finally {
          setPlacingOrder(false);
        }
      },

      prefill: {
        name: formData.name || "",

        contact: formData.mobileNumber || "",
      },

      notes: {
        orderId: String(orderId),
      },

      theme: {
        color: "#C9A227",
      },

      modal: {
        ondismiss: function () {
          setPlacingOrder(false);

          console.log("Razorpay payment window closed.");
        },
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.error("RAZORPAY PAYMENT FAILED:", response);

      alert(response?.error?.description || "Payment failed.");

      setPlacingOrder(false);
    });

    razorpay.open();
  };

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (placingOrder) {
      return;
    }

    /* ---------------------------------------------
       CART VALIDATION
    --------------------------------------------- */

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    /* ---------------------------------------------
       ADDRESS VALIDATION
    --------------------------------------------- */

    if (
      savedAddresses.length > 0 &&
      !selectedAddressId &&
      !showNewAddressForm
    ) {
      alert("Please select a delivery address.");
      return;
    }

    if (showNewAddressForm) {
      if (!validateAddress()) {
        return;
      }
    }

    /* ---------------------------------------------
       PAYMENT METHOD
    --------------------------------------------- */

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      setPlacingOrder(true);

      /* ==========================================
         SHIPPING ADDRESS
      ========================================== */

      const shippingAddress = buildShippingAddress();

      /* ==========================================
         PRODUCTS

         IMPORTANT:

         Backend expects:

         products: [
           {
             product,
             variant,
             quantity
           }
         ]

         The backend calculates the price
         itself from ProductVariant.
      ========================================== */

      const products = cartItems.map((item) => {
        const productId =
          item?.productId || item?.product || item?.product?._id;

        const variantId =
          item?.variantId || item?.variant || item?.variant?._id;

        return {
          product: productId,

          variant: variantId,

          quantity: Number(item?.quantity || 0),
        };
      });

      /* ==========================================
         CHECK PRODUCT / VARIANT IDS
      ========================================== */

      const invalidProduct = products.find(
        (item) => !item.product || !item.variant || item.quantity <= 0,
      );

      if (invalidProduct) {
        console.error("INVALID CART ITEM:", invalidProduct);

        alert(
          "Some cart products are invalid. Please remove them and add them again.",
        );

        setPlacingOrder(false);

        return;
      }

      /* ==========================================
         FINAL ORDER PAYLOAD

         MATCHES YOUR BACKEND CONTROLLER
      ========================================== */

      const orderPayload = {
        products,

        shippingAddress,

        discount: Number(discount) || 0,

        shippingCost: Number(shippingCost) || 0,

        tax: Number(tax) || 0,
        paymentMethod,
      };

      console.log("FINAL ORDER PAYLOAD:", orderPayload);

      /* ==========================================
         STEP 1
         CREATE ORDER IN DATABASE
      ========================================== */

      const orderResult = await dispatch(createOrder(orderPayload));

      console.log("CREATE ORDER RESULT:", orderResult);

      if (!orderResult?.success) {
        throw new Error(orderResult?.message || "Unable to create order.");
      }

      /* ==========================================
         GET CREATED ORDER
      ========================================== */

      const createdOrder = orderResult?.payload?.order;

      if (!createdOrder) {
        console.error("CREATE ORDER RESPONSE:", orderResult);

        throw new Error(
          "Order was created but order details were not returned.",
        );
      }

      const orderId = createdOrder?._id || createdOrder?.id;

      if (!orderId) {
        throw new Error("Order ID was not received.");
      }

      /*
       * Backend calculates the final amount.
       * Use that value rather than trusting
       * the frontend total.
       */

      const orderAmount = Number(createdOrder?.totalPrice || total || 0);

      if (orderAmount <= 0) {
        throw new Error("Invalid order amount.");
      }

      /* ==========================================
         CASH ON DELIVERY
      ========================================== */

      if (paymentMethod === "COD") {
        router.push(`/user/order-success`);

        return;
      }

      /* ==========================================
         ONLINE PAYMENT
      ========================================== */

      const razorpayResult = await dispatch(
        createRazorpayOrder(orderId, orderAmount),
      );

      console.log("RAZORPAY ORDER RESULT:", razorpayResult);

      if (!razorpayResult?.success) {
        throw new Error(
          razorpayResult?.message || "Unable to create Razorpay order.",
        );
      }

      /* ==========================================
         STEP 3
         OPEN RAZORPAY
      ========================================== */

      await openRazorpay({
        orderId,
        razorpayOrder: razorpayResult?.payload,
      });
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);

      alert(error?.message || "Unable to place order.");

      setPlacingOrder(false);
    }
  };

  /* =====================================================
     HYDRATION
  ===================================================== */

  if (!mounted) {
    return null;
  }

  /* =====================================================
     CART LOADING
  ===================================================== */

  if (cartLoading) {
    return (
      <div
        className="
          min-h-screen
          bg-luxury-cream
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              w-6
              h-6
              rounded-full
              border-2
              border-luxury-gold
              border-t-transparent
              animate-spin
            "
          />

          <p
            className="
              mt-4
              text-xs
              uppercase
              tracking-[0.25em]
              text-luxury-gold
            "
          >
            Loading Checkout...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (!cartItems || cartItems.length === 0) {
    return (
      <div
        className="
          min-h-screen
          bg-luxury-cream
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center">
          <h1
            className="
              font-serif
              text-3xl
              text-luxury-dark
              mb-4
            "
          >
            Your Cart Is Empty
          </h1>

          <p
            className="
              text-[#6C6C6C]
              mb-8
            "
          >
            Add products to your cart before proceeding to checkout.
          </p>

          <button
            type="button"
            onClick={() => router.push("/products")}
            className="
              bg-luxury-dark
              text-luxury-gold
              px-8
              py-4
              text-xs
              uppercase
              tracking-[0.2em]
              hover:bg-luxury-gold
              hover:text-luxury-dark
              transition-all
            "
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div
      className="
        min-h-screen
        bg-luxury-cream
        pt-28
        pb-20
      "
    >
      <CheckoutHeader />

      <form onSubmit={handlePlaceOrder}>
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            mt-10
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-8
              lg:gap-10
            "
          >
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div
              className="
                lg:col-span-7
                space-y-8
              "
            >
              <ContactInformation formData={formData} onChange={handleChange} />

              <DeliveryAddress
                addresses={savedAddresses}
                loading={addressLoading}
                selectedAddressId={selectedAddressId}
                showNewAddressForm={showNewAddressForm}
                formData={formData}
                savingAddress={savingAddress}
                onSelectAddress={handleSelectAddress}
                onAddNewAddress={handleAddNewAddress}
                onUseSavedAddress={handleUseSavedAddress}
                onChange={handleChange}
                onAddressTypeChange={handleAddressTypeChange}
                onSaveAddress={handleSaveNewAddress}
              />

              <PaymentMethod
                paymentMethod={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div
              className="
                lg:col-span-5
              "
            >
              <OrderSummary
                cartItems={cartItems}
                mrpTotal={mrpTotal}
                discount={discount}
                subtotal={subtotal}
                shipping={shippingCost}
                total={total}
                selectedAddress={selectedAddress}
                formData={formData}
                showNewAddressForm={showNewAddressForm}
                paymentMethod={paymentMethod}
                placingOrder={placingOrder}
                addressLoading={addressLoading}
                savingAddress={savingAddress}
                onEditCart={() => router.push("/user/cart")}
                onChangeAddress={() =>
                  document.getElementById("delivery-address")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
