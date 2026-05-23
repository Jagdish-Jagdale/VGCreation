const items = [
  { id: 1, title: "Brand Identity", category: "Design" },
  { id: 2, title: "Website Redesign", category: "Web" },
  { id: 3, title: "Social Campaign", category: "Social Media" },
  { id: 4, title: "Product Promo", category: "Video" },
  { id: 5, title: "Logo Suite", category: "Design" },
  { id: 6, title: "Landing Page", category: "Web" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#1481b8] text-center mb-4">Gallery</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          A glimpse of our creative work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#1481b8]/10 rounded-2xl overflow-hidden h-48 flex items-end cursor-pointer"
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg className="w-20 h-20 text-[#1481b8]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1481b8] opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Label */}
              <div className="relative z-10 p-4 w-full">
                <span className="text-xs font-medium text-[#1481b8] bg-white px-2 py-1 rounded-full group-hover:opacity-0 transition-opacity">
                  {item.category}
                </span>
              </div>

              {/* Hover title */}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-semibold text-lg">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
