"use client";

import { useDispatch } from "react-redux";

import Modal from "@/app/component/resuable/model";
import Table from "@/app/component/table/table";
import useModal from "@/app/hooks/useModalHook";
import { useOrders } from "@/app/hooks/orderHook";

import { orderColumns } from "@/app/colums/orderColumns";

import { editOrderdetailes } from "@/app/store/action/orderAction";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { modal, openModal, closeModal } = useModal();

  const { allOrders, loading, refreshOrders } = useOrders();

  const handleOrderStatus = (order) => {
    const currentStatus = order?.orderStatus;

    const statusActions = {
      Pending: [
        {
          label: "Accept",
          status: "Accepted",
          className: "text-green-600",
        },
        {
          label: "Reject",
          status: "Rejected",
          className: "text-red-500",
        },
        {
          label: "Cancel",
          status: "Cancelled",
          className: "text-orange-500",
        },
      ],

      Accepted: [
        {
          label: "Ship",
          status: "Shipped",
          className: "text-blue-600",
        },
        {
          label: "Reject",
          status: "Rejected",
          className: "text-red-500",
        },
        {
          label: "Cancel",
          status: "Cancelled",
          className: "text-orange-500",
        },
      ],

      Shipped: [
        {
          label: "Deliver",
          status: "Delivered",
          className: "text-green-600",
        },
      ],

      Rejected: [],

      Cancelled: [],

      Delivered: [],
    };

    const availableActions = statusActions[currentStatus] || [];

    openModal(
      "Update Order Status",
      <div className="space-y-5">
        <div className="rounded-lg bg-[#F8F4F1] p-4">
          <p className="text-sm text-gray-500">Order ID</p>

          <p className="mt-1 break-all font-medium text-[#5C4033]">
            {order?._id}
          </p>

          <p className="mt-3 text-sm text-gray-500">Current Status</p>

          <p className="mt-1 font-semibold text-[#5C4033]">{currentStatus}</p>
        </div>

        {availableActions.length > 0 ? (
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Available Actions
            </p>

            <div className="flex flex-wrap gap-3">
              {availableActions.map((action) => (
                <button
                  key={action.status}
                  type="button"
                  onClick={async () => {
                    if (!order?._id) {
                      alert("Order ID is missing");
                      return;
                    }

                    const result = await dispatch(
                      editOrderdetailes(order._id, action.status),
                    );

                    if (result?.success) {
                      closeModal();
                      await refreshOrders();
                    } else {
                      alert(result?.message || "Failed to update order status");
                    }
                  }}
                  className={`rounded-lg border px-5 py-2.5 text-sm font-medium ${action.className}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">
              No status actions available for this order.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm"
          >
            Close
          </button>
        </div>
      </div>,
    );
  };

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
    console.log("========== VIEW Order ==========");
    console.log("1. Order:", allOrders);

    const OrderID = allOrders?._id;

    console.log("2. Order ID:", OrderID);

    if (!OrderID) {
      console.error("❌ OrderID ID is missing:", OrderID);
      return;
    }

    const url = `/admin/dashboard/orders/${OrderID}`;

    console.log("3. Navigating to:", url);

    try {
      router.push(url);
      console.log("4. router.push executed successfully");
    } catch (error) {
      console.error("❌ ROUTER PUSH ERROR:", error);
    }
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
    OnHandle: handleOrderStatus,
  });

  if (loading) {
    return <div className="p-8">Loading Orders...</div>;
  }

  return (
    <div className="p-8 bg-[#F8F4F1] h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#5C4033]">Orders</h1>
      </div>

      <Table columns={columns} data={allOrders || []} />

      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal>
    </div>
  );
}
