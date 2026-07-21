import React from 'react'

const Content = () => {
  const sections = [
    {
      title: "1. Order Processing Time",
      content: (
        <ul className="list-disc pl-5 sm:pl-6 space-y-2">
          <li>All orders are processed within 1–3 business days after successful payment confirmation.</li>
          <li>Customized or bulk orders may require additional processing time.</li>
          <li>Orders are not processed or shipped on Sundays or public holidays.</li>
          <li>In case of any unexpected delay, customers will be informed through email or WhatsApp.</li>
        </ul>
      ),
    },
    {
      title: "2. Shipping Charges",
      content: (
        <ul className="list-disc pl-5 sm:pl-6 space-y-2">
          <li>Shipping charges are calculated at checkout based on delivery location and order weight.</li>
          <li>Free shipping may be offered on selected products or promotional campaigns.</li>
        </ul>
      ),
    },
    {
      title: "3. Delivery Timeline",
      content: (
        <>
          <p className="mb-2 font-medium">Estimated delivery timelines:</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
            <li>Within Gujarat: 2–5 business days</li>
            <li>Rest of India: 4–8 business days</li>
          </ul>
          <p className="mb-2 font-medium">Delivery timelines may vary due to:</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2">
            <li>Courier partner delays</li>
            <li>Weather conditions</li>
            <li>Remote delivery locations</li>
            <li>Festivals or high-order volume periods</li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Shipping Partners",
      content: (
        <>
          <p className="mb-2">We may use trusted third-party courier services such as:</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
            <li>Delhivery</li>
            <li>DTDC</li>
            <li>Blue Dart</li>
            <li>India Post</li>
            <li>Other logistics partners</li>
          </ul>
          <p>Courier partner selection depends on service availability in your area.</p>
        </>
      ),
    },
    {
      title: "5. Order Tracking",
      content: (
        <>
          <p className="mb-2">Once your order is shipped:</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2">
            <li>A tracking ID/link will be shared via email, SMS, or WhatsApp.</li>
            <li>Customers can track shipment status directly through the courier website.</li>
          </ul>
        </>
      ),
    },
    {
      title: "6. Incorrect Address / Failed Delivery",
      content: (
        <>
          <p className="mb-2">Customers are responsible for providing accurate shipping details.</p>
          <p className="mb-2 font-medium">If:</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
            <li>The address is incorrect</li>
            <li>Customer is unavailable</li>
            <li>Delivery fails multiple times</li>
          </ul>
          <p>
            Additional re-shipping charges may apply. Siyaas will not be responsible for delays or losses caused by incorrect information provided by the customer.
          </p>
        </>
      ),
    },
    {
      title: "7. Damaged Package During Delivery",
      content: (
        <>
          <p className="mb-2">If your package arrives damaged:</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
            <li>Please record an unboxing video immediately after receiving the package.</li>
            <li>Contact us within 24 hours of delivery with:</li>
            <li className="ml-4 sm:ml-6">Order ID</li>
            <li className="ml-4 sm:ml-6">Photos/videos of the damage</li>
          </ul>
          <p>Without an unboxing video, damage claims may not be accepted.</p>
        </>
      ),
    },
    {
      title: "8. Non-Serviceable Areas",
      content: (
        <>
          <p className="mb-2">
            Some remote locations may not be serviceable by our courier partners. In such cases:
          </p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2">
            <li>The order may be cancelled and refunded, or</li>
            <li>We may contact you for an alternate address.</li>
          </ul>
        </>
      ),
    },
    {
      title: "9. Delays Beyond Our Control",
      content: (
        <>
          <p className="mb-2">Delivery delays caused by:</p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
            <li>Natural disasters</li>
            <li>Strikes</li>
            <li>Lockdowns</li>
            <li>Transportation issues</li>
            <li>Other force majeure events</li>
          </ul>
          <p>Shall not make Siyaas liable for compensation or damages.</p>
        </>
      ),
    },
  ]

  return (
    <div className="w-full h-full mt-20 bg-white py-24 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto text-[#5f5f5f] text-sm sm:text-[15px] md:text-base leading-7 sm:leading-8">
        
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4 border-b border-gray-200 pb-4">
          Shipping Policy – Siyaas
        </h1>

        <div className="text-sm sm:text-base font-medium mb-6 sm:mb-8 text-gray-700">
          Last Updated: <span className="font-normal">May 2026</span>
        </div>

        {/* Intro */}
        <p className="mb-8">
          Welcome to Siyaas. We are committed to delivering your handcrafted scented candles safely and on time. Please read our Shipping Policy carefully before placing an order.
        </p>

        {/* Dynamic Sections */}
        {sections.map((section, index) => (
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
            10. Contact Information
          </h2>
          <p className="mb-4">
            For shipping-related queries, customers may contact us through:
          </p>

          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 text-sm sm:text-[15px] leading-7">
            <p><strong>Brand:</strong> Siyaas</p>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:siyaascandles@gmail.com"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                siyaascandles@gmail.com
              </a>
            </p>
            <p>
              <strong>Website:</strong>{' '}
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
        </section>
      </div>
    </div>
  )
}

export default Content