import { useEffect, useState } from "react";

const services = [
  {
    id: 1,
    category: "WINDOWS",
    title: "Aluminium & UPVC Windows",
    description:
      "Durable, weather-resistant window frames and partition systems for all building types — residential to industrial.",
    features: ["ALUMINIUM", "UPVC", "CASEMENT", "SLIDING"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
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
    features: ["LED BACKLIT", "DECORATIVE", "VASTU", "CUSTOM SIZE"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
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
    features: ["STRUCTURAL", "SEMI-STRUCTURAL", "CURTAIN WALL", "SPIDER GLASS"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
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
    features: ["SHELVING", "CABINETS", "PARTITIONS", "FITOUTS"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" />
      </svg>
    ),
  },
  {
    id: 5,
    category: "GLAZING",
    title: "Glass Glazing Work",
    description:
      "Toughened glass glazing and composite ACP panel installations for building exteriors and interiors.",
    features: ["TOUGHENED GLASS", "ACP PANEL", "EXTERIOR", "INTERIOR"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: 6,
    category: "RAILING",
    title: "Glass Railings & Balustrades",
    description:
      "Modern and secure glass railing systems for balconies, staircases, and terraces, offering uninterrupted views.",
    features: ["BALCONY", "STAIRCASE", "FRAMELESS", "STAINLESS STEEL"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M2 8h20M4 8v12M9 8v12M14 8v12M19 8v12M2 20h20" />
      </svg>
    ),
  },
  {
    id: 7,
    category: "SHOWER",
    title: "Shower Cubicles & Partitions",
    description:
      "Premium sliding or openable frameless glass shower cubicles and partitions, custom fit for modern bathrooms.",
    features: ["FRAMELESS", "SLIDING", "OPENABLE", "TEMPERED GLASS"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 3h16v18H4V3zm6 0v18M10 11h2v2h-2zM14 5l1 2m1-2l1 2M14 10l1 2m1-2l1 2" />
      </svg>
    ),
  },
  {
    id: 8,
    category: "SKYLIGHT",
    title: "Skylight & Canopy Glass",
    description:
      "High-durability laminated and toughened glass for skylights, glass roofs, and entrance canopies, providing natural light.",
    features: ["LAMINATED GLASS", "ENTRANCE CANOPY", "GLASS ROOF", "WEATHERPROOF"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 12l9-6 9 6M5 12v8h14v-8M12 3v3M17 5l-2 2M7 5l2 2M12 12v8" />
      </svg>
    ),
  },
  {
    id: 9,
    category: "CANOPY",
    title: "Glass Canopy & Pergola Work",
    description:
      "Architectural glass canopies and pergola systems designed to protect entrances while allowing natural sunlight.",
    features: ["PERGOLA", "CANOPY", "LAMINATED", "TEMPERED"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 18h16M4 14h16M4 10h16M4 6h16M2 22h20M12 2v4" />
      </svg>
    ),
  },
  {
    id: 10,
    category: "PARTITION",
    title: "Toughened Glass Partitions",
    description:
      "Modern frameless toughened glass partitions for sleek, sound-insulated office cabins and conference rooms.",
    features: ["OFFICE CABIN", "FRAMELESS", "SOUND INSULATION", "TOUGHENED"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 3v18M16 3v18M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
  },
  {
    id: 11,
    category: "GLAZING",
    title: "Spider Glass Glazing",
    description:
      "Aesthetic point-supported spider glazing systems for high-rise commercial structures and double-height lobbies.",
    features: ["SPIDER GLASS", "POINT-SUPPORTED", "LOBBIES", "COMMERCIAL"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
      </svg>
    ),
  },
  {
    id: 12,
    category: "DESIGN",
    title: "Glass Film & Frosted Work",
    description:
      "Frosted glass films, designer privacy films, and custom branding prints for interior partitions and office glass.",
    features: ["FROSTED FILM", "PRIVACY FILM", "OFFICE BRANDING", "CUSTOM PRINTS"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 4h16v16H4V4zm4 4h8M8 12h8M8 16h8" />
      </svg>
    ),
  },
  {
    id: 13,
    category: "WINDOWS",
    title: "Soundproof Acoustic Windows",
    description:
      "Double or triple glazed acoustic window systems designed to filter out external traffic noise and maintain silence.",
    features: ["DOUBLE GLAZED", "ACOUSTIC GLASS", "NOISE CANCEL", "ENERGY EFFICIENT"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15.536 8.464a5 5 0 010 7.072M17.657 6.343a8 8 0 010 11.314M3 3h10v18H3V3zm5 0v18" />
      </svg>
    ),
  },
  {
    id: 14,
    category: "DOORS",
    title: "Glass Doors & Sliding Systems",
    description:
      "Heavy-duty automatic sensor glass doors, manual sliding doors, and patch-fitting entry systems.",
    features: ["AUTOMATIC SENSOR", "SLIDING SYSTEM", "PATCH FITTING", "ENTRYWAY"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 3h12v18H8V3zM3 12h5M3 8h5M3 16h5" />
      </svg>
    ),
  },
  {
    id: 15,
    category: "INTERIOR",
    title: "Backpainted Glass & Write Boards",
    description:
      "Premium colored backpainted glass for kitchen dado, office wall panels, and magnetic glass write boards.",
    features: ["BACKPAINTED", "MAGNETIC WRITEBOARD", "KITCHEN DADO", "WALL CLADDING"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 3v12M12 15a3 3 0 100-6 3 3 0 000 6zm-7-4l2-2m10 0l2 2m-8 6h4" />
      </svg>
    ),
  },
  {
    id: 16,
    category: "DOORS",
    title: "PVC & Fiber Doors",
    description:
      "Waterproof and high-durability PVC, WPC, and fiber doors suitable for toilets, bathrooms, and utility areas.",
    features: ["PVC DOORS", "FIBER DOORS", "WATERPROOF", "BATHROOM DOORS"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M6 3h12v18H6V3zm6 8h2v2h-2z" />
      </svg>
    ),
  },
];

export default function Services() {
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    document.title = "Services | Vision Glass Creation";
  }, []);

  const loadMore = () => {
    setVisibleCount(16);
  };

  return (
    <section className="bg-white min-h-screen pb-16">
      {/* Hero Banner with Office Glass Walkway Background */}
      <div 
        className="relative py-28 text-white overflow-hidden text-center bg-cover bg-center mb-16"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(12, 28, 48, 0.88), rgba(4, 14, 26, 0.93)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')` 
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-4">
            <a href="/" className="hover:underline">Home</a>
            <span>•</span>
            <span className="text-white/60">Services</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase">
            Our Services
          </h1>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 max-w-xl mx-auto">
            <span className="h-px flex-1 bg-sky-400/30" />
            <p className="text-xs md:text-sm font-extrabold tracking-widest uppercase text-sky-300 text-center">
              Industrial glass and window systems for modern architecture
            </p>
            <span className="h-px flex-1 bg-sky-400/30" />
          </div>
        </div>
      </div>

      {/* Services Grid - 4 columns on desktop with uniform height cards, gap-8 */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.slice(0, visibleCount).map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group ${
                index >= 8 ? "animate-fade-in-up" : ""
              }`}
              style={index >= 8 ? { animationDelay: `${(index - 8) * 100}ms`, opacity: 0 } : {}}
            >
              {/* Card Header area */}
              <div className="relative h-44 bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center border-b border-slate-100 group-hover:bg-[#1481b8]/5 transition-colors duration-300">
                {/* Scaled icon inside circular white wrapper */}
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#1481b8] group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                {/* Top Category Badge */}
                <span className="absolute top-4 left-4 text-[10px] font-bold text-[#1481b8] bg-[#1481b8]/10 border border-[#1481b8]/10 px-3 py-1 rounded-full tracking-wider">
                  {service.category}
                </span>
              </div>

              {/* Card Body area */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-slate-800 font-bold text-base leading-snug mb-2.5 group-hover:text-[#1481b8] transition-colors duration-200">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>

                {/* Sub-features/tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-[9px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Bottom Card Action Footer */}
                <div className="flex items-center justify-between pt-3.5 border-t border-slate-50 text-xs">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1 text-[#1481b8] font-bold hover:gap-2 transition-all"
                  >
                    Enquire Now
                    <span className="font-normal">→</span>
                  </a>
                  
                  <span className="text-[9px] font-bold text-slate-400 tracking-wider flex items-center gap-1 uppercase">
                    <svg className="w-3 h-3 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Certified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < services.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1481b8] hover:bg-[#116e9d] text-white rounded-full text-sm font-bold shadow-md shadow-[#1481b8]/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Load More Services
              <svg 
                className="w-4.5 h-4.5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
