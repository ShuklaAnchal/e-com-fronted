import InfoRow from "./InfoRow";

const PolicyCard = ({ policies }) => {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Policies
      </h2>

      <InfoRow
        label="Return Available"
        value={policies.returnAvailable ? "Yes" : "No"}
      />

      <InfoRow
        label="Replacement"
        value={policies.replacementAvailable ? "Yes" : "No"}
      />

      <InfoRow
        label="Refund Days"
        value={policies.refundPolicyDays}
      />

      <InfoRow
        label="Damaged Replacement"
        value={
          policies.damagedProductReplacement
            ? "Yes"
            : "No"
        }
      />

    </div>
  );
};

export default PolicyCard;