
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const paymentColoum = () => [
  // SR NO
  columnHelper.display({
    id: "srNo",
    header: "Sr No",
    cell: ({ row }) => row.index + 1,
  }),

  // PAYMENT ID
  columnHelper.accessor("_id", {
    header: "Payment ID",
    cell: ({ getValue }) => (
      <span
        className="font-medium text-gray-700"
        title={getValue()}
      >
        {getValue()?.slice(-8) || "-"}
      </span>
    ),
  }),

  // ORDER ID
  columnHelper.accessor("orderId", {
    header: "Order ID",
    cell: ({ getValue }) => (
      <span
        className="text-blue-600 font-medium"
        title={getValue()}
      >
        {getValue()?.slice(-8) || "-"}
      </span>
    ),
  }),

  // PROVIDER
  columnHelper.accessor("provider", {
    header: "Provider",
    cell: ({ getValue }) => (
      <span className="capitalize font-medium">
        {getValue() || "-"}
      </span>
    ),
  }),

  // PROVIDER ORDER ID
  columnHelper.accessor("providerOrderId", {
    header: "Provider Order ID",
    cell: ({ getValue }) => (
      <span
        className="text-sm text-gray-600"
        title={getValue()}
      >
        {getValue() || "-"}
      </span>
    ),
  }),


  // AMOUNT
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: ({ getValue, row }) => {
      const amount = getValue();

      const numericAmount =
        Number(amount?.$numberDecimal ?? amount ?? 0) / 100;

      return (
        <span className="font-semibold text-gray-800">
          {row.original.currency === "INR" ? "₹" : ""}
          {numericAmount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          {row.original.currency !== "INR" &&
            ` ${row.original.currency || ""}`}
        </span>
      );
    },
  }),

  // PAYMENT METHOD
  columnHelper.accessor("method", {
    header: "Method",
    cell: ({ getValue }) => (
      <span className="capitalize">
        {getValue() || "-"}
      </span>
    ),
  }),

  // STATUS
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue()?.toLowerCase();

      const statusClasses = {
        success: "bg-green-100 text-green-700",
        paid: "bg-green-100 text-green-700",
        completed: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        failed: "bg-red-100 text-red-700",
        cancelled: "bg-gray-100 text-gray-600",
        refunded: "bg-purple-100 text-purple-700",
      };

      return (
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
            statusClasses[status] ||
            "bg-gray-100 text-gray-600"
          }`}
        >
          {status
            ? status.charAt(0).toUpperCase() + status.slice(1)
            : "Unknown"}
        </span>
      );
    },
  }),

  // PROVIDER PAYMENT ID
  columnHelper.accessor("providerPaymentId", {
    header: "Provider Payment ID",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600">
        {getValue() || "-"}
      </span>
    ),
  }),

  // TRANSACTION DATE
  columnHelper.accessor("transactionDate", {
    header: "Transaction Date",
    cell: ({ getValue }) => {
      const date = getValue();

      if (!date) return "-";

      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) return "-";

      return (
        <div className="whitespace-nowrap">
          <p className="text-sm font-medium">
            {parsedDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-xs text-gray-500">
            {parsedDate.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      );
    },
  }),

  // CREATED AT
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: ({ getValue }) => {
      const date = getValue();

      if (!date) return "-";

      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) return "-";

      return (
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {parsedDate.toLocaleDateString("en-IN")}
        </span>
      );
    },
  }),
];
