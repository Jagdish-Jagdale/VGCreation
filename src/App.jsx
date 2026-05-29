import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import ContactPage from "./pages/ContactPage";
import Services from "./pages/Services";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";



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
    // 1. Global Path Interceptor
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

  if (currentPath === "/admin/login") {
    return (
      <ProtectedRoute requireAuth={false} redirectTo="/admin">
        <div className="font-sans">
          <Login />
        </div>
      </ProtectedRoute>
    );
  }

  if (currentPath.startsWith("/admin")) {
    return (
      <ProtectedRoute requireAuth={true} redirectTo="/admin/login">
        <div className="font-sans">
          <AdminPanel />
        </div>
      </ProtectedRoute>
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
      <LandingPage />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
