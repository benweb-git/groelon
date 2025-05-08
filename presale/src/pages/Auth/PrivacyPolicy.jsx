import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useHomeDetails } from '../../hooks/useHomeDetails';

const PrivacyPolicyPage = () => {
  const homeDetails = useHomeDetails();
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation Bar */}
     <Header  homeDetails={homeDetails}/>
      {/* Privacy Policy Content */}
      <div className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <p className="text-gray-300 mb-8">
            Thank you for visiting the {homeDetails?.homeDetails?.TokenName} platform. Your privacy is important to us, and we are committed to protecting your personal information. This policy explains how we collect, use, and disclose your personal data when you use our website and services. By using our website and services, you agree to the terms of this policy.
          </p>

          {/* What information do we collect? */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">What information do we collect?</h2>
            <p className="text-gray-300 mb-3">
              We may collect the following information from you when you use our website and services:
            </p>
            <ul className="text-gray-300 list-disc pl-5 space-y-2">
              <li>Personal information such as your name, email address, phone number, and other contact information</li>
              <li>Cryptocurrency wallet addresses and transaction information</li>
              <li>Technical information such as your IP address, browser type, and operating system</li>
              <li>Usage information such as pages visited, time spent on the website, and links clicked</li>
            </ul>
          </div>

          {/* How do we use your information? */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">How do we use your information?</h2>
            <p className="text-gray-300 mb-3">
              We use your personal data to provide you with our website and services, to communicate with you, and to improve our services. Specifically, we may use your information for the following purposes:
            </p>
            <ul className="text-gray-300 list-disc pl-5 space-y-2">
              <li>To process your transactions and verify your identity</li>
              <li>To send you important updates and notifications about our services</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To personalize your experience on our website</li>
              <li>To improve our website and services</li>
            </ul>
          </div>

          {/* How do we protect your information? */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">How do we protect your information?</h2>
            <p className="text-gray-300">
              We take appropriate measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. We use industry-standard security measures such as firewalls, encryption, and secure servers. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </div>

          {/* Do we share your information with third parties? */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Do we share your information with third parties?</h2>
            <p className="text-gray-300">
              We may share your personal data with third-party service providers such as payment processors, customer support providers, and analytics providers. We only share your information with third parties who have agreed to protect your privacy and use your data for the intended purpose. We may also disclose your information if required by law or in response to a valid legal request.
            </p>
          </div>

          {/* What are your rights? */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">What are your rights?</h2>
            <p className="text-gray-300">
              You have certain rights with respect to your personal information, including the right to access, correct, and delete your data. You may also have the right to object to or restrict certain types of processing. If you wish to exercise any of these rights, please contact us using the contact information below.
            </p>
          </div>

          {/* Updates to this policy */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Updates to this policy</h2>
            <p className="text-gray-300">
              We may update this policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this policy periodically for any updates. Your continued use of our website and services after any changes to this policy will constitute your acceptance of such changes.
            </p>
          </div>
        </div>
      </div>
      <Footer  homeDetails={homeDetails}/>
    </div>
  );
};

export default PrivacyPolicyPage;