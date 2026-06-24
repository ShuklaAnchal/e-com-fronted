"use client";

import { useDispatch } from "react-redux";

import Modal from "@/app/component/resuable/model";
import Table from "@/app/component/table/table";

import useModal from "@/app/hooks/useModalHook";
import { useUsers } from "@/app/hooks/customerHook";

import { customerColumns } from "@/app/colums/customerColumns";

import { deleteCategory } from "@/app/store/action/categoryAction";

export default function CustomerPage() {
  const dispatch = useDispatch();

  const { modal, openModal, closeModal } = useModal();

  const {  Users,
    loading,
    refreshUsers } = useUsers();

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

  const columns = customerColumns({
    onDelete: handleDelete,
  });

  if (loading) {
    return <div className="p-8">Loading Customer...</div>;
  }

  return (
    <div className="p-8 bg-[#F8F4F1] h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#5C4033]">
          Customer Management
        </h1>
      </div>

      <Table columns={columns} data={Users || []} />
{/* 
      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal> */}
    </div>
  );
}
