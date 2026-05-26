export default function WorkWithExperts() {
  return (
    <section id="workwithexperts" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Banner Card in Light Theme (max-w-6xl match) */}
        <div className="bg-[#f8fafc] rounded-3xl py-14 px-6 md:px-12 text-center border border-slate-100 shadow-sm relative overflow-hidden">
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#1481b8]/30" />
              <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
                Work With Experts
              </span>
              <span className="h-px w-6 bg-[#1481b8]/30" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4 leading-tight max-w-3xl mx-auto">
              Need a Custom Engineered Solution?
            </h2>

            {/* Subtext */}
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-8">
              Bespoke glass architectures for architects, builders, and schools across Pune.
            </p>

            {/* CTA Button */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#1481b8] hover:bg-[#116e9d] text-white font-bold text-sm uppercase px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-md shadow-[#1481b8]/10"
            >
              Start Consultation
            </a>

            {/* Divider */}
            <div className="w-full max-w-md mx-auto border-t border-slate-200 my-8"></div>

            {/* Checklist in One Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-slate-700 font-semibold">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#1481b8] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>ISO Standards</span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#1481b8] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Quality Work</span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#1481b8] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>On-Time Delivery</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
