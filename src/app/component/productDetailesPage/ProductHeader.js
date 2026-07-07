"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

const ProductHeader = ({ product }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-3 transition"
        >
          <IoArrowBack className="text-lg" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold">{product?.name}</h1>

        <div className="flex items-center gap-4 mt-2">
          <span className="text-gray-600">
            Brand:
            <span className="font-medium ml-2">
              {product?.brand}
            </span>
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              product?.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {product?.status}
          </span>
        </div>
      </div>

      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
        <FiEdit className="text-lg" />
        <span>Edit Product</span>
      </button>
    </div>
  );
};

export default ProductHeader;