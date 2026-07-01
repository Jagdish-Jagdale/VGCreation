import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ReferClient() {
  const [meta, setMeta] = useState({
    title: "Refer a Client",
    subtitle: "Help us grow and get rewarded",
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "home", "referaclient");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.meta)
            setMeta({
              title: data.meta.title || "Refer a Client",
              subtitle: data.meta.subtitle || "Help us grow and get rewarded",
            });
          if (data.cards) setCards(data.cards);
        } else {
          setCards([]); // Hide if no data is presentac
        }
      } catch (error) {
        console.error("Error fetching ReferClient data:", error);
      }
    };
    fetchData();
  }, []);

  if (cards.length === 0) return null;

  return (
    <section
      id="referclient"
      className="py-16 bg-[#f8fafc] text-slate-800 border-b border-slate-100"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#1481b8]/40" />
            <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
              Refer a Client
            </span>
            <span className="h-px w-8 bg-[#1481b8]/40" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            {meta.title}
          </h2>

          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            {meta.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-slate-100/80 p-6 rounded-2xl flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md hover:border-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="flex flex-col items-center">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-sky-50/80 flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-sky-100">
                  <svg
                    className="w-5 h-5 text-[#1481b8]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>

                {/* Heading */}
                <h3 className="text-sm md:text-base font-bold text-slate-800 mb-3 px-2 leading-snug">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-6 px-1">
                  {card.subtitle}
                </p>
              </div>

              {/* Action Button */}
              <a
                href="/contact"
                className="w-full py-2 bg-slate-50 border border-slate-100 hover:bg-[#1481b8] hover:border-[#1481b8] text-slate-600 hover:text-white font-bold text-xs md:text-sm rounded-full text-center transition-all duration-200 shadow-sm"
              >
                {card.buttonLabel || "Contact Us"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
