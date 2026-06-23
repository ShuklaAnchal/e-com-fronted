import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import ActionDropdown from "../component/table/ActionDropdown";

const columnHelper = createColumnHelper();

export const productColumns = ({
  onEdit,
  onView,
  onDelete,
}) => [
  columnHelper.display({
    id: "srNo",
    header: "Sr No",
    cell: ({ row }) => row.index + 1,
  }),

  columnHelper.accessor("name", {
    header: "Name",
    enableSorting: true,

    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-3">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${row.original.image}`}
          alt={getValue()}
          className="w-10 h-10 rounded-md object-cover border"
        />

        <Link
          href={`/admin/dashboard/product/${row.original._id}`}
          className="font-medium text-[#5C4033] hover:underline cursor-pointer"
        >
          {getValue()}
        </Link>
      </div>
    ),
  }),

  columnHelper.accessor("slug", {
    header: "Slug",
  }),

  columnHelper.accessor("shortDescription", {
    header: "Description",
  }),

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