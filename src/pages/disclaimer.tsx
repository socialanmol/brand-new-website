import React from 'react';

export default function Disclaimer() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[1000px] mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="text-center max-w-[700px] mx-auto mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full mb-3">
            Legal & Compliance
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">
            Disclaimer & Legal Terms
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Anmol Share Broking Pvt. Ltd. — AMFI-Registered Mutual Fund Distributor (ARN: 114893). Please review our terms, privacy practices, and disclaimers below.
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-[#E3E8F4] rounded-[24px] shadow-sm p-6 sm:p-10 space-y-8 text-sm text-[#374151] leading-relaxed">
          
          {/* Mutual Fund General Risk Notice */}
          <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-6 space-y-3">
            <h3 className="font-[var(--fd)] text-base font-bold text-[#856404]">
              Mutual Fund Investment Risk Notice
            </h3>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market including the fluctuations in the interest rates. The past performance of the mutual funds is not necessarily indicative of future performance of the schemes. The Mutual Fund is not guaranteeing or assuring any dividend under any of the schemes and the same is subject to the availability and adequacy of distributable surplus. Investors are requested to review the prospectus carefully and obtain expert professional advice with regard to specific legal, tax and financial implications of the investment/participation in the scheme.
            </p>
          </div>

          {/* Website Authenticity */}
          <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
            <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540]">
              Authenticity of Information & Liability
            </h3>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              While all efforts have been taken to make this web site as authentic as possible, please refer to the print versions, notified Gazette copies of Acts/Rules/Regulations for authentic version or for use before any authority. We will not be responsible for any loss to any person/entity caused by any short-coming, defect or inaccuracy inadvertently or otherwise.
            </p>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              This is to confirm that all the advices and data provided in the website are extracted from some third party source or have been bought for the purpose of representations. Any error or mistakes there in should be reported to us immediately. We are not responsible for any loss due to the mistakes, error or our general advisory provided here on the website.
            </p>
          </div>

          {/* User Data & Privacy Overview */}
          <div className="space-y-4 pt-4 border-t border-[#E3E8F4]">
            <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540]">
              Terms of Use & Data Governance
            </h3>
            <p className="text-xs sm:text-sm text-[#374151]">
              By using the website <a href="https://www.myanmol.com" className="text-[#1A3B9F] underline font-semibold">www.myanmol.com</a> and <a href="https://mf.myanmol.in" className="text-[#1A3B9F] underline font-semibold">https://mf.myanmol.in</a> and signing up for our services, (<b>"ANMOL SHARE BROKING PRIVATE LIMITED"</b> or <b>"Services"</b>), or providing us your personal information for any other purpose, you agree to this Privacy Policy and have read our disclaimers properly.
            </p>
            <p className="text-xs sm:text-sm text-[#374151]">
              ANMOL SHARE BROKING PRIVATE LIMITED's key objective is to provide personalized and customized investment solution to their clients under the given frame work and compliance laid down by SEBI and AMFI. We are a registered distributor for mutual fund and have qualified members in the organization to create and counsel on financial planning's of individuals.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
            <h4 className="font-[var(--fd)] text-base font-bold text-[#091540]">
              1. Using ANMOL SHARE BROKING PRIVATE LIMITED as a Visitor
            </h4>
            <p className="text-xs sm:text-sm text-[#6B7280]">If you are a first-time visitor to ANMOL SHARE BROKING PRIVATE LIMITED:</p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#374151] list-disc pl-5">
              <li>We don't know who you are.</li>
              <li>We collect technical data about your interaction with the Services (pages visited, IP address, device unique identifier, browser plugins, crashes, system activity, hardware settings, date/time, and cookies).</li>
              <li>We use this data to analyze how you use our website and improve the services provided.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
            <h4 className="font-[var(--fd)] text-base font-bold text-[#091540]">
              2. Using ANMOL SHARE BROKING PRIVATE LIMITED as a Registered User
            </h4>
            <p className="text-xs sm:text-sm text-[#6B7280]">If you have provided us your email address:</p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#374151] list-disc pl-5">
              <li>You are a registered user of ANMOL SHARE BROKING PRIVATE LIMITED.</li>
              <li>You may be asked to give us additional information such as your name or mobile number.</li>
              <li>We collect technical data about your interaction with the Services.</li>
              <li>We use all collected data to respond to queries, deliver notices/alerts, and offer relevant products/services (with an option to opt-out).</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
            <h4 className="font-[var(--fd)] text-base font-bold text-[#091540]">
              3. Using ANMOL SHARE BROKING PRIVATE LIMITED as an Investor
            </h4>
            <p className="text-xs sm:text-sm text-[#6B7280]">If you wish to start investing in mutual funds through ANMOL SHARE BROKING PRIVATE LIMITED:</p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#374151] list-disc pl-5">
              <li>Basic registration info (email address and password).</li>
              <li>Personal details (name, address, age, marital status, sex, and income).</li>
              <li>Financial information (bank account and payment instrument details).</li>
              <li>Used to process your orders on platforms like BSE Star MF or approved transaction gateways.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
            <h4 className="font-[var(--fd)] text-base font-bold text-[#091540]">
              4. How We Use Your Data & KYC Verification
            </h4>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              Your email address is used to send service updates. Passwords are encrypted and never known or shared with anyone. For regulatory compliance, we verify your identity against databases maintained by KYC Registration Agencies (KRAs) registered under SEBI and UIDAI. Authorized cloud service providers assist with database maintenance and messaging under strict contractual confidentiality standards.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
            <h4 className="font-[var(--fd)] text-base font-bold text-[#091540]">
              5. Data Privacy & No Selling Policy
            </h4>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              Under no circumstance will we sell or rent your personal information to anyone, for any reason, at any time. Under Indian law, ANMOL SHARE BROKING PRIVATE LIMITED remains liable to you for any unauthorized disclosure of your sensitive personal information.
            </p>
          </div>

          {/* Section 6 & 7 */}
          <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
            <h4 className="font-[var(--fd)] text-base font-bold text-[#091540]">
              6 & 7. Security Practices & Legal Obligations (IT Act, 2000)
            </h4>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              We follow industry best practices under the (Indian) Information Technology Act, 2000 and Section 43A. Under Rule 5 of IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, you have the right to request a readable copy of your personal data by contacting us.
            </p>
          </div>

          {/* Regulatory Summary Footer */}
          <div className="bg-[#EEF2FB] border border-[#C5D3F2] rounded-[16px] p-6 space-y-2 text-xs sm:text-sm text-[#374151]">
            <p>
              <b>Regulatory Status:</b> Anmol Share Broking Private Limited (“Anmol”) is a mutual fund distributor (ARN 114893) registered with AMFI. Certain products and services offered may not be traded on the exchange; disputes regarding distribution activity do not have access to Exchange Investor Redressal Forums or Arbitration mechanisms.
            </p>
            <p>
              <b>Intellectual Property:</b> All content including images, charts, graphics, and pictures are protected intellectual properties and cannot be copied or distributed without prior written permission.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}