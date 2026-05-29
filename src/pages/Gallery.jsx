import { useState, useEffect } from "react";
import gallery1 from "../assets/gallery1.jpeg";
import gallery2 from "../assets/gallery2.jpeg";
import gallery3 from "../assets/gallery3.jpeg";
import gallery4 from "../assets/gallery4.jpeg";
import gallery5 from "../assets/gallery5.jpeg";
import gallery6 from "../assets/gallery6.jpeg";
import gallery7 from "../assets/gallery7.jpeg";
import gallery8 from "../assets/gallery8.jpeg";
import gallery9 from "../assets/gallery9.jpeg";
import gallery10 from "../assets/gallery10.jpeg";
import gallery11 from "../assets/gallery11.jpeg";
import gallery12 from "../assets/gallery12.jpeg";
import gallery13 from "../assets/gallery13.jpeg";
import gallery14 from "../assets/gallery14.jpeg";

const items = [
  {
    id: 1,
    category: "FASAD",
    title: "Structural Glass Facade",
    image: gallery1,
    isTall: true,
  },
  {
    id: 2,
    category: "HOME",
    title: "Luxury Glass Railings",
    image: gallery2,
    isTall: false,
  },
  {
    id: 3,
    category: "CORPORATE",
    title: "Corporate Office Partitions",
    image: gallery3,
    isTall: false,
  },
  {
    id: 4,
    category: "HOME",
    title: "Modern Shower Enclosure",
    image: gallery4,
    isTall: true,
  },
  {
    id: 5,
    category: "OFFICE",
    title: "Commercial Entrance Canopy",
    image: gallery5,
    isTall: true,
  },
  {
    id: 6,
    category: "HOME",
    title: "Frameless Glass Balustrade",
    image: gallery6,
    isTall: false,
  },
  {
    id: 7,
    category: "IT",
    title: "Industrial Exterior Glazing",
    image: gallery7,
    isTall: false,
  },
  {
    id: 8,
    category: "HOME",
    title: "Premium LED Mirror",
    image: gallery8,
    isTall: true,
  },
  {
    id: 9,
    category: "FASAD",
    title: "Spider Glass Facade",
    image: gallery9,
    isTall: true,
  },
  {
    id: 10,
    category: "OFFICE",
    title: "Acoustic Window Glass",
    image: gallery10,
    isTall: false,
  },
  {
    id: 11,
    category: "CORPORATE",
    title: "Office Glass Partition Wall",
    image: gallery11,
    isTall: false,
  },
  {
    id: 12,
    category: "OFFICE",
    title: "Frosted Office Glazing",
    image: gallery12,
    isTall: true,
  },
  {
    id: 13,
    category: "IT",
    title: "Industrial Glass Skylight",
    image: gallery13,
    isTall: false,
  },
  {
    id: 14,
    category: "HOME",
    title: "Designer Decorative Mirror",
    image: gallery14,
    isTall: true,
  },
];

const categories = ["ALL", "HOME", "CORPORATE", "OFFICE", "FASAD", "IT"];

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const filterFromUrl = params.get("filter");
    return filterFromUrl && categories.includes(filterFromUrl) ? filterFromUrl : "ALL";
  });
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    document.title = "Gallery | Vision Glass Creation";
    const saved = localStorage.getItem("vg_gallery_v2");
    if (saved) {
      setGalleryItems(JSON.parse(saved));
    } else {
      localStorage.setItem("vg_gallery_v2", JSON.stringify(items));
      setGalleryItems(items);
    }
  }, []);

  // Reset page size and close modal when filter changes to avoid bugs
  useEffect(() => {
    setVisibleCount(6);
    setSelectedIdx(null);
  }, [activeFilter]);

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "ALL" || item.category === activeFilter
  );

  // Distribute items across 3 columns to maintain masonry look
  const columns = [[], [], []];
  filteredItems.slice(0, visibleCount).forEach((item, index) => {
    columns[index % 3].push(item);
  });

  const loadMore = () => {
    setVisibleCount(filteredItems.length);
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  // Keyboard navigation for open modal
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") setSelectedIdx(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, filteredItems]);

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
                    onClick={() => setSelectedIdx(itemIdx)}
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

      {/* Full-Screen Slider Modal overlay */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 select-none">
          {/* Close button */}
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute right-6 top-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Active Image container */}
          <div className="max-h-[75vh] max-w-[90vw] md:max-w-[70vw] relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            <img
              src={filteredItems[selectedIdx].image}
              alt={filteredItems[selectedIdx].title}
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Details & dots pager */}
          <div className="mt-6 text-center">
            <div className="flex items-center gap-3 justify-center">
              <h2 className="text-white font-extrabold text-sm uppercase tracking-wider">
                {filteredItems[selectedIdx].title}
              </h2>
              <span className="text-[9px] font-black text-white bg-[#1481b8] px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                {filteredItems[selectedIdx].category}
              </span>
            </div>

            {/* Dots */}
            <div className="flex gap-1.5 justify-center mt-3.5">
              {filteredItems.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setSelectedIdx(dotIdx)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                    dotIdx === selectedIdx ? "bg-white" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Fractional Page Counter */}
            <div className="text-[10px] font-bold text-white/50 tracking-widest mt-1.5">
              {selectedIdx + 1} / {filteredItems.length}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
