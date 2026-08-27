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
  STATUS_STYLES[status] ||
  STATUS_STYLES.Pending;

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN").format(
    price || 0
  );

/* ============================================================
   ORDERS TAB
============================================================ */

export default function OrdersTab({
  orders,
  loading,
  router,
}) {
  return (
    <div>

      <SectionHeader
        title="My Orders"
        subtitle={`${orders.length} order${
          orders.length !== 1
            ? "s"
            : ""
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
          onAction={() =>
            router.push("/products")
          }
        />
      ) : (
        <div className="space-y-4">

          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
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
}) {
  const st = getStatus(order.status);

  const items =
    order.items ||
    order.products ||
    [];

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
        md:p-7
      "
    >

      {/* TOP */}

      <div
        className="
          mb-5
          flex
          items-start
          justify-between
          gap-4
        "
      >

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
            Order ID
          </p>

          <p className="text-sm tracking-wide">
            #
            {order._id
              ?.slice(-8)
              .toUpperCase() ||
              "N/A"}
          </p>

        </div>

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
            {order.status}
          </span>

        </div>

      </div>

      {/* META */}

      <div
        className="
          mb-5
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-3
        "
      >

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
            Placed On
          </p>

          <p className="text-sm">
            {formatDate(
              order.createdAt
            )}
          </p>

        </div>

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
            Items
          </p>

          <p className="text-sm">
            {items.length} item
            {items.length !== 1
              ? "s"
              : ""}
          </p>

        </div>

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
            Total Amount
          </p>

          <p className="text-sm font-medium text-[#C5A880]">
            ₹
            {formatPrice(
              order.totalAmount ||
                order.total
            )}
          </p>

        </div>

      </div>

      {/* ITEMS */}

      {items.length > 0 && (
        <div
          className="
            flex
            flex-wrap
            gap-2
            border-t
            border-[#C5A880]/10
            pt-4
          "
        >

          {items
            .slice(0, 4)
            .map((item, index) => (
              <div
                key={index}
                className="
                  border
                  border-[#C5A880]/10
                  bg-[#C5A880]/5
                  px-3
                  py-2
                  text-xs
                  text-gray-600
                "
              >

                {item.productId?.name ||
                  item.name ||
                  "Product"}

                <span className="ml-2 text-[#C5A880]">
                  ×{" "}
                  {item.quantity || 1}
                </span>

              </div>
            ))}

        </div>
      )}

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
            p-7
          "
        >

          <div className="mb-7 flex justify-between">

            <div className="h-3 w-28 rounded bg-gray-200" />

            <div className="h-6 w-20 rounded bg-gray-200" />

          </div>

          <div className="grid grid-cols-3 gap-5">

            <div className="h-3 rounded bg-gray-200" />

            <div className="h-3 rounded bg-gray-200" />

            <div className="h-3 rounded bg-gray-200" />

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