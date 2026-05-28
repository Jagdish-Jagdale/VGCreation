import { useState, useEffect } from "react";

const defaultHome = {
  heroBadge: "Pune's Trusted Glass Experts",
  heroPrimaryTitle: "Expert in Window",
  heroSecondaryTitle: "& Glass Solutions",
  heroDescription: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
  heroBtn1Text: "Get a Free Quote",
  heroBtn2Text: "View Our Work",
  heroImage1: "src/assets/hero1.jpeg",
  heroImage2: "src/assets/gallery10.jpeg"
};

export default function HomeSettings({ triggerToast }) {
  const [homeData, setHomeData] = useState(defaultHome);
  const [image1Mode, setImage1Mode] = useState("link");
  const [image2Mode, setImage2Mode] = useState("link");

  const [tickerItems, setTickerItems] = useState([]);
  const [tickerModal, setTickerModal] = useState({ show: false, text: "" });

  const [whatWeDoMeta, setWhatWeDoMeta] = useState({
    title: "Our Services",
    description: "End-to-end glass solutions, crafted with precision and delivered with care across Pune's skyline."
  });

  const [services, setServices] = useState([]);
  const [serviceModal, setServiceModal] = useState({ show: false, mode: "add", data: null });
  const [serviceForm, setServiceForm] = useState({ title: "", category: "", description: "", features: "", image: "" });

  const [promisesMeta, setPromisesMeta] = useState({
    title1: "Complete glass solutions under one roof —",
    title2: "quality guaranteed.",
    description: "Professional finishing on every project, large or small. We deliver exceptional value through specialized craftsmanship, reliable delivery, and premium materials designed to elevate your architectural spaces.",
    buttonLabel: "Start Your Project"
  });
  const [promisesList, setPromisesList] = useState([]);
  const [promiseModal, setPromiseModal] = useState({ show: false, mode: "add", data: null });
  const [promiseForm, setPromiseForm] = useState({ title: "", description: "" });

  useEffect(() => {
    // Home
    const savedHome = localStorage.getItem("vg_home");
    if (savedHome) {
      let parsed = JSON.parse(savedHome);
      if (parsed.heroTitle && !parsed.heroPrimaryTitle) {
        parsed.heroPrimaryTitle = parsed.heroTitle.split("&")[0].trim();
        parsed.heroSecondaryTitle = parsed.heroTitle.includes("&") ? "& " + parsed.heroTitle.split("&").slice(1).join("&").trim() : "& Glass Solutions";
      }
      setHomeData(parsed);
    } else {
      localStorage.setItem("vg_home", JSON.stringify(defaultHome));
    }

    // Services
    const savedServices = localStorage.getItem("vg_services");
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }

    // Ticker items
    const savedTickerItems = localStorage.getItem("vg_ticker_items");
    if (savedTickerItems) {
      setTickerItems(JSON.parse(savedTickerItems));
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
    }
  }, []);

  const handleHomeSave = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem("vg_home", JSON.stringify(homeData));
    localStorage.setItem("vg_whatwedo_meta", JSON.stringify(whatWeDoMeta));
    localStorage.setItem("vg_promises_meta", JSON.stringify(promisesMeta));
    triggerToast("All Homepage settings saved successfully!");
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

  // Ticker Handlers
  const handleAddTickerItem = () => {
    if (!tickerModal.text.trim()) return;
    const updated = [...tickerItems, tickerModal.text.trim()];
    setTickerItems(updated);
    localStorage.setItem("vg_ticker_items", JSON.stringify(updated));
    setTickerModal({ show: false, text: "" });
    triggerToast("Ticker item added successfully!");
  };

  const handleDeleteTickerItem = (index) => {
    const updated = tickerItems.filter((_, i) => i !== index);
    setTickerItems(updated);
    localStorage.setItem("vg_ticker_items", JSON.stringify(updated));
    triggerToast("Ticker item removed!", "error");
  };

  // Services Handlers
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

  // Promise Handlers
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

  return (
    <div className="space-y-8">
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
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Primary Title</label>
              <input
                type="text"
                value={homeData.heroPrimaryTitle}
                onChange={(e) => setHomeData({ ...homeData, heroPrimaryTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/5 transition-all font-medium"
                placeholder="e.g. Expert in Window"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Secondary Title</label>
              <input
                type="text"
                value={homeData.heroSecondaryTitle}
                onChange={(e) => setHomeData({ ...homeData, heroSecondaryTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/5 transition-all font-medium"
                placeholder="e.g. & Glass Solutions"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] resize-none"
              placeholder="Enter hero paragraph description..."
              required
            />
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Showcase Image 1 (Large)</label>
                <div className="flex gap-1.5 bg-slate-200/60 p-0.5 rounded-lg">
                  <button type="button" onClick={() => setImage1Mode("link")} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${image1Mode === "link" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Link / Path</button>
                  <button type="button" onClick={() => setImage1Mode("upload")} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${image1Mode === "upload" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Upload File</button>
                </div>
              </div>
              {image1Mode === "link" ? (
                <input type="text" value={homeData.heroImage1} onChange={(e) => setHomeData({ ...homeData, heroImage1: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#6340b2] bg-white" placeholder="e.g. src/assets/hero1.jpeg" required />
              ) : (
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 1)} className="w-full text-[11px] bg-white p-1 rounded-lg border border-slate-200 cursor-pointer" />
              )}
              {homeData.heroImage1 && (
                <div className="relative w-28 h-18 rounded-lg overflow-hidden border border-slate-200/80 bg-white">
                  <img src={homeData.heroImage1} alt="Preview 1" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Showcase Image 2 (Small)</label>
                <div className="flex gap-1.5 bg-slate-200/60 p-0.5 rounded-lg">
                  <button type="button" onClick={() => setImage2Mode("link")} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${image2Mode === "link" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Link / Path</button>
                  <button type="button" onClick={() => setImage2Mode("upload")} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${image2Mode === "upload" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Upload File</button>
                </div>
              </div>
              {image2Mode === "link" ? (
                <input type="text" value={homeData.heroImage2} onChange={(e) => setHomeData({ ...homeData, heroImage2: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#6340b2] bg-white" placeholder="e.g. src/assets/hero2.jpeg" required />
              ) : (
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 2)} className="w-full text-[11px] bg-white p-1 rounded-lg border border-slate-200 cursor-pointer" />
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

      {/* Ticker Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Services Slider Settings</h3>
            <p className="text-xs text-slate-400 font-medium">Manage text items that scroll on the homepage services ticker.</p>
          </div>
          <button type="button" onClick={() => setTickerModal({ show: true, text: "" })} className="inline-flex items-center gap-1.5 bg-violet-50 text-[#6340b2] px-4 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer border border-violet-100">
            Add Service
          </button>
        </div>
        {tickerItems.length > 0 ? (
          <div className="flex flex-wrap gap-2.5 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100 mb-4 mt-4">
            {tickerItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-white border border-violet-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:border-[#6340b2]/30 transition-all">
                <span>{item}</span>
                <button type="button" onClick={() => handleDeleteTickerItem(index)} className="text-slate-400 hover:text-red-500 cursor-pointer" title="Delete Item">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-medium mb-4">No items added to the services slider yet.</p>
        )}
      </div>

      {/* What We Do Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">What We Do Settings</h3>
            <p className="text-xs text-slate-400 font-medium">Configure title and description for the What We Do section.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Title</label>
            <input type="text" value={whatWeDoMeta.title} onChange={(e) => setWhatWeDoMeta({ ...whatWeDoMeta, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. Our Services" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Description</label>
            <input type="text" value={whatWeDoMeta.description} onChange={(e) => setWhatWeDoMeta({ ...whatWeDoMeta, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. End-to-end glass solutions..." required />
          </div>
        </div>

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
                      {s ? <span className="bg-violet-50 text-[#6340b2] text-[10px] font-bold px-2 py-0.5 rounded uppercase">{s.category}</span> : <span className="text-slate-400 text-xs">-</span>}
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
                          <button onClick={() => openServiceModal("edit", s)} className="text-xs font-bold text-[#6340b2] hover:text-[#5231a3] cursor-pointer">Edit</button>
                          <span className="text-slate-200">|</span>
                          <button onClick={() => handleDeleteService(s.id)} className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer">Delete</button>
                        </div>
                      ) : (
                        <button onClick={() => openServiceModal("add")} className="text-xs font-bold text-[#6340b2] hover:underline cursor-pointer">+ Add Service</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Our Promises Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Our Promises Settings</h3>
            <p className="text-xs text-slate-400 font-medium">Configure section headings and up to 4 key promises.</p>
          </div>
          <button type="button" onClick={() => { if (promisesList.length >= 4) triggerToast("Max 4 promises allowed.", "error"); else openPromiseModal("add"); }} className="inline-flex items-center gap-1 bg-violet-50 text-[#6340b2] px-3.5 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer border border-violet-100">
            Add Promise
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Heading Title 1</label>
            <input type="text" value={promisesMeta.title1} onChange={(e) => setPromisesMeta({ ...promisesMeta, title1: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. Complete glass solutions..." required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Heading Title 2</label>
            <input type="text" value={promisesMeta.title2} onChange={(e) => setPromisesMeta({ ...promisesMeta, title2: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. quality guaranteed." required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Button Label</label>
            <input type="text" value={promisesMeta.buttonLabel} onChange={(e) => setPromisesMeta({ ...promisesMeta, buttonLabel: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Description Paragraph</label>
            <textarea rows={2} value={promisesMeta.description} onChange={(e) => setPromisesMeta({ ...promisesMeta, description: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2] resize-none" required />
          </div>
        </div>

        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Current Promises (Max 4)</h4>
        {promisesList.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium py-3">No promises added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promisesList.map((p, index) => (
              <div key={p.id || index} className="p-4 bg-slate-50/40 rounded-xl border border-slate-100/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400">Promise #{index + 1}</span>
                    <div className="flex gap-2 text-xs font-bold">
                      <button type="button" onClick={() => openPromiseModal("edit", p)} className="text-[#6340b2] cursor-pointer">Edit</button>
                      <span className="text-slate-300">|</span>
                      <button type="button" onClick={() => handleDeletePromise(p.id)} className="text-red-600 cursor-pointer">Delete</button>
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
      
      {/* Modals */}
      {tickerModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setTickerModal({ show: false, text: "" })} className="absolute top-6 right-6 text-slate-400 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">Add Ticker Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Service Name</label>
                <input type="text" value={tickerModal.text} onChange={(e) => setTickerModal({ ...tickerModal, text: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. Tough Glass Facades" />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setTickerModal({ show: false, text: "" })} className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase cursor-pointer">Cancel</button>
                <button type="button" onClick={handleAddTickerItem} className="px-5 py-2.5 bg-[#6340b2] text-white rounded-xl font-bold text-xs uppercase cursor-pointer">Add Item</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {promiseModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setPromiseModal({ show: false, mode: "add", data: null })} className="absolute top-6 right-6 text-slate-400 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">{promiseModal.mode === "add" ? "Add Promise" : "Edit Promise"}</h3>
            <form onSubmit={handlePromiseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Promise Title</label>
                <input type="text" value={promiseForm.title} onChange={(e) => setPromiseForm({ ...promiseForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Description</label>
                <textarea rows={3} value={promiseForm.description} onChange={(e) => setPromiseForm({ ...promiseForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2] resize-none" required />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setPromiseModal({ show: false, mode: "add", data: null })} className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#6340b2] text-white rounded-xl font-bold text-xs uppercase cursor-pointer">{promiseModal.mode === "add" ? "Add Promise" : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Service Modal */}
      {serviceModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative">
            <button onClick={() => setServiceModal({ show: false, mode: "add", data: null })} className="absolute top-6 right-6 text-slate-400 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
              {serviceModal.mode === "add" ? "Create New Service Card" : "Edit Service Details"}
            </h3>
            <form onSubmit={handleServiceFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Service Title</label>
                <input type="text" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Category Badge</label>
                  <select value={serviceForm.category} onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required>
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
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Image URL / Path</label>
                  <input type="text" value={serviceForm.image} onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Description</label>
                <textarea rows={3} value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2] resize-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Features/Tags (Comma Separated)</label>
                <input type="text" value={serviceForm.features} onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setServiceModal({ show: false, mode: "add", data: null })} className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#6340b2] text-white rounded-xl font-bold text-xs uppercase cursor-pointer">{serviceModal.mode === "add" ? "Create Service" : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
