"use client";

import { useRouter } from "next/navigation";

import { getMediaUrl } from "@/app/utils/mediaUrl";

/* ============================================================
   HELPERS
============================================================ */

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN").format(
    price || 0
  );

/* ============================================================
   WISHLIST TAB
============================================================ */

export default function WishlistTab({
  wishlist,
  loading,
  pagination,
}) {
  const router = useRouter();

  return (
    <div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHeader
        title="My Wishlist"
        subtitle={`${wishlist.length} ${
          wishlist.length === 1
            ? "item"
            : "items"
        } saved`}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {loading ? (
        <WishlistSkeleton />
      ) : wishlist.length === 0 ? (
        <EmptyState
          icon="♡"
          title="Your Wishlist Is Empty"
          message="Save your favorite products here and they will appear in your wishlist."
          actionLabel="Shop Now"
          onAction={() =>
            router.push("/products")
          }
        />
      ) : (
        <div className="space-y-4">

          {wishlist.map((item) => (
            <WishlistCard
              key={item._id}
              item={item}
            />
          ))}

        </div>
      )}

      {/* =====================================================
          PAGINATION INFO
      ===================================================== */}

      {pagination &&
        pagination.totalPages > 1 && (
          <div className="mt-6 text-center">

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-gray-400
              "
            >
              Page{" "}
              {pagination.currentPage}{" "}
              of{" "}
              {pagination.totalPages}
            </p>

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
   WISHLIST CARD
============================================================ */

function WishlistCard({
  item,
}) {
  const router = useRouter();

  const product = item?.productId;
  const variant = item?.variantId;

  const productName =
    product?.name ||
    "Product";

  const slug = product?.slug;

  const description =
    product?.shortDescription ||
    "";

  const price =
    variant?.pricing?.sellingPrice ||
    variant?.pricing?.mrp ||
    0;

  const mrp =
    variant?.pricing?.mrp ||
    0;

  /* =========================================================
     PRODUCT MEDIA
  ========================================================= */

  const productMedia =
    item?.productMedia || [];

  /*
    First priority:
    primary image

    Second:
    any image

    Third:
    first media
  */

  const primaryMedia =
    productMedia.find(
      (media) =>
        media?.isPrimary === true &&
        media?.mediaType === "image"
    ) ||
    productMedia.find(
      (media) =>
        media?.mediaType === "image"
    ) ||
    productMedia[0];

  const rawImage =
    typeof primaryMedia === "string"
      ? primaryMedia
      : primaryMedia?.url;

  const image =
    getMediaUrl(rawImage) ||
    "/placeholder-product.png";

  /* =========================================================
     VIEW PRODUCT
  ========================================================= */

  const handleViewProduct = () => {
    if (slug) {
      router.push(
        `/products/${slug}`
      );
      return;
    }

    if (product?._id) {
      router.push(
        `/products/${product._id}`
      );
    }
  };

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

      <div className="flex gap-5">

        {/* =================================================
            IMAGE
        ================================================= */}

        <button
          type="button"
          onClick={handleViewProduct}
          className="
            relative
            h-28
            w-24
            shrink-0
            overflow-hidden
            bg-[#F7F3ED]
            md:h-36
            md:w-32
          "
        >

          <img
            src={image}
            alt={productName}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-300
              hover:scale-105
            "
            onError={(e) => {
              console.error(
                "WISHLIST IMAGE FAILED:",
                e.currentTarget.src
              );

              e.currentTarget.onerror =
                null;

              e.currentTarget.src =
                "/placeholder-product.png";
            }}
          />

        </button>

        {/* =================================================
            DETAILS
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
            justify-between
          "
        >

          <div>

            <div
              className="
                mb-2
                flex
                items-start
                justify-between
                gap-3
              "
            >

              <div>

                <p
                  className="
                    mb-1
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-[#C5A880]
                  "
                >
                  Wishlist
                </p>

                <h3
                  className="
                    font-serif
                    text-lg
                    text-[#121212]
                    md:text-xl
                  "
                >
                  {productName}
                </h3>

              </div>

              <span className="text-2xl text-[#C5A880]">
                ♥
              </span>

            </div>

            {/* DESCRIPTION */}

            {description && (
              <p
                className="
                  mt-2
                  line-clamp-2
                  text-xs
                  leading-6
                  text-gray-400
                "
              >
                {description}
              </p>
            )}

            {/* SKU */}

            {variant?.sku && (
              <p
                className="
                  mt-2
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-gray-400
                "
              >
                SKU: {variant.sku}
              </p>
            )}

          </div>

          {/* =================================================
              PRICE + ACTION
          ================================================= */}

          <div
            className="
              mt-5
              flex
              flex-col
              justify-between
              gap-4
              sm:flex-row
              sm:items-end
            "
          >

            {/* PRICE */}

            <div>

              <p
                className="
                  text-lg
                  font-medium
                  text-[#C5A880]
                "
              >
                ₹{formatPrice(price)}
              </p>

              {mrp > price && (
                <p
                  className="
                    text-xs
                    text-gray-400
                    line-through
                  "
                >
                  ₹{formatPrice(mrp)}
                </p>
              )}

            </div>

            {/* BUTTON */}

            <button
              type="button"
              onClick={handleViewProduct}
              className="
                bg-[#121212]
                px-6
                py-3
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#C5A880]
                transition
                hover:bg-[#C5A880]
                hover:text-[#121212]
              "
            >
              View Product
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

/* ============================================================
   SKELETON
============================================================ */

function WishlistSkeleton() {
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
            p-5
            md:p-6
          "
        >

          <div className="flex gap-5">

            <div
              className="
                h-28
                w-24
                shrink-0
                rounded
                bg-gray-200
                md:h-36
                md:w-32
              "
            />

            <div className="flex-1">

              <div
                className="
                  mb-3
                  h-2
                  w-20
                  rounded
                  bg-gray-200
                "
              />

              <div
                className="
                  mb-4
                  h-5
                  w-48
                  rounded
                  bg-gray-200
                "
              />

              <div
                className="
                  mb-2
                  h-3
                  w-full
                  max-w-md
                  rounded
                  bg-gray-200
                "
              />

              <div
                className="
                  mt-6
                  h-4
                  w-24
                  rounded
                  bg-gray-200
                "
              />

            </div>

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