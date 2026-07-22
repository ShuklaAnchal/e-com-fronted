import { createColumnHelper } from "@tanstack/react-table";
import ActionDropdown from "../component/table/ActionDropdown";

const columnHelper = createColumnHelper();

const Badge = ({ value, color }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}
  >
    {value}
  </span>
);

export const attributeColumns = ({
  onEdit,
  onView,
  onDelete,
}) => [
  // Sr No
  columnHelper.display({
    id: "srNo",
    header: "Sr No",
    cell: ({ row }) => row.index + 1,
  }),

  // Attribute Name
  columnHelper.accessor("name", {
    header: "Attribute Name",
    enableSorting: true,

    cell: ({ getValue }) => (
      <span className="font-medium text-[#5C4033]">
        {getValue()}
      </span>
    ),
  }),

  // Slug
  columnHelper.accessor("slug", {
    header: "Slug",
  }),

  // Category
  columnHelper.accessor("categoryId.name", {
    header: "Category",

    cell: ({ row }) =>
      row.original.categoryId?.name || "-",
  }),

  // Sub Category
  columnHelper.accessor("subCategoryId.name", {
    header: "Sub Category",

    cell: ({ row }) =>
      row.original.subCategoryId?.name || "-",
  }),

  // Field Type
  columnHelper.accessor("fieldType", {
    header: "Field Type",

    cell: ({ getValue }) => (
      <Badge
        value={getValue()}
        color="bg-blue-100 text-blue-700"
      />
    ),
  }),

  // Required
  columnHelper.accessor("requiredField", {
    header: "Required",

    cell: ({ getValue }) =>
      getValue() ? (
        <Badge
          value="Yes"
          color="bg-red-100 text-red-700"
        />
      ) : (
        <Badge
          value="No"
          color="bg-gray-100 text-gray-700"
        />
      ),
  }),

  // Variant Attribute
  columnHelper.accessor("isVariantAttribute", {
    header: "Variant",

    cell: ({ getValue }) =>
      getValue() ? (
        <Badge
          value="Yes"
          color="bg-purple-100 text-purple-700"
        />
      ) : (
        <Badge
          value="No"
          color="bg-gray-100 text-gray-700"
        />
      ),
  }),

  // Filterable
  columnHelper.accessor("filterable", {
    header: "Filter",

    cell: ({ getValue }) =>
      getValue() ? (
        <Badge
          value="Yes"
          color="bg-green-100 text-green-700"
        />
      ) : (
        <Badge
          value="No"
          color="bg-gray-100 text-gray-700"
        />
      ),
  }),

  // Searchable
  columnHelper.accessor("searchable", {
    header: "Search",

    cell: ({ getValue }) =>
      getValue() ? (
        <Badge
          value="Yes"
          color="bg-green-100 text-green-700"
        />
      ) : (
        <Badge
          value="No"
          color="bg-gray-100 text-gray-700"
        />
      ),
  }),

  // Status
  columnHelper.accessor("isActive", {
    header: "Status",

    cell: ({ getValue }) =>
      getValue() ? (
        <Badge
          value="Active"
          color="bg-green-100 text-green-700"
        />
      ) : (
        <Badge
          value="Inactive"
          color="bg-red-100 text-red-700"
        />
      ),
  }),

  // Sort Order
  columnHelper.accessor("sortOrder", {
    header: "Sort Order",
  }),

  // Created Date
  columnHelper.accessor("createdAt", {
    header: "Created",

    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleDateString("en-IN"),
  }),

  // Actions
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