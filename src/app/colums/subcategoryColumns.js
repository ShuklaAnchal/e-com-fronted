import { createColumnHelper } from "@tanstack/react-table";
import ActionDropdown from "../component/table/ActionDropdown";
import { getMediaUrl } from "@/app/utils/mediaUrl";

const columnHelper = createColumnHelper();

export const subcategoryColumns = ({
  onEdit,
  onView,
  onDelete,
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
  // SUBCATEGORY
  // ==========================================

  columnHelper.accessor("name", {
    header: "Subcategory",
    enableSorting: true,

    cell: ({ row, getValue }) => {
      const subcategory = row.original;

      // Convert stored relative path to complete URL
      const imageUrl = getMediaUrl(subcategory?.image);

      return (
        <div className="flex items-center gap-3">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={getValue() || "Subcategory"}
              className="w-10 h-10 rounded-md object-cover border"
            />
          ) : (
            <div className="w-10 h-10 rounded-md border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
              N/A
            </div>
          )}

          <span className="font-medium text-[#5C4033]">
            {getValue() || "-"}
          </span>
        </div>
      );
    },
  }),

  // ==========================================
  // CATEGORY
  // ==========================================

  columnHelper.accessor("categoryId.name", {
    header: "Category",
  }),

  // ==========================================
  // SLUG
  // ==========================================

  columnHelper.accessor("slug", {
    header: "Slug",
  }),

  // ==========================================
  // DESCRIPTION
  // ==========================================

  columnHelper.accessor("description", {
    header: "Description",
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
        />
      </div>
    ),
  }),
];