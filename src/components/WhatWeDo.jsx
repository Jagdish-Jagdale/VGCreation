import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import windowsImg from "../assets/Aluminium & UPVC Windows.jpg";
import mirrorsImg from "../assets/Decorative & LED Mirrors.jpg";
import facadeImg from "../assets/Structural & Semi-Structural Facade Work.jpg";
import interiorImg from "../assets/Complete Glass Interior Solutions.jpeg";
import glazingImg from "../assets/Glass Glazing.jpg";

const services = [
  {
    id: 1,
    category: "HOME",
    title: "Home",
    description: "Complete glass interior solutions, sliding doors, and mirrors for residential spaces.",
    features: ["RESIDENTIAL", "INTERIORS", "CUSTOM DESIGN"],
    image: interiorImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" /></svg>
    ),
  },
  {
    id: 2,
    category: "CORPORATE",
    title: "Corporate",
    description: "High-end glass partitions, meeting room enclosures, and premium interiors for corporate settings.",
    features: ["PARTITIONS", "MEETING ROOMS", "ACOUSTIC"],
    image: facadeImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
  },
  {
    id: 3,
    category: "OFFICE",
    title: "Office",
    description: "Custom glass workstations, cabins, doors, and functional spaces for modern offices.",
    features: ["WORKSTATIONS", "CABINS", "GLASS DOORS"],
    image: windowsImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
  },
  {
    id: 4,
    category: "FASAD WORKas",
    title: "Fasad Work",
    description: "Structural and semi-structural facade work, curtain walls, and spider glass for building exteriors.",
    features: ["STRUCTURAL", "SEMI-STRUCTURAL", "CURTAIN WALL"],
    image: glazingImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" /></svg>
    ),
  },
  {
    id: 5,
    category: "IT PARK",
    title: "IT Park",
    description: "Large scale exterior glazing, energy-efficient glass installations, and massive window systems for IT parks.",
    features: ["LARGE SCALE", "GLAZING", "ENERGY EFFICIENT"],
    image: mirrorsImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" /></svg>
    ),
  },
];

export default function WhatWeDo() {
  const [servicesList, setServicesList] = useState(() => {
    const saved = localStorage.getItem("vg_servicesList");
    return saved ? JSON.parse(saved) : null;
  });
  const [meta, setMeta] = useState(() => {
    const saved = localStorage.getItem("vg_whatwedo_meta");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const unsubServices = onSnapshot(collection(db, "services"), (querySnapshot) => {
      if (!querySnapshot.empty) {
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const featuredList = list.filter(s => s.featured === true);
        const finalServices = featuredList.length > 0 ? featuredList : list.slice(0, 6);
        setServicesList(finalServices);
        localStorage.setItem("vg_servicesList", JSON.stringify(finalServices));
      } else {
        setServicesList([]);
      }
    }, (error) => {
      console.error("Error fetching services:", error);
      setServicesList([]);
    });

    const unsubMeta = onSnapshot(doc(db, "home", "whatwedo"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMeta(data);
        localStorage.setItem("vg_whatwedo_meta", JSON.stringify(data));
      } else {
        setMeta({
          title: "",
          description: ""
        });
      }
    }, (error) => {
      console.error("Error fetching WhatWeDo meta:", error);
    });

    return () => {
      unsubServices();
      unsubMeta();
    };
  }, []);

  if (!servicesList || !meta) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 animate-pulse">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gray-300" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-px w-10 bg-gray-300" />
          </div>
          <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-3" />
          <div className="h-4 w-96 bg-gray-300 rounded mx-auto mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-80 flex flex-col">
                <div className="h-48 bg-gray-300 w-full" />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-4/5" />
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-10 bg-[#1481b8]" />
          <span className="text-[#1481b8] text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>
          <span className="h-px w-10 bg-[#1481b8]" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
          {meta.title}
        </h2>
        <p className="text-center text-gray-500 max-w-md mx-auto mb-12">
          {meta.description}
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              {/* Image area with gradient + icon + overlaid title */}
              <div className="relative h-70 overflow-hidden flex items-center justify-center">
                <img
                  src={service.image}
                  alt={service.name || service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10"></div>



                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 z-10">
                  <h3 className="text-white font-bold text-sm leading-snug uppercase tracking-wide">
                    {service.name || service.title}
                  </h3>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-[#1481b8] text-sm font-semibold hover:gap-2 transition-all"
                >
                  Learn More
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        {servicesList.length > 6 && (
          <div className="flex justify-center mt-12">
            <a
              href="/services"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-[#1481b8] hover:border-[#1481b8]/50 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-sm group"
            >
              View All Services
              <svg
                className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
