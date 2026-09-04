
"use client";

import React, { useState } from "react";
import Header from "@/app/component/mainpage/Header";
import Footer from "@/app/component/resuable/Footer";

const faqSections = [
  {
    title: "1. General FAQs",
    faqs: [
      {
        question: "What products does Siyaas offer?",
        answer:
          "Siyaas offers a thoughtfully curated range of home fragrance, décor and gifting products, including candles, reed diffusers, car diffusers, wooden handicrafts and gift hampers.",
      },
      {
        question:
          "Are all Siyaas products exactly the same as shown on the website?",
        answer:
          "We make every effort to display our products accurately. However, slight variations in colour, texture, fragrance, finish or appearance may occur due to screen settings, lighting and handcrafted elements.",
      },
      {
        question: "Can I place an order for gifting?",
        answer:
          "Yes. Siyaas products are suitable for personal and special-occasion gifting. Our collection includes products and hampers designed to make gifting more thoughtful and memorable.",
      },
      {
        question: "Do you offer customised or personalised orders?",
        answer:
          "Customisation may be available for selected products and gifting requirements. Please contact Siyaas with your requirements, and availability can be confirmed accordingly.",
      },
      {
        question: "Do you accept bulk or corporate orders?",
        answer:
          "Yes, bulk and corporate gifting enquiries may be accepted depending on product availability and order requirements. Please contact us for assistance.",
      },
      {
        question: "How can I contact Siyaas?",
        answer:
          "For product-related queries, gifting enquiries, custom orders or assistance, contact us via Phone or WhatsApp at +91-6263799823.",
      },
    ],
  },

  {
    title: "2. Candle FAQs",
    faqs: [
      {
        question: "What types of candles does Siyaas offer?",
        answer:
          "Siyaas offers a variety of candles, including scented candles, decorative candles and uniquely designed candles suitable for home décor, relaxation and gifting.",
      },
      {
        question: "What wax types are used in Siyaas candles?",
        answer:
          "Depending on the product, Siyaas candles may be made using Soy Wax, Paraffin Wax, Soy Blend or Gel Wax. Please check the individual product page for the exact wax type.",
      },
      {
        question: "Are Siyaas candles scented?",
        answer:
          "Many Siyaas candles are scented. Fragrance availability and scent profiles may vary by product, so please refer to the individual product description for details.",
      },
      {
        question: "How long does a Siyaas candle burn?",
        answer:
          "Burn time depends on factors such as candle size, wax type, wick and design. The estimated burn time is provided on the relevant product page where applicable.",
      },
      {
        question: "How should I burn my candle for the first time?",
        answer:
          "For the first burn, allow the top layer of wax to melt as evenly as possible. This can help promote a more even burn in future uses.",
      },
      {
        question: "How should I take care of my candle?",
        answer:
          "Keep the wick trimmed before lighting, place the candle on a stable heat-resistant surface and keep it away from drafts, children and pets. Never leave a burning candle unattended.",
      },
      {
        question: "Can decorative candles be burned?",
        answer:
          "Some decorative candles are suitable for burning, while others may be primarily intended for display. Always check the product description and usage instructions before lighting.",
      },
      {
        question:
          "Why does my candle look slightly different from the website image?",
        answer:
          "Minor variations in colour, texture or finish can occur, particularly in handcrafted products. These variations can make each piece unique.",
      },
      {
        question: "How should I store my candles?",
        answer:
          "Store candles in a cool, dry place away from direct sunlight and excessive heat to help preserve their fragrance, colour and appearance.",
      },
    ],
  },

  {
    title: "3. Reed Diffuser FAQs",
    faqs: [
      {
        question: "What is a reed diffuser?",
        answer:
          "A reed diffuser is a flame-free home fragrance product that uses porous reeds to naturally absorb and disperse fragrance oil into the surrounding space.",
      },
      {
        question: "How do I use a Siyaas reed diffuser?",
        answer:
          "Remove the stopper or seal from the diffuser bottle and insert the reeds into the fragrance liquid. Allow the reeds to absorb the liquid and gradually release the fragrance into the room.",
      },
      {
        question: "How long does a reed diffuser last?",
        answer:
          "The longevity of a reed diffuser depends on the bottle size, number of reeds used, room temperature, airflow and fragrance composition. The estimated duration may be mentioned on the individual product page.",
      },
      {
        question: "How can I make the fragrance stronger?",
        answer:
          "You can flip the reeds occasionally to refresh the fragrance. Using more reeds can also increase fragrance diffusion.",
      },
      {
        question: "How often should I flip the reeds?",
        answer:
          "Flip the reeds when you notice that the fragrance has become lighter. The frequency can vary depending on room conditions and personal fragrance preference.",
      },
      {
        question: "Where should I place my reed diffuser?",
        answer:
          "Place your reed diffuser on a stable surface in a well-ventilated area. Avoid direct sunlight, excessive heat and areas where the bottle can be easily knocked over.",
      },
      {
        question: "Can I control the fragrance intensity?",
        answer:
          "Yes. You can adjust the number of reeds used. Fewer reeds generally provide a lighter fragrance experience, while more reeds may increase fragrance diffusion.",
      },
      {
        question: "Can I reuse the reeds?",
        answer:
          "For the best fragrance experience, reeds should generally be replaced when they become saturated or no longer diffuse fragrance effectively.",
      },
      {
        question:
          "Is a reed diffuser safe to use around an open flame?",
        answer:
          "Keep diffuser liquid and reeds away from open flames and heat sources. Always follow the product's safety and handling instructions.",
      },
    ],
  },

  {
    title: "4. Car Diffuser FAQs",
    faqs: [
      {
        question: "What is a car diffuser?",
        answer:
          "A car diffuser is a compact fragrance product designed to freshen the interior of your vehicle and create a pleasant driving environment.",
      },
      {
        question: "How do I use a Siyaas car diffuser?",
        answer:
          "Usage may vary by design. Follow the instructions provided with the product for opening, activating and placing or hanging the diffuser safely inside your vehicle.",
      },
      {
        question: "How long does a car diffuser last?",
        answer:
          "Fragrance longevity depends on the product size, usage, temperature and ventilation inside the vehicle. Please check the individual product page for estimated duration where available.",
      },
      {
        question: "Where should I place my car diffuser?",
        answer:
          "Place or hang the diffuser securely according to its design and instructions. Ensure that it does not obstruct the driver's view or interfere with vehicle controls.",
      },
      {
        question: "Can I adjust the fragrance intensity?",
        answer:
          "Fragrance intensity may depend on airflow, temperature and the way the diffuser is used. Follow the product instructions to achieve the best fragrance experience.",
      },
      {
        question: "Can heat affect my car diffuser?",
        answer:
          "High temperatures can affect fragrance evaporation and product performance. Avoid unnecessary exposure to extreme heat whenever possible and follow the product care instructions.",
      },
      {
        question: "What should I do if diffuser liquid spills?",
        answer:
          "Clean the affected surface immediately and carefully according to the surface manufacturer's recommendations. Keep diffuser liquid away from eyes and avoid contact with delicate surfaces.",
      },
    ],
  },

  {
    title: "5. Wooden Handicrafts FAQs",
    faqs: [
      {
        question: "What types of wooden handicrafts does Siyaas offer?",
        answer:
          "Siyaas offers selected wooden handicrafts and décor pieces designed to add warmth, character and a handcrafted touch to your home or gifting collection.",
      },
      {
        question: "Are wooden handicrafts handmade?",
        answer:
          "Some Siyaas wooden products may include handcrafted elements. Please check the individual product description for specific product details.",
      },
      {
        question: "Why does the wood grain or colour vary?",
        answer:
          "Wood is a natural material, so variations in grain, texture, colour and natural markings can occur. These characteristics contribute to the individuality of each piece.",
      },
      {
        question: "How should I clean wooden handicrafts?",
        answer:
          "Use a soft, dry or slightly damp cloth for cleaning. Avoid soaking the product in water or using harsh chemicals unless specific care instructions are provided.",
      },
      {
        question: "Can I place wooden products in direct sunlight?",
        answer:
          "Prolonged exposure to direct sunlight or excessive moisture may affect the appearance and finish of wooden products. Store or display them in suitable indoor conditions.",
      },
      {
        question: "Are wooden handicrafts suitable for gifting?",
        answer:
          "Yes. Wooden handicrafts can make thoughtful gifts for housewarmings, birthdays, festivals and other special occasions.",
      },
      {
        question: "Can slight variations occur in size or finish?",
        answer:
          "Yes. Minor variations may occur due to the natural properties of wood and handcrafted finishing processes.",
      },
    ],
  },

  {
    title: "6. Gift Hampers & Collections FAQs",
    faqs: [
      {
        question: "What is included in a Siyaas gift hamper?",
        answer:
          "The contents of each hamper may vary. The products included in a specific gift hamper are listed on its individual product page.",
      },
      {
        question: "Can I customise a gift hamper?",
        answer:
          "Customisation may be available for selected gifting requirements and order quantities. Please contact Siyaas with your requirements to check availability.",
      },
      {
        question: "Are Siyaas gift hampers suitable for special occasions?",
        answer:
          "Yes. Our gift hampers and curated collections are suitable for occasions such as birthdays, anniversaries, festivals, weddings, housewarmings and corporate gifting.",
      },
      {
        question: "Do you offer bulk gifting options?",
        answer:
          "Bulk gifting options may be available depending on product availability and order requirements. Please contact Siyaas for bulk or corporate enquiries.",
      },
      {
        question: "Can I send a gift directly to someone?",
        answer:
          "Yes, subject to the available delivery and order options. Please ensure that the recipient's delivery details are entered correctly while placing the order.",
      },
      {
        question:
          "Will the products inside the hamper be the same as shown?",
        answer:
          "We aim to provide the products shown in the hamper description. In case of product availability issues, any substitution or change should be handled according to the applicable order process.",
      },
      {
        question: "Can I choose products to create my own hamper?",
        answer:
          "For selected custom or bulk gifting enquiries, you may contact Siyaas to discuss available options for creating a curated hamper.",
      },
    ],
  },

  {
    title: "7. Product Care & Safety FAQs",
    faqs: [
      {
        question: "How should I store Siyaas fragrance and décor products?",
        answer:
          "Store products in a cool, dry place away from excessive heat, direct sunlight and moisture unless the individual product instructions state otherwise.",
      },
      {
        question: "Are fragrance products safe around children and pets?",
        answer:
          "Keep fragrance products, diffuser liquids and burning candles out of the reach of children and pets. Always follow the safety instructions provided with the product.",
      },
      {
        question:
          "What should I do if I have a product-related question before ordering?",
        answer:
          "You can contact Siyaas for assistance with product selection, fragrance queries, gifting requirements or other product-related questions.",
      },
    ],
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden bg-white">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 text-left px-4 sm:px-5 py-4 sm:py-5"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-[15px] md:text-base font-medium text-[#1E293B] leading-6">
          {question}
        </span>

        <span
          className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-[15px] md:text-base leading-7 text-[#5f5f5f]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleToggle = (sectionIndex, faqIndex) => {
    const id = `${sectionIndex}-${faqIndex}`;

    setOpenFAQ((current) => (current === id ? null : id));
  };

  return (
    <div>
      <Header />

      <div className="w-full h-full mt-10 bg-white py-16 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto text-[#5f5f5f] text-sm sm:text-[15px] md:text-base leading-7 sm:leading-8">
          
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4 border-b border-gray-200 pb-4">
            Frequently Asked Questions – Siyaas
          </h1>

          <div className="text-sm sm:text-base font-medium mb-8 sm:mb-10 text-gray-700">
            Find answers to commonly asked questions about Siyaas products,
            gifting, usage and product care.
          </div>

          {/* FAQ Sections */}
          {faqSections.map((section, sectionIndex) => (
            <section
              key={section.title}
              className="mb-8 sm:mb-10"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-[#1E293B] mb-4">
                {section.title}
              </h2>

              <div>
                {section.faqs.map((faq, faqIndex) => {
                  const id = `${sectionIndex}-${faqIndex}`;

                  return (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFAQ === id}
                      onClick={() => handleToggle(sectionIndex, faqIndex)}
                    />
                  );
                })}
              </div>
            </section>
          ))}

          {/* Contact Section */}
          <section className="border-t border-gray-200 pt-8 mt-10">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1E293B] mb-4">
              8. Contact Siyaas
            </h2>

            <p className="mb-4">
              For product-related queries, custom orders, bulk orders or
              gifting assistance, please contact Siyaas:
            </p>

            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 text-sm sm:text-[15px] leading-7">
              <p>
                <strong>Phone / WhatsApp:</strong>{" "}
                <a
                  href="tel:+916263799823"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  +91-6263799823
                </a>
              </p>

              <p>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/916263799823"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Chat with Siyaas
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;

