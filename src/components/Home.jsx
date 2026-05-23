export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-[#1481b8]"
    >
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-white underline decoration-white/50">VGCreation</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-8">
          We craft clean, creative, and impactful digital experiences for your brand.
        </p>
        <a
          href="#services"
          className="inline-block bg-white text-[#1481b8] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
        >
          Explore Services
        </a>
      </div>
    </section>
  );
}
