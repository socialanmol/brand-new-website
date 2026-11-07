import React from "react";
import { Link } from "react-router";
import { Star, ThumbsUp, Users, ArrowRight } from "lucide-react";

export default function PersonalFinanceTopics() {
  const topics = [
    {
      title: "How to manage your salary better: Save, Spend & Invest",
      recurrence: "Monthly",
      targetAudience: "Young professionals",
      rating: "4.9/5",
      votes: "145K+ Enrolled",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      link: "/insights/seminars/manage-your-salary"
    },
    {
      title: "The 2-bank approach to better budgeting",
      recurrence: "Once a quarter",
      targetAudience: "Salaried individuals",
      rating: "4.8/5",
      votes: "98K+ Enrolled",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      link: "/insights/seminars/2-bank-approach"
    },
    {
      title: "10 money mistakes that can cost you lakhs",
      recurrence: "Once a quarter",
      targetAudience: "General public",
      rating: "4.9/5",
      votes: "210K+ Enrolled",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
      link: "/insights/seminars/10-money-mistakes"
    },
    {
      title: "How much should you save from your monthly income?",
      recurrence: "Once a quarter",
      targetAudience: "Young earners",
      rating: "4.7/5",
      votes: "115K+ Enrolled",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80",
      link: "/insights/seminars/how-much-to-save"
    },
    {
      title: "How to build your first ₹10 lakh",
      recurrence: "Once a quarter",
      targetAudience: "Young professionals",
      rating: "5.0/5",
      votes: "180K+ Enrolled",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      link: "/insights/seminars/build-first-10-lakh"
    },
    {
      title: "Credit cards, EMIs and personal loans: Friend or Foe?",
      recurrence: "Once a quarter",
      targetAudience: "Salaried individuals",
      rating: "4.8/5",
      votes: "130K+ Enrolled",
      image: "https://images.unsplash.com/photo-1607532948233-3340f0c3453b?w=800&q=80",
      link: "/insights/seminars/credit-cards-emis-loans"
    },
    {
      title: "How to become financially independent by 45/50",
      recurrence: "Once a quarter",
      targetAudience: "25–45 age group",
      rating: "4.9/5",
      votes: "165K+ Enrolled",
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80",
      link: "/insights/seminars/financial-independence-45"
    },
    {
      title: "Financial planning for couples: Managing money together",
      recurrence: "Once a quarter",
      targetAudience: "Young couples",
      rating: "4.8/5",
      votes: "90K+ Enrolled",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
      link: "/insights/seminars/financial-planning-couples"
    },
    {
      title: "Financial planning after marriage",
      recurrence: "Once a quarter",
      targetAudience: "Newly married couples",
      rating: "4.7/5",
      votes: "75K+ Enrolled",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      link: "/insights/seminars/planning-after-marriage"
    },
    {
      title: "How to prepare financially for major life events",
      recurrence: "Once a quarter",
      targetAudience: "General public",
      rating: "4.9/5",
      votes: "140K+ Enrolled",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80",
      link: "/insights/seminars/major-life-events"
    }
  ];

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-20 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Pillar I Curriculum
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Personal Finance &amp; <span className="text-[#8DC63F] italic">Money Management.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
            High priority audience-building masterclasses designed to attract and guide you from budgeting fundamentals to absolute financial independence[cite: 1].
          </p>
        </div>
      </section>

      {/* TOPICS GRID (BookMyShow Style Cards) */}
      <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center mb-10 border-b border-[#E3E8F4] pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-1">
              Available Masterclasses
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Explore Topics &amp; Enroll
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6B7280] bg-[#EEF2FB] px-3 py-1.5 rounded-[8px]">
            {topics.length} Masterclasses Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topics.map((topic, index) => (
            <Link 
              key={index} 
              to={topic.link}
              className="group flex flex-col bg-white rounded-[16px] overflow-hidden border border-[#E3E8F4] hover:border-[#1A3B9F] transition-all duration-300 hover:shadow-lg"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#091540]">
                <img 
                  src={topic.image} 
                  alt={topic.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Rating / Votes Badge overlaying bottom of thumbnail */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-[6px]">
                    <Star className="w-3.5 h-3.5 text-[#8DC63F] fill-[#8DC63F]" />
                    <span className="font-bold">{topic.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-white/90">
                    <Users className="w-3.5 h-3.5 text-white/70" />
                    <span>{topic.votes}</span>
                  </div>
                </div>

                {/* Recurrence Badge Top Right */}
                <div className="absolute top-3 right-3 bg-[#1A3B9F]/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-[6px]">
                  {topic.recurrence}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3 bg-white">
                <div>
                  <span className="text-[10px] font-bold text-[#1A3B9F] uppercase tracking-wider block mb-1">
                    Target: {topic.targetAudience}
                  </span>
                  <h3 className="font-[var(--fd)] text-sm font-bold text-[#091540] line-clamp-2 group-hover:text-[#1A3B9F] transition-colors leading-snug">
                    {topic.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-[#E3E8F4] flex items-center justify-between text-xs font-extrabold text-[#6AA32A]">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}