import React from 'react'
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
          Privacy Policy – Siyaas
        </h1>

        <div className="text-sm sm:text-base font-medium mb-6 sm:mb-8 text-gray-700">
          Last Updated: <span className="font-normal">May 2026</span>
        </div>

        {/* Intro */}
        <p className="mb-6">
          At Siyaas, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, disclose, and safeguard your information when you visit our website, place an order, interact with our services, or communicate with us.
        </p>

        <p className="mb-8">
          By accessing or using our website, you agree to the terms of this Privacy Policy.
        </p>

        {/* Section Helper */}
        {[
          {
            title: "1. Introduction",
            content: (
              <>
                <p className="mb-4">
                  Siyaas is a handcrafted scented candle brand focused on providing premium products and customer experiences. In the course of operating our business, we may collect certain personal and non-personal information from customers and website visitors.
                </p>
                <p>
                  We understand the importance of privacy and take reasonable measures to ensure that your data is handled securely and responsibly.
                </p>
              </>
            ),
          },
          {
            title: "2. Information We Collect",
            content: (
              <>
                <h3 className="font-semibold text-base sm:text-lg mb-2">2.1 Personal Information</h3>
                <p className="mb-2">When you place an order, contact us, subscribe, or interact with our website, we may collect:</p>
                <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-6">
                  <li>Full name</li>
                  <li>Mobile number</li>
                  <li>Email address</li>
                  <li>Billing address</li>
                  <li>Shipping address</li>
                  <li>City, state, and postal code</li>
                  <li>Payment-related details (processed securely through third-party payment gateways)</li>
                  <li>Order history</li>
                  <li>Communication records</li>
                </ul>

                <h3 className="font-semibold text-base sm:text-lg mb-2">2.2 Non-Personal Information</h3>
                <p className="mb-2">We may automatically collect certain technical and usage-related information, including:</p>
                <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Operating system</li>
                  <li>Website usage behavior</li>
                  <li>Pages visited</li>
                  <li>Time spent on pages</li>
                  <li>Referral links</li>
                  <li>Cookies and analytics data</li>
                </ul>
              </>
            ),
          },
          {
            title: "3. How We Use Your Information",
            content: (
              <>
                <p className="mb-2">We may use collected information for purposes including but not limited to:</p>
                <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                  <li>Processing and delivering orders</li>
                  <li>Customer support and communication</li>
                  <li>Sending order updates and tracking details</li>
                  <li>Improving website performance and services</li>
                  <li>Personalizing user experience</li>
                  <li>Marketing and promotional communication</li>
                  <li>Fraud prevention and security monitoring</li>
                  <li>Legal and regulatory compliance</li>
                  <li>Internal business analytics</li>
                </ul>
                <p>We use customer information only for legitimate business purposes.</p>
              </>
            ),
          },
          {
            title: "4. Payment Security",
            content: (
              <>
                <p className="mb-2">Siyaas does not directly store sensitive banking information such as:</p>
                <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                  <li>Debit card details</li>
                  <li>Credit card numbers</li>
                  <li>CVV</li>
                  <li>UPI PIN</li>
                  <li>Net banking passwords</li>
                </ul>
                <p>
                  Payments are processed through secure third-party payment gateways that maintain their own privacy and security standards. Customers are advised to review the privacy policies of payment providers separately.
                </p>
              </>
            ),
          },
          {
            title: "5. Cookies & Tracking Technologies",
            content: (
              <>
                <p className="mb-2">Our website may use cookies, pixels, and similar technologies to:</p>
                <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4">
                  <li>Remember user preferences</li>
                  <li>Improve website speed and functionality</li>
                  <li>Analyze visitor behavior</li>
                  <li>Optimize marketing campaigns</li>
                </ul>
                <p>
                  Users may disable cookies through browser settings; however, certain website features may not function properly afterward.
                </p>
              </>
            ),
          },
          {
            title: "6. Sharing of Information",
            content: (
              <>
                <p className="mb-2">We do not sell or rent customer personal information to third parties.</p>
                <p className="mb-2">However, information may be shared with trusted third parties where necessary for business operations, including:</p>
                <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                  <li>Shipping and logistics partners</li>
                  <li>Payment gateway providers</li>
                  <li>Website hosting services</li>
                  <li>Analytics providers</li>
                  <li>Marketing tools</li>
                  <li>Government or legal authorities when required by law</li>
                </ul>
              </>
            ),
          },
          {
            title: "7. Third-Party Services & External Links",
            content: (
              <>
                <p className="mb-2">
                  Our website may contain links to external websites, social media platforms, or third-party services.
                </p>
                <p>
                  Siyaas is not responsible for third-party privacy practices, content, security, or policies.
                </p>
              </>
            ),
          },
          {
            title: "8. Data Retention",
            content: (
              <p>
                We may retain customer information as long as necessary to fulfill orders, maintain business records, resolve disputes, comply with legal obligations, and enforce agreements.
              </p>
            ),
          },
          {
            title: "9. Data Protection & Security",
            content: (
              <p>
                We implement reasonable administrative, technical, and security measures to protect customer information. However, no online platform is completely secure, and users share information at their own risk.
              </p>
            ),
          },
          {
            title: "10. User Rights",
            content: (
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li>Request access to personal data</li>
                <li>Request corrections</li>
                <li>Request deletion of data</li>
                <li>Opt out of promotional communications</li>
                <li>Raise concerns regarding data handling</li>
              </ul>
            ),
          },
          {
            title: "11. Marketing Communications",
            content: (
              <p>
                Customers may receive promotional emails, WhatsApp messages, SMS updates, offers, and product-related communication, with the option to unsubscribe anytime.
              </p>
            ),
          },
          {
            title: "12. Children’s Privacy",
            content: (
              <p>
                Our products and website are not specifically directed toward minors, and we do not knowingly collect personal information from children without consent.
              </p>
            ),
          },
          {
            title: "13. Limitation of Liability",
            content: (
              <p>
                Siyaas shall not be liable for unauthorized access, technical failures, payment gateway breaches, or circumstances beyond reasonable control.
              </p>
            ),
          },
          {
            title: "14. Policy Updates & Modifications",
            content: (
              <p>
                We reserve the right to update or revise this Privacy Policy at any time. Updated versions become effective immediately upon posting.
              </p>
            ),
          },
          {
            title: "15. Consent",
            content: (
              <p>
                By using our website or services, users consent to the collection, storage, and use of information as outlined in this policy.
              </p>
            ),
          },
          {
            title: "16. Governing Law & Jurisdiction",
            content: (
              <p>
                This Privacy Policy shall be governed by the laws of India, and disputes shall fall under the jurisdiction of competent Indian courts.
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
            17. Contact Us
          </h2>
          <p className="mb-4">
            For privacy-related concerns or requests, contact:
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
    <Footer />
  </div>
  )
}

export default Page