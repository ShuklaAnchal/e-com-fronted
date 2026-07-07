import InfoRow from "./InfoRow";

const AdvancedFeatureCard = ({ features }) => {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">

        Advanced Features

      </h2>

      <InfoRow
        label="Limited Edition"
        value={
          features.limitedEdition ? "Yes" : "No"
        }
      />

      <InfoRow
        label="Subscription Available"
        value={
          features.subscriptionAvailable
            ? "Yes"
            : "No"
        }
      />

      <InfoRow
        label="Refill Available"
        value={
          features.refillAvailable ? "Yes" : "No"
        }
      />

    </div>
  );
};

export default AdvancedFeatureCard;