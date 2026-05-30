import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import windowsImg from "../assets/Aluminium & UPVC Windows.jpg";
import mirrorsImg from "../assets/Decorative & LED Mirrors.jpg";
import facadeImg from "../assets/Structural & Semi-Structural Facade Work.jpg";
import interiorImg from "../assets/Complete Glass Interior Solutions.jpeg";
import glazingImg from "../assets/Glass Glazing.jpg";



export default function Services() {
  const [servicesList, setServicesList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    document.title = "Services | Vision Glass Creation";
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        if (!querySnapshot.empty) {
          const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setServicesList(list);
        } else {
          // Fallback
          const saved = localStorage.getItem("vg_services_v2");
          if (saved) {
            setServicesList(JSON.parse(saved));
          } else {
            setServicesList([]);
          }
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchServices();
  }, []);

  const loadMore = () => {
    setVisibleCount(servicesList.length);
  };

  return (
    <section className="bg-white min-h-screen pb-28">
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
          {isFetching ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full animate-pulse">
                <div className="h-56 bg-slate-200/60 rounded-t-2xl"></div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="h-5 bg-slate-200/60 rounded-md w-3/4 mb-4"></div>
                  <div className="h-3 bg-slate-200/60 rounded-sm w-full mb-2"></div>
                  <div className="h-3 bg-slate-200/60 rounded-sm w-5/6 mb-4 flex-grow"></div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="h-3.5 bg-slate-200/60 rounded w-24"></div>
                    <div className="h-3 bg-slate-200/60 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            servicesList.slice(0, visibleCount).map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group ${
                  index >= 8 ? "animate-fade-in-up" : ""
                }`}
                style={index >= 8 ? { animationDelay: `${(index - 8) * 100}ms`, opacity: 0 } : {}}
              >
              {/* Card Header area */}
              <div className="relative h-56 overflow-hidden flex items-center justify-center border-b border-slate-100">
                <img
                  src={service.image}
                  alt={service.name || service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
              </div>

              {/* Card Body area */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-slate-800 font-bold text-base leading-snug mb-2.5 group-hover:text-[#1481b8] transition-colors duration-200">
                  {service.name || service.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>



                {/* Bottom Card Action Footer */}
                <div className="flex items-center justify-between pt-3.5 border-t border-slate-50 text-xs">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1 text-[#1481b8] font-bold hover:gap-2 transition-all"
                  >
                    Enquire Now
                    <span className="font-normal">→</span>
                  </a>
                  
                  <a
                    href={`/gallery?filter=${(service.name || service.title).split(' ')[0].toUpperCase()}`}
                    className="text-[9px] font-bold text-slate-400 tracking-wider flex items-center gap-1 uppercase hover:text-[#1481b8] transition-colors"
                  >
                    <svg className="w-3 h-3 text-[#1481b8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View Our Work
                  </a>
                </div>
              </div>
            </div>
          ))
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < servicesList.length && (
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

        {/* Custom Work Section in White/Light Theme */}
        <div className="mt-20 bg-slate-50 border border-slate-100 rounded-3xl py-14 px-6 md:px-12 text-center max-w-5xl mx-auto shadow-sm relative overflow-hidden">
          {/* Decorative background glow/shapes */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Subheading/Badge */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-px w-4 bg-[#1481b8]/30" />
              <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
                Custom Work
              </span>
              <span className="h-px w-4 bg-[#1481b8]/30" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 uppercase">
              Don't see what you're looking for?
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              We offer custom glass solutions. Get in touch and we'll find the perfect fit for your project.
            </p>

            {/* CTA Button */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#1481b8] hover:bg-[#116e9d] text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-md shadow-[#1481b8]/10 cursor-pointer"
            >
              Discuss Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
