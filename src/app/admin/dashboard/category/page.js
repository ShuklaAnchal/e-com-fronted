"use client";

import { useDispatch } from "react-redux";

import Modal from "@/app/component/resuable/model";
import Table from "@/app/component/table/table";
import CategoryForm from "@/app/component/forms/categoryForm";
import useModal from "@/app/hooks/useModalHook";
import { useCategories } from "@/app/hooks/catgeoryHook";

import { categoryColumns } from "@/app/colums/categoryColumns";

import { deleteCategory } from "@/app/store/action/categoryAction";

export default function CatgoryPage() {
  const dispatch = useDispatch();

  const { modal, openModal, closeModal } = useModal();

  const {  categories,
    loading,
    refreshCategories, } = useCategories();

  const handleEdit = (category) => {
    openModal(
      "Edit Subcategory",
      <CategoryForm
        editData={category}
        onClose={closeModal}
        refreshSubCategories={refreshCategories}
      />,
    );
  };

  const handleView = (category) => {
    console.log("View Category:", category);
  };

  const handleDelete = async (category) => {
    const confirmDelete = window.confirm(`Delete ${category.name}?`);

    if (!confirmDelete) return;

    try {
      await dispatch(deleteCategory(category._id));

      // Correct refresh function
      await refreshCategories();

      alert("Category deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const columns = categoryColumns({
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDelete,
  });

  if (loading) {
    return <div className="p-8">Loading Categories...</div>;
  }

  return (
    <div className="p-8 bg-[#F8F4F1] h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#5C4033]">
          Category Management
        </h1>

        <button
          onClick={() =>
            openModal(
              "Create Subcategory",
              <CategoryForm
                editData={null}
                onClose={closeModal}
                refreshCategories={refreshCategories}
              />,
            )
          }
          className="bg-[#5C4033] text-white px-5 py-2 rounded-lg cursor-pointer"
        >
          + New Category
        </button>
      </div>

      <Table columns={columns} data={categories || []} />

      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal>
    </div>
  );
}
