import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function WhoWeServe() {
  const [meta, setMeta] = useState(() => {
    const saved = localStorage.getItem("vg_majorclients_meta");
    return saved ? JSON.parse(saved) : null;
  });
  const [displayClients, setDisplayClients] = useState(() => {
    const saved = localStorage.getItem("vg_majorclients_list");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "home", "majorclients"),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.meta) {
            setMeta(data.meta);
            localStorage.setItem(
              "vg_majorclients_meta",
              JSON.stringify(data.meta),
            );
          }
          if (data.list) {
            setDisplayClients(data.list);
            localStorage.setItem(
              "vg_majorclients_list",
              JSON.stringify(data.list),
            );
          }
        } else {
          const defaultMeta = {
            title: "",
            description: "",
          };
          setMeta(defaultMeta);
          localStorage.setItem(
            "vg_majorclients_meta",
            JSON.stringify(defaultMeta),
          );
          setDisplayClients([]);
          localStorage.setItem("vg_majorclients_list", JSON.stringify([]));
        }
      },
      (error) => {
        console.error("Error fetching WhoWeServe data:", error);
        setDisplayClients([]);
      },
    );

    return () => unsubscribe();
  }, []);

  if (!meta || displayClients === null) {
    return (
      <section
        id="whoweserve"
        className="py-16 bg-white border-b border-slate-100"
      >
        <div className="max-w-6xl mx-auto px-6 animate-pulse">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-gray-300" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-px w-8 bg-gray-300" />
          </div>
          <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-3" />
          <div className="h-4 w-96 bg-gray-300 rounded mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-72 flex flex-col"
              >
                <div className="h-56 bg-gray-300 w-full" />
                <div className="p-5 flex-1 bg-white border-t border-gray-50">
                  <div className="h-4 bg-gray-300 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayClients.length === 0) return null;

  return (
    <section
      id="whoweserve"
      className="py-16 bg-white text-slate-800 border-b border-slate-100"
    >
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
