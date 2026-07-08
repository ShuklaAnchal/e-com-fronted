"use client";

import { useDispatch } from "react-redux";

import Modal from "@/app/component/resuable/model";
import Table from "@/app/component/table/table";
import useModal from "@/app/hooks/useModalHook";
import { useOrders } from "@/app/hooks/orderHook";

import { orderColumns } from "@/app/colums/orderColumns";

import { deleteCategory } from "@/app/store/action/categoryAction";

export default function CatgoryPage() {
  const dispatch = useDispatch();

  const { modal, openModal, closeModal } = useModal();

  const {   allOrders,
    loading,
    refreshOrders, } = useOrders();

  // const handleEdit = (category) => {
  //   openModal(
  //     "Edit Category",
  //     <CategoryForm
  //       editData={category}
  //       onClose={closeModal}
  //       refreshSubCategories={refreshCategories}
  //     />,
  //   );
  // };

  const handleView = (allOrders) => {
    console.log("View Category:", allOrders);
  };

  // const handleDelete = async (category) => {
  //   const confirmDelete = window.confirm(`Delete ${category.name}?`);

  //   if (!confirmDelete) return;

  //   try {
  //     await dispatch(deleteCategory(category._id));

  //     // Correct refresh function
  //     await refreshCategories();

  //     alert("Category deleted successfully");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const columns = orderColumns({
    // onEdit: handleEdit,
    onView: handleView,
    // onDelete: handleDelete,
  });

  if (loading) {
    return <div className="p-8">Loading Orders...</div>;
  }

  return (
    <div className="p-8 bg-[#F8F4F1] h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#5C4033]">
          Orders
        </h1>

      </div>

      <Table columns={columns} data={allOrders || []} />

      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal>
    </div>
  );
}
