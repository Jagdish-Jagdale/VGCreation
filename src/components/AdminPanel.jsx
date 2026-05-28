import { useState, useEffect } from "react";
import logo from "../assets/vision_glass_creation_logo.png";
import symbol from "../assets/vision_glass_creation_symbol.png";
import { secondaryAuth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Default Fallbacks
const defaultAbout = {
  description: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
  yearsOfExperience: "12",
  satisfiedClients: "1500+",
  completedProjects: "2400+"
};

const defaultContact = {
  phone1: "+91 99219 17083",
  phone2: "+91 78409 17083",
  email: "visionglasscreation1@gmail.com",
  address: "Plot No. 595, Ganganagar, Nigdi, Pimpri-Chinchwad 411044",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM"
};

const defaultHome = {
  heroBadge: "Pune's Trusted Glass Experts",
  heroTitle: "Expert in Window & Glass Solutions",
  heroDescription: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
  heroBtn1Text: "Get a Free Quote",
  heroBtn2Text: "View Our Work",
  heroImage1: "src/assets/hero1.jpeg",
  heroImage2: "src/assets/hero2.jpeg"
};

const defaultEnquiries = [
  {
    id: 1,
    name: "Rajesh Mehta",
    phone: "9876543210",
    email: "rajesh@mehtabuilders.com",
    requirement: "Facade",
    message: "We need structural facade work for our new 5-story commercial IT building in Baner, Pune.",
    date: "2026-05-26 14:32",
    status: "unread"
  },
  {
    id: 2,
    name: "Amit Sharma",
    phone: "8877665544",
    email: "amit.sharma@gmail.com",
    requirement: "Glass Partitions",
    message: "Looking for soundproof glass partitions for a corporate conference room at Hinjawadi Phase 2.",
    date: "2026-05-25 10:15",
    status: "read"
  }
];

export default function AdminPanel() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [homeData, setHomeData] = useState(defaultHome);
  const [image1Mode, setImage1Mode] = useState("link");
  const [image2Mode, setImage2Mode] = useState("link");
  const [aboutData, setAboutData] = useState(defaultAbout);
  const [contactData, setContactData] = useState(defaultContact);
  const [enquiries, setEnquiries] = useState(defaultEnquiries);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [tickerItems, setTickerItems] = useState([]);
  const [tickerHeader, setTickerHeader] = useState("Our Expertise");
  const [tickerSubHeader, setTickerSubHeader] = useState("Comprehensive Glass Solutions");
  const [tickerDescription, setTickerDescription] = useState("Premium glass and window services for commercial, residential and industrial spaces.");
  const [tickerModal, setTickerModal] = useState({ show: false, text: "" });

  // Toast feedback state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Modals state
  const [serviceModal, setServiceModal] = useState({ show: false, mode: "add", data: null });
  const [galleryModal, setGalleryModal] = useState({ show: false, data: null });

  // Form states for modals
  const [serviceForm, setServiceForm] = useState({ title: "", category: "", description: "", features: "", image: "" });
  
  // Custom What We Do and Promises States
  const [whatWeDoMeta, setWhatWeDoMeta] = useState({
    title: "Our Services",
    description: "End-to-end glass solutions, crafted with precision and delivered with care across Pune's skyline."
  });
  const [promisesMeta, setPromisesMeta] = useState({
    title1: "Complete glass solutions under one roof —",
    title2: "quality guaranteed.",
    description: "Professional finishing on every project, large or small. We deliver exceptional value through specialized craftsmanship, reliable delivery, and premium materials designed to elevate your architectural spaces.",
    buttonLabel: "Start Your Project"
  });
  const [promisesList, setPromisesList] = useState([]);
  const [promiseModal, setPromiseModal] = useState({ show: false, mode: "add", data: null });
  const [promiseForm, setPromiseForm] = useState({ title: "", description: "" });
  const [galleryForm, setGalleryForm] = useState({ title: "", category: "", image: "", isTall: false });

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // Load all state on mount
  useEffect(() => {
    document.title = "Admin Panel | Vision Glass Creation";

    // About
    const savedAbout = localStorage.getItem("vg_about");
    if (savedAbout) setAboutData(JSON.parse(savedAbout));
    else localStorage.setItem("vg_about", JSON.stringify(defaultAbout));

    // Contact
    const savedContact = localStorage.getItem("vg_contact");
    if (savedContact) setContactData(JSON.parse(savedContact));
    else localStorage.setItem("vg_contact", JSON.stringify(defaultContact));

    // Home
    const savedHome = localStorage.getItem("vg_home");
    if (savedHome) setHomeData(JSON.parse(savedHome));
    else localStorage.setItem("vg_home", JSON.stringify(defaultHome));

    // Enquiries
    const savedEnquiries = localStorage.getItem("vg_enquiries");
    if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries));
    else localStorage.setItem("vg_enquiries", JSON.stringify(defaultEnquiries));

    // Services
    const savedServices = localStorage.getItem("vg_services");
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Fetch initial services from services array (or we define static initial mock list)
      const initialServices = [
        {
          id: 1,
          category: "WINDOWS",
          title: "Aluminium & UPVC Windows",
          description: "Durable, weather-resistant window frames and partition systems for all building types — residential to industrial.",
          features: ["ALUMINIUM", "UPVC", "CASEMENT", "SLIDING"],
          image: "src/assets/Aluminium & UPVC Windows.jpg"
        },
        {
          id: 2,
          category: "MIRRORS",
          title: "Decorative & LED Mirrors",
          description: "Backlit LED mirrors, decorative mirrors, vastu mirrors and custom mirror installations for all spaces.",
          features: ["LED BACKLIT", "DECORATIVE", "VASTU", "CUSTOM SIZE"],
          image: "src/assets/Decorative & LED Mirrors.jpg"
        },
        {
          id: 3,
          category: "FACADE",
          title: "Structural & Semi-Structural Facade Work",
          description: "High-performance structural and semi-structural exterior glass facade systems for commercial buildings and IT parks.",
          features: ["STRUCTURAL", "SEMI-STRUCTURAL", "CURTAIN WALL", "SPIDER GLASS"],
          image: "src/assets/Structural & Semi-Structural Facade Work.jpg"
        },
        {
          id: 4,
          category: "INTERIOR",
          title: "Complete Glass Interior Solutions",
          description: "Custom glass shelving, cabinets, display units and full glass interior fitouts tailored to your design.",
          features: ["SHELVING", "CABINETS", "PARTITIONS", "FITOUTS"],
          image: "src/assets/Complete Glass Interior Solutions.jpeg"
        },
        {
          id: 5,
          category: "GLAZING",
          title: "Glass Glazing Work",
          description: "Toughened glass glazing and composite ACP panel installations for building exteriors and interiors.",
          features: ["TOUGHENED GLASS", "ACP PANEL", "EXTERIOR", "INTERIOR"],
          image: "src/assets/Glass Glazing.jpg"
        }
      ];
      localStorage.setItem("vg_services", JSON.stringify(initialServices));
      setServices(initialServices);
    }

    // Gallery
    const savedGallery = localStorage.getItem("vg_gallery");
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    } else {
      const initialGallery = [
        { id: 1, category: "COMMERCIAL", title: "Structural Glass Facade", image: "src/assets/gallery1.jpeg", isTall: true },
        { id: 2, category: "RESIDENTIAL", title: "Luxury Glass Railings", image: "src/assets/gallery2.jpeg", isTall: false },
        { id: 3, category: "COMMERCIAL", title: "Corporate Office Partitions", image: "src/assets/gallery3.jpeg", isTall: false },
        { id: 4, category: "RESIDENTIAL", title: "Modern Shower Enclosure", image: "src/assets/gallery4.jpeg", isTall: true },
        { id: 5, category: "COMMERCIAL", title: "Commercial Entrance Canopy", image: "src/assets/gallery5.jpeg", isTall: true },
        { id: 6, category: "RESIDENTIAL", title: "Frameless Glass Balustrade", image: "src/assets/gallery6.jpeg", isTall: false },
        { id: 7, category: "INDUSTRIAL", title: "Industrial Exterior Glazing", image: "src/assets/gallery7.jpeg", isTall: false },
        { id: 8, category: "RESIDENTIAL", title: "Premium LED Mirror", image: "src/assets/gallery8.jpeg", isTall: true },
        { id: 9, category: "COMMERCIAL", title: "Spider Glass Facade", image: "src/assets/gallery9.jpeg", isTall: true },
        { id: 10, category: "RESIDENTIAL", title: "Acoustic Window Glass", image: "src/assets/gallery10.jpeg", isTall: false },
        { id: 11, category: "COMMERCIAL", title: "Office Glass Partition Wall", image: "src/assets/gallery11.jpeg", isTall: false },
        { id: 12, category: "COMMERCIAL", title: "Frosted Office Glazing", image: "src/assets/gallery12.jpeg", isTall: true },
        { id: 13, category: "INDUSTRIAL", title: "Industrial Glass Skylight", image: "src/assets/gallery13.jpeg", isTall: false },
        { id: 14, category: "RESIDENTIAL", title: "Designer Decorative Mirror", image: "src/assets/gallery14.jpeg", isTall: true }
      ];
      localStorage.setItem("vg_gallery", JSON.stringify(initialGallery));
      setGallery(initialGallery);
    }

    // Ticker items & symbol
    const savedTickerItems = localStorage.getItem("vg_ticker_items");
    if (savedTickerItems) {
      setTickerItems(JSON.parse(savedTickerItems));
    } else {
      const initialTicker = [
        "Glass Partitions",
        "Structural Facade",
        "Aluminium Windows",
        "LED Mirrors",
        "UPVC Windows",
        "Glass Glazing",
        "Interior Solutions",
        "Curtain Wall",
        "PVC Doors",
        "Decorative Glass",
        "Acid Etching",
        "Bend Glass"
      ];
      localStorage.setItem("vg_ticker_items", JSON.stringify(initialTicker));
      setTickerItems(initialTicker);
    }

    const savedTickerMeta = localStorage.getItem("vg_ticker_meta");
    if (savedTickerMeta) {
      try {
        const meta = JSON.parse(savedTickerMeta);
        if (meta.header) setTickerHeader(meta.header);
        if (meta.subHeader) setTickerSubHeader(meta.subHeader);
        if (meta.description) setTickerDescription(meta.description);
      } catch (e) {
        console.error("Failed to parse vg_ticker_meta", e);
      }
    }

    // What We Do Meta
    const savedWhatWeDoMeta = localStorage.getItem("vg_whatwedo_meta");
    if (savedWhatWeDoMeta) {
      setWhatWeDoMeta(JSON.parse(savedWhatWeDoMeta));
    }

    // Promises Meta
    const savedPromisesMeta = localStorage.getItem("vg_promises_meta");
    if (savedPromisesMeta) {
      setPromisesMeta(JSON.parse(savedPromisesMeta));
    }

    // Promises List
    const savedPromisesList = localStorage.getItem("vg_promises_list");
    if (savedPromisesList) {
      setPromisesList(JSON.parse(savedPromisesList));
    } else {
      const defaultPromises = [
        {
          id: 1,
          title: "One-Stop Glass Solution",
          description: "Complete solutions from concept and design to fabrication and final installation, all under a single roof."
        },
        {
          id: 2,
          title: "Professional Installation",
          description: "Our in-house team of certified specialists ensures safe, level, and structural alignment for every project."
        },
        {
          id: 3,
          title: "Trusted by 50+ Architects",
          description: "The preferred, reliable creation partner for over 50 leading architects and premium builders in Pune."
        },
        {
          id: 4,
          title: "Guaranteed Workmanship",
          description: "Uncompromising standards of durability, premium finishes, and meticulous attention to detail."
        }
      ];
      localStorage.setItem("vg_promises_list", JSON.stringify(defaultPromises));
      setPromisesList(defaultPromises);
    }
  }, []);

  // Handlers for Homepage settings
  const handleHomeSave = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem("vg_home", JSON.stringify(homeData));
    localStorage.setItem("vg_whatwedo_meta", JSON.stringify(whatWeDoMeta));
    localStorage.setItem("vg_promises_meta", JSON.stringify(promisesMeta));
    triggerToast("All Homepage settings saved successfully!");
  };

  const handlePromiseSubmit = (e) => {
    if (e) e.preventDefault();
    if (promiseModal.mode === "add") {
      if (promisesList.length >= 4) {
        triggerToast("Only up to 4 promises can be added.", "error");
        return;
      }
      const newPromise = {
        id: Date.now(),
        title: promiseForm.title,
        description: promiseForm.description
      };
      const updated = [...promisesList, newPromise];
      setPromisesList(updated);
      localStorage.setItem("vg_promises_list", JSON.stringify(updated));
      triggerToast("Promise added successfully!");
    } else {
      const updated = promisesList.map((p) => {
        if (p.id === promiseModal.data.id) {
          return {
            ...p,
            title: promiseForm.title,
            description: promiseForm.description
          };
        }
        return p;
      });
      setPromisesList(updated);
      localStorage.setItem("vg_promises_list", JSON.stringify(updated));
      triggerToast("Promise updated successfully!");
    }
    setPromiseModal({ show: false, mode: "add", data: null });
    setPromiseForm({ title: "", description: "" });
  };

  const handleDeletePromise = (id) => {
    if (window.confirm("Are you sure you want to delete this promise?")) {
      const updated = promisesList.filter((p) => p.id !== id);
      setPromisesList(updated);
      localStorage.setItem("vg_promises_list", JSON.stringify(updated));
      triggerToast("Promise deleted!", "error");
    }
  };

  const openPromiseModal = (mode, data = null) => {
    setPromiseModal({ show: true, mode, data });
    if (mode === "edit" && data) {
      setPromiseForm({ title: data.title, description: data.description });
    } else {
      setPromiseForm({ title: "", description: "" });
    }
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        triggerToast("Image is too large (max 1.5MB). Please compress it first.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (index === 1) {
          setHomeData(prev => ({ ...prev, heroImage1: reader.result }));
        } else {
          setHomeData(prev => ({ ...prev, heroImage2: reader.result }));
        }
        triggerToast(`Image ${index} loaded successfully! Save settings to apply.`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers for About
  const handleAboutSave = (e) => {
    e.preventDefault();
    localStorage.setItem("vg_about", JSON.stringify(aboutData));
    triggerToast("About Page settings saved successfully!");
  };

  // Handlers for Contact
  const handleContactSave = (e) => {
    e.preventDefault();
    localStorage.setItem("vg_contact", JSON.stringify(contactData));
    triggerToast("Contact Us settings saved successfully!");
  };

  // Handlers for Enquiries
  const handleToggleEnquiryStatus = (id) => {
    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        return { ...enq, status: enq.status === "unread" ? "read" : "unread" };
      }
      return enq;
    });
    setEnquiries(updated);
    localStorage.setItem("vg_enquiries", JSON.stringify(updated));
    triggerToast("Enquiry status updated!");
  };

  const handleDeleteEnquiry = (id) => {
    const updated = enquiries.filter((enq) => enq.id !== id);
    setEnquiries(updated);
    localStorage.setItem("vg_enquiries", JSON.stringify(updated));
    triggerToast("Enquiry deleted!", "error");
  };

  // Handlers for Services CRUD
  const openServiceModal = (mode, data = null) => {
    setServiceModal({ show: true, mode, data });
    if (mode === "edit" && data) {
      setServiceForm({
        title: data.title,
        category: data.category,
        description: data.description,
        features: data.features.join(", "),
        image: data.image
      });
    } else {
      setServiceForm({ title: "", category: "WINDOWS", description: "", features: "", image: "" });
    }
  };

  const handleServiceFormSubmit = (e) => {
    e.preventDefault();
    const featuresArray = serviceForm.features
      .split(",")
      .map((f) => f.trim().toUpperCase())
      .filter((f) => f.length > 0);

    let updatedServices;
    if (serviceModal.mode === "add") {
      const newService = {
        id: Date.now(),
        title: serviceForm.title,
        category: serviceForm.category,
        description: serviceForm.description,
        features: featuresArray,
        image: serviceForm.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      };
      updatedServices = [...services, newService];
      triggerToast("Service added successfully!");
    } else {
      updatedServices = services.map((s) => {
        if (s.id === serviceModal.data.id) {
          return {
            ...s,
            title: serviceForm.title,
            category: serviceForm.category,
            description: serviceForm.description,
            features: featuresArray,
            image: serviceForm.image
          };
        }
        return s;
      });
      triggerToast("Service updated successfully!");
    }

    setServices(updatedServices);
    localStorage.setItem("vg_services", JSON.stringify(updatedServices));
    setServiceModal({ show: false, mode: "add", data: null });
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const updated = services.filter((s) => s.id !== id);
      setServices(updated);
      localStorage.setItem("vg_services", JSON.stringify(updated));
      triggerToast("Service deleted!", "error");
    }
  };

  // Handlers for Gallery CRUD
  const openGalleryModal = () => {
    setGalleryModal({ show: true });
    setGalleryForm({ title: "", category: "COMMERCIAL", image: "", isTall: false });
  };

  const handleGallerySubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title: galleryForm.title,
      category: galleryForm.category,
      image: galleryForm.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      isTall: galleryForm.isTall
    };

    const updated = [newItem, ...gallery];
    setGallery(updated);
    localStorage.setItem("vg_gallery", JSON.stringify(updated));
    setGalleryModal({ show: false });
    triggerToast("Gallery image added!");
  };

  const handleDeleteGallery = (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      const updated = gallery.filter((item) => item.id !== id);
      setGallery(updated);
      localStorage.setItem("vg_gallery", JSON.stringify(updated));
      triggerToast("Gallery item removed!", "error");
    }
  };

  // Handlers for Ticker (Slider)
  const handleDeleteTickerItem = (index) => {
    const updated = tickerItems.filter((_, i) => i !== index);
    setTickerItems(updated);
    localStorage.setItem("vg_ticker_items", JSON.stringify(updated));
    triggerToast("Ticker item removed!", "error");
  };

  const handleTickerSubmit = (e) => {
    e.preventDefault();
    if (!tickerModal.text.trim()) return;
    const updated = [...tickerItems, tickerModal.text.trim()];
    setTickerItems(updated);
    localStorage.setItem("vg_ticker_items", JSON.stringify(updated));
    setTickerModal({ show: false, text: "" });
    triggerToast("Ticker item added successfully!");
  };

  const handleTickerMetaSave = () => {
    const meta = { header: tickerHeader, subHeader: tickerSubHeader, description: tickerDescription };
    localStorage.setItem("vg_ticker_meta", JSON.stringify(meta));
    triggerToast("Slider settings saved successfully!");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    triggerToast("Logged out successfully! Redirecting...");
    setTimeout(() => {
      window.history.pushState(null, "", "/admin/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }, 1200);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3.5 px-5 py-4 rounded-xl shadow-2xl transition-all duration-300 border-l-4 ${toast.type === "error" ? "bg-red-50 border-red-500 text-red-800" : "bg-green-50 border-green-500 text-green-800"
          }`}>
          <span>{toast.message}</span>
        </div>
      )}
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Left Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 ${isSidebarCollapsed ? "md:w-[76px]" : "md:w-[240px]"} w-[260px] bg-white md:rounded-[20px] shadow-2xl md:shadow-sm border border-slate-100/80 p-4 flex flex-col justify-between z-50 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:top-6 md:bottom-6 md:left-6`}>
        <div>
          {/* Top Control Header & Sidebar Icon */}
          <div className={`hidden md:flex items-center mb-6 px-1 ${isSidebarCollapsed ? "justify-center" : "justify-end"}`}>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-slate-400 hover:text-[#6340b2] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </button>
          </div>

          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end mb-2">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Logo Brand Header */}
          <div className="flex flex-col items-center justify-center mb-4 px-1">
            <div className="text-center flex justify-center items-center">
              <img src={isSidebarCollapsed ? symbol : logo} alt="Logo" className={isSidebarCollapsed ? "h-8 w-8 object-contain" : "h-14 object-contain"} />
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[9px] font-extrabold tracking-[0.2em] text-[#6340b2] uppercase opacity-75 mt-1.5">
                Admin Panel
              </span>
            )}
            <div className="w-full border-t border-slate-100 mt-3"></div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => handleTabClick("home")}
              className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-3"} py-2.5 rounded-lg text-[13px] tracking-wide relative transition-all ${activeTab === "home"
                ? "text-[#6340b2] bg-violet-100/90 font-bold"
                : "text-slate-500 hover:bg-slate-50/70 hover:text-slate-800 font-medium"
                }`}
            >
              {activeTab === "home" && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-[#6340b2] rounded-r-md"></span>
              )}
              <svg className={`w-4.5 h-4.5 shrink-0 transition-colors ${activeTab === "home" ? "text-[#6340b2]" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!isSidebarCollapsed && <span>Home Page</span>}
            </button>

            <button
              onClick={() => handleTabClick("about")}
              className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-3"} py-2.5 rounded-lg text-[13px] tracking-wide relative transition-all ${activeTab === "about"
                ? "text-[#6340b2] bg-violet-100/90 font-bold"
                : "text-slate-500 hover:bg-slate-50/70 hover:text-slate-800 font-medium"
                }`}
            >
              {activeTab === "about" && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-[#6340b2] rounded-r-md"></span>
              )}
              <svg className={`w-4.5 h-4.5 shrink-0 transition-colors ${activeTab === "about" ? "text-[#6340b2]" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {!isSidebarCollapsed && <span>About Settings</span>}
            </button>

            <button
              onClick={() => handleTabClick("services")}
              className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-3"} py-2.5 rounded-lg text-[13px] tracking-wide relative transition-all ${activeTab === "services"
                ? "text-[#6340b2] bg-violet-100/90 font-bold"
                : "text-slate-500 hover:bg-slate-50/70 hover:text-slate-800 font-medium"
                }`}
            >
              {activeTab === "services" && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-[#6340b2] rounded-r-md"></span>
              )}
              <svg className={`w-4.5 h-4.5 shrink-0 transition-colors ${activeTab === "services" ? "text-[#6340b2]" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {!isSidebarCollapsed && <span>Manage Services</span>}
            </button>

            <button
              onClick={() => handleTabClick("gallery")}
              className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-3"} py-2.5 rounded-lg text-[13px] tracking-wide relative transition-all ${activeTab === "gallery"
                ? "text-[#6340b2] bg-violet-100/90 font-bold"
                : "text-slate-500 hover:bg-slate-50/70 hover:text-slate-800 font-medium"
                }`}
            >
              {activeTab === "gallery" && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-[#6340b2] rounded-r-md"></span>
              )}
              <svg className={`w-4.5 h-4.5 shrink-0 transition-colors ${activeTab === "gallery" ? "text-[#6340b2]" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {!isSidebarCollapsed && <span>Manage Gallery</span>}
            </button>

            <button
              onClick={() => handleTabClick("contact")}
              className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-3"} py-2.5 rounded-lg text-[13px] tracking-wide relative transition-all ${activeTab === "contact"
                ? "text-[#6340b2] bg-violet-100/90 font-bold"
                : "text-slate-500 hover:bg-slate-50/70 hover:text-slate-800 font-medium"
                }`}
            >
              {activeTab === "contact" && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-[#6340b2] rounded-r-md"></span>
              )}
              <svg className={`w-4.5 h-4.5 shrink-0 transition-colors ${activeTab === "contact" ? "text-[#6340b2]" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {!isSidebarCollapsed && <span>Contact Settings</span>}
            </button>

            <button
              onClick={() => handleTabClick("enquiries")}
              className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-3"} py-2.5 rounded-lg text-[13px] tracking-wide relative transition-all ${activeTab === "enquiries"
                ? "text-[#6340b2] bg-violet-100/90 font-bold"
                : "text-slate-500 hover:bg-slate-50/70 hover:text-slate-800 font-medium"
                }`}
            >
              {activeTab === "enquiries" && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-[#6340b2] rounded-r-md"></span>
              )}
              <svg className={`w-4.5 h-4.5 shrink-0 transition-colors ${activeTab === "enquiries" ? "text-[#6340b2]" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2m-3 0h-5.5" />
              </svg>
              {!isSidebarCollapsed && <span>Enquiries Log</span>}
              {enquiries.filter((e) => e.status === "unread").length > 0 && (
                <span className={isSidebarCollapsed ? "absolute top-1 right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-pulse" : "absolute right-3 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold"}>
                  {enquiries.filter((e) => e.status === "unread").length}
                </span>
              )}
            </button>

          </nav>
        </div>

        {/* Sign Out Link */}
        <div className="px-1">
          <div className="w-full border-t border-slate-100 my-3"></div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`flex items-center ${isSidebarCollapsed ? "justify-center px-2" : "gap-2 px-3"} py-2 rounded-lg bg-red-50 hover:bg-red-100/85 text-red-600 hover:text-red-700 transition-colors w-full text-left font-bold text-xs cursor-pointer border border-red-100/40`}
          >
            <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isSidebarCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Right Side Workspace Area */}
      <main className={`flex-grow w-full ${isSidebarCollapsed ? "md:pl-[112px]" : "md:pl-[258px]"} min-h-screen flex flex-col transition-all duration-300`}>
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-30">
          <img src={logo} alt="Logo" className="h-8 object-contain" />
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-600 focus:outline-none p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 md:pt-12 flex-grow overflow-x-hidden">

          {/* TAB: HOME PAGE */}
          {activeTab === "home" && (
            <div className="space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Home Page Settings</h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">Configure the main hero details, badges, CTA button labels, and showcase images.</p>
                </div>
                <button
                  type="button"
                  onClick={handleHomeSave}
                  className="bg-[#6340b2] hover:bg-[#5231a3] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-violet-500/10 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

              {/* Homepage Hero Settings */}
              <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6">
                <form id="home-form" onSubmit={handleHomeSave} className="space-y-5">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Hero Section Settings</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Badge Title</label>
                      <input
                        type="text"
                        value={homeData.heroBadge}
                        onChange={(e) => setHomeData({ ...homeData, heroBadge: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/5 transition-all font-medium"
                        placeholder="e.g. Pune's Trusted Glass Experts"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Header Title</label>
                      <input
                        type="text"
                        value={homeData.heroTitle}
                        onChange={(e) => setHomeData({ ...homeData, heroTitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/5 transition-all font-medium"
                        placeholder="Use '&' symbol to color code the second half, e.g. Expert in Window & Glass Solutions"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Button Label 1</label>
                      <input
                        type="text"
                        value={homeData.heroBtn1Text}
                        onChange={(e) => setHomeData({ ...homeData, heroBtn1Text: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/5 transition-all font-medium"
                        placeholder="e.g. Get a Free Quote"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Button Label 2</label>
                      <input
                        type="text"
                        value={homeData.heroBtn2Text}
                        onChange={(e) => setHomeData({ ...homeData, heroBtn2Text: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/5 transition-all font-medium"
                        placeholder="e.g. View Our Work"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={homeData.heroDescription}
                      onChange={(e) => setHomeData({ ...homeData, heroDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/5 transition-all font-medium resize-none"
                      placeholder="Enter hero paragraph description..."
                      required
                    />
                  </div>

                  {/* Two Image inputs with Link and File Upload Mode Toggle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Hero Image 1 */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Showcase Image 1 (Large)</label>
                        <div className="flex gap-1.5 bg-slate-200/60 p-0.5 rounded-lg">
                          <button
                            type="button"
                            onClick={() => setImage1Mode("link")}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              image1Mode === "link"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            Link / Path
                          </button>
                          <button
                            type="button"
                            onClick={() => setImage1Mode("upload")}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              image1Mode === "upload"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            Upload File
                          </button>
                        </div>
                      </div>

                      {image1Mode === "link" ? (
                        <input
                          type="text"
                          value={homeData.heroImage1}
                          onChange={(e) => setHomeData({ ...homeData, heroImage1: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#6340b2] font-medium bg-white"
                          placeholder="e.g. src/assets/hero1.jpeg"
                          required
                        />
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 1)}
                          className="w-full text-[11px] text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#6340b2]/10 file:text-[#6340b2] hover:file:bg-[#6340b2]/20 cursor-pointer bg-white p-1 rounded-lg border border-slate-200"
                        />
                      )}

                      {homeData.heroImage1 && (
                        <div className="relative w-28 h-18 rounded-lg overflow-hidden border border-slate-200/80 bg-white">
                          <img src={homeData.heroImage1} alt="Preview 1" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    {/* Hero Image 2 */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Showcase Image 2 (Small Overlapping)</label>
                        <div className="flex gap-1.5 bg-slate-200/60 p-0.5 rounded-lg">
                          <button
                            type="button"
                            onClick={() => setImage2Mode("link")}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              image2Mode === "link"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            Link / Path
                          </button>
                          <button
                            type="button"
                            onClick={() => setImage2Mode("upload")}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              image2Mode === "upload"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            Upload File
                          </button>
                        </div>
                      </div>

                      {image2Mode === "link" ? (
                        <input
                          type="text"
                          value={homeData.heroImage2}
                          onChange={(e) => setHomeData({ ...homeData, heroImage2: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#6340b2] font-medium bg-white"
                          placeholder="e.g. src/assets/hero2.jpeg"
                          required
                        />
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 2)}
                          className="w-full text-[11px] text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#6340b2]/10 file:text-[#6340b2] hover:file:bg-[#6340b2]/20 cursor-pointer bg-white p-1 rounded-lg border border-slate-200"
                        />
                      )}

                      {homeData.heroImage2 && (
                        <div className="relative w-28 h-18 rounded-lg overflow-hidden border border-slate-200/80 bg-white">
                          <img src={homeData.heroImage2} alt="Preview 2" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                  </div>
                </form>
              </div>

              {/* Services Slider Settings */}
              <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Services Slider Settings</h3>
                    <p className="text-xs text-slate-400 font-medium">Manage text items that scroll on the homepage services ticker.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTickerModal({ show: true, text: "" })}
                    className="inline-flex items-center gap-1.5 bg-violet-50 hover:bg-violet-100/80 text-[#6340b2] px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-violet-100 shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Service
                  </button>
                </div>

                {/* Ticker Items */}
                {tickerItems.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100 mb-4 mt-4">
                    {tickerItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-white border border-violet-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:border-[#6340b2]/30 transition-all"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteTickerItem(index)}
                          className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete Item"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {tickerItems.length === 0 && (
                  <p className="text-xs text-slate-400 font-medium mb-4">No items added to the services slider yet.</p>
                )}
              </div>

              {/* What We Do Settings Section */}
              <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">What We Do Settings</h3>
                    <p className="text-xs text-slate-400 font-medium">Configure title and description for the What We Do (Our Services) section.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Title</label>
                    <input
                      type="text"
                      value={whatWeDoMeta.title}
                      onChange={(e) => setWhatWeDoMeta({ ...whatWeDoMeta, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] font-medium"
                      placeholder="e.g. Our Services"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Description</label>
                    <input
                      type="text"
                      value={whatWeDoMeta.description}
                      onChange={(e) => setWhatWeDoMeta({ ...whatWeDoMeta, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] font-medium"
                      placeholder="e.g. End-to-end glass solutions..."
                      required
                    />
                  </div>
                </div>

                {/* Table with 6 Sr Nos */}
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left text-sm text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 font-bold">
                      <tr>
                        <th className="px-6 py-3.5">Sr. No</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">Service Title</th>
                        <th className="px-6 py-3.5">Description</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[0, 1, 2, 3, 4, 5].map((index) => {
                        const s = services[index];
                        return (
                          <tr key={index + 1} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-bold text-slate-800">{index + 1}</td>
                            <td className="px-6 py-4">
                              {s ? (
                                <span className="bg-violet-50 text-[#6340b2] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                  {s.category}
                                </span>
                              ) : (
                                <span className="text-slate-400 text-xs">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 font-semibold text-slate-700">
                              {s ? s.title : <span className="text-slate-400 font-normal italic">Empty slot</span>}
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate">
                              {s ? s.description : "-"}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {s ? (
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => openServiceModal("edit", s)}
                                    className="text-xs font-bold text-[#6340b2] hover:text-[#5231a3] cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <span className="text-slate-200">|</span>
                                  <button
                                    onClick={() => handleDeleteService(s.id)}
                                    className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => openServiceModal("add")}
                                  className="text-xs font-bold text-[#6340b2] hover:underline cursor-pointer"
                                >
                                  + Add Service
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Our Promises Settings Section */}
              <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Our Promises Settings</h3>
                    <p className="text-xs text-slate-400 font-medium">Configure section headings, description, CTA, and up to 4 key promises.</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (promisesList.length >= 4) {
                          triggerToast("Maximum of 4 promises are allowed. Please delete or edit existing ones.", "error");
                        } else {
                          openPromiseModal("add");
                        }
                      }}
                      className="inline-flex items-center gap-1 bg-violet-50 hover:bg-violet-100/80 text-[#6340b2] px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-violet-100 shrink-0"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Promise
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Heading Title 1</label>
                    <input
                      type="text"
                      value={promisesMeta.title1}
                      onChange={(e) => setPromisesMeta({ ...promisesMeta, title1: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] font-medium"
                      placeholder="e.g. Complete glass solutions..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Heading Title 2 (Color Highlighted)</label>
                    <input
                      type="text"
                      value={promisesMeta.title2}
                      onChange={(e) => setPromisesMeta({ ...promisesMeta, title2: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] font-medium"
                      placeholder="e.g. quality guaranteed."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Button Label</label>
                    <input
                      type="text"
                      value={promisesMeta.buttonLabel}
                      onChange={(e) => setPromisesMeta({ ...promisesMeta, buttonLabel: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] font-medium"
                      placeholder="e.g. Start Your Project"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Section Description Paragraph</label>
                    <textarea
                      rows={2}
                      value={promisesMeta.description}
                      onChange={(e) => setPromisesMeta({ ...promisesMeta, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] font-medium resize-none"
                      placeholder="Enter description paragraph..."
                      required
                    />
                  </div>
                </div>

                {/* Promises List Display */}
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Current Promises (Max 4)</h4>
                {promisesList.length === 0 ? (
                  <p className="text-xs text-slate-400 font-medium py-3">No promises added yet. Click 'Add Promise' to add one.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {promisesList.map((p, index) => (
                      <div key={p.id || index} className="p-4 bg-slate-50/40 rounded-xl border border-slate-100/50 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-400">Promise #{index + 1}</span>
                            <div className="flex gap-2 items-center text-xs font-bold">
                              <button
                                type="button"
                                onClick={() => openPromiseModal("edit", p)}
                                className="text-[#6340b2] hover:underline cursor-pointer"
                              >
                                Edit
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                type="button"
                                onClick={() => handleDeletePromise(p.id)}
                                className="text-red-600 hover:underline cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <h5 className="text-sm font-bold text-slate-800 mb-1">{p.title}</h5>
                          <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB: ABOUT SETTINGS */}
          {activeTab === "about" && (
            <div className="space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">About Page Settings</h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">Modify the company profile details, tagline descriptions, and experience stats.</p>
                </div>
                <button
                  type="submit"
                  form="about-form"
                  className="bg-[#6340b2] hover:bg-[#5231a3] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-violet-500/10 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-8 max-w-3xl">
                <form id="about-form" onSubmit={handleAboutSave} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Company Tagline / Hero Description</label>
                  <textarea
                    rows={4}
                    value={aboutData.description}
                    onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm resize-none"
                    placeholder="Enter main description for home/about page..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Years of Experience</label>
                    <input
                      type="text"
                      value={aboutData.yearsOfExperience}
                      onChange={(e) => setAboutData({ ...aboutData, yearsOfExperience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                      placeholder="e.g. 12"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Satisfied Clients</label>
                    <input
                      type="text"
                      value={aboutData.satisfiedClients}
                      onChange={(e) => setAboutData({ ...aboutData, satisfiedClients: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                      placeholder="e.g. 1500+"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Completed Projects</label>
                    <input
                      type="text"
                      value={aboutData.completedProjects}
                      onChange={(e) => setAboutData({ ...aboutData, completedProjects: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                      placeholder="e.g. 2400+"
                      required
                    />
                  </div>
                </div>

                </form>
              </div>
            </div>
          )}

          {/* TAB: MANAGE SERVICES */}
          {activeTab === "services" && (
            <div className="space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Manage Services</h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">Add, edit, or delete offerings shown on the main website.</p>
                </div>
                <button
                  onClick={() => openServiceModal("add")}
                  className="bg-[#6340b2] hover:bg-[#5231a3] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Service
                </button>
              </div>

              {/* Services Table List */}
              <div className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-500">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-50 font-bold border-b border-violet-100">
                    <tr>
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Service Details</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Features/Tags</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-violet-50">
                    {services.map((srv) => (
                      <tr key={srv.id} className="hover:bg-slate-50/30">
                        <td className="px-6 py-4">
                          <img
                            src={srv.image}
                            alt={srv.title}
                            className="w-16 h-10 object-cover rounded-lg border border-slate-200"
                          />
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <span className="block font-bold text-slate-800 text-sm leading-snug">{srv.title}</span>
                          <span className="block text-xs text-slate-400 mt-1 truncate">{srv.description}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold uppercase text-slate-500">{srv.category}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {srv.features.map((tag) => (
                              <span key={tag} className="text-[9px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2 justify-end items-center font-bold text-xs">
                            <button
                              onClick={() => openServiceModal("edit", srv)}
                              className="text-[#6340b2] hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              onClick={() => handleDeleteService(srv.id)}
                              className="text-red-600 hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Service Modal Form */}
              {serviceModal.show && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                  <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative">
                    <button
                      onClick={() => setServiceModal({ show: false, mode: "add", data: null })}
                      className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
                      {serviceModal.mode === "add" ? "Create New Service Card" : "Edit Service Details"}
                    </h3>

                    <form onSubmit={handleServiceFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Service Title</label>
                        <input
                          type="text"
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                          placeholder="e.g. Acoustic Glass Windows"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Category Badge</label>
                          <select
                            value={serviceForm.category}
                            onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                            required
                          >
                            <option value="WINDOWS">WINDOWS</option>
                            <option value="MIRRORS">MIRRORS</option>
                            <option value="FACADE">FACADE</option>
                            <option value="INTERIOR">INTERIOR</option>
                            <option value="GLAZING">GLAZING</option>
                            <option value="SHOWER">SHOWER</option>
                            <option value="SKYLIGHT">SKYLIGHT</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Image URL / Path</label>
                          <input
                            type="text"
                            value={serviceForm.image}
                            onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                            placeholder="e.g. src/assets/Aluminium & UPVC Windows.jpg"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description</label>
                        <textarea
                          rows={3}
                          value={serviceForm.description}
                          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] resize-none"
                          placeholder="Brief description of the service..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Features/Tags (Comma Separated)</label>
                        <input
                          type="text"
                          value={serviceForm.features}
                          onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                          placeholder="e.g. TOUGHENED, FRAMELESS, WEATHERPROOF"
                        />
                      </div>

                      <div className="flex gap-3 justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => setServiceModal({ show: false, mode: "add", data: null })}
                          className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-[#6340b2] hover:bg-[#5231a3] text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                        >
                          {serviceModal.mode === "add" ? "Create Service" : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: MANAGE GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Manage Gallery Showcase</h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">Add portfolio projects or delete gallery images displayed on the website.</p>
                </div>
                <button
                  onClick={openGalleryModal}
                  className="bg-[#6340b2] hover:bg-[#5231a3] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Image
                </button>
              </div>

              {/* Gallery List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden flex flex-col justify-between group relative">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="absolute top-2.5 right-2.5 bg-white/95 hover:bg-red-50 text-red-600 hover:text-red-700 p-1.5 rounded-lg shadow transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] font-bold text-violet-600 uppercase block tracking-wider mb-1">{item.category}</span>
                      <h4 className="text-slate-800 text-xs font-bold leading-tight line-clamp-1">{item.title}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase tracking-wide">
                        {item.isTall ? "Vertical Layout" : "Horizontal Layout"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gallery Image Add Modal */}
              {galleryModal.show && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                  <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                    <button
                      onClick={() => setGalleryModal({ show: false })}
                      className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">Add Portfolio Photo</h3>

                    <form onSubmit={handleGallerySubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Image Title</label>
                        <input
                          type="text"
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                          placeholder="e.g. Double Height Lobby Spider Glass"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Image URL / Path</label>
                        <input
                          type="text"
                          value={galleryForm.image}
                          onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                          placeholder="e.g. src/assets/gallery3.jpeg"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Category Badge</label>
                          <select
                            value={galleryForm.category}
                            onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                            required
                          >
                            <option value="COMMERCIAL">COMMERCIAL</option>
                            <option value="RESIDENTIAL">RESIDENTIAL</option>
                            <option value="INDUSTRIAL">INDUSTRIAL</option>
                          </select>
                        </div>

                        <div className="flex flex-col justify-end pb-1.5">
                          <label className="inline-flex items-center gap-2 cursor-pointer mt-auto">
                            <input
                              type="checkbox"
                              checked={galleryForm.isTall}
                              onChange={(e) => setGalleryForm({ ...galleryForm, isTall: e.target.checked })}
                              className="w-4.5 h-4.5 accent-[#6340b2] rounded focus:ring-violet-500/10 cursor-pointer"
                            />
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Vertical aspect?</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => setGalleryModal({ show: false })}
                          className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-[#6340b2] hover:bg-[#5231a3] text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Add Photo
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: CONTACT SETTINGS */}
          {activeTab === "contact" && (
            <div className="space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Contact Settings</h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">Modify physical address locations, phone numbers, email, and working hours.</p>
                </div>
                <button
                  type="submit"
                  form="contact-form"
                  className="bg-[#6340b2] hover:bg-[#5231a3] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-violet-500/10 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-8 max-w-3xl">
                <form id="contact-form" onSubmit={handleContactSave} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Primary Phone (Mobile)</label>
                    <input
                      type="text"
                      value={contactData.phone1}
                      onChange={(e) => setContactData({ ...contactData, phone1: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                      placeholder="e.g. +91 99219 17083"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Secondary Phone (Office)</label>
                    <input
                      type="text"
                      value={contactData.phone2}
                      onChange={(e) => setContactData({ ...contactData, phone2: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                      placeholder="e.g. +91 78409 17083"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                      placeholder="e.g. info@visionglass.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Working Hours</label>
                    <input
                      type="text"
                      value={contactData.workingHours}
                      onChange={(e) => setContactData({ ...contactData, workingHours: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                      placeholder="e.g. Mon - Sat: 9:00 AM - 7:00 PM"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Factory / Office Address</label>
                  <input
                    type="text"
                    value={contactData.address}
                    onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                    placeholder="Enter full physical address..."
                    required
                  />
                </div>

                </form>
              </div>
            </div>
          )}

          {/* TAB: ENQUIRIES LOG */}
          {activeTab === "enquiries" && (
            <div className="space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Enquiries & Quotations Log</h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">Monitor and respond to customer quotation submissions in real-time.</p>
                </div>
                <div className="text-xs font-bold bg-violet-50 text-[#6340b2] px-3.5 py-2 rounded-xl border border-violet-100/60 shadow-sm">
                  Total Leads: {enquiries.length}
                </div>
              </div>

              {enquiries.length === 0 ? (
                <p className="text-sm text-slate-400 py-12 text-center font-medium">No quotation enquiries in the database.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 font-bold border-b border-violet-100">
                      <tr>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Contact Info</th>
                        <th className="px-6 py-4">Requirement</th>
                        <th className="px-6 py-4">Project Message</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-violet-50">
                      {enquiries.map((enq) => (
                        <tr key={enq.id} className={`hover:bg-slate-50/50 transition-colors ${enq.status === "unread" ? "bg-violet-50/20 font-medium" : ""}`}>
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-800 text-sm block">{enq.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">
                              {enq.status === "unread" ? "New Lead" : "Processed"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-700 block font-medium">{enq.phone}</span>
                            <span className="text-xs text-slate-400 block break-all">{enq.email || "No Email Provided"}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-violet-100 text-[#6340b2] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                              {enq.requirement}
                            </span>
                          </td>
                          <td className="px-6 py-4 max-w-xs text-xs text-slate-600 leading-relaxed font-medium">
                            {enq.message}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                            {enq.date}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2 justify-end items-center font-bold text-xs">
                              <button
                                onClick={() => handleToggleEnquiryStatus(enq.id)}
                                className={`${enq.status === "unread" ? "text-green-600" : "text-amber-600"} hover:underline cursor-pointer`}
                              >
                                {enq.status === "unread" ? "Mark Read" : "Mark Unread"}
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="text-red-600 hover:underline cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Add Ticker Item Modal */}
      {tickerModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setTickerModal({ show: false, text: "" })}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">Add Ticker Service</h3>

            <form onSubmit={handleTickerSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Service Slider Text</label>
                <input
                  type="text"
                  value={tickerModal.text}
                  onChange={(e) => setTickerModal({ ...tickerModal, text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                  placeholder="e.g. Tough Glass Facades"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setTickerModal({ show: false, text: "" })}
                  className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#6340b2] hover:bg-[#5231a3] text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Add Ticker Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1.5px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-[500px] w-full shadow-2xl relative border border-slate-100/50 transition-all duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex gap-5 items-start">
              {/* Logout Warning Circular Icon */}
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100/50">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>

              {/* Message Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Confirm Logout</h3>
                <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed">
                  Are you sure you want to exit your administrative session?
                </p>
                <p className="text-xs text-slate-400 mt-1.5 font-medium leading-normal">
                  You will need to sign in again to access the dashboard.
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end items-center gap-3 mt-6">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/10 cursor-pointer"
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Promise Modal */}
      {promiseModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setPromiseModal({ show: false, mode: "add", data: null })}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
              {promiseModal.mode === "add" ? "Add Promise" : "Edit Promise"}
            </h3>

            <form onSubmit={handlePromiseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Promise Title</label>
                <input
                  type="text"
                  value={promiseForm.title}
                  onChange={(e) => setPromiseForm({ ...promiseForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                  placeholder="e.g. Professional Installation"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows={3}
                  value={promiseForm.description}
                  onChange={(e) => setPromiseForm({ ...promiseForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] resize-none"
                  placeholder="Enter details..."
                  required
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setPromiseModal({ show: false, mode: "add", data: null })}
                  className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#6340b2] hover:bg-[#5231a3] text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  {promiseModal.mode === "add" ? "Add Promise" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
