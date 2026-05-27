import { useState, useEffect } from "react";
import windowsImg from "../assets/Aluminium & UPVC Windows.jpg";
import mirrorsImg from "../assets/Decorative & LED Mirrors.jpg";
import facadeImg from "../assets/Structural & Semi-Structural Facade Work.jpg";
import interiorImg from "../assets/Complete Glass Interior Solutions.jpeg";
import glazingImg from "../assets/Glass Glazing.jpg";

const services = [
  {
    id: 1,
    category: "WINDOWS",
    title: "Aluminium & UPVC Windows",
    description:
      "Durable, weather-resistant window frames and partition systems for all building types — residential to industrial.",
    image: windowsImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 3h18v18H3V3zm9 0v18M3 12h18" />
      </svg>
    ),
  },
  {
    id: 2,
    category: "MIRRORS",
    title: "Decorative & LED Mirrors",
    description:
      "Backlit LED mirrors, decorative mirrors, vastu mirrors and custom mirror installations for all spaces.",
    image: mirrorsImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
      </svg>
    ),
  },
  {
    id: 3,
    category: "FACADE",
    title: "Structural & Semi-Structural Facade Work",
    description:
      "High-performance structural and semi-structural exterior glass facade systems for commercial buildings and IT parks.",
    image: facadeImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 4,
    category: "INTERIOR",
    title: "Complete Glass Interior Solutions",
    description:
      "Custom glass shelving, cabinets, display units and full glass interior fitouts tailored to your design.",
    image: interiorImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm10 0a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" />
      </svg>
    ),
  },
  {
    id: 5,
    category: "GLAZING",
    title: "Glass Glazing Work",
    description:
      "Toughened glass glazing and composite ACP panel installations for building exteriors and interiors.",
    image: glazingImg,
    icon: (
      <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("vg_services");
    if (saved) {
      setServicesList(JSON.parse(saved));
    } else {
      setServicesList(services);
    }
  }, []);

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
          Our Services
        </h2>
        <p className="text-center text-gray-500 max-w-md mx-auto mb-12">
          End-to-end glass solutions, crafted with precision and delivered with care across Pune's skyline.
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
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10"></div>
                


                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 z-10">
                  <h3 className="text-white font-bold text-sm leading-snug uppercase tracking-wide">
                    {service.title}
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
      </div>
    </section>
  );
}
