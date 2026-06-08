"use client";

import Modal from "@/app/component/resuable/model";
import CategoryForm from "@/app/component/forms/categoryForm";
import Table from "@/app/component/table/table";

import useModal from "@/app/hooks/useModalHook";
import { useCategories } from "@/app/hooks/catgeoryHook"

import { categoryColumns } from "@/app/colums/categoryColumns";

export default function CategoryPage() {
  const { modal, openModal, closeModal } = useModal();

  const {
    categories,
    loading,
    refreshCategories,
  } = useCategories();

  if (loading) {
    return (
      <div className="p-8">
        Loading Categories...
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#F8F4F1] h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#5C4033]">
          Product Management
        </h1>

        <button
          onClick={() =>
            openModal(
              "Create Category",
              <CategoryForm
                onClose={closeModal}
                refreshCategories={refreshCategories}
              />
            )
          }
          className="bg-[#5C4033] text-white px-5 py-2 rounded-lg"
        >
          +New Product
        </button>
      </div>

      {/* Table */}
      <Table
        columns={categoryColumns}
        data={categories}
      />

      {/* Global Modal */}
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        onClose={closeModal}
      >
        {modal.content}
      </Modal>
    </div>
  );
}