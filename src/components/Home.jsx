import { useState, useEffect } from "react";
import hero1 from "../assets/hero1.jpeg";
import hero2 from "../assets/hero2.jpeg";

export default function Home() {
  const [homeData, setHomeData] = useState({
    heroBadge: "Pune's Trusted Glass Experts",
    heroTitle: "Expert in Window & Glass Solutions",
    heroDescription: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
    heroBtn1Text: "Get a Free Quote",
    heroBtn2Text: "View Our Work",
    heroImage1: hero1,
    heroImage2: hero2
  });

  useEffect(() => {
    const saved = localStorage.getItem("vg_home");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHomeData(prev => ({
          ...prev,
          ...parsed,
          heroImage1: parsed.heroImage1 || hero1,
          heroImage2: parsed.heroImage2 || hero2
        }));
      } catch (e) {
        console.error("Failed to parse vg_home settings:", e);
      }
    }
  }, []);

  const titleParts = (homeData.heroTitle || "").split("&");

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-[#1481b8] via-[#0f6fa0] to-[#0a5880] py-10 md:py-16 lg:py-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            {homeData.heroBadge}
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight uppercase animate-fade-in">
            {titleParts[0]}
            {titleParts.length > 1 && (
              <>
                <br />
                <span className="text-sky-300">&amp;{titleParts.slice(1).join("&")}</span>
              </>
            )}
          </h1>

          {/* Subtext */}
          <p className="text-white/90 text-base md:text-lg max-w-xl mb-6 lg:mb-10 leading-relaxed">
            {homeData.heroDescription}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-[#1481b8] font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-slate-50 transition-colors shadow-md shadow-black/10 text-center"
            >
              {homeData.heroBtn1Text || "Get a Free Quote"}
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors text-center"
            >
              {homeData.heroBtn2Text || "View Our Work"}
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Layered Glass Images Stack */}
        <div className="lg:col-span-6 relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] mt-8 lg:mt-0 select-none">
          {/* Decorative background shape */}
          <div className="absolute top-12 left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Main Large Image */}
          <div className="absolute left-0 top-0 w-[85%] h-[220px] sm:h-[280px] md:h-[360px] lg:h-[400px] xl:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={homeData.heroImage1}
              alt="Commercial Glass Facade"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Small Image */}
          <div className="absolute right-0 bottom-0 w-[60%] h-[140px] sm:h-[170px] md:h-[220px] lg:h-[250px] xl:h-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#0f6fa0] transition-transform duration-500 hover:scale-[1.03]">
            <img
              src={homeData.heroImage2}
              alt="Residential Glass Railing"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
