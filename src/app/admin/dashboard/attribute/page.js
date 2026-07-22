"use client";

import { useDispatch } from "react-redux";

import Modal from "@/app/component/resuable/model";
import Table from "@/app/component/table/table";
import AttributeForm from "@/app/component/forms/attributeDefinitionForm";
import useModal from "@/app/hooks/useModalHook";
import { useAttributes } from "@/app/hooks/attributeHook";

import { attributeColumns } from "@/app/colums/attributeColumns";

import { deleteCategory } from "@/app/store/action/categoryAction";

export default function AttributePage() {
  const dispatch = useDispatch();

  const { modal, openModal, closeModal } = useModal();

  const {   attributes,
    loading,
    refreshAttributes, } = useAttributes();
    

  const handleEdit = (attributes) => {
    openModal(
      "Edit Category",
      <AttributeForm
        editData={attributes}
        onClose={closeModal}
        refreshAttributes={refreshAttributes}
      />,
    );
  };

  const handleView = (attributes) => {
    console.log("View Category:", attributes);
  };

  const handleDelete = async (attributes) => {
    const confirmDelete = window.confirm(`Delete ${attributes.name}?`);

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

  const columns = attributeColumns({
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
          Attribute Management
        </h1>

        <button
          onClick={() =>
            openModal(
              "Create Attribute",
              <AttributeForm
                editData={null}
                onClose={closeModal}
                refreshAttributes={refreshAttributes}
              />,
            )
          }
          className="bg-[#5C4033] text-white px-5 py-2 rounded-lg cursor-pointer"
        >
          + New Attribute
        </button>
      </div>

      <Table columns={columns} data={attributes || []} />

      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal>
    </div>
  );
}
