const services = [
  {
    id: 1,
    category: "WINDOWS",
    title: "Aluminium & UPVC Windows",
    description:
      "Durable, weather-resistant window frames and partition systems for all building types — residential to industrial.",
    bg: "from-slate-700 to-slate-900",
    icon: (
      <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M3 3h18v18H3V3zm9 0v18M3 12h18" />
      </svg>
    ),
  },
  {
    id: 2,
    category: "MIRRORS",
    title: "Decorative & LED Mirrors",
    description:
      "Backlit LED mirrors, decorative mirrors, vastu mirrors and custom mirror installations for all spaces.",
    bg: "from-[#1481b8] to-[#0d5a8a]",
    icon: (
      <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
      </svg>
    ),
  },
  {
    id: 3,
    category: "FACADE",
    title: "Structural & Semi-Structural Facade Work",
    description:
      "High-performance structural and semi-structural exterior glass facade systems for commercial buildings and IT parks.",
    bg: "from-gray-800 to-gray-600",
    icon: (
      <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 4,
    category: "INTERIOR",
    title: "Complete Glass Interior Solutions",
    description:
      "Custom glass shelving, cabinets, display units and full glass interior fitouts tailored to your design.",
    bg: "from-teal-700 to-teal-900",
    icon: (
      <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" />
      </svg>
    ),
  },
  {
    id: 5,
    category: "GLAZING",
    title: "Glass Glazing",
    description:
      "Toughened glass glazing and composite ACP panel installations for building exteriors and interiors.",
    bg: "from-sky-700 to-sky-900",
    icon: (
      <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-10 bg-[#1481b8]" />
          <span className="text-[#1481b8] text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>
          <span className="h-px w-10 bg-[#1481b8]" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
          Our Services
        </h2>
        <p className="text-center text-gray-500 max-w-md mx-auto mb-12">
          End-to-end glass solutions, crafted with precision and delivered with care across Pune's skyline.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              {/* Image area with gradient + icon + overlaid title */}
              <div className={`relative h-70 bg-gradient-to-br ${service.bg} flex items-center justify-center`}>
                {service.icon}
                {/* Category badge */}
                <span className="absolute top-3 left-3 text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full tracking-wider">
                  {service.category}
                </span>
                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                  <h3 className="text-white font-bold text-sm leading-snug">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-[#1481b8] text-sm font-semibold hover:gap-2 transition-all"
                >
                  Learn More
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="flex justify-center mt-12">
          <a
            href="/services"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-[#1481b8] hover:border-[#1481b8]/50 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-sm group"
          >
            View All Services
            <svg 
              className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
