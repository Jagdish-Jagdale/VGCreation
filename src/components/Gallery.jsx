import { useState, useEffect } from "react";
import architectsImg from "../assets/architects.png";
import buildersImg from "../assets/builders.png";
import commercialImg from "../assets/commercial.png";

const items = [
  {
    id: 1,
    category: "COMMERCIAL",
    title: "Structural Glass Facade",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
    isTall: true,
  },
  {
    id: 2,
    category: "COMMERCIAL",
    title: "Architectural Planning",
    image: architectsImg,
    isTall: false,
  },
  {
    id: 3,
    category: "COMMERCIAL",
    title: "Corporate Tower Glazing",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    isTall: false,
  },
  {
    id: 4,
    category: "RESIDENTIAL",
    title: "Glass Balcony Railings",
    image: buildersImg,
    isTall: true,
  },
  {
    id: 5,
    category: "COMMERCIAL",
    title: "Office Glass Partition",
    image: commercialImg,
    isTall: true,
  },
  {
    id: 6,
    category: "RESIDENTIAL",
    title: "Frameless Shower Cubicle",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
    isTall: false,
  },
  {
    id: 7,
    category: "INDUSTRIAL",
    title: "Industrial Exterior Glazing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    isTall: false,
  },
  {
    id: 8,
    category: "RESIDENTIAL",
    title: "LED Mirror Installation",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    isTall: true,
  },
  {
    id: 9,
    category: "INDUSTRIAL",
    title: "Glass Entrance Canopy",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
    isTall: true,
  },
  {
    id: 10,
    category: "RESIDENTIAL",
    title: "Acoustic Window Glazing",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    isTall: false,
  },
  {
    id: 11,
    category: "COMMERCIAL",
    title: "Point-Supported Spider Glazing",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
    isTall: false,
  },
  {
    id: 12,
    category: "COMMERCIAL",
    title: "Frosted Office Glass Film",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    isTall: true,
  },
];

const categories = ["ALL", "COMMERCIAL", "INDUSTRIAL", "RESIDENTIAL"];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    document.title = "Gallery | Vision Glass Creation";
  }, []);

  // Reset page size when filter changes to avoid weird layouts
  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter]);

  const filteredItems = items.filter(
    (item) => activeFilter === "ALL" || item.category === activeFilter
  );

  // Distribute items across 3 columns to maintain masonry look
  const columns = [[], [], []];
  filteredItems.slice(0, visibleCount).forEach((item, index) => {
    columns[index % 3].push(item);
  });

  const loadMore = () => {
    setVisibleCount(12);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 pb-16">
      
      {/* Hero Banner with Office Glass Walkway Background */}
      <div 
        className="relative py-28 text-white overflow-hidden text-center bg-cover bg-center mb-10"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(12, 28, 48, 0.88), rgba(4, 14, 26, 0.93)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')` 
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-4">
            <a href="/" className="hover:underline">Home</a>
            <span>•</span>
            <span className="text-white/60">Gallery</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase">
            Our Gallery
          </h1>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 max-w-xl mx-auto">
            <span className="h-px flex-1 bg-sky-400/30" />
            <p className="text-xs md:text-sm font-extrabold tracking-widest uppercase text-sky-300">
              Exploring the art of architectural glass
            </p>
            <span className="h-px flex-1 bg-sky-400/30" />
          </div>
        </div>
      </div>

      {/* Floating Filter Capsule Bar Container */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 text-xs md:text-sm font-bold tracking-widest rounded-full transition-all duration-200 uppercase cursor-pointer ${
                activeFilter === cat
                  ? "bg-[#1481b8]/10 text-[#1481b8] border border-[#1481b8]/10 shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-[#1481b8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Columns Grid Container */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6">
              {col.map((item) => {
                const itemIdx = filteredItems.findIndex((f) => f.id === item.id);
                return (
                  <div
                    key={item.id}
                    className={`relative group overflow-hidden rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl cursor-pointer ${
                      item.isTall ? "h-[500px]" : "h-[238px]"
                    } ${itemIdx >= 6 ? "animate-fade-in-up" : ""}`}
                    style={itemIdx >= 6 ? { animationDelay: `${(itemIdx - 6) * 100}ms`, opacity: 0 } : {}}
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1.5">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-lg leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1481b8] hover:bg-[#116e9d] text-white rounded-full text-sm font-bold shadow-md shadow-[#1481b8]/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Load More Projects
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

    </div>
  );
}
