
"use client";

/* ============================================================
   STATUS
============================================================ */

const STATUS_STYLES = {
  Pending: {
    dot: "bg-[#C5A880]",
    bg: "bg-[#C5A880]/10",
    text: "text-[#A68A5E]",
  },

  Processing: {
    dot: "bg-[#6C9BCF]",
    bg: "bg-[#6C9BCF]/10",
    text: "text-[#5080A8]",
  },

  Shipped: {
    dot: "bg-[#7ABFAB]",
    bg: "bg-[#7ABFAB]/10",
    text: "text-[#4E9E89]",
  },

  Delivered: {
    dot: "bg-[#5EAD6F]",
    bg: "bg-[#5EAD6F]/10",
    text: "text-[#3A8A4E]",
  },

  Cancelled: {
    dot: "bg-[#CC6060]",
    bg: "bg-[#CC6060]/10",
    text: "text-[#B04040]",
  },
};

const getStatus = (status) =>
  STATUS_STYLES[status] || STATUS_STYLES.Pending;

/* ============================================================
   FORMATTERS
============================================================ */

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN").format(price || 0);

/* ============================================================
   ORDERS TAB
============================================================ */

export default function OrdersTab({
  orders = [],
  loading,
  router,
}) {
  return (
    <div>
      <SectionHeader
        title="My Orders"
        subtitle={`${orders.length} order${
          orders.length !== 1 ? "s" : ""
        } placed`}
      />

      {loading ? (
        <OrdersSkeleton />
      ) : orders.length === 0 ? (
        <EmptyState
          icon="📦"
          title="No Orders Yet"
          message="You haven't placed any orders."
          actionLabel="Shop Now"
          onAction={() => router.push("/products")}
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              router={router}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  title,
  subtitle,
}) {
  return (
    <div
      className="
        mb-5
        flex
        flex-col
        justify-between
        gap-4
        border-b
        border-[#C5A880]/10
        pb-4
        sm:flex-row
        sm:items-end
      "
    >
      <div>
        <h2
          className="
            font-serif
            text-xl
            font-normal
            uppercase
            tracking-[0.06em]
            text-[#121212]
            md:text-2xl
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            text-[11px]
            tracking-[0.1em]
            text-gray-400
          "
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   ORDER CARD
============================================================ */

function OrderCard({
  order,
  router,
}) {
  const status = order?.orderStatus || "Pending";
  const st = getStatus(status);

  const items = Array.isArray(order?.products)
    ? order.products
    : [];

  const totalItems = items.reduce(
    (total, item) =>
      total + (Number(item?.quantity) || 0),
    0
  );

  return (
    <div
      className="
        border
        border-[#C5A880]/15
        bg-white
        p-5
        shadow-sm
        transition
        hover:border-[#C5A880]/30
        md:p-6
      "
    >
      {/* ======================================================
          TOP ROW
      ====================================================== */}

      <div
        className="
          mb-5
          flex
          items-start
          justify-between
          gap-4
        "
      >
        {/* ORDER ID + DATE */}

        <div>
          <p
            className="
              mb-1
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-gray-400
            "
          >
            Order
          </p>

          <p className="text-sm tracking-wide">
            #
            {order?._id
              ?.slice(-8)
              .toUpperCase() || "N/A"}
          </p>

          <p className="mt-1 text-[10px] text-gray-400">
            {formatDate(order?.createdAt)}
          </p>
        </div>

        {/* STATUS */}

        <div
          className={`
            flex
            items-center
            gap-2
            px-3
            py-1.5
            ${st.bg}
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${st.dot}
            `}
          />

          <span
            className={`
              text-[9px]
              uppercase
              tracking-[0.2em]
              ${st.text}
            `}
          >
            {status}
          </span>
        </div>
      </div>

      {/* ======================================================
          PRODUCTS PREVIEW
      ====================================================== */}

      {items.length > 0 && (
        <div
          className="
            mb-5
            border-t
            border-[#C5A880]/10
            pt-4
          "
        >
          <div className="space-y-3">
            {items.slice(0, 2).map((item, index) => {
              const product = item?.product || {};

              return (
                <div
                  key={item?._id || index}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  {/* PRODUCT NAME */}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-gray-700">
                      {product?.name || "Product"}
                    </p>

                    {product?.brand && (
                      <p className="mt-0.5 text-[9px] text-gray-400">
                        {product.brand}
                      </p>
                    )}
                  </div>

                  {/* QUANTITY */}

                  <span className="shrink-0 text-[10px] text-gray-400">
                    × {item?.quantity || 1}
                  </span>

                  {/* ITEM PRICE */}

                  <span className="shrink-0 text-xs text-gray-600">
                    ₹{formatPrice(item?.price)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* MORE PRODUCTS */}

          {items.length > 2 && (
            <p className="mt-3 text-[9px] uppercase tracking-[0.15em] text-[#A68A5E]">
              + {items.length - 2} more product
              {items.length - 2 !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {/* ======================================================
          BOTTOM SUMMARY
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          border-[#C5A880]/10
          pt-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* ITEM COUNT */}

        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400">
            Items
          </p>

          <p className="mt-1 text-xs text-gray-600">
            {totalItems} item
            {totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        {/* TOTAL */}

        <div className="sm:ml-auto sm:mr-5">
          <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400">
            Total
          </p>

          <p className="mt-1 text-sm font-medium text-[#C5A880]">
            ₹{formatPrice(order?.totalPrice)}
          </p>
        </div>

        {/* VIEW DETAILS */}

        <button
          type="button"
          onClick={() =>
            router.push(
              `/user/orders/${order?._id}`
            )
          }
          className="
            border
            border-[#121212]
            px-5
            py-2.5
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-[#121212]
            transition
            hover:bg-[#121212]
            hover:text-[#C5A880]
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   SKELETON
============================================================ */

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="
            animate-pulse
            border
            border-[#C5A880]/10
            bg-white
            p-6
          "
        >
          <div className="mb-6 flex justify-between">
            <div>
              <div className="mb-2 h-2 w-12 rounded bg-gray-200" />
              <div className="h-3 w-28 rounded bg-gray-200" />
            </div>

            <div className="h-6 w-20 rounded bg-gray-200" />
          </div>

          <div className="space-y-3">
            <div className="h-3 w-2/3 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
          </div>

          <div className="mt-5 flex justify-between border-t border-gray-100 pt-4">
            <div className="h-3 w-16 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) {
  return (
    <div
      className="
        border
        border-[#C5A880]/15
        bg-white
        px-6
        py-16
        text-center
      "
    >
      <p className="mb-5 text-5xl">
        {icon}
      </p>

      <h3
        className="
          mb-3
          font-serif
          text-2xl
          font-light
          uppercase
          tracking-[0.08em]
        "
      >
        {title}
      </h3>

      <p
        className="
          mx-auto
          mb-8
          max-w-sm
          text-xs
          leading-7
          text-gray-400
        "
      >
        {message}
      </p>

      {actionLabel && (
        <button
          onClick={onAction}
          className="
            bg-[#121212]
            px-8
            py-3
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-[#C5A880]
            transition
            hover:bg-[#C5A880]
            hover:text-[#121212]
          "
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}



