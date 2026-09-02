import { createColumnHelper } from "@tanstack/react-table";
import ActionDropdown from "../component/table/ActionDropdown";
import Link from "next/link";

const columnHelper = createColumnHelper();

export const orderColumns = ({
  //   onEdit,
  onView,
  OnHandle,
  //   onDelete,
}) => [
  columnHelper.display({
    id: "srNo",
    header: "Sr No",
    cell: ({ row }) => row.index + 1,
  }),

  columnHelper.accessor("user.name", {
    header: "Customer Name",
    enableSorting: true,

    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-3">
        <Link href={`/admin/dashboard/orders/${row.original._id}`}>
        <span className="font-medium text-[#5C4033]">{getValue()}</span>
        </Link>
      </div>
    ),
  }),
  columnHelper.accessor("user.email", {
    header: "Email",
  }),

  columnHelper.accessor("totalPrice", {
    header: "Amount",
  }),

  columnHelper.accessor("orderStatus", {
    header: "Status",
  }),

  columnHelper.accessor("paymentStatus", {
    header: "Payment Status",
  }),

  columnHelper.display({
    id: "actions",

    header: () => <div className="flex justify-center">Action</div>,

    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionDropdown
        //   onEdit={() => onEdit(row.original)}
          onView={() => onView(row.original)}
          OnHandle={()=>OnHandle(row.original)}
        //   onDelete={() => onDelete(row.original)}
        />
      </div>
    ),
  }),
];
