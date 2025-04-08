import React from 'react';

const PrivacyPolicyPage = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
    
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-center items-center">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Collector</h1>
      </header>

      {/* Main Content */}
      <main className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl text-left m-5">
        <h2 className="text-3xl font-bold mb-6 text-white">Privacy Policy for Collector</h2>
        <p className="text-sm text-gray-400 mb-4">
          Effective Date: <span className="text-white">19/11/2024</span>
        </p>

        <div className="space-y-6 text-gray-300">
          <h3 className="text-xl font-semibold">1. Information We Collect</h3>
          <p>
            We may collect the following types of information when you use our services:
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Personal Information:</strong> When you create an account or place bets, we collect personal details such as your name, email address, date of birth, and payment information.</li>
            <li><strong>Account Information:</strong> This includes your username, password, account activity, and preferences.</li>
            <li><strong>Usage Data:</strong> We collect information about how you interact with our website, such as the pages you visit, the links you click, and the bets you place.</li>
          </ul>

          <h3 className="text-xl font-semibold">2. How We Use Your Information</h3>
          <p>
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-5">
            <li><strong>To Provide Services:</strong> To create and manage your account, process bets, and manage transactions.</li>
            <li><strong>Customer Support:</strong> To respond to your inquiries, resolve issues, and provide assistance.</li>
            <li><strong>Improvement of Services:</strong> To analyze your usage patterns to enhance the functionality and performance of our platform.</li>
            <li><strong>Marketing:</strong> We may send you promotional materials related to our services, but you can opt out of these communications at any time.</li>
            <li><strong>Legal Compliance:</strong> We may use your data to comply with legal obligations, such as verifying your age or identity when required.</li>
          </ul>

          <h3 className="text-xl font-semibold">3. Data Sharing and Disclosure</h3>
          <p>
            We do not sell or rent your personal information to third parties. However, we may share your data under the following circumstances:
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist in operating our platform (e.g., payment processors, hosting services).</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or to protect our rights, property, or safety, or the rights, property, or safety of others.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</li>
          </ul>

          <h3 className="text-xl font-semibold">4. Security of Your Information</h3>
          <p>
            We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee the absolute security of your data.
          </p>

          <h3 className="text-xl font-semibold">5. Your Rights</h3>
          <p>
            Depending on your jurisdiction, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
            <li><strong>Correction:</strong> You can request that we correct or update any inaccurate or incomplete information.</li>
            <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to certain legal restrictions.</li>
            <li><strong>Opt-Out:</strong> You can opt out of receiving marketing communications from us at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at the contact details provided below.
          </p>

          <h3 className="text-xl font-semibold">6. Children’s Privacy</h3>
          <p>
            Collector does not knowingly collect or solicit personal information from anyone under the age of 18. If we learn that we have collected personal data from a child under the age of 18 without verification of parental consent, we will delete that information as soon as possible.
          </p>
          <h3 className="text-xl font-semibold">7. Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make updates, we will revise the effective date at the top of this policy. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
