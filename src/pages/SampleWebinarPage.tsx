import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Clock, Users, CheckCircle, ArrowRight, ShieldCheck, Share2, Award, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { saveForm } from '../lib/saveForm';

export default function WebinarPage() {
  // State for Registration Flow & Poll
  const [step, setStep] = useState<'form' | 'poll' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    slot: 'November 12 | 6:30 PM – 7:30 PM IST'
  });
  const [pollAnswer, setPollAnswer] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Image Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80"
  ];

  // Testimonial Carousel State (5 testimonials)
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    { quote: "Mohit's budgeting framework completely transformed how I handle my monthly salary. Highly practical!", name: "Rahul Sharma", role: "Software Engineer" },
    { quote: "The 2-bank approach was an eye-opener. I finally have control over my savings vs spending.", name: "Ananya Deshmukh", role: "Marketing Specialist" },
    { quote: "Clear, jargon-free, and extremely actionable. Every young earner should attend this masterclass.", name: "Karan Mehta", role: "Financial Analyst" },
    { quote: "The session gave me a structured roadmap to build my first 10 lakh without stressing over every rupee.", name: "Priya Nair", role: "HR Professional" },
    { quote: "Engaging presentation style and incredible insights into smart cash flow habits.", name: "Vikram Malhotra", role: "Operations Manager" }
  ];

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.location) {
      setStep('poll');
    }
  };

  const handlePollSubmit = async () => {
    if (!pollAnswer || saving) return;
    setSaving(true);
    setError('');
    try {
      await saveForm('seminar-mutual-funds-101', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        slot: formData.slot.trim(),
        poll: pollAnswer,
      });
      setStep('success');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'We could not save your registration. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'How to manage your salary better: Save, Spend & Invest',
        text: 'Join this incredible masterclass with MyAnmol!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert('Webinar link copied to clipboard!');
    }
  };

  return (
    <div className="font-['Montserrat',sans-serif] bg-white text-[#111827] antialiased min-h-screen">
      
      {/* Header Banner & Image Slider */}
      <div className="bg-[#091540] text-white py-12 px-5 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <Link to="/insights/seminars" className="inline-flex text-xs font-bold text-white/70 hover:text-white mb-6">
            ← Back to Seminars &amp; Workshops
          </Link>
          
          {/* Badge & Title */}
          <div className="flex justify-between items-center flex-wrap gap-4 border-b border-white/10 pb-8 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full mb-3">
                MyAnmol Money Matters Masterclass
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                How to manage your salary better: Save, Spend &amp; Invest
              </h1>
              <p className="text-xs sm:text-sm text-white/80 mt-2 font-light">
                Next Batch Date: <span className="text-white font-bold">November 12; November 16</span>
              </p>
            </div>
            
            {/* Share Button */}
            <button 
              onClick={handleShare}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Webinar Link</span>
            </button>
          </div>

          {/* 3-Image Slider Component */}
          <div className="relative w-full h-72 sm:h-96 rounded-[20px] overflow-hidden shadow-lg border border-white/10">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={img} alt="Webinar Slide" className="w-full h-full object-cover brightness-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091540]/90 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <span className="bg-[#6AA32A] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                    Featured Masterclass Series
                  </span>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* Countdown Timer Bar */}
      <div className="bg-[#1A3B9F] text-white py-4 px-5 sm:px-8 shadow-sm">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm font-semibold text-white/90">Registration closes soon. Time remaining until event:</p>
          <div className="flex gap-3 text-center">
            <div className="bg-white/10 px-3 py-1.5 rounded-[8px] border border-white/20">
              <span className="text-base font-extrabold">{timeLeft.days}</span> <span className="text-[10px] uppercase text-white/80">Days</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-[8px] border border-white/20">
              <span className="text-base font-extrabold">{timeLeft.hours}</span> <span className="text-[10px] uppercase text-white/80">Hours</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-[8px] border border-white/20">
              <span className="text-base font-extrabold">{timeLeft.minutes}</span> <span className="text-[10px] uppercase text-white/80">Mins</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-[8px] border border-white/20">
              <span className="text-base font-extrabold">{timeLeft.seconds}</span> <span className="text-[10px] uppercase text-white/80">Secs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-[1000px] mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F8FAFE] p-6 rounded-[20px] border border-[#E3E8F4] text-center">
            <div className="space-y-1">
              <Users className="w-5 h-5 text-[#1A3B9F] mx-auto mb-1" />
              <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Users Enrolled</p>
              <p className="text-base font-extrabold text-[#091540]">145 participants</p>
            </div>
            <div className="space-y-1">
              <Clock className="w-5 h-5 text-[#1A3B9F] mx-auto mb-1" />
              <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Time Slot</p>
              <p className="text-sm font-extrabold text-[#091540]">6:30 PM – 7:30 PM IST</p>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#6AA32A] mx-auto mb-1" />
              <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Format</p>
              <p className="text-xs font-bold text-[#091540]">Pre-recorded sessions / Live Q&amp;A / Live MasterClass</p>
            </div>
          </div>

          {/* Description */}
          <section className="bg-white p-8 rounded-[20px] border border-[#E3E8F4] shadow-sm space-y-3">
            <h2 className="text-2xl font-bold text-[#091540]">Description</h2>
            <p className="text-sm sm:text-base text-[#374151] font-light leading-relaxed">
              A practical entry-level masterclass for young earners on optimizing take-home pay, smart budgeting, and building healthy cash flow habits.
            </p>
          </section>

          {/* Benefits */}
          <section className="bg-white p-8 rounded-[20px] border border-[#E3E8F4] shadow-sm space-y-3">
            <h2 className="text-2xl font-bold text-[#091540]">Benefits Seen After Enrolling</h2>
            <p className="text-sm sm:text-base text-[#374151] font-light leading-relaxed">
              Clear understanding of monthly cash allocation, reduced impulse spending, and a structured approach to initial savings.
            </p>
          </section>

          {/* Instructor Bio */}
          <section className="bg-white p-8 rounded-[20px] border border-[#E3E8F4] shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-[#EEF2FB] text-[#1A3B9F] rounded-full flex items-center justify-center font-extrabold text-2xl shrink-0 border border-[#C5D3F2]">
              M
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#091540]">Instructor Name: Mohit</h3>
              <p className="text-xs font-bold text-[#6AA32A] uppercase tracking-wider">Lead Wealth Strategist, MyAnmol</p>
              <p className="text-xs sm:text-sm text-[#6B7280] font-light leading-relaxed pt-1">
                Founder &amp; Lead Wealth Strategist at MyAnmol, specializing in personal finance, financial independence frameworks, and client advisory with over a decade of industry expertise.
              </p>
            </div>
          </section>

          {/* Related Topics */}
          <section className="bg-white p-8 rounded-[20px] border border-[#E3E8F4] shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-[#091540]">Check Out Other Topics Related to This Topic</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                "The 2-bank approach to better budgeting",
                "10 money mistakes that can cost you lakhs",
                "How much should you save from your monthly income?"
              ].map((topic, i) => (
                <div key={i} className="p-4 rounded-[16px] border border-[#E3E8F4] bg-[#F8FAFE] hover:border-[#1A3B9F] transition flex flex-col justify-between cursor-pointer">
                  <span className="text-xs font-bold text-[#091540] mb-3 leading-snug">{topic}</span>
                  <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase text-[#1A3B9F]">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social Proof & Testimonials Carousel */}
          <section className="bg-white p-8 rounded-[20px] border border-[#E3E8F4] shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#091540]">Social Proof &amp; Testimonials</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 rounded-full border border-[#E3E8F4] hover:bg-[#EEF2FB] transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-[#091540]" />
                </button>
                <button 
                  onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}
                  className="p-2 rounded-full border border-[#E3E8F4] hover:bg-[#EEF2FB] transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-[#091540]" />
                </button>
              </div>
            </div>
            
            <div className="bg-[#EEF2FB] border border-[#C5D3F2] p-6 rounded-[16px] relative space-y-3">
              <Award className="w-6 h-6 text-[#1A3B9F]" />
              <p className="text-sm sm:text-base text-[#091540] font-light italic leading-relaxed">"{testimonials[currentTestimonial].quote}"</p>
              <div>
                <p className="font-bold text-[#091540] text-xs">{testimonials[currentTestimonial].name}</p>
                <p className="text-[11px] font-semibold text-[#1A3B9F]">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Registration Card / Interactive Poll */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-sm border border-[#E3E8F4] sticky top-8 space-y-6">
            
            {/* Step 1: Registration Form */}
            {step === 'form' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#091540]">Reserve Your Spot</h3>
                  <p className="text-xs text-[#6B7280] mt-1 font-light">Fill in your details to proceed to the pre-webinar questionnaire.</p>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-extrabold text-[#1A3B9F] uppercase tracking-wider">Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-11 px-4 text-xs font-mono bg-[#EEF2FB] border border-[#C5D3F2] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1A3B9F] text-[#091540]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-extrabold text-[#1A3B9F] uppercase tracking-wider">Email ID</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full h-11 px-4 text-xs font-mono bg-[#EEF2FB] border border-[#C5D3F2] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1A3B9F] text-[#091540]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-extrabold text-[#1A3B9F] uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full h-11 px-4 text-xs font-mono bg-[#EEF2FB] border border-[#C5D3F2] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1A3B9F] text-[#091540]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-extrabold text-[#1A3B9F] uppercase tracking-wider">Current Location</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Bengaluru" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full h-11 px-4 text-xs font-mono bg-[#EEF2FB] border border-[#C5D3F2] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1A3B9F] text-[#091540]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-extrabold text-[#1A3B9F] uppercase tracking-wider">Date and Time Slot</label>
                    <select 
                      value={formData.slot}
                      onChange={(e) => setFormData({...formData, slot: e.target.value})}
                      className="w-full h-11 px-4 text-xs font-mono bg-[#EEF2FB] border border-[#C5D3F2] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1A3B9F] text-[#091540]"
                    >
                      <option value="November 12 | 6:30 PM – 7:30 PM IST">November 12 | 6:30 PM – 7:30 PM IST</option>
                      <option value="November 16 | 6:30 PM – 7:30 PM IST">November 16 | 6:30 PM – 7:30 PM IST</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full h-11 bg-[#1A3B9F] hover:bg-[#132d7c] text-white font-extrabold text-xs uppercase tracking-wider rounded-[8px] transition cursor-pointer shadow-sm mt-2"
                  >
                    Next: Pre-Webinar Poll
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Interactive Pre-Webinar Poll */}
            {step === 'poll' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold text-[#6AA32A] uppercase tracking-widest bg-[#EFF8E2] px-2.5 py-1 rounded-full">Step 2 of 2</span>
                  <h3 className="text-xl font-bold text-[#091540] mt-2">Quick Question</h3>
                  <p className="text-xs text-[#6B7280] font-light mt-1">Please answer the poll question below to complete your registration.</p>
                </div>

                <div className="bg-[#EEF2FB] p-4 rounded-[16px] border border-[#C5D3F2] space-y-3">
                  <div className="flex items-start gap-2 text-[#091540] font-bold text-xs">
                    <MessageSquare className="w-4 h-4 text-[#1A3B9F] shrink-0 mt-0.5" />
                    <span>What is your primary financial goal for the next 12 months?</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    {[
                      "Building an emergency fund & better budgeting",
                      "Starting my first mutual fund SIP",
                      "Clearing existing debt / loans",
                      "Planning for retirement / long-term wealth"
                    ].map((option, idx) => (
                      <label key={idx} className={`flex items-center gap-3 p-3 rounded-[8px] border cursor-pointer transition text-xs ${pollAnswer === option ? 'border-[#1A3B9F] bg-white text-[#091540] font-bold shadow-sm' : 'border-[#C5D3F2]/60 bg-white/50 text-[#374151] hover:bg-white'}`}>
                        <input 
                          type="radio" 
                          name="poll" 
                          value={option}
                          checked={pollAnswer === option}
                          onChange={(e) => setPollAnswer(e.target.value)}
                          className="text-[#1A3B9F] focus:ring-[#1A3B9F]"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setStep('form')}
                    className="w-1/3 h-11 border border-[#E3E8F4] text-[#374151] font-bold rounded-[8px] text-xs hover:bg-[#EEF2FB] transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    disabled={!pollAnswer || saving}
                    onClick={handlePollSubmit}
                    className={`w-2/3 h-11 font-extrabold text-xs uppercase tracking-wider rounded-[8px] transition shadow-sm ${pollAnswer && !saving ? 'bg-[#6AA32A] hover:bg-[#5b8c24] text-white cursor-pointer' : 'bg-[#E3E8F4] text-[#6B7280] cursor-not-allowed'}`}
                  >
                    {saving ? 'Saving...' : 'Submit & Register'}
                  </button>
                </div>
                {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
              </div>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 'success' && (
              <div className="bg-[#EFF8E2] border border-[#6AA32A]/30 p-6 rounded-[16px] text-center space-y-4">
                <CheckCircle className="w-10 h-10 text-[#6AA32A] mx-auto" />
                <h4 className="font-bold text-[#091540] text-base">Registration Successful!</h4>
                <p className="text-xs text-[#374151] font-light leading-relaxed">
                  Thank you, <strong className="font-bold text-[#091540]">{formData.name}</strong>. We have received your poll response and secured your slot for <strong className="font-bold text-[#091540]">{formData.slot}</strong>. Check your email for joining details.
                </p>
                <button 
                  onClick={() => { setStep('form'); setPollAnswer(''); }}
                  className="text-xs font-bold text-[#1A3B9F] underline hover:text-[#132d7c] cursor-pointer"
                >
                  Register another participant
                </button>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}
