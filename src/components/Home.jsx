export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1481b8] via-[#0f6fa0] to-[#0a5880] py-16 lg:py-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Pune's Trusted Glass Experts
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight uppercase">
            Expert in Window<br />
            <span className="text-sky-300">&amp; Glass Solutions</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/90 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-[#1481b8] font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-slate-50 transition-colors shadow-md shadow-black/10 text-center"
            >
              Get a Free Quote
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors text-center"
            >
              View Our Work
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Layered Glass Images Stack */}
        <div className="lg:col-span-6 relative w-full h-[380px] md:h-[500px] lg:h-[550px] mt-12 lg:mt-0 select-none">
          {/* Decorative background shape */}
          <div className="absolute top-12 left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Main Large Image */}
          <div className="absolute left-0 top-0 w-[85%] h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 transition-transform duration-500 hover:scale-[1.02]">
            <img
              src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
              alt="Commercial Glass Facade"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Small Image */}
          <div className="absolute right-0 bottom-0 w-[60%] h-[180px] md:h-[240px] lg:h-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#0f6fa0] transition-transform duration-500 hover:scale-[1.03]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
              alt="Residential Glass Railing"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
