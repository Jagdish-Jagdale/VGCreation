import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function WhoWeServe() {
  const [meta, setMeta] = useState({
    title: "Trusted by Industry Leaders",
    description: "From architects to industrialists — they all rely on Vision Glass."
  });
  const [displayClients, setDisplayClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "home", "majorclients");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.meta) setMeta(data.meta);
          if (data.list) setDisplayClients(data.list);
        } else {
          // If no firestore document exists, show empty list to prevent default dummy data
          setDisplayClients([]);
        }
      } catch (error) {
        console.error("Error fetching WhoWeServe data:", error);
      }
    };
    fetchData();
  }, []);

  if (displayClients.length === 0) return null;

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
