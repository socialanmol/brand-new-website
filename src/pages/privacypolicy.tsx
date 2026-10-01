import React, { useState } from 'react';
import { Link } from 'react-router';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<'privacy' | 'grievance'>('privacy');

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Top Header */}
        <div className="text-center max-w-[700px] mx-auto mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full mb-3">
            Legal & Compliance
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">
            Trust & Transparency
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            At MyAnmol, safeguarding your personal data and ensuring effective grievance redressal are our highest priorities. Review our policies below.
          </p>
        </div>

        {/* Policy Toggle Tabs */}
        <div className="flex justify-center border-b border-[#E3E8F4] mb-10 overflow-x-auto">
          <button
            onClick={() => setActiveSection('privacy')}
            className={`py-3.5 px-8 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'privacy'
                ? 'border-[#1A3B9F] text-[#1A3B9F] bg-[#EEF2FB]/60 rounded-t-[8px]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveSection('grievance')}
            className={`py-3.5 px-8 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'grievance'
                ? 'border-[#1A3B9F] text-[#1A3B9F] bg-[#EEF2FB]/60 rounded-t-[8px]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Investor Grievance Redressal Policy
          </button>
        </div>

        {/* Content Container */}
        <div className="bg-white border border-[#E3E8F4] rounded-[24px] shadow-sm p-6 sm:p-10 space-y-10">
          
          {activeSection === 'privacy' ? (
            <div className="space-y-8">
              <div className="border-b border-[#E3E8F4] pb-5">
                <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
                  Privacy Policy
                </h2>
                <p className="text-xs text-[#6B7280] mt-1">Last updated: January 2026</p>
              </div>

              <div className="space-y-4 text-sm text-[#374151] leading-relaxed">
                <p>
                  At <b>MyAnmol</b>, we are committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use <a href="https://www.myanmol.com" className="text-[#1A3B9F] underline font-semibold">www.myanmol.com</a> or our mobile application.
                </p>
              </div>

              {/* Section 1 */}
              <div className="space-y-4">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">1</span>
                  Information We Collect
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280]">To provide financial services, we collect the following categories of information:</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#EEF2FB]/50 border border-[#E3E8F4] rounded-[16px] p-5 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F]">Personal Identifiers</h4>
                    <p className="text-xs text-[#374151] leading-relaxed">Name, date of birth, gender, and contact details (email, mobile number, and address).</p>
                  </div>
                  <div className="bg-[#EEF2FB]/50 border border-[#E3E8F4] rounded-[16px] p-5 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F]">KYC Information</h4>
                    <p className="text-xs text-[#374151] leading-relaxed">PAN card, Aadhaar details, signature, and other identity proofs required by SEBI/IRDAI.</p>
                  </div>
                  <div className="bg-[#EEF2FB]/50 border border-[#E3E8F4] rounded-[16px] p-5 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F]">Financial Data</h4>
                    <p className="text-xs text-[#374151] leading-relaxed">Bank account numbers, income details, and transaction history for processing investments through platforms like NSE NMF-II or BSE Star MF.</p>
                  </div>
                  <div className="bg-[#EEF2FB]/50 border border-[#E3E8F4] rounded-[16px] p-5 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F]">Usage Data</h4>
                    <p className="text-xs text-[#374151] leading-relaxed">IP address, browser type, and app usage patterns to improve our service.</p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4 pt-4 border-t border-[#E3E8F4]">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">2</span>
                  Purpose of Data Collection
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280]">We use your data strictly for:</p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#374151] list-disc pl-5">
                  <li>Processing your investment requests and insurance applications.</li>
                  <li>Verifying your identity as per mandatory KYC and Anti-Money Laundering (AML) laws.</li>
                  <li>Providing updates on your portfolio and new financial products.</li>
                  <li>Ensuring security and preventing fraudulent activities.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="space-y-4 pt-4 border-t border-[#E3E8F4]">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">3</span>
                  Data Sharing and Disclosure
                </h3>
                <p className="text-xs sm:text-sm text-[#374151]">We do not sell your personal data. We only share information with:</p>
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6AA32A] mt-2 shrink-0" />
                    <div className="text-xs sm:text-sm text-[#374151]"><b>Regulatory Bodies:</b> SEBI, IRDAI, or government agencies when required by law.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6AA32A] mt-2 shrink-0" />
                    <div className="text-xs sm:text-sm text-[#374151]"><b>Service Partners:</b> Asset Management Companies (AMCs), Registrars (CAMS/KFintech), and transaction platforms (NSE/BSE) to execute your orders.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6AA32A] mt-2 shrink-0" />
                    <div className="text-xs sm:text-sm text-[#374151]"><b>Security Providers:</b> Third-party tools used for encryption and secure data storage.</div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4 pt-4 border-t border-[#E3E8F4]">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">4</span>
                  Data Security
                </h3>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                  We use advanced Secure Socket Layer (SSL) encryption to protect your data during transmission. Access to your portfolio is restricted by your unique Login ID and Password. For your safety, our system automatically logs you out after 30 minutes of inactivity.
                </p>
              </div>

              {/* Section 5 */}
              <div className="space-y-4 pt-4 border-t border-[#E3E8F4]">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">5</span>
                  Your Rights (DPDP Act Compliance)
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280]">Under India's Digital Personal Data Protection (DPDP) Act, you have the right to:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-4 text-center">
                    <div className="font-bold text-xs text-[#856404] mb-1">Access & Correction</div>
                    <p className="text-[11px] text-[#374151]">Review and update your personal data.</p>
                  </div>
                  <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-4 text-center">
                    <div className="font-bold text-xs text-[#856404] mb-1">Withdraw Consent</div>
                    <p className="text-[11px] text-[#374151]">Opt-out of marketing communications at any time.</p>
                  </div>
                  <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-4 text-center">
                    <div className="font-bold text-xs text-[#856404] mb-1">Erasure</div>
                    <p className="text-[11px] text-[#374151]">Request deletion of non-essential data (subject to statutory retention periods).</p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="space-y-4 pt-4 border-t border-[#E3E8F4]">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">6</span>
                  Contact & Grievance Redressal
                </h3>
                <p className="text-xs sm:text-sm text-[#374151]">For privacy concerns or to exercise your data rights, please contact:</p>
                <div className="bg-[#EEF2FB] border border-[#C5D3F2] rounded-[16px] p-6 space-y-2 text-xs sm:text-sm text-[#374151]">
                  <div><b>Phone:</b> <a href="tel:+919742826665" className="text-[#1A3B9F] font-bold">+91-9742826665</a></div>
                  <div><b>Email:</b> <a href="mailto:mutualfunds@myanmol.com" className="text-[#1A3B9F] font-bold">mutualfunds@myanmol.com</a></div>
                  <div><b>Corporate Office:</b> 4th Floor, No. 39/1, 33rd Cross Road, Jayanagar 4th T Block, Bangalore 560041.</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="border-b border-[#E3E8F4] pb-5">
                <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
                  Investor Grievance Redressal Policy
                </h2>
                <p className="text-xs text-[#6B7280] mt-1">Anmol Share Broking Pvt. Ltd. — AMFI Registered Distributor (ARN: 114893)</p>
              </div>

              {/* 1. Objective */}
              <div className="space-y-3">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">1</span>
                  Objective
                </h3>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                  The objective of the policy is to address the grievances of the customers. One of the core values of our company is <b>“Customer first”</b> and we ensure that customers are satisfied with the services rendered by us. This policy has been formulated in order to ensure that grievances of the customers are effectively &amp; timely redressed.
                </p>
              </div>

              {/* 2. Policy & Handling */}
              <div className="space-y-6 pt-4 border-t border-[#E3E8F4]">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">2</span>
                  Policy &amp; Grievance Handling Framework
                </h3>

                <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-6 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#856404]">Dedicated Grievance Email</h4>
                  <p className="text-xs sm:text-sm text-[#374151]">
                    The company has a separately designated investor grievances email id <a href="mailto:grievance@myanmol.com" className="text-[#D97706] font-bold underline">grievance@myanmol.com</a> on which the client or investor can lodge a complaint. The designated email-id is prominently displayed on our website <a href="https://www.myanmol.com" className="text-[#1A3B9F] font-semibold underline">www.myanmol.com</a>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#EEF2FB]/50 border border-[#E3E8F4] rounded-[16px] p-5 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F]">Receipt of Complaint</h4>
                    <p className="text-xs text-[#374151] leading-relaxed">
                      Complaints can be received directly from clients via physical letters, fax, email, phone, or personal visits. Handling is centralized at the Compliance Department in our Corporate Office.
                    </p>
                  </div>

                  <div className="bg-[#EEF2FB]/50 border border-[#E3E8F4] rounded-[16px] p-5 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F]">Recording &amp; Registers</h4>
                    <p className="text-xs text-[#374151] leading-relaxed">
                      A Complaint Register is maintained per SEBI and Exchange directives. Complaints are recorded serially under the supervision of the Senior Manager.
                    </p>
                  </div>
                </div>

                {/* Resolution Workflow */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#6B7280]">Redressal &amp; Escalation Timeline</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#374151] list-disc pl-5">
                    <li>The Senior Manager ensures complaints are redressed at the earliest without delay.</li>
                    <li>If there is no response from the concerned department/officials within <b>7 working days</b>, the matter is escalated directly to the <b>Compliance Officer</b>.</li>
                    <li>The company has set a target period of a <b>maximum of 30 days</b> for complete redressal and prompt reply to the investor.</li>
                    <li>Once resolved or closed, the Compliance Officer provides the final sign-off.</li>
                  </ul>
                </div>

                {/* Review & MIS */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#6B7280]">Review &amp; Board Oversight</h4>
                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                    The Senior Manager regularly monitors and reviews complaints by nature, branch, or employee to strengthen systems. A MIS report of complaints received, pending, and resolved during each quarter is placed before the <b>Board of Directors</b> for review and necessary guidance.
                  </p>
                </div>
              </div>

              {/* 3. Maintenance of Records */}
              <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">3</span>
                  Maintenance of Records
                </h3>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                  The Complaint Register and related records will be maintained for such period as prescribed by the respective regulatory authorities.
                </p>
              </div>

              {/* 4. Review of Policy */}
              <div className="space-y-3 pt-4 border-t border-[#E3E8F4]">
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xs font-extrabold shrink-0">4</span>
                  Review of the Policy
                </h3>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                  This policy is reviewed as and when management thinks fit or whenever changes are mandated by statutory authorities.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}