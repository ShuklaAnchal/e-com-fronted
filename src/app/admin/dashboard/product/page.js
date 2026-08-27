"use client";

import Modal from "@/app/component/resuable/model";
import ProductForm from "@/app/component/forms/productForm";
import VariantForm from "@/app/component/forms/addVarientForm";
import ProductRelationshipForm from "@/app/component/forms/productRelationshipForm"
import Table from "@/app/component/table/table";

import useModal from "@/app/hooks/useModalHook";
import { useProducts } from "@/app/hooks/productHook";

import { productColumns } from "@/app/colums/productColoum";
import { deleteListedProduct } from "@/app/store/action/productAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const dispatch = useDispatch();
  const router = useRouter()

  const { modal, openModal, closeModal } = useModal();
const {
  products,
  loading,
  pagination,
  nextPage,
  previousPage,
  refreshProducts,
} = useProducts();

  const handleAddVariant = (product) => {
    openModal(
      `Add Variant - ${product.name}`,
      <VariantForm
        product={product}
        onClose={closeModal}
        refreshProducts={refreshProducts}
      />,
    );
  };

  const handleRelationships = (product) => {
  openModal(
    `Product Relationships - ${product.name}`,
    <ProductRelationshipForm
      product={product}
      products={products}
      onClose={closeModal}
      refreshProducts={refreshProducts}
    />
  );
};

  const handleEdit = (product) => {
    console.log({ product });

    openModal(
      "Edit Product",
      <ProductForm
        editData={product}
        onClose={closeModal}
        refreshProducts={refreshProducts}
      />,
    );
  };

const handleView = (product) => {
  console.log("========== VIEW PRODUCT ==========");
  console.log("1. Product:", product);

  const productId = product?._id;

  console.log("2. Product ID:", productId);

  if (!productId) {
    console.error("❌ Product ID is missing:", product);
    return;
  }

  const url = `/admin/dashboard/product/${productId}`;

  console.log("3. Navigating to:", url);

  try {
    router.push(url);
    console.log("4. router.push executed successfully");
  } catch (error) {
    console.error("❌ ROUTER PUSH ERROR:", error);
  }
};


const handleDelete = async (product) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete "${product.name}"?`,
  );

  if (!confirmDelete) return;

  try {
    await dispatch(deleteListedProduct(product._id));

    await refreshProducts();

    alert("Product deleted successfully");
  } catch (error) {
    console.error("Delete product error:", error);

    alert(
      error?.message ||
        error ||
        "Failed to delete product",
    );
  }
};

  const columns = productColumns({
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDelete,
    onAddVariant: handleAddVariant,
    onRelationships: handleRelationships,
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
  {/* Table */}
      <Table
        columns={columns}
        data={products || []}
        pagination={pagination}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
        loading={loading}
      />
      {/* Global Modal */}
      <Modal isOpen={modal.isOpen} title={modal.title} onClose={closeModal}>
        {modal.content}
      </Modal>
    </div>
  );
}
