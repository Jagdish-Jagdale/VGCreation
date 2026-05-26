import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ServicesTicker from "./components/ServicesTicker";
import WhatWeDo from "./components/WhatWeDo";
import About from "./components/About";
import Promises from "./components/Promises";
import WhoWeServe from "./components/WhoWeServe";
import ReferClient from "./components/ReferClient";
import WorkWithExperts from "./components/WorkWithExperts";
import Gallery from "./components/Gallery";
import ContactPage from "./components/ContactPage";
import Services from "./components/Services";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";



const SECTION_TITLES = {
  home: "Home | Vision Glass Creation",
  about: "About Us | Vision Glass Creation",
  services: "Services | Vision Glass Creation",
  gallery: "Gallery | Vision Glass Creation",
  contact: "Contact Us | Vision Glass Creation",
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
 
  // Scroll to top immediately on path change, then scroll smoothly to sections if targeting homepage layout
  useEffect(() => {
    window.scrollTo(0, 0);

    if (currentPath === "/") {
      const timer = setTimeout(() => {
        const element = document.getElementById("home");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPath]);

  useEffect(() => {
    // 1. Title Observer
    const sections = document.querySelectorAll("section[id], footer[id]");
 
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
 
    // 2. Global Path Interceptor
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
 
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("/") && !href.startsWith("//")) {
          e.preventDefault();
          window.history.pushState(null, "", href);
          handleLocationChange();
        }
      }
    };
 
    document.addEventListener("click", handleLinkClick);
    window.addEventListener("popstate", handleLocationChange);
 
    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  if (currentPath === "/contact") {
    return (
      <div className="font-sans">
        <Navbar currentPath={currentPath} />
        <ContactPage />
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  if (currentPath === "/about") {
    return (
      <div className="font-sans">
        <Navbar currentPath={currentPath} />
        <div className="pt-8">
          <About />
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  if (currentPath === "/gallery") {
    return (
      <div className="font-sans">
        <Navbar currentPath={currentPath} />
        <div className="pt-8">
          <Gallery />
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  if (currentPath === "/services") {
    return (
      <div className="font-sans">
        <Navbar currentPath={currentPath} />
        <div className="pt-8">
          <Services />
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="font-sans">
      <Navbar currentPath={currentPath} />
      <Home />
      <ServicesTicker />
      <WhatWeDo />
      <Promises />
      <WhoWeServe />
      <ReferClient />
      <WorkWithExperts />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
