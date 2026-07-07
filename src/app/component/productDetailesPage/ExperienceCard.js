import InfoRow from "./InfoRow";

const ExperienceCard = ({ experience }) => {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">

        Customer Experience

      </h2>

      <InfoRow
        label="Rating"
        value={experience.rating}
      />

      <InfoRow
        label="Reviews"
        value={experience.reviewsCount}
      />

      <InfoRow
        label="Featured"
        value={experience.featured ? "Yes" : "No"}
      />

      <InfoRow
        label="Trending"
        value={experience.trending ? "Yes" : "No"}
      />

      <InfoRow
        label="Best Seller"
        value={experience.bestseller ? "Yes" : "No"}
      />

    </div>
  );
};

export default ExperienceCard;