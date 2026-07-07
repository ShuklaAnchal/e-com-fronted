const InfoRow = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <span className="text-gray-600 font-medium">
        {label}
      </span>

      <span className="text-gray-900 font-semibold">
        {value ?? "-"}
      </span>
    </div>
  );
};

export default InfoRow;