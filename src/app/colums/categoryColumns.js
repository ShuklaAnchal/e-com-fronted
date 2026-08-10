
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";

import ActionDropdown from "../component/table/ActionDropdown";

const columnHelper = createColumnHelper();

export const categoryColumns = ({
  onEdit,
  onView,
  onDelete,
}) => [
  // ---------------------------------------------
  // SR NO
  // ---------------------------------------------
  columnHelper.display({
    id: "srNo",
    header: "Sr No",
    cell: ({ row }) => row.index + 1,
  }),

  // ---------------------------------------------
  // CATEGORY
  // ---------------------------------------------
  columnHelper.accessor("name", {
    header: "Category",
    enableSorting: true,

    cell: ({ row, getValue }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-3">

          {/* Category Image */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-gray-100">
            {category?.image ? (
              <Image
                src={category.image}
                alt={category?.name || "Category"}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                N/A
              </div>
            )}
          </div>

          {/* Category Name */}
          <Link
            href={`/admin/dashboard/category/${category?._id}`}
            className="font-medium text-[#5C4033] transition hover:underline"
          >
            {getValue() || "-"}
          </Link>

        </div>
      );
    },
  }),

  // ---------------------------------------------
  // SLUG
  // ---------------------------------------------
  columnHelper.accessor("slug", {
    header: "Slug",
    enableSorting: true,

    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600">
        {getValue() || "-"}
      </span>
    ),
  }),

  // ---------------------------------------------
  // DESCRIPTION
  // ---------------------------------------------
  columnHelper.accessor("description", {
    header: "Description",

    cell: ({ getValue }) => (
      <p className="max-w-xs truncate text-sm text-gray-600">
        {getValue() || "-"}
      </p>
    ),
  }),

  // ---------------------------------------------
  // ACTIONS
  // ---------------------------------------------
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
        />
      </div>
    ),
  }),
];

