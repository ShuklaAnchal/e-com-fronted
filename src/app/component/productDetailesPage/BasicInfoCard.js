const BasicInfoCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="flex flex-col">
          <h3 className="font-medium text-gray-500 text-sm">
            Product Name
          </h3>
          <h4 className="font-semibold text-lg">
            {product?.name || "-"}
          </h4>
        </div>

        <div className="flex flex-col">
          <h3 className="font-medium text-gray-500 text-sm">
            Brand
          </h3>
          <h4 className="font-semibold text-lg">
            {product?.brand || "-"}
          </h4>
        </div>

        <div className="flex flex-col">
          <h3 className="font-medium text-gray-500 text-sm">
            Slug
          </h3>
          <h4 className="font-semibold text-lg">
            {product?.slug || "-"}
          </h4>
        </div>
             <div className="flex flex-col">
          <h3 className="font-medium text-gray-500 text-sm">
            Status
          </h3>
          <h4 className="font-semibold text-lg capitalize">
            {product?.status || "-"}
          </h4>
        </div>

        <div className="flex flex-col">
          <h3 className="font-medium text-gray-500 text-sm">
            Category Name
          </h3>
          <h4 className="font-semibold text-lg break-all">
            {product?.category.name || "-"}
          </h4>
        </div>

        <div className="flex flex-col">
          <h3 className="font-medium text-gray-500 text-sm">
            Sub Category Name
          </h3>
          <h4 className="font-semibold text-lg break-all">
            {product?.subCategory.name || "-"}
          </h4>
        </div>

   

        <div className="flex flex-col">
          <h3 className="font-medium text-gray-500 text-sm">
            Created At
          </h3>
          <h4 className="font-semibold text-lg">
            {product?.createdAt
              ? new Date(product.createdAt).toLocaleString()
              : "-"}
          </h4>
        </div>

        <div className="flex flex-col">
          <h3 className="font-medium text-gray-500 text-sm">
            Updated At
          </h3>
          <h4 className="font-semibold text-lg">
            {product?.updatedAt
              ? new Date(product.updatedAt).toLocaleString()
              : "-"}
          </h4>
        </div>

      </div>
    </div>
  );
};

export default BasicInfoCard;