import React from "react";
import Header from "@/app/component/mainpage/Header";
import Footer from "@/app/component/resuable/Footer";

const Page = () => {
  return (
    <div>
      <Header />
      <div className="w-full h-full mt-10 bg-white py-16 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto text-[#5f5f5f] text-sm sm:text-[15px] md:text-base leading-7 sm:leading-8">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4 border-b border-gray-200 pb-4">
            Terms & Conditions – Siyaas
          </h1>

          <div className="text-sm sm:text-base font-medium mb-6 sm:mb-8 text-gray-700">
            Last Updated: <span className="font-normal">May 2026</span>
          </div>

          {/* Intro */}
          <p className="mb-6">
            Welcome to Siyaas. These Terms & Conditions govern your access to
            and use of our website, products, services, and all related
            interactions. By accessing our website, placing an order, or using
            our services, you acknowledge that you have read, understood, and
            agreed to be bound by these Terms & Conditions.
          </p>

          <p className="mb-8">
            If you do not agree with any part of these terms, you are advised
            not to use our website or services.
          </p>

          {/* Reusable Section Component */}
          {[
            {
              title: "1. Introduction",
              content: (
                <>
                  <p className="mb-2">
                    Siyaas is a handcrafted scented candle and lifestyle brand
                    offering candles, decorative wax products, gifting products,
                    and related accessories through online and offline channels.
                  </p>
                  <p className="mb-2">These Terms apply to:</p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                    <li>Website visitors</li>
                    <li>Customers</li>
                    <li>Buyers</li>
                    <li>Business partners</li>
                    <li>All users interacting with our platform</li>
                  </ul>
                </>
              ),
            },
            {
              title: "2. Eligibility to Use",
              content: (
                <>
                  <p className="mb-2">
                    By using our website or placing an order, you confirm that:
                  </p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                    <li>
                      You are legally capable of entering into binding
                      agreements
                    </li>
                    <li>The information provided by you is accurate</li>
                    <li>You will use the website only for lawful purposes</li>
                  </ul>
                  <p>
                    We reserve the right to refuse service, terminate accounts,
                    or cancel orders at our sole discretion.
                  </p>
                </>
              ),
            },
            {
              title: "3. Product Information & Handmade Variations",
              content: (
                <>
                  <p className="mb-2">
                    All products sold by Siyaas are handcrafted and may
                    naturally vary in:
                  </p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                    <li>Color</li>
                    <li>Texture</li>
                    <li>Finish</li>
                    <li>Fragrance intensity</li>
                    <li>Labeling</li>
                    <li>Decoration</li>
                    <li>Packaging</li>
                  </ul>
                  <p className="mb-4">
                    Such variations are normal characteristics of handmade
                    products and shall not be treated as defects.
                  </p>
                  <p className="mb-2">
                    Product appearance may slightly vary due to:
                  </p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                    <li>Screen settings</li>
                    <li>Lighting</li>
                    <li>Photography</li>
                    <li>Device display differences</li>
                  </ul>
                </>
              ),
            },
            {
              title: "4. Pricing & Payments",
              content: (
                <>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    4.1 Pricing
                  </h3>
                  <p className="mb-2">
                    Prices may change without prior notice due to:
                  </p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                    <li>Raw material cost changes</li>
                    <li>Seasonal demand</li>
                    <li>Promotional campaigns</li>
                    <li>Packaging updates</li>
                    <li>Operational requirements</li>
                  </ul>

                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    4.2 Payment Methods
                  </h3>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                    <li>UPI</li>
                    <li>Debit cards</li>
                    <li>Credit cards</li>
                    <li>Net banking</li>
                    <li>Wallets</li>
                    <li>Cash on Delivery (if available)</li>
                    <li>Third-party payment gateways</li>
                  </ul>

                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    4.3 Failed Transactions
                  </h3>
                  <p>
                    Siyaas is not responsible for banking failures, gateway
                    issues, or unauthorized banking activity beyond our control.
                  </p>
                </>
              ),
            },
            {
              title: "5. Order Acceptance & Cancellation",
              content: (
                <>
                  <p className="mb-2">We reserve the right to:</p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                    <li>Accept or reject any order</li>
                    <li>Limit quantities</li>
                    <li>Cancel suspicious transactions</li>
                    <li>Refuse service without prior notice</li>
                  </ul>
                  <p>
                    Orders may also be cancelled due to stock issues, fraud
                    concerns, pricing mistakes, or delivery limitations.
                  </p>
                </>
              ),
            },
            {
              title: "6. Shipping & Delivery",
              content: (
                <>
                  <p className="mb-2">
                    Shipping timelines are estimates and may vary due to:
                  </p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                    <li>Courier partner delays</li>
                    <li>Weather conditions</li>
                    <li>Public holidays</li>
                    <li>Operational disruptions</li>
                  </ul>
                  <p>
                    Risk of loss and ownership transfers upon successful
                    delivery.
                  </p>
                </>
              ),
            },
            {
              title: "7. Returns, Refunds & Replacements",
              content: (
                <p>
                  Refunds and replacements are governed by our separate
                  Cancellation & Refund Policy. Claims require proper supporting
                  proof such as unboxing videos or photographs.
                </p>
              ),
            },
            {
              title: "8. Candle Safety Disclaimer",
              content: (
                <>
                  <p className="mb-2">
                    Customers must follow safe candle practices, including:
                  </p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                    <li>Never leaving candles unattended</li>
                    <li>Keeping away from children and pets</li>
                    <li>Using heat-resistant surfaces</li>
                    <li>Keeping away from flammable materials</li>
                  </ul>
                  <p>
                    Siyaas is not responsible for accidents or damages caused by
                    misuse.
                  </p>
                </>
              ),
            },
            {
              title: "9. Intellectual Property Rights",
              content: (
                <p>
                  All Siyaas branding, logos, product images, content, and
                  designs are protected intellectual property and may not be
                  reused without permission.
                </p>
              ),
            },
            {
              title: "10. User Conduct",
              content: (
                <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                  <li>Misuse the website</li>
                  <li>Attempt unauthorized access</li>
                  <li>Upload harmful content</li>
                  <li>Commit fraud</li>
                  <li>Violate applicable laws</li>
                </ul>
              ),
            },
            {
              title: "11. Reviews & User Content",
              content: (
                <p>
                  User-generated content may be used by Siyaas for promotional
                  and marketing purposes without additional compensation.
                </p>
              ),
            },
            {
              title: "12. Third-Party Services",
              content: (
                <p>
                  Siyaas is not responsible for third-party services such as
                  payment gateways, logistics providers, analytics platforms, or
                  social media integrations.
                </p>
              ),
            },
            {
              title: "13. Limitation of Liability",
              content: (
                <p>
                  Siyaas shall not be liable for indirect losses, technical
                  failures, delayed deliveries, or misuse-related damages beyond
                  the purchase value of the relevant order.
                </p>
              ),
            },
            {
              title: "14. Indemnification",
              content: (
                <p>
                  Users agree to indemnify Siyaas against claims arising from
                  misuse, unlawful conduct, or violations of these Terms.
                </p>
              ),
            },
            {
              title: "15. Force Majeure",
              content: (
                <p>
                  Siyaas is not liable for delays caused by natural disasters,
                  pandemics, strikes, or other uncontrollable events.
                </p>
              ),
            },
            {
              title: "16. Privacy",
              content: (
                <p>Website use is also governed by our Privacy Policy.</p>
              ),
            },
            {
              title: "17. Modification of Terms",
              content: (
                <p>
                  Siyaas may update or revise these Terms at any time without
                  prior notice.
                </p>
              ),
            },
            {
              title: "18. Governing Law & Jurisdiction",
              content: (
                <p>
                  These Terms are governed by Indian law, with disputes subject
                  to Indian courts.
                </p>
              ),
            },
            {
              title: "19. Severability",
              content: (
                <p>
                  If any provision is found invalid, the remaining terms remain
                  enforceable.
                </p>
              ),
            },
          ].map((section, index) => (
            <section key={index} className="mb-8 sm:mb-10">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1E293B] mb-4">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}

          {/* Contact Section */}
          <section className="border-t border-gray-200 pt-8 mt-10">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1E293B] mb-4">
              20. Contact Information
            </h2>
            <p className="mb-4">
              For questions regarding these Terms & Conditions, customers may
              contact:
            </p>

            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 text-sm sm:text-[15px] leading-7">
              <p>
                <strong>Brand:</strong> Siyaas
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:siyaascandles@gmail.com"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  siyaascandles@gmail.com
                </a>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.siyaas.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  www.siyaas.in
                </a>
              </p>
              <p>
                <strong>Business Hours:</strong> Monday to Saturday, 10 AM – 7
                PM
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
