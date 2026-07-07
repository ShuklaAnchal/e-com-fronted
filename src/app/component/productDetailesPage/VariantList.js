import VariantCard from "./VariantCard";

const VariantList = ({ variants }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        Product Variants
      </h2>

      {variants?.length > 0 ? (
        <div className="space-y-6">
          {variants.map((variant, index) => (
            <VariantCard
              key={variant._id}
              variant={variant}
              index={index}
            />
          ))}
        </div>
      ) : (
        <p>No variants available.</p>
      )}

    </div>
  );
};

export default VariantList;