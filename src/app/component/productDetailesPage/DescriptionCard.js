const DescriptionCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        Description
      </h2>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between mb-4">

        {/* Short Description */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Short Description
          </h4>

          <p className="text-gray-800 font-medium">
            {product.shortDescription || "-"}
          </p>
        </div>

        {/* Highlights */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Highlights
          </h4>

          {product.highlights?.length ? (
            <ul className="list-disc ml-5 space-y-1 text-gray-800">
              {product.highlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Tags
          </h4>

          {product.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p>-</p>
          )}
        </div>

      </div>

      {/* Second Row */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          Full Description
        </h4>

        <div className="bg-gray-50 border rounded-lg p-4">
          <p className="text-gray-800 leading-7">
            {product.fullDescription || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;