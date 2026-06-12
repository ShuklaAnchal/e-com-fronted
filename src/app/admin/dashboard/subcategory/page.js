"use client";

import { useDispatch } from "react-redux";

import Modal from "@/app/component/resuable/model";
import Table from "@/app/component/table/table";
import SubcategoryForm from "@/app/component/forms//subcategoryForm";
import useModal from "@/app/hooks/useModalHook";
import { useSubcategories } from "@/app/hooks/subcategoryHook";

import { subcategoryColumns } from "@/app/colums/subcategoryColumns";

import { deleteCategory } from "@/app/store/action/categoryAction";

export default function SubcatgoryPage() {
  const dispatch = useDispatch();

  const { modal, openModal, closeModal } = useModal();

  const { Subcategories, loading, refreshSubcategories } = useSubcategories();

  const handleEdit = (category) => {
    console.log({ category });

    openModal(
      "Edit Category",
      <SubcategoryForm
        editData={category}
        onClose={closeModal}
        refreshSubcategories={refreshSubcategories}
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

      await refreshCategories();

      alert("Category deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = subcategoryColumns({
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDelete,
  });

  if (loading) {
    return <div className="p-8">Loading Categories...</div>;
  }

  return (
    <div className="p-8 bg-[#F8F4F1] h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#5C4033]">
          Subcategory Management
        </h1>

        <button
          onClick={() =>
            openModal(
              "Create Subcategory",
              <SubcategoryForm
                editData={null}
                onClose={closeModal}
                refreshSubcategories={refreshSubcategories}
              />,
            )
          }
          className="bg-[#5C4033] text-white px-5 py-2 rounded-lg"
        >
          + New Subcategory
        </button>
      </div>

      {/* Table */}

      <Table columns={columns} data={Subcategories} />

      {/* Modal */}

      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal>
    </div>
  );
}
