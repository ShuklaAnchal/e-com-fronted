"use client";

import React, { useState } from "react";
import Navbar from "@/app/component/navbar";
import Table from "@/app/component/table";
import { createColumnHelper } from "@tanstack/react-table";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CategoryForm from "@/app/component/forms/categoryForm";

const columnHelper = createColumnHelper();

export default function CategoryPage() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const data = [
    {
      id: 1,
      name: "Luxury Sofa",
      category: "Furniture",
      descripition: "$1200",
      stock: 15,
    },
    {
      id: 2,
      name: "Dining Table",
      category: "Furniture",
      descripition: "$850",
      stock: 8,
    },
    {
      id: 3,
      name: "Office Chair",
      category: "Office",
      descripition: "$250",
      stock: 20,
    },
    {
      id: 4,
      name: "Coffee Table",
      category: "Living Room",
      descripition: "$180",
      stock: 12,
    },
    {
      id: 5,
      name: "King Bed",
      category: "Bedroom",
      descripition: "$1450",
      stock: 4,
    },
    {
      id: 6,
      name: "Wardrobe",
      category: "Bedroom",
      descripition: "$980",
      stock: 7,
    },
    {
      id: 7,
      name: "TV Unit",
      category: "Living Room",
      descripition: "$650",
      stock: 10,
    },
    {
      id: 8,
      name: "Bookshelf",
      category: "Office",
      descripition: "$320",
      stock: 14,
    },
  ];

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),

    columnHelper.accessor("name", {
      header: "Category Name",
      enableSorting: true,
      cell: (info) => (
        <span className="font-medium text-[#5C4033]">{info.getValue()}</span>
      ),
    }),

    columnHelper.accessor("category", {
      header: "Slug",
    }),

    columnHelper.accessor("descripition", {
      header: "Description",
    }),

    columnHelper.display({
      id: "actions",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            type="button"
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => console.log("Selected Row:", row.original)}
          >
            <HiOutlineDotsVertical size={18} className="text-[#5C4033]" />
          </button>
        </div>
      ),
    }),
  ];

  return (
    <div className="h-screen w-screen flex">
      <Navbar />

      <div className="flex-1 bg-[#F8F4F1] flex flex-col overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-[#5C4033]">
              Category Management
            </h1>

            <button
              onClick={() => setShowCategoryModal(true)}
              className="bg-[#5C4033] text-white px-5 py-2 rounded-lg hover:bg-[#4a3228] transition"
            >
              + New Category
            </button>
          </div>

          {/* Table */}
          <Table columns={columns} data={data} />
        </div>
      </div>

      {/* Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#5C4033]">
                Create Category
              </h2>

              <button
                onClick={() => setShowCategoryModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <CategoryForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
