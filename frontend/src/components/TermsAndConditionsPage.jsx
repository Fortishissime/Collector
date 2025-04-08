import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditionsPage = () => {
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
      <main className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl text-justify m-5">
        <h2 className="text-3xl font-bold mb-6 text-white">Terms and Conditions of Use</h2>
        <p className="text-sm text-gray-400 mb-4">
          Effective Date: <span className="text-white">19/11/2024</span>
        </p>

        <div className="space-y-6 text-gray-300">
          <h3 className="text-xl font-semibold">1. Eligibility</h3>
          <p>
            You must be at least 18 years of age or the legal age of majority in your jurisdiction to use the Service.
            By accessing or using the Service, you confirm that you are not prohibited from participating in online betting or gambling activities under the laws of your country of residence.
          </p>

          <h3 className="text-xl font-semibold">2. Account Registration</h3>
          <p>
            To place bets, you must create an account with Collector.
            You agree to provide accurate, current, and complete information during registration, and to update such information as necessary to keep your account current.
            You are solely responsible for maintaining the confidentiality of your account information, including your username and password.
          </p>

          <h3 className="text-xl font-semibold">3. Betting</h3>
          <p>
            Collector provides a platform for placing bets on League of Legends esports events and matches. All bets must be placed within the boundaries of the laws of your jurisdiction.
            All bets are final, and once confirmed, they cannot be changed, cancelled, or refunded, except in cases where there is an error in the bet placement process.
            The odds for each bet are determined by Collector and are subject to change.
          </p>

          <h3 className="text-xl font-semibold">4. Responsible Gambling</h3>
          <p>
            Collector is committed to promoting responsible gambling. If you feel you may have a gambling problem, we encourage you to seek help.
            We provide tools to set deposit limits, session limits, and other responsible gambling measures. You may also request to self-exclude from using our services.
          </p>

          <h3 className="text-xl font-semibold">5. Deposits and Withdrawals</h3>
          <p>
            You may deposit funds into your account using various payment methods available on the platform.
            Withdrawals are subject to verification procedures, and you may need to provide identification to process withdrawals.
            Collector reserves the right to impose limits on deposits and withdrawals.
          </p>

          <h3 className="text-xl font-semibold">6. Prohibited Activities</h3>
          <p>
            You agree not to engage in any fraudulent or illegal activities, including but not limited to, match-fixing, manipulation of bets, or using cheating software in League of Legends matches.
            Any accounts found to be involved in such activities will be immediately suspended and may be subject to legal action.
          </p>

          <h3 className="text-xl font-semibold">7. Intellectual Property</h3>
          <p>
            All content on the Collector website, including logos, trademarks, and intellectual property, is owned by Collector or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            You may not use, copy, modify, or distribute any content from the Service without our express permission.
          </p>

          <h3 className="text-xl font-semibold">8. Limitation of Liability</h3>
          <p>
            Collector is not liable for any losses, damages, or costs resulting from your use of the Service or from placing bets.
            We do not guarantee the accuracy or completeness of any information displayed on the website and are not responsible for any errors or omissions.
          </p>

          <h3 className="text-xl font-semibold">9. Privacy</h3>
          <p>
            Your use of the Service is also governed by our Privacy Policy, which can be found <Link to="/privacy" onClick={scrollToTop} className="text-blue-500 hover:underline">here</Link>.
            By using the Service, you consent to our collection, use, and sharing of your personal information as described in the Privacy Policy.
          </p>

          <h3 className="text-xl font-semibold">10. Termination</h3>
          <p>
            Collector reserves the right to suspend or terminate your account if you violate these Terms or if we believe your actions are detrimental to the integrity of the Service.
            You may also terminate your account at any time by contacting customer support.
          </p>

          <h3 className="text-xl font-semibold">11. Dispute Resolution</h3>
          <p>
            Any disputes or claims arising out of or in connection with these Terms shall be governed by the laws of France.
            You agree to resolve any disputes through binding arbitration, rather than through a court proceeding.
          </p>


          <h3 className="text-xl font-semibold">12. No affiliation with Riot Games</h3>
          <p>
            Collector is not affiliated with Riot Games, nor any of its parent or subsidiary entities, including Tencent. 
            All use of League of Legends in connection with the Service is for entertainment purposes only.
          </p>

          <h3 className="text-xl font-semibold">13. Changes to Terms</h3>
          <p>
            Collector reserves the right to update these Terms at any time. Any changes will be posted on this page with an updated effective date. Continued use of the Service after changes are posted constitutes your acceptance of the new Terms.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;
