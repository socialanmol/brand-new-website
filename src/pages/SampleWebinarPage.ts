import React, { useState } from 'react';
import { Calendar, Clock, Users, User, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function WebinarPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', profession: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsRegistered(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header Banner */}
      <header className="bg-indigo-900 text-white py-12 px-6 lg:px-20 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="bg-indigo-700 text-indigo-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              MyAnmol Investor's Classroom
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-3">Mutual Funds 101: Everything a beginner needs to know</h1>
            <p className="text-indigo-200 mt-2 text-lg">Demystifying mutual funds, SIPs, and asset compounding for first-time investors.</p>
          </div>
          <div className="mt-6 md:mt-0 bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 text-center min-w-[200px]">
            <p className="text-sm text-indigo-200">Date</p>
            <p className="text-xl font-bold">19 November</p>
            <p className="text-xs text-indigo-300 mt-1">7:00 PM – 8:00 PM IST</p>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-5xl mx-auto px-6 lg:px-20 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div>
              <Users className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Enrolled</p>
              <p className="text-lg font-bold text-slate-900">180+ Users</p>
            </div>
            <div>
              <Clock className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Duration</p>
              <p className="text-lg font-bold text-slate-900">60 Minutes</p>
            </div>
            <div>
              <ShieldCheck className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
              <p className="text-xs text-slate-500">Format</p>
              <p className="text-lg font-bold text-slate-900">Live Q&A</p>
            </div>
          </div>

          {/* Description */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About This Webinar</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Are you looking to make your money work harder for you but feel overwhelmed by market jargon? Join our structured masterclass designed specifically for first-time investors. Learn how mutual funds function behind the scenes, how equity and debt interact, and how to start your wealth creation journey safely.
            </p>
          </section>

          {/* Benefits */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Benefits Seen After Enrolling</h2>
            <ul className="space-y-3">
              {[
                "Gain total clarity on equity, debt, and hybrid mutual fund categories.",
                "Learn how to calculate and leverage the power of long-term compounding.",
                "Avoid costly beginner errors like panic-selling during market corrections.",
                "Receive a complimentary MyAnmol beginner's digital workbook and action checklist."
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Instructor Bio */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl shrink-0">
              TR
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Team Mutual Fund (Senior Research Analyst)</h3>
              <p className="text-indigo-600 text-sm font-medium mb-2">MyAnmol Research & Advisory Cell</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Specialized in quantitative fund analysis, portfolio construction, and investor behavioral trends. Dedicated to transforming complex financial metrics into simple, actionable steps for everyday investors.
              </p>
            </div>
          </section>

          {/* Related Topics */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Explore Related Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["SIP vs Lumpsum: Which is better?", "The Power of Compounding", "How to select the right mutual fund", "Mutual Fund Portfolio Review"].map((topic, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition flex justify-between items-center cursor-pointer">
                  <span className="text-sm font-medium text-slate-700">{topic}</span>
                  <ArrowRight className="w-4 h-4 text-indigo-600" />
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Registration Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 sticky top-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Your Seat</h3>
            <p className="text-xs text-slate-500 mb-6">Register now to reserve your spot and receive direct calendar invites.</p>

            {isRegistered ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-emerald-900">You're Registered!</h4>
                <p className="text-xs text-emerald-700">We’ve sent the meeting link and workbook details to your email.</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210" 
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Profession / Status</label>
                  <select 
                    value={formData.profession}
                    onChange={(e) => setFormData({...formData, profession: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">Select category</option>
                    <option value="salaried">Salaried Individual</option>
                    <option value="professional">Working Professional</option>
                    <option value="business">Business Owner / Entrepreneur</option>
                    <option value="student">Student / Young Earner</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-md mt-2"
                >
                  Confirm Free Registration
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-3">By registering, you agree to receive educational updates and session reminders from MyAnmol.</p>
              </form>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}