import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg max-w-3xl p-8 border border-gray-200">
        <h1 className=" text-4xl md:text-5xl  lg:text-6xl text-center font-bold text-gray-700 mb-10">
          Terms of Service
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Welcome to QuickBGRemove. By using our services, you agree to the
          following terms and conditions. Please read them carefully.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">
          Service Description
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          QuickBGRemove provides a service that removes backgrounds from images.
          Our service is offered "as is" without any warranties or guarantees
          regarding the accuracy or quality of the output.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">
          User Responsibilities
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          By using QuickBGRemove, you agree not to misuse our service. You must
          not attempt to disrupt or interfere with the service, and you are
          responsible for all activities conducted under your account.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">
          Account Registration
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          To use our service, you must create an account and provide accurate
          information. You are responsible for maintaining the confidentiality
          of your account and password.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">
          Termination
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We reserve the right to suspend or terminate your account if you
          violate these terms or engage in any activity that disrupts or abuses
          the service.
        </p>
        <h2 className="text-xl font-semibold text-indigo-600 mt-6">
          Changes to Terms
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We may modify these terms at any time. Changes will be posted on this
          page, and your continued use of the service indicates acceptance of
          the new terms.
        </p>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about our Terms of Service, please contact
          us at support@quickbgremove.com.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
