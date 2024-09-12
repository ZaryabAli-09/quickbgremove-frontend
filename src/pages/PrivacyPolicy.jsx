import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg max-w-3xl p-8 border border-gray-200">
        <h1 className=" text-4xl md:text-5xl  lg:text-6xl text-center font-bold text-gray-700 mb-10">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          At QuickBGRemove, we value your privacy. This Privacy Policy outlines
          the types of personal information that is received and collected when
          you use our website, and how we safeguard your information. We do not
          sell, share, or trade any of your information to third parties.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">
          Information We Collect
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          When you sign up on QuickBGRemove, we collect your email address and
          other basic details necessary for creating your account. This
          information is used solely to provide access to our background removal
          service.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">
          How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The information we collect from you is used to personalize your
          experience and improve our services. We use your email address to send
          occasional updates, newsletters, or important service announcements.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">Security</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We take your security seriously and use reasonable measures to protect
          your information. However, please note that no method of transmission
          over the Internet or electronic storage is 100% secure.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">
          Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We may update our Privacy Policy from time to time. Any changes will
          be posted on this page, and your continued use of the service will
          constitute your acknowledgment of the modifications.
        </p>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about our Privacy Policy, please contact us
          at support@quickbgremove.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
