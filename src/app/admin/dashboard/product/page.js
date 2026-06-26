"use client";

import Modal from "@/app/component/resuable/model";
import ProductForm from "@/app/component/forms/productForm";
import VariantForm from "@/app/component/forms/addVarientForm";
import Table from "@/app/component/table/table";

import useModal from "@/app/hooks/useModalHook";
import { useProducts } from "@/app/hooks/productHook";

import { productColumns } from "@/app/colums/productColoum";
import { useDispatch } from "react-redux";

export default function ProductPage() {
  const dispatch = useDispatch();

  const { modal, openModal, closeModal } = useModal();

  const { products, loading, refreshProducts } = useProducts();


const handleAddVariant = (product) => {
  openModal(
    `Add Variant - ${product.name}`,
    <VariantForm
      product={product}
      onClose={closeModal}
      refreshProducts={refreshProducts}
    />
  );
};


  const handleEdit = (category) => {
    console.log({ category });

    openModal(
      "Edit Category",
      <ProductForm
        editData={category}
        onClose={closeModal}
        refreshProducts={refreshProducts}
      />,
    );
  };

  const handleView = (product) => {
    console.log("View Category:", category);
  };

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(`Delete ${product.name}?`);

    if (!confirmDelete) return;

    try {
      await dispatch(deleteCategory(product._id));

      await refreshProducts();

      alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = productColumns({
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDelete,
    onAddVariant: handleAddVariant,
  });

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
              "Create Product",
              <ProductForm
                editData={null}
                onClose={closeModal}
                refreshProducts={refreshProducts}
              />,
            )
          }
          className="bg-[#5C4033] text-white px-5 py-2 rounded-lg"
        >
          +New Product
        </button>
      </div>

      {/* Table */}
      <Table columns={columns} data={products} />

      {/* Global Modal */}
      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal>
    </div>
  );
}
