import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ServicesTicker from "./components/ServicesTicker";
import WhatWeDo from "./components/WhatWeDo";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";


const SECTION_TITLES = {
  home: "Home | Vision Glass Creation",
  about: "About Us | Vision Glass Creation",
  services: "Services | Vision Glass Creation",
  gallery: "Gallery | Vision Glass Creation",
};

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.title = SECTION_TITLES[id] || "Vision Glass Creation";
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans">
      <Navbar />
      <Home />
      <ServicesTicker />
      <WhatWeDo />
      <About />
      <Services />
      <Gallery />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
