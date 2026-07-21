import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full mt-20 bg-white py-24 min-h-screen bg-white sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 text-[#555] text-sm sm:text-base leading-7">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-4 leading-tight">
          Cancellation & Refund Policy – Siyaas
        </h1>

        <div className="text-sm sm:text-base font-medium text-gray-600 mb-8 border-b pb-4">
          Last Updated: <span className="font-normal">May 2026</span>
        </div>

        {/* Intro */}
        <p className="mb-8 text-justify">
          At Siyaas, every candle is handcrafted with care and quality-checked
          before dispatch. We aim to provide the best experience to our
          customers. Please read our Cancellation & Refund Policy carefully
          before placing an order.
        </p>

        {/* Section 1 */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          1. Order Cancellation Policy
        </h2>

        <h3 className="font-semibold text-base sm:text-lg mb-2">
          1.1 Cancellation Before Dispatch
        </h3>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            Customers may request order cancellation before the product has been
            shipped.
          </li>
          <li>
            If the cancellation request is approved before dispatch, a full
            refund will be processed.
          </li>
          <li>
            Once the order is packed or shipped, cancellation requests may not
            be accepted.
          </li>
        </ul>

        <p className="mb-2">
          To request cancellation, customers must contact us immediately with:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Order ID</li>
          <li>Registered name</li>
          <li>Contact details</li>
        </ul>

        <h3 className="font-semibold text-base sm:text-lg mb-2">
          1.2 Cancellation by Siyaas
        </h3>
        <p className="mb-2">We reserve the right to cancel any order due to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Product unavailability</li>
          <li>Pricing or technical errors</li>
          <li>Suspicious or fraudulent transactions</li>
          <li>Incomplete customer information</li>
          <li>Non-serviceable delivery location</li>
        </ul>
        <p className="mb-8">
          In such cases, customers will be notified and eligible refunds will be
          processed.
        </p>

        {/* Section 2 */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          2. Refund Policy
        </h2>

        <h3 className="font-semibold text-base sm:text-lg mb-2">
          2.1 Eligibility for Refund
        </h3>
        <p className="mb-2">
          Refunds may be provided under the following situations:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Damaged Product during transit</li>
          <li>Wrong Product Delivered</li>
          <li>Missing Items in the package</li>
          <li>Order Cancelled Before Shipment</li>
        </ul>

        <h3 className="font-semibold text-base sm:text-lg mb-2">
          2.2 Conditions for Refund Approval
        </h3>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Customers must contact us within 24–48 hours of delivery.</li>
          <li>
            A clear unboxing video is mandatory for damage, leakage, missing
            item, or wrong product claims.
          </li>
          <li>Product photos and order details may also be requested.</li>
        </ul>
        <p className="mb-8">
          Claims without sufficient proof may not be accepted.
        </p>

        {/* Section 3 */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          3. Non-Refundable Situations
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Change of mind after delivery</li>
          <li>Fragrance preference issues</li>
          <li>Minor color/design variations due to handmade production</li>
          <li>Improper handling or misuse of candles</li>
          <li>Products damaged after delivery</li>
          <li>
            Delayed delivery caused by courier services or unavoidable
            circumstances
          </li>
          <li>Customized or personalized orders</li>
        </ul>
        <p className="mb-8">
          As our candles are handmade products, slight variations in texture,
          color, wax finish, or fragrance intensity are natural and not
          considered defects.
        </p>

        {/* Section 4 */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          4. Replacement Policy
        </h2>
        <p className="mb-2">In eligible cases, we may offer:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Replacement product</li>
          <li>Store credit</li>
          <li>Refund</li>
        </ul>
        <p className="mb-8">
          Replacement dispatch timelines may vary based on stock availability.
        </p>

        {/* Section 5 */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          5. Refund Processing Time
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Refunds are generally processed within 5–10 business days.</li>
          <li>The amount will be credited to the original payment method.</li>
        </ul>
        <p className="mb-8">
          Banking or payment gateway delays may occur and are beyond our direct
          control.
        </p>

        {/* Section 6 */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          6. Return Shipping
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Customers may be asked to return the product in certain cases.</li>
          <li>
            Return shipping instructions will be shared by our support team.
          </li>
          <li>Unauthorized returns may not be accepted.</li>
          <li>
            Unless the error is from our side, return shipping costs may be
            borne by the customer.
          </li>
        </ul>

        {/* Section 7 */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          7. Bulk / Corporate Orders
        </h2>
        <p className="mb-8 text-justify">
          Bulk, event-based, festive, wedding, or corporate orders may have
          separate cancellation and refund terms depending on production stage
          and customization requirements. Advance payments for customized bulk
          orders may be non-refundable.
        </p>

        {/* Section 8 */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          8. Fraudulent Claims
        </h2>
        <p className="mb-2">
          Siyaas reserves the right to reject refund/replacement requests in
          cases involving:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Fake claims</li>
          <li>Edited proofs</li>
          <li>Repeated abuse of refund policies</li>
          <li>Suspicious activity</li>
        </ul>
        <p className="mb-8">
          Legal action may be taken in serious cases of fraud or misuse.
        </p>

        {/* Contact */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-3">
          9. Contact Us
        </h2>
        <p className="mb-4">
          For cancellation, refund, or replacement requests:
        </p>

        <div className="bg-gray-50 border rounded-xl p-5 sm:p-6 mb-10 text-sm sm:text-base leading-7 shadow-sm">
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
            <strong>Business Hours:</strong> Monday to Saturday, 10 AM – 7 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;