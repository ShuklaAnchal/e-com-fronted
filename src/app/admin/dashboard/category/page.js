"use client";

import React, { useEffect, useRef, useState } from "react";
import Table from "@/app/component/table/table";
import { createColumnHelper } from "@tanstack/react-table";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CategoryForm from "@/app/component/forms/categoryForm";
import { asyncfetchcategory } from "@/app/store/action/categoryAction";
import { useDispatch } from "react-redux";

const columnHelper = createColumnHelper();

export default function CategoryPage() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [category, setCategory] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(true);
  const [tableData, setTableData] = useState([]);
  const dropdownRefs = useRef({});
  const searchRef = useRef();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const refreshCategories = async () => {
    try {
      const result = await dispatch(asyncfetchcategory());

      if (result && result.categories) {
        setCategory(result.categories);
      }
    } catch (error) {
      console.error("Error refreshing product data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(asyncfetchcategory());

        if (result && result.categories) {
          setCategory(result.categories);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log({ category });

  const columns = [
    columnHelper.accessor("_id", {
      header: "ID",
    }),

    columnHelper.accessor("name", {
      header: "Category",
      enableSorting: true,
      cell: ({ row, getValue }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.image}
            alt={getValue()}
            className="w-10 h-10 rounded-md object-cover border"
          />

          <span className="font-medium text-[#5C4033]">{getValue()}</span>
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
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => {
        const rowId = row.original._id; // or id

        return (
          <div className="relative flex justify-center">
            <button
              onClick={() => setOpenMenu(openMenu === rowId ? null : rowId)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <HiOutlineDotsVertical size={18} />
            </button>

            {openMenu === rowId && (
              <div className="absolute right-10 top-6 z-50 w-20 bg-white border rounded-lg shadow-lg">
                <button className="block w-full px-4 py-2 text-left">
                  Edit
                </button>

                <button className="block w-full px-4 py-2 text-left">
                  View
                </button>

                <button className="block w-full px-4 py-2 text-left text-red-600">
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <div>
      {/* <Navbar /> */}

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
          <Table columns={columns} data={category} />
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
              <CategoryForm
                onClose={() => setShowCategoryModal(false)}
                refreshCategories={refreshCategories}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
