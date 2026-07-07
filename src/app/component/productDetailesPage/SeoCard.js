const SeoCard = ({ seo }) => {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        SEO
      </h2>

      <div>

        <h4 className="font-semibold mb-2">
          Keywords
        </h4>

        <div className="flex gap-2 flex-wrap">

          {seo.keywords?.length ? (

            seo.keywords.map((keyword) => (

              <span
                key={keyword}
                className="bg-green-100 text-green-700 rounded-full px-3 py-1"
              >
                {keyword}
              </span>

            ))

          ) : (
            <p>No Keywords</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default SeoCard;