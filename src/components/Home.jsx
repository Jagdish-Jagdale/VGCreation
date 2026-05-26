export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-[#1481b8]"
    >
      <div className="text-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Pune's Trusted Glass Experts
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
          Expert in Window
        </h1>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          &amp; Glass Solutions
        </h1>

        {/* Subtext */}
        <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-10">
          Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-block bg-white text-[#1481b8] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Get a Free Quote
          </a>
          <a
            href="/services"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            View Our Work
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
