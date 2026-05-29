import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function About() {
  document.title = "About Us | Vision Glass Creation";

  const [headerMeta, setHeaderMeta] = useState({ title: "", subtitle: "" });
  const [overviewData, setOverviewData] = useState({ image: "", title: "", subtitle: "", description: "", buttonLabel: "" });
  const [whyUsMeta, setWhyUsMeta] = useState({ title: "" });
  const [whyUsCards, setWhyUsCards] = useState([]);
  const [pointsMeta, setPointsMeta] = useState({ title: "" });
  const [pointsList, setPointsList] = useState([]);
  const [partnersMeta, setPartnersMeta] = useState({ title: "" });
  const [partnersList, setPartnersList] = useState([]);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const headerSnap = await getDoc(doc(db, "about", "mainheader"));
        if (headerSnap.exists()) setHeaderMeta(headerSnap.data());

        const overviewSnap = await getDoc(doc(db, "about", "aboutoverview"));
        if (overviewSnap.exists()) setOverviewData(overviewSnap.data());

        const whyUsSnap = await getDoc(doc(db, "about", "whyus"));
        if (whyUsSnap.exists()) {
          const data = whyUsSnap.data();
          if (data.meta) setWhyUsMeta(data.meta);
          if (data.cards) setWhyUsCards(data.cards);
        }

        const pointsSnap = await getDoc(doc(db, "about", "pointsandsubpoints"));
        if (pointsSnap.exists()) {
          const data = pointsSnap.data();
          if (data.meta) setPointsMeta(data.meta);
          if (data.list) setPointsList(data.list);
        }

        const partnersSnap = await getDoc(doc(db, "about", "partners"));
        if (partnersSnap.exists()) {
          const data = partnersSnap.data();
          if (data.meta) setPartnersMeta(data.meta);
          if (data.list) setPartnersList(data.list);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchAbout();
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-800">
      
      {/* Hero Banner with Office Glass Walkway Background */}
      <div 
        className="relative py-28 text-white overflow-hidden text-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(12, 28, 48, 0.88), rgba(4, 14, 26, 0.93)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')` 
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-4">
            <a href="/" className="hover:underline">Home</a>
            <span>•</span>
            <span className="text-white/60">About</span>
          </div>

          {/* Title */}
          {headerMeta.title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase">
              {headerMeta.title}
            </h1>
          )}

          {/* Tagline */}
          {headerMeta.subtitle && (
            <div className="flex items-center justify-center gap-3 max-w-xl mx-auto">
              <span className="h-px flex-1 bg-sky-400/30" />
              <p className="text-xs md:text-sm font-extrabold tracking-widest uppercase text-sky-300">
                {headerMeta.subtitle}
              </p>
              <span className="h-px flex-1 bg-sky-400/30" />
            </div>
          )}
        </div>
      </div>

      {/* Story section */}
      {overviewData.title && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Side: Image with 15+ years experience overlay badge */}
              <div className="lg:col-span-6 relative">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 min-h-[300px]">
                  {overviewData.image && (
                    <img
                      src={overviewData.image}
                      alt={overviewData.title}
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
                
                {/* Experience Badge */}
                <div className="absolute -bottom-5 -right-5 md:bottom-5 md:right-5 bg-[#1481b8] text-white py-4 px-6 rounded-2xl shadow-xl border border-sky-400/20 text-center z-10 max-w-[170px]">
                  <span className="text-3xl font-black block leading-none">15+</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider block mt-1.5 leading-tight">
                    Years of Experience
                  </span>
                </div>
              </div>

              {/* Right Side: Description */}
              <div className="lg:col-span-6 flex flex-col items-start mt-6 lg:mt-0">
                <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase mb-2 block">
                  — OUR STORY —
                </span>
                
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                  {overviewData.title}
                </h2>
                
                <p className="text-[#1481b8] font-bold text-sm mb-6">
                  {overviewData.subtitle}
                </p>
                
                <div className="space-y-4 text-slate-500 text-sm md:text-base leading-relaxed mt-4 whitespace-pre-wrap">
                  {overviewData.description}
                </div>

                {overviewData.buttonLabel && (
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#1481b8] hover:bg-[#116e9d] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md shadow-[#1481b8]/10 hover:shadow-lg transition-all duration-200 mt-8 group"
                  >
                    {overviewData.buttonLabel}
                    <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section - White Theme */}
      {whyUsCards.length > 0 && (
        <section className="py-20 bg-[#f8fafc] border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-[#1481b8]/30" />
                <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
                  Why Us
                </span>
                <span className="h-px w-8 bg-[#1481b8]/30" />
              </div>
              
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                {whyUsMeta.title}
              </h2>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUsCards.map((val, index) => (
                <div
                  key={val.id || index}
                  className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl hover:shadow-md hover:border-sky-500/20 transition-all duration-300 flex flex-col items-start relative overflow-hidden group"
                >
                  {/* Large Background Card Number */}
                  <span className="text-slate-50 font-black text-6xl absolute top-3 right-4 select-none pointer-events-none transition-colors group-hover:text-sky-50/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Icon Circle */}
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#1481b8] flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-sky-100 relative z-10">
                    <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base font-bold text-slate-800 mb-2 transition-colors duration-200 group-hover:text-[#1481b8] relative z-10">
                    {val.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed relative z-10">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Our Portfolio Section - Clients We've Served (Full Width Card Layout) */}
      {pointsList.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-[#1481b8]/30" />
                <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
                  Values & Categories
                </span>
                <span className="h-px w-8 bg-[#1481b8]/30" />
              </div>
              
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                {pointsMeta.title}
              </h2>
            </div>

            {/* Interactive Tabs Row */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-8">
              {pointsList.map((point, index) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2 px-4.5 py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-200 border ${
                      isActive
                        ? "bg-sky-50 text-[#1481b8] border-sky-100 shadow-sm shadow-sky-100/50"
                        : "bg-white text-slate-600 border-slate-100 hover:text-[#1481b8] hover:border-slate-200"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
                    </svg>
                    {point.title}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Card (Full Width max-w-6xl matched) */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 w-full shadow-sm min-h-[220px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4.5 gap-x-8">
                {pointsList[activeTab]?.subpoints?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-slate-800 text-sm font-semibold"
                  >
                    <svg className="w-4.5 h-4.5 text-sky-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Who We Work With (Partners Banner) */}
      {partnersList.length > 0 && (
        <section className="relative py-20 bg-gradient-to-r from-[#0ea5e9] via-[#0284c7] to-[#031525] text-white overflow-hidden text-center border-t border-slate-900">
          {/* Subtle grid lines background overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right, #1481b8 1px, transparent 1px), linear-gradient(to bottom, #1481b8 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
          {/* Light radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <span className="text-sky-400 text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
              PARTNERS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-8">
              {partnersMeta.title}
            </h2>

            {/* Capsule Grid Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
              {partnersList.map((partner, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-400/40 hover:bg-white/10 px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group">
                  <svg className="w-5 h-5 text-sky-400 shrink-0 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="font-bold text-sm text-white/90">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
