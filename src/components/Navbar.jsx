import { useState, useEffect, useRef } from "react";
import logo from "../assets/vision_glass_creation_logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const clickLock = useRef(false); // prevents observer overriding a click

  const links = ["Home", "About", "Services", "Gallery"];

  // Track active section — fires when a section crosses the viewport midpoint
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return; // ignore observer while user just clicked
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // section is "active" only when it crosses the middle of the viewport
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // On nav click: set active immediately, lock observer for 800ms (scroll duration)
  const handleNavClick = (link) => {
    setActiveSection(link.toLowerCase());
    setOpen(false);
    clickLock.current = true;
    setTimeout(() => {
      clickLock.current = false;
    }, 900);
  };

  const linkClass = (link) => {
    const isActive = activeSection === link.toLowerCase();
    return [
      "font-medium transition-colors pb-0.5",
      isActive
        ? "text-[#1481b8] border-b-2 border-[#1481b8]"
        : "text-gray-700 hover:text-[#1481b8]",
    ].join(" ");
  };

  const mobileLinkClass = (link) => {
    const isActive = activeSection === link.toLowerCase();
    return [
      "block font-medium transition-colors py-1",
      isActive
        ? "text-[#1481b8] border-l-4 border-[#1481b8] pl-3"
        : "text-gray-700 hover:text-[#1481b8] pl-3",
    ].join(" ");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Full-width container — logo flush to left, links flush to right */}
      <div className="w-full px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex-shrink-0" onClick={() => handleNavClick("home")}>
          <img
            src={logo}
            alt="Vision Glass Creation"
            className="h-14 w-auto object-contain"
          />
        </a>

        {/* Desktop links + phone + CTA */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={linkClass(link)}
                  onClick={() => handleNavClick(link)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200" />

          {/* Phone number */}
          <a
            href="tel:+919921917083"
            className="flex items-center gap-2 text-gray-700 hover:text-[#1481b8] transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4 text-[#1481b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 99219 17083
          </a>

          {/* Contact Us button */}
          <a
            href="#contact"
            className="bg-[#1481b8] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#116a9a] transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#1481b8] focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <ul className="md:hidden bg-white border-t px-6 pb-4 flex flex-col gap-2">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={mobileLinkClass(link)}
                onClick={() => handleNavClick(link)}
              >
                {link}
              </a>
            </li>
          ))}

          {/* Phone */}
          <li>
            <a
              href="tel:+919921917083"
              className="flex items-center gap-2 pl-3 py-1 text-gray-700 font-medium hover:text-[#1481b8] transition-colors"
              onClick={() => setOpen(false)}
            >
              <svg className="w-4 h-4 text-[#1481b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 99219 17083
            </a>
          </li>

          {/* Contact Us */}
          <li className="pt-1">
            <a
              href="#contact"
              className="block text-center bg-[#1481b8] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#116a9a] transition-colors"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
