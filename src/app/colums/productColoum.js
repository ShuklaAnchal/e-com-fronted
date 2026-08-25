import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import ActionDropdown from "../component/table/ActionDropdown";

import { getMediaUrl } from "@/app/utils/mediaUrl";

const columnHelper = createColumnHelper();

export const productColumns = ({
  onEdit,
  onView,
  onDelete,
  onAddVariant,
}) => [
  // ==========================================
  // SR NO
  // ==========================================

  columnHelper.display({
    id: "srNo",
    header: "Sr No",
    cell: ({ row }) => row.index + 1,
  }),

  // ==========================================
  // PRODUCT
  // ==========================================

  columnHelper.accessor("name", {
    header: "Product",
    enableSorting: true,

    cell: ({ row, getValue }) => {
      const product = row.original;

      const primaryImage =
        product.media?.find(
          (item) =>
            item.mediaType === "image" && item.isPrimary,
        ) ||
        product.media?.find(
          (item) => item.mediaType === "image",
        );

      // Centralized media URL
      const imageUrl = getMediaUrl(primaryImage?.url);

      return (
        <div className="flex items-center gap-3 min-w-[220px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={getValue() || "Product"}
              className="w-12 h-12 rounded-md object-cover border"
            />
          ) : (
            <div className="w-12 h-12 rounded-md border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}

          <div className="min-w-0">
            <Link
              href={`/admin/dashboard/product/${product._id}`}
              className="font-medium text-[#5C4033] hover:underline cursor-pointer line-clamp-1"
            >
              {getValue()}
            </Link>

            <p className="text-xs text-gray-500">
              {product.slug}
            </p>
          </div>
        </div>
      );
    },
  }),

  // ==========================================
  // BRAND
  // ==========================================

  columnHelper.accessor("brand", {
    header: "Brand",

    cell: ({ getValue }) => (
      <span className="font-medium">
        {getValue() || "-"}
      </span>
    ),
  }),

  // ==========================================
  // CATEGORY
  // ==========================================

  columnHelper.display({
    id: "category",

    header: "Category",

    cell: ({ row }) => {
      const product = row.original;

      return (
        <div>
          <p className="font-medium">
            {product.category?.name || "-"}
          </p>

          {product.subCategory?.name && (
            <p className="text-xs text-gray-500">
              {product.subCategory.name}
            </p>
          )}
        </div>
      );
    },
  }),

  // ==========================================
  // PRICE
  // ==========================================

  columnHelper.display({
    id: "price",

    header: "Price",

    cell: ({ row }) => {
      const variants = row.original.variants || [];

      if (!variants.length) {
        return (
          <span className="text-gray-400">
            No variant
          </span>
        );
      }

      const defaultVariant =
        variants.find(
          (variant) => variant.isDefault,
        ) || variants[0];

      const pricing = defaultVariant?.pricing;

      if (!pricing) {
        return "-";
      }

      return (
        <div>
          <p className="font-medium">
            ₹
            {Number(
              pricing.sellingPrice || 0,
            ).toLocaleString("en-IN")}
          </p>

          {pricing.mrp &&
            Number(pricing.mrp) >
              Number(pricing.sellingPrice) && (
              <p className="text-xs text-gray-400 line-through">
                ₹
                {Number(
                  pricing.mrp,
                ).toLocaleString("en-IN")}
              </p>
            )}
        </div>
      );
    },
  }),

  // ==========================================
  // STOCK
  // ==========================================

  columnHelper.display({
    id: "stock",

    header: "Stock",

    cell: ({ row }) => {
      const variants = row.original.variants || [];

      const totalStock = variants.reduce(
        (total, variant) =>
          total +
          Number(
            variant.inventory?.stockQuantity || 0,
          ),
        0,
      );

      return (
        <span
          className={
            totalStock > 0
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {totalStock}
        </span>
      );
    },
  }),

  // ==========================================
  // VARIANTS
  // ==========================================

  columnHelper.display({
    id: "variants",

    header: "Variants",

    cell: ({ row }) => {
      const variants = row.original.variants || [];

      return (
        <span className="px-2 py-1 rounded-full bg-gray-100 text-sm">
          {variants.length}
        </span>
      );
    },
  }),

  // ==========================================
  // STATUS
  // ==========================================

  columnHelper.accessor("status", {
    header: "Status",

    cell: ({ getValue }) => {
      const status = getValue();

      const statusClasses = {
        published:
          "bg-green-100 text-green-700",

        draft:
          "bg-yellow-100 text-yellow-700",

        inactive:
          "bg-red-100 text-red-700",
      };

      return (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            statusClasses[status] ||
            "bg-gray-100 text-gray-600"
          }`}
        >
          {status || "Unknown"}
        </span>
      );
    },
  }),

  // ==========================================
  // ACTIONS
  // ==========================================

  columnHelper.display({
    id: "actions",

    header: () => (
      <div className="flex justify-center">
        Action
      </div>
    ),

    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionDropdown
          onEdit={() => onEdit(row.original)}
          onView={() => onView(row.original)}
          onDelete={() => onDelete(row.original)}
          onAddVariant={() =>
            onAddVariant(row.original)
          }
        />
      </div>
    ),
  }),
];