const VariantCard = ({ variant, index }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all p-5">

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">

        <div>
          <h3 className="text-lg font-semibold">
            Variant {index + 1}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            SKU : {variant.sku}
          </p>
        </div>

        <div className="flex gap-2">

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              variant.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {variant.isActive ? "Active" : "Inactive"}
          </span>

          {variant.isDefault && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              Default
            </span>
          )}

        </div>

      </div>

      <div className="grid lg:grid-cols-4 gap-6 mt-5">

        {/* Image */}
        <div>

          {variant.images?.length ? (
            <img
              src={variant.images[0]?.url}
              alt=""
              className="w-36 h-36 rounded-lg object-cover border"
            />
          ) : (
            <div className="w-36 h-36 border rounded-lg flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

        </div>

        {/* Pricing */}
        <div>

          <h4 className="font-semibold mb-3">
            Pricing
          </h4>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>MRP</span>
              <strong>₹{variant.pricing?.mrp}</strong>
            </div>

            <div className="flex justify-between">
              <span>Selling</span>
              <strong>₹{variant.pricing?.sellingPrice}</strong>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <strong>{variant.pricing?.gstRate}%</strong>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <strong>{variant.pricing?.discountPercent}%</strong>
            </div>

          </div>

        </div>

        {/* Inventory */}
        <div>

          <h4 className="font-semibold mb-3">
            Inventory
          </h4>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Stock</span>
              <strong>{variant.inventory?.stockQuantity}</strong>
            </div>

            <div className="flex justify-between">
              <span>Reserved</span>
              <strong>{variant.inventory?.reservedStock}</strong>
            </div>

            <div className="flex justify-between">
              <span>Threshold</span>
              <strong>{variant.inventory?.lowStockThreshold}</strong>
            </div>

            <div className="flex justify-between">
              <span>Status</span>

              <span
                className={`font-semibold ${
                  variant.inventory?.inStock
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {variant.inventory?.inStock
                  ? "In Stock"
                  : "Out of Stock"}
              </span>

            </div>

          </div>

        </div>

        {/* Details */}
        <div>

          <h4 className="font-semibold mb-3">
            Details
          </h4>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Barcode</span>
              <strong>{variant.barcode || "-"}</strong>
            </div>

            <div className="flex justify-between">
              <span>Weight</span>
              <strong>{variant.shippingWeight} kg</strong>
            </div>

          </div>

        </div>

      </div>

      {/* Attributes */}
      {variant.attributes?.length > 0 && (
        <div className="mt-5 pt-4 border-t">

          <h4 className="font-semibold mb-3">
            Attributes
          </h4>

          <div className="flex flex-wrap gap-2">

            {variant.attributes.map((attr, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-full px-4 py-2 text-sm"
              >
                <span className="font-semibold">
                  {attr.name}
                </span>

                {" : "}

                {attr.value}
              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default VariantCard;