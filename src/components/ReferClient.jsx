export default function ReferClient() {
  const cards = [
    {
      id: 1,
      title: "Looking for office cabin or glass partition work?",
      description: "We design and install custom office partitions across Pune.",
      icon: (
        <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4V5zm8 0v14" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Need to replace broken cabin or window glass?",
      description: "Fast, reliable glass replacement with professional finishing.",
      icon: (
        <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Searching for soundproof glass or window solutions?",
      description: "Acoustic glass systems engineered for peace and privacy.",
      icon: (
        <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Quick Inquiry?",
      description: "Connect with our technical desk for custom solutions.",
      icon: (
        <svg className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="referclient" className="py-16 bg-[#f8fafc] text-slate-800 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#1481b8]/40" />
            <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
              Refer a Client
            </span>
            <span className="h-px w-8 bg-[#1481b8]/40" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            Know Someone Who Needs Us?
          </h2>
          
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            Help them connect with the right glass solution.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-slate-100/80 p-6 rounded-2xl flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md hover:border-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="flex flex-col items-center">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-sky-50/80 flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-sky-100">
                  {card.icon}
                </div>
                
                {/* Heading */}
                <h3 className="text-sm md:text-base font-bold text-slate-800 mb-3 px-2 leading-snug">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-6 px-1">
                  {card.description}
                </p>
              </div>

              {/* Action Button */}
              <a
                href="/contact"
                className="w-full py-2 bg-slate-50 border border-slate-100 hover:bg-[#1481b8] hover:border-[#1481b8] text-slate-600 hover:text-white font-bold text-xs md:text-sm rounded-full text-center transition-all duration-200 shadow-sm"
              >
                Contact Us
              </a>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
