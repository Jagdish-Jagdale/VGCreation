import { useState, useEffect } from "react";
import architectsImg from "../assets/architects.png";
import buildersImg from "../assets/builders.png";
import commercialImg from "../assets/commercial.png";
import interiorsImg from "../assets/Complete Glass Interior Solutions.jpeg";
import gymImg from "../assets/gallery11.jpeg";
import hospitalImg from "../assets/gallery12.jpeg";
import schoolImg from "../assets/gallery13.jpeg";

export default function WhoWeServe() {
  const [meta, setMeta] = useState({
    title: "Trusted by Industry Leaders",
    description: "From architects to industrialists — they all rely on Vision Glass."
  });
  const [dynamicClients, setDynamicClients] = useState(null);

  useEffect(() => {
    const savedMeta = localStorage.getItem("vg_majorclients_meta");
    if (savedMeta) {
      setMeta(JSON.parse(savedMeta));
    }
    const savedClients = localStorage.getItem("vg_majorclients_list");
    if (savedClients) {
      const parsed = JSON.parse(savedClients);
      if (parsed.length > 0) {
        setDynamicClients(parsed);
      }
    }
  }, []);

  const clients = [
    {
      id: 1,
      title: "Architects",
      subtitle: "Leading firms across Pune",
      image: architectsImg,
    },
    {
      id: 2,
      title: "Interiors",
      subtitle: "Premium interior designers",
      image: interiorsImg,
    },
    {
      id: 3,
      title: "Industrial Companies",
      subtitle: "Large scale manufacturing plants",
      image: commercialImg,
    },
    {
      id: 4,
      title: "Builders",
      subtitle: "Residential & commercial developers",
      image: buildersImg,
    },
    {
      id: 5,
      title: "Gyms",
      subtitle: "Fitness centers and studios",
      image: gymImg,
    },
    {
      id: 6,
      title: "Hospitals",
      subtitle: "Healthcare facilities",
      image: hospitalImg,
    },
    {
      id: 7,
      title: "Schools",
      subtitle: "Educational institutions",
      image: schoolImg,
    },
  ];

  const displayClients = dynamicClients || clients;

  return (
    <section id="whoweserve" className="py-16 bg-white text-slate-800 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#1481b8]/40" />
            <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
              Major Clients
            </span>
            <span className="h-px w-8 bg-[#1481b8]/40" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            {meta.title}
          </h2>
          
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            {meta.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image Area */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={client.image}
                  alt={client.title || client.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Text Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end">
                  <div className="p-5 w-full">
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {client.title || client.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 bg-white border-t border-slate-50">
                <p className="text-slate-500 text-xs md:text-sm font-medium">
                  {client.subtitle || client.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
