import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const customerColumns = ({

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
       
        <span className="font-medium text-[#5C4033]">
          {getValue()}
        </span>
      </div>
    ),
  }),

  columnHelper.accessor("mobileNumber", {
    header: "Mobile",
  }),

  columnHelper.accessor("email", {
    header: "Email",
  }),

];