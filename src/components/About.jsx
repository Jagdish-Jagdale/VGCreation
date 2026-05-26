import { useState } from "react";
import commercialImg from "../assets/commercial.png";

export default function About() {
  const [activeTab, setActiveTab] = useState("architects");

  const values = [
    {
      id: "01",
      title: "One-Stop Solution",
      description: "Complete window and glass work under one roof — no need to juggle contractors.",
      icon: (
        <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: "02",
      title: "Quality Workmanship",
      description: "Professional finishing and attention to detail on every single project.",
      icon: (
        <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      id: "03",
      title: "Trusted by Leaders",
      description: "Architects, hospitals, schools and builders rely on us consistently.",
      icon: (
        <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: "04",
      title: "End-to-End Service",
      description: "From initial consultation and design right through to final installation.",
      icon: (
        <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const portfolio = {
    architects: {
      name: "Architects",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
        </svg>
      ),
      items: [
        "Arct Uday Kulkarni",
        "Arct Ashish Shinde",
        "Arct Omkar Mansuk",
        "Arct Rajendra Kore",
        "Arct Pore Madam",
        "Arct Vishal Ranka",
        "Arct Utakarsha Madam",
        "Arct Lalit Surve",
        "Arct Jambhalkar"
      ]
    },
    interiors: {
      name: "Interior Designers",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 113.536 0V21h2v-4" />
        </svg>
      ),
      items: [
        "Rohit Wankhed",
        "Rahul Chordiya",
        "Kashmira Madam",
        "Purva Joshi",
        "Vijay Patel",
        "Mangesh Pisal",
        "Hemant Sutar"
      ]
    },
    builders: {
      name: "Builders",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      items: [
        "Garve Developers",
        "VT Adaskar"
      ]
    },
    hospitals: {
      name: "Hospitals",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5V20a2 2 0 01-2 2H7a2 2 0 01-2-2v-9.5m14 0V9a2 2 0 00-2-2h-3m-4 0H7a2 2 0 00-2 2v1.5m14 0h-4m-6.5 0h4m-4 0V9M12 11v6m-3-3h6" />
        </svg>
      ),
      items: [
        "Icon Hospital",
        "Sparsh Hospital",
        "Star Hospital",
        "Dr. Amit Wagh",
        "Dr. Marne",
        "Dr. Shrikant Rao"
      ]
    },
    schools: {
      name: "Schools",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      items: [
        "Cambridge International School",
        "New Pune Public School",
        "Orchid School",
        "Puna Public School"
      ]
    },
    industrial: {
      name: "Industrial",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      items: [
        "SGS Chakan Mumbai",
        "Bajaj Auto",
        "Manmohan Decor",
        "Manmohan Interior",
        "ABN Associates",
        "Vinus Group"
      ]
    }
  };

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase">
            About Us
          </h1>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 max-w-xl mx-auto">
            <span className="h-px flex-1 bg-sky-400/30" />
            <p className="text-xs md:text-sm font-extrabold tracking-widest uppercase text-sky-300">
              Building trust through glass, one project at a time
            </p>
            <span className="h-px flex-1 bg-sky-400/30" />
          </div>
        </div>
      </div>

      {/* Story section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Image with 15+ years experience overlay badge */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <img
                  src={commercialImg}
                  alt="Vision Glass Creation Office Facade"
                  className="w-full h-auto object-cover"
                />
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
                — Our Story —
              </span>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                Vision Glass Creation
              </h2>
              
              <p className="text-[#1481b8] font-bold text-sm mb-6">
                Led by Pratap Bhagwanrao Kathare
              </p>
              
              <div className="space-y-4 text-slate-500 text-sm md:text-base leading-relaxed">
                <p>
                  Vision Glass Creation is Pune's trusted expert in premium window and glass solutions. With years of hands-on experience across commercial, residential and industrial projects, we deliver end-to-end glass work — from elegant office partitions and structural facades to decorative mirrors and custom interiors.
                </p>
                <p>
                  Our commitment to quality workmanship and professional finishing has earned the trust of leading architects, builders, hospitals, schools and industrial companies across the region.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1481b8] hover:bg-[#116e9d] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md shadow-[#1481b8]/10 hover:shadow-lg transition-all duration-200 mt-8 group"
              >
                Work With Us
                <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section - White Theme */}
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
              Why Choose Vision Glass?
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.id}
                className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl hover:shadow-md hover:border-sky-500/20 transition-all duration-300 flex flex-col items-start relative overflow-hidden group"
              >
                {/* Large Background Card Number */}
                <span className="text-slate-50 font-black text-6xl absolute top-3 right-4 select-none pointer-events-none transition-colors group-hover:text-sky-50/50">
                  {val.id}
                </span>
                
                {/* Icon Circle */}
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#1481b8] flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-sky-100 relative z-10">
                  {val.icon}
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

      {/* Our Portfolio Section - Clients We've Served (Full Width Card Layout) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#1481b8]/30" />
              <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
                Our Portfolio
              </span>
              <span className="h-px w-8 bg-[#1481b8]/30" />
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Clients We've Served
            </h2>
          </div>

          {/* Interactive Tabs Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-8">
            {Object.keys(portfolio).map((key) => {
              const tab = portfolio[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-4.5 py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-200 border ${
                    isActive
                      ? "bg-sky-50 text-[#1481b8] border-sky-100 shadow-sm shadow-sky-100/50"
                      : "bg-white text-slate-600 border-slate-100 hover:text-[#1481b8] hover:border-slate-200"
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Tab Content Card (Full Width max-w-6xl matched) */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 w-full shadow-sm min-h-[220px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4.5 gap-x-8">
              {portfolio[activeTab].items.map((item, idx) => (
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

      {/* Who We Work With (Partners Banner) */}
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
            Who We Work With
          </h2>

          {/* Capsule Grid Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
            {/* Architects */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-400/40 hover:bg-white/10 px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group">
              <svg className="w-5 h-5 text-sky-400 shrink-0 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="font-bold text-sm text-white/90">Architects</span>
            </div>

            {/* Interior Decorators */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-400/40 hover:bg-white/10 px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group">
              <svg className="w-5 h-5 text-sky-400 shrink-0 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-2.22 2.22l-.184.73a3 3 0 01-5.32 1.05c-.347-.456-.166-1.11.33-1.32l.73-.184a3 3 0 002.22-2.22l.184-.73a3 3 0 015.32-1.05c.347.456.166 1.11-.33 1.32l-.73.184z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 15.25a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
              </svg>
              <span className="font-bold text-sm text-white/90">Interior Decorators</span>
            </div>

            {/* Carpenters */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-400/40 hover:bg-white/10 px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group">
              <svg className="w-5 h-5 text-sky-400 shrink-0 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a1 1 0 10-2 0v1H5a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h-4V4a1 1 0 10-2 0v1h-3V4z" />
              </svg>
              <span className="font-bold text-sm text-white/90">Carpenters</span>
            </div>

            {/* HR & Purchase Depts */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-400/40 hover:bg-white/10 px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group">
              <svg className="w-5 h-5 text-sky-400 shrink-0 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="font-bold text-sm text-white/90">HR & Purchase Depts.</span>
            </div>

            {/* Builders & Developers */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-400/40 hover:bg-white/10 px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group">
              <svg className="w-5 h-5 text-sky-400 shrink-0 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-bold text-sm text-white/90">Builders & Developers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve (Sectors Grid) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#1481b8]/30" />
              <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
                SECTORS
              </span>
              <span className="h-px w-8 bg-[#1481b8]/30" />
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Industries We Serve
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Architects */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md hover:border-sky-500/20 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-[#1481b8] flex items-center justify-center shrink-0 transition-colors group-hover:bg-sky-100">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-[#1481b8] transition-colors">
                  Architects
                </h3>
                <p className="text-xs text-slate-400 font-medium">Trusted partner</p>
              </div>
            </div>

            {/* Facility Management */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md hover:border-sky-500/20 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-[#1481b8] flex items-center justify-center shrink-0 transition-colors group-hover:bg-sky-100">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-[#1481b8] transition-colors">
                  Facility Management
                </h3>
                <p className="text-xs text-slate-400 font-medium">Trusted partner</p>
              </div>
            </div>

            {/* MEP Contractors */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md hover:border-sky-500/20 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-[#1481b8] flex items-center justify-center shrink-0 transition-colors group-hover:bg-sky-100">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-[#1481b8] transition-colors">
                  MEP Contractors
                </h3>
                <p className="text-xs text-slate-400 font-medium">Trusted partner</p>
              </div>
            </div>

            {/* Industrial Decorators */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md hover:border-sky-500/20 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-[#1481b8] flex items-center justify-center shrink-0 transition-colors group-hover:bg-sky-100">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-8.2c0-1.12-.9-2-2-2h-3.8c-1.1 0-2 .88-2 2V21M4 21v-4.2c0-1.12.9-2 2-2h3.8c1.1 0 2 .88 2 2V21M3 21h18" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-[#1481b8] transition-colors">
                  Industrial Decorators
                </h3>
                <p className="text-xs text-slate-400 font-medium">Trusted partner</p>
              </div>
            </div>

            {/* Real Estate Developers */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md hover:border-sky-500/20 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-[#1481b8] flex items-center justify-center shrink-0 transition-colors group-hover:bg-sky-100">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-[#1481b8] transition-colors">
                  Real Estate Developers
                </h3>
                <p className="text-xs text-slate-400 font-medium">Trusted partner</p>
              </div>
            </div>

            {/* HR & Purchase Dept. */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md hover:border-sky-500/20 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-sky-50 text-[#1481b8] flex items-center justify-center shrink-0 transition-colors group-hover:bg-sky-100">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 group-hover:text-[#1481b8] transition-colors">
                  HR & Purchase Dept.
                </h3>
                <p className="text-xs text-slate-400 font-medium">Trusted partner</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Refer Client / Work With Experts custom banner section below portfolio */}
      <section className="py-16 bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Banner Card in Light Theme */}
          <div className="bg-white rounded-3xl py-14 px-6 md:px-12 text-center border border-slate-100 shadow-md shadow-slate-100/50 relative overflow-hidden">
            <div className="relative z-10">
              
              {/* Short Colored Horizontal Line */}
              <div className="w-8 h-0.5 bg-[#1481b8] mx-auto mb-3.5 rounded-full"></div>

              {/* Badge */}
              <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase mb-4 block">
                Work With Experts
              </span>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4 leading-tight max-w-3xl mx-auto">
                Need a Custom Engineered Solution?
              </h2>

              {/* Subtext */}
              <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto mb-8">
                How to Refer Me — Bespoke glass architectures for architects, builders, and schools across Pune.
              </p>

              {/* CTA Button */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-[#1481b8] hover:bg-[#116e9d] text-white font-bold text-sm tracking-wider uppercase px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-md shadow-[#1481b8]/10"
              >
                Start Consultation
              </a>

              {/* Divider */}
              <div className="w-full max-w-md mx-auto border-t border-slate-100 my-8"></div>

              {/* Checklist */}
              <div className="flex flex-col items-start gap-4 text-sm text-slate-800 font-bold max-w-xl mx-auto">
                <div className="flex items-start gap-3 text-left">
                  <div className="w-5.5 h-5.5 rounded-full border-2 border-sky-400/30 flex items-center justify-center bg-sky-50 shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Are you looking for office cabin or glass partition work?</span>
                </div>
                
                <div className="flex items-start gap-3 text-left">
                  <div className="w-5.5 h-5.5 rounded-full border-2 border-sky-400/30 flex items-center justify-center bg-sky-50 shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Do you need to replace broken cabin window glass?</span>
                </div>
                
                <div className="flex items-start gap-3 text-left">
                  <div className="w-5.5 h-5.5 rounded-full border-2 border-sky-400/30 flex items-center justify-center bg-sky-50 shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Are you looking for soundproof glass or window solutions?</span>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
