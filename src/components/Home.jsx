import { useState, useEffect } from "react";
import hero1 from "../assets/hero1.jpeg";
import hero2 from "../assets/gallery10.jpeg";

export default function Home() {
  const [homeData, setHomeData] = useState({
    heroPrimaryTitle: "Expert in Window",
    heroSecondaryTitle: "& Glass Solutions",
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
          ...parsed,
          heroPrimaryTitle: parsed.heroPrimaryTitle || (parsed.heroTitle ? parsed.heroTitle.split("&")[0].trim() : "Expert in Window"),
          heroSecondaryTitle: parsed.heroSecondaryTitle || (parsed.heroTitle && parsed.heroTitle.includes("&") ? "& " + parsed.heroTitle.split("&").slice(1).join("&").trim() : "& Glass Solutions"),
          heroImage1: parsed.heroImage1 || hero1,
          heroImage2: parsed.heroImage2 === "src/assets/hero2.jpeg" ? hero2 : (parsed.heroImage2 || hero2)
        }));
      } catch (e) {
        console.error("Failed to parse vg_home settings:", e);
      }
    }
  }, []);


  return (
    <section
      id="home"
      className="min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-[#1481b8] via-[#0f6fa0] to-[#0a5880] py-10 md:py-16 lg:py-0 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">

        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">


          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black text-white mb-4 lg:mb-6 leading-tight tracking-tight uppercase animate-fade-in">
            <span className="block whitespace-nowrap">{homeData.heroPrimaryTitle}</span>
            <span className="block whitespace-nowrap text-sky-300">{homeData.heroSecondaryTitle}</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/90 text-base md:text-lg max-w-xl mb-6 lg:mb-10 leading-relaxed">
            {homeData.heroDescription}
          </p>

          {/* Buttons */}
          <div className="flex flex-row items-center gap-3 w-full sm:w-auto mt-2">
            <a
              href="/contact"
              className="flex-1 sm:flex-none inline-flex items-center justify-center bg-white text-[#1481b8] font-bold text-[11px] sm:text-sm uppercase tracking-wider px-4 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-slate-50 transition-colors shadow-md shadow-black/10 text-center whitespace-nowrap"
            >
              {homeData.heroBtn1Text || "Get a Free Quote"}
            </a>
            <a
              href="/services"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-transparent border-2 border-white text-white font-bold text-[11px] sm:text-sm uppercase tracking-wider px-4 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white/10 transition-colors text-center whitespace-nowrap"
            >
              {homeData.heroBtn2Text || "View Our Work"}
              <span className="hidden sm:inline">→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Layered Glass Images Stack */}
        <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] mt-8 lg:mt-0 select-none">
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
          <div className="absolute right-0 bottom-0 w-[60%] h-[200px] sm:h-[250px] md:h-[260px] lg:h-[300px] xl:h-[340px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#0f6fa0] transition-transform duration-500 hover:scale-[1.03]">
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
