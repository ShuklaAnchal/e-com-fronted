"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const Table = ({
  columns,
  data,
  pagination,
  onNextPage,
  onPreviousPage,
  loading,
}) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block py-1.5 rounded-[10px] border-[2px] mt-3 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-white">
            {table.getHeaderGroups().map((headerGroup, groupIndex) => (
              <tr key={headerGroup.id} className="border-b border-[#DCDCDD]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={`${groupIndex}_${header.id}`}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-3 text-[15px] font-semibold text-[#05004E] cursor-pointer select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}

                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  No attributes found
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-[#DCDCDD]">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={`${row.id}_${cell.id}`}
                      className="h-12 px-2 text-[12px] text-[#05004E] align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Backend Pagination */}
    {/* Desktop Pagination */}
<div className="hidden md:flex items-center justify-between px-3 mt-3">
  <span className="text-sm text-[#05004E]">
    Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
  </span>

  <div className="flex gap-2">
    <button
      type="button"
      onClick={onPreviousPage}
      disabled={loading || !pagination || pagination.currentPage <= 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    <button
      type="button"
      onClick={onNextPage}
      disabled={
        loading ||
        !pagination ||
        pagination.currentPage >= pagination.totalPages
      }
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</div>
      </div>

      {/* Mobile Cards */}
{/* Mobile Pagination */}
<div className="md:hidden flex items-center justify-between gap-3 mt-3">
  <span className="text-sm text-[#05004E]">
    Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
  </span>

  <div className="flex gap-2">
    <button
      type="button"
      onClick={onPreviousPage}
      disabled={loading || !pagination || pagination.currentPage <= 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
      aria-label="Previous page"
    >
      {"<<"}
    </button>

    <button
      type="button"
      onClick={onNextPage}
      disabled={
        loading ||
        !pagination ||
        pagination.currentPage >= pagination.totalPages
      }
      className="px-3 py-1 border rounded disabled:opacity-50"
      aria-label="Next page"
    >
      {">>"}
    </button>
  </div>
</div>
    </>
  );
};

export default Table;
