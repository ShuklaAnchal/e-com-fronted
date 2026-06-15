"use client";

import { useDispatch } from "react-redux";

import Modal from "@/app/component/resuable/model";
import Table from "@/app/component/table/table";
import SubcategoryForm from "@/app/component/forms/subcategoryForm";
import useModal from "@/app/hooks/useModalHook";
import { useSubcategories } from "@/app/hooks/subcategoryHook";

import { subcategoryColumns } from "@/app/colums/subcategoryColumns";

import { deleteSubCategory } from "@/app/store/action/subcategoryAction";

export default function SubcatgoryPage() {
  const dispatch = useDispatch();

  const { modal, openModal, closeModal } = useModal();

  const { Subcategories, loading, refreshSubcategories } = useSubcategories();

  const handleEdit = (subcategory) => {
    openModal(
      "Edit Subcategory",
      <SubcategoryForm
        editData={subcategory}
        onClose={closeModal}
        refreshSubCategories={refreshSubcategories}
      />,
    );
  };

  const handleView = (subcategory) => {
    console.log("View Subcategory:", subcategory);
  };

  const handleDelete = async (subcategory) => {
    const confirmDelete = window.confirm(`Delete ${subcategory.name}?`);

    if (!confirmDelete) return;

    try {
      await dispatch(deleteSubCategory(subcategory._id));

      // Correct refresh function
      await refreshSubcategories();

      alert("Subcategory deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const columns = subcategoryColumns({
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDelete,
  });

  if (loading) {
    return <div className="p-8">Loading Subcategories...</div>;
  }

  return (
    <div className="p-8 bg-[#F8F4F1] h-full">
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
                refreshSubCategories={refreshSubcategories}
              />,
            )
          }
          className="bg-[#5C4033] text-white px-5 py-2 rounded-lg cursor-pointer"
        >
          + New Subcategory
        </button>
      </div>

      <Table columns={columns} data={Subcategories || []} />

      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal>
    </div>
  );
}
