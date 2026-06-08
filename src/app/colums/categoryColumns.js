import { createColumnHelper } from "@tanstack/react-table";
import ActionDropdown from "../component/table/ActionDropdown";

const columnHelper = createColumnHelper();

export const categoryColumns = [
  columnHelper.display({
    id: "srNo",
    header: "Sr No",
    cell: ({ row }) => row.index + 1,
  }),

  columnHelper.accessor("name", {
    header: "Category",
    enableSorting: true,
    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-3">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${row.original.image}`}
          alt={getValue()}
          className="w-10 h-10 rounded-md object-cover border"
        />

        <span className="font-medium text-[#5C4033]">
          {getValue()}
        </span>
      </div>
    ),
  }),

  columnHelper.accessor("slug", {
    header: "Slug",
  }),

  columnHelper.accessor("description", {
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
      <ActionDropdown category={row.original} />
    </div>
  ),
})
];