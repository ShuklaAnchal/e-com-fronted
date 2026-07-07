import InfoRow from "./InfoRow";

const ShippingCard = ({ shipping }) => {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Shipping
      </h2>

      <InfoRow
        label="COD Available"
        value={shipping.codAvailable ? "Yes" : "No"}
      />

      <InfoRow
        label="Fragile Item"
        value={shipping.fragileItem ? "Yes" : "No"}
      />

    </div>
  );
};

export default ShippingCard;