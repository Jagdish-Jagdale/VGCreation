import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { db, storage } from "../../firebase";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DeleteConfirmModal from "./DeleteConfirmModal";

const defaultHome = {
  heroBadge: "Pune's Trusted Glass Experts",
  heroPrimaryTitle: "Expert in Window",
  heroSecondaryTitle: "& Glass Solutions",
  heroDescription: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
  heroBtn1Text: "Get a Free Quote",
  heroBtn2Text: "View Our Work",
  heroImage1: "",
  heroImage2: ""
};

export default function HomeSettings({ triggerToast, setActiveTab }) {
  const [homeData, setHomeData] = useState(defaultHome);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image1Mode, setImage1Mode] = useState("link");
  const [image2Mode, setImage2Mode] = useState("link");



  const [whatWeDoMeta, setWhatWeDoMeta] = useState({
    title: "Our Services",
    description: "End-to-end glass solutions, crafted with precision and delivered with care across Pune's skyline."
  });

  const [majorClientsMeta, setMajorClientsMeta] = useState({
    title: "Trusted by Industry Leaders",
    description: "From architects to industrialists — they all rely on Vision Glass."
  });

  const [referClientMeta, setReferClientMeta] = useState({
    title: "Refer a Client",
    subtitle: "Help us grow and get rewarded"
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

  const [majorClientsList, setMajorClientsList] = useState([]);
  const [majorClientModal, setMajorClientModal] = useState({ show: false, mode: "add", data: null });
  const [majorClientForm, setMajorClientForm] = useState({ name: "", description: "", image: "" });
  const [majorClientImageMode, setMajorClientImageMode] = useState("link");

  const [referClientCards, setReferClientCards] = useState([]);
  const [referClientModal, setReferClientModal] = useState({ show: false, mode: "add", data: null });
  const [referClientForm, setReferClientForm] = useState({ title: "", subtitle: "", buttonLabel: "" });

  const [deleteModal, setDeleteModal] = useState({ show: false, type: "", id: null, itemName: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hero Section
        const heroDoc = await getDoc(doc(db, "home", "herosection"));
        if (heroDoc.exists()) {
          setHomeData({ ...defaultHome, ...heroDoc.data() });
        } else {
          // Fallback to local storage if firebase is empty initially
          const savedHome = localStorage.getItem("vg_home");
          if (savedHome) {
            let parsed = JSON.parse(savedHome);
            if (parsed.heroTitle && !parsed.heroPrimaryTitle) {
              parsed.heroPrimaryTitle = parsed.heroTitle.split("&")[0].trim();
              parsed.heroSecondaryTitle = parsed.heroTitle.includes("&") ? "& " + parsed.heroTitle.split("&").slice(1).join("&").trim() : "& Glass Solutions";
            }
            setHomeData({ ...defaultHome, ...parsed });
          } else {
            setHomeData(defaultHome);
          }
        }

        // Services (Fetch featured from firestore)
        const servicesSnap = await getDocs(collection(db, "services"));
        if (!servicesSnap.empty) {
          const list = servicesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          const featuredList = list.filter(s => s.featured === true);
          setServices(featuredList);
        } else {
          setServices([]);
        }

        // What We Do Meta
        const whatWeDoDoc = await getDoc(doc(db, "home", "whatwedo"));
        if (whatWeDoDoc.exists()) {
          setWhatWeDoMeta({ title: "", description: "", ...whatWeDoDoc.data() });
        } else {
          const savedWhatWeDoMeta = localStorage.getItem("vg_whatwedo_meta");
          if (savedWhatWeDoMeta) setWhatWeDoMeta({ title: "", description: "", ...JSON.parse(savedWhatWeDoMeta) });
        }

        // Promises
        const promisesDoc = await getDoc(doc(db, "home", "ourpromises"));
        if (promisesDoc.exists()) {
          const data = promisesDoc.data();
          if (data.meta) setPromisesMeta({ title1: "", title2: "", ...data.meta });
          if (data.list) setPromisesList(data.list);
        } else {
          const savedPromisesMeta = localStorage.getItem("vg_promises_meta");
          if (savedPromisesMeta) setPromisesMeta({ title1: "", title2: "", ...JSON.parse(savedPromisesMeta) });
          const savedPromisesList = localStorage.getItem("vg_promises_list");
          if (savedPromisesList) setPromisesList(JSON.parse(savedPromisesList));
        }

        // Major Clients
        const majorClientsDoc = await getDoc(doc(db, "home", "majorclients"));
        if (majorClientsDoc.exists()) {
          const data = majorClientsDoc.data();
          if (data.meta) setMajorClientsMeta({ title: "", description: "", ...data.meta });
          if (data.list) setMajorClientsList(data.list);
        } else {
          const savedMajorClientsMeta = localStorage.getItem("vg_majorclients_meta");
          if (savedMajorClientsMeta) setMajorClientsMeta({ title: "", description: "", ...JSON.parse(savedMajorClientsMeta) });
          const savedMajorClientsList = localStorage.getItem("vg_majorclients_list");
          if (savedMajorClientsList) setMajorClientsList(JSON.parse(savedMajorClientsList));
        }

        // Refer a Client
        const referClientDoc = await getDoc(doc(db, "home", "referaclient"));
        if (referClientDoc.exists()) {
          const data = referClientDoc.data();
          if (data.meta) setReferClientMeta({ title: "", description: "", ...data.meta });
          if (data.cards) setReferClientCards(data.cards);
        } else {
          const savedReferClientMeta = localStorage.getItem("vg_referclient_meta");
          if (savedReferClientMeta) setReferClientMeta({ title: "", description: "", ...JSON.parse(savedReferClientMeta) });
          const savedReferClientCards = localStorage.getItem("vg_referclient_cards");
          if (savedReferClientCards) setReferClientCards(JSON.parse(savedReferClientCards));
        }
      } catch (error) {
        console.error("Error fetching home settings:", error);
        triggerToast("Failed to load settings from database", "error");
      }
    };
    fetchData();
  }, []);

  const handleHomeSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      // Save to Firestore
      await setDoc(doc(db, "home", "herosection"), homeData);
      await setDoc(doc(db, "home", "whatwedo"), whatWeDoMeta);
      await setDoc(doc(db, "home", "ourpromises"), { meta: promisesMeta, list: promisesList });
      await setDoc(doc(db, "home", "majorclients"), { meta: majorClientsMeta, list: majorClientsList });
      await setDoc(doc(db, "home", "referaclient"), { meta: referClientMeta, cards: referClientCards });

      // Save to localStorage as backup
      localStorage.setItem("vg_home", JSON.stringify(homeData));
      localStorage.setItem("vg_whatwedo_meta", JSON.stringify(whatWeDoMeta));
      localStorage.setItem("vg_majorclients_meta", JSON.stringify(majorClientsMeta));
      localStorage.setItem("vg_promises_meta", JSON.stringify(promisesMeta));
      localStorage.setItem("vg_referclient_meta", JSON.stringify(referClientMeta));
      
      triggerToast("All Homepage settings saved to database successfully!");
    } catch (error) {
      console.error("Error saving to database:", error);
      triggerToast("Failed to save settings to database.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        triggerToast("Image is too large (max 1.5MB). Please compress it first.", "error");
        return;
      }
      
      setIsUploading(true);
      triggerToast("Uploading image...");
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `home/hero_${index}_${Date.now()}.${fileExt}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        
        if (index === 1) {
          setHomeData(prev => ({ ...prev, heroImage1: url }));
        } else {
          setHomeData(prev => ({ ...prev, heroImage2: url }));
        }
        triggerToast(`Image ${index} loaded successfully! Save settings to apply.`);
      } catch (error) {
        console.error("Upload error:", error);
        triggerToast("Failed to upload image", "error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveFeatured = async (service) => {
    try {
      await setDoc(doc(db, "services", service.id.toString()), { featured: false }, { merge: true });
      triggerToast(`Service removed from Home Page.`);
      // Update local state without fetching again
      setServices(prev => prev.filter(s => s.id !== service.id));
    } catch (error) {
      console.error("Error removing featured:", error);
      triggerToast("Failed to remove service", "error");
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
    const promise = promisesList.find(p => p.id === id);
    setDeleteModal({ show: true, type: "promise", id, itemName: promise?.title || "Promise" });
  };

  const openPromiseModal = (mode, data = null) => {
    setPromiseModal({ show: true, mode, data });
    if (mode === "edit" && data) {
      setPromiseForm({ title: data.title, description: data.description });
    } else {
      setPromiseForm({ title: "", description: "" });
    }
  };

  // Major Client Handlers
  const handleMajorClientImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        triggerToast("Image is too large (max 1.5MB). Please compress it first.", "error");
        return;
      }
      setIsUploading(true);
      triggerToast("Uploading image...");
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `home/client_${Date.now()}.${fileExt}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        
        setMajorClientForm(prev => ({ ...prev, image: url }));
        triggerToast("Image loaded successfully!");
      } catch (error) {
        console.error("Upload error:", error);
        triggerToast("Failed to upload image", "error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleMajorClientSubmit = (e) => {
    if (e) e.preventDefault();
    if (majorClientModal.mode === "add") {
      const newClient = {
        id: Date.now(),
        name: majorClientForm.name,
        description: majorClientForm.description,
        image: majorClientForm.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      };
      const updated = [...majorClientsList, newClient];
      setMajorClientsList(updated);
      localStorage.setItem("vg_majorclients_list", JSON.stringify(updated));
      triggerToast("Client added successfully!");
    } else {
      const updated = majorClientsList.map((c) => {
        if (c.id === majorClientModal.data.id) {
          return {
            ...c,
            name: majorClientForm.name,
            description: majorClientForm.description,
            image: majorClientForm.image
          };
        }
        return c;
      });
      setMajorClientsList(updated);
      localStorage.setItem("vg_majorclients_list", JSON.stringify(updated));
      triggerToast("Client updated successfully!");
    }
    setMajorClientModal({ show: false, mode: "add", data: null });
    setMajorClientForm({ name: "", description: "", image: "" });
  };

  const handleDeleteMajorClient = (id) => {
    const client = majorClientsList.find(c => c.id === id);
    setDeleteModal({ show: true, type: "client", id, itemName: client?.name || "Client" });
  };

  const openMajorClientModal = (mode, data = null) => {
    setMajorClientModal({ show: true, mode, data });
    if (mode === "edit" && data) {
      setMajorClientForm({ name: data.name, description: data.description, image: data.image });
    } else {
      setMajorClientForm({ name: "", description: "", image: "" });
    }
  };

  // Refer Client Handlers
  const handleReferClientSubmit = (e) => {
    if (e) e.preventDefault();
    if (referClientModal.mode === "add") {
      if (referClientCards.length >= 4) {
        triggerToast("Only up to 4 cards can be added.", "error");
        return;
      }
      const newCard = {
        id: Date.now(),
        title: referClientForm.title,
        subtitle: referClientForm.subtitle,
        buttonLabel: referClientForm.buttonLabel
      };
      const updated = [...referClientCards, newCard];
      setReferClientCards(updated);
      localStorage.setItem("vg_referclient_cards", JSON.stringify(updated));
      triggerToast("Card added successfully!");
    } else {
      const updated = referClientCards.map((c) => {
        if (c.id === referClientModal.data.id) {
          return {
            ...c,
            title: referClientForm.title,
            subtitle: referClientForm.subtitle,
            buttonLabel: referClientForm.buttonLabel
          };
        }
        return c;
      });
      setReferClientCards(updated);
      localStorage.setItem("vg_referclient_cards", JSON.stringify(updated));
      triggerToast("Card updated successfully!");
    }
    setReferClientModal({ show: false, mode: "add", data: null });
    setReferClientForm({ title: "", subtitle: "", buttonLabel: "" });
  };

  const handleDeleteReferClient = (id) => {
    const card = referClientCards.find(c => c.id === id);
    setDeleteModal({ show: true, type: "card", id, itemName: card?.title || "Card" });
  };

  const confirmDelete = () => {
    const { type, id } = deleteModal;
    if (!id) return;

    if (type === "service") {
      const updated = services.filter((s) => s.id !== id);
      setServices(updated);
      localStorage.setItem("vg_services_v2", JSON.stringify(updated));
      triggerToast("Service deleted!", "error");
    } else if (type === "promise") {
      const updated = promisesList.filter((p) => p.id !== id);
      setPromisesList(updated);
      localStorage.setItem("vg_promises_list", JSON.stringify(updated));
      triggerToast("Promise deleted!", "error");
    } else if (type === "client") {
      const updated = majorClientsList.filter((c) => c.id !== id);
      setMajorClientsList(updated);
      localStorage.setItem("vg_majorclients_list", JSON.stringify(updated));
      triggerToast("Client deleted!", "error");
    } else if (type === "card") {
      const updated = referClientCards.filter((c) => c.id !== id);
      setReferClientCards(updated);
      localStorage.setItem("vg_referclient_cards", JSON.stringify(updated));
      triggerToast("Card deleted!", "error");
    }
    setDeleteModal({ show: false, type: "", id: null, itemName: "" });
  };

  const openReferClientModal = (mode, data = null) => {
    setReferClientModal({ show: true, mode, data });
    if (mode === "edit" && data) {
      setReferClientForm({ title: data.title, subtitle: data.subtitle, buttonLabel: data.buttonLabel });
    } else {
      setReferClientForm({ title: "", subtitle: "", buttonLabel: "" });
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
          disabled={isUploading || isSaving}
          className="bg-[#6340b2] hover:bg-[#5231a3] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-violet-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : isUploading ? "Uploading..." : "Save Changes"}
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
                <th className="px-6 py-3.5">Image</th>
                <th className="px-6 py-3.5">Service Name</th>
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
                      {s && s.image ? (
                        <div className="w-12 h-8 rounded overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center">
                          <span className="text-slate-300 text-[10px]">-</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {s ? (s.name || s.title) : <span className="text-slate-400 font-normal italic">Empty slot</span>}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate">
                      {s ? s.description : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {s ? (
                        <div className="flex items-center justify-end gap-4">
                          <label className="relative inline-flex items-center cursor-pointer" title="Remove from Home Page">
                            <input type="checkbox" className="sr-only peer" checked={true} onChange={() => handleRemoveFeatured(s)} />
                            <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#1481b8]"></div>
                          </label>
                          <button type="button" onClick={() => setActiveTab('services')} className="text-xs font-bold text-[#6340b2] hover:underline cursor-pointer">Manage</button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-3">
                          <button type="button" onClick={() => setActiveTab('services')} className="text-xs font-bold text-[#6340b2] hover:underline cursor-pointer">+ Add Service</button>
                          <button type="button" onClick={() => setActiveTab('services')} className="text-xs font-bold text-slate-400 hover:text-slate-600 hover:underline cursor-pointer">Manage</button>
                        </div>
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
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6 mb-6">
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

      {/* Major Clients Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Major Clients Settings</h3>
            <p className="text-xs text-slate-400 font-medium">Configure title and description for the Major Clients section.</p>
          </div>
          <button type="button" onClick={() => openMajorClientModal("add")} className="inline-flex items-center gap-1 bg-violet-50 text-[#6340b2] px-3.5 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer border border-violet-100">
            Add Client
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Title</label>
            <input type="text" value={majorClientsMeta.title} onChange={(e) => setMajorClientsMeta({ ...majorClientsMeta, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. Trusted by Industry Leaders" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Description</label>
            <input type="text" value={majorClientsMeta.description} onChange={(e) => setMajorClientsMeta({ ...majorClientsMeta, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. From architects to industrialists..." required />
          </div>
        </div>

        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 mt-6">Current Clients</h4>
        {majorClientsList.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium py-3">No clients added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {majorClientsList.map((c, index) => (
              <div key={c.id || index} className="p-4 bg-slate-50/40 rounded-xl border border-slate-100/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400">Client #{index + 1}</span>
                    <div className="flex gap-2 text-xs font-bold">
                      <button type="button" onClick={() => openMajorClientModal("edit", c)} className="text-[#6340b2] cursor-pointer">Edit</button>
                      <span className="text-slate-300">|</span>
                      <button type="button" onClick={() => handleDeleteMajorClient(c.id)} className="text-red-600 cursor-pointer">Delete</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    {c.image && (
                      <img src={c.image} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    )}
                    <h5 className="text-sm font-bold text-slate-800">{c.name}</h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Refer a Client Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Refer a Client Settings</h3>
            <p className="text-xs text-slate-400 font-medium">Configure title, subtitle and cards for the Refer a Client section.</p>
          </div>
          <button type="button" onClick={() => { if (referClientCards.length >= 4) triggerToast("Max 4 cards allowed.", "error"); else openReferClientModal("add"); }} className="inline-flex items-center gap-1 bg-violet-50 text-[#6340b2] px-3.5 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer border border-violet-100">
            Add Card
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Title</label>
            <input type="text" value={referClientMeta.title} onChange={(e) => setReferClientMeta({ ...referClientMeta, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. Refer a Client" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Subtitle</label>
            <input type="text" value={referClientMeta.subtitle} onChange={(e) => setReferClientMeta({ ...referClientMeta, subtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. Help us grow and get rewarded" required />
          </div>
        </div>

        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 mt-6">Current Cards (Max 4)</h4>
        {referClientCards.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium py-3">No cards added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referClientCards.map((c, index) => (
              <div key={c.id || index} className="p-4 bg-slate-50/40 rounded-xl border border-slate-100/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400">Card #{index + 1}</span>
                    <div className="flex gap-2 text-xs font-bold">
                      <button type="button" onClick={() => openReferClientModal("edit", c)} className="text-[#6340b2] cursor-pointer">Edit</button>
                      <span className="text-slate-300">|</span>
                      <button type="button" onClick={() => handleDeleteReferClient(c.id)} className="text-red-600 cursor-pointer">Delete</button>
                    </div>
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 mb-1">{c.title}</h5>
                  <p className="text-xs text-slate-500 mb-2">{c.subtitle}</p>
                  <p className="text-[10px] font-bold text-[#6340b2] uppercase bg-violet-50 inline-block px-2 py-1 rounded">{c.buttonLabel}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modals */}

      {referClientModal.show && createPortal(
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setReferClientModal({ show: false, mode: "add", data: null })} className="absolute top-6 right-6 text-slate-400 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">{referClientModal.mode === "add" ? "Add Card" : "Edit Card"}</h3>
            <form onSubmit={handleReferClientSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Card Title</label>
                <input type="text" value={referClientForm.title} onChange={(e) => setReferClientForm({ ...referClientForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Card Subtitle</label>
                <input type="text" value={referClientForm.subtitle} onChange={(e) => setReferClientForm({ ...referClientForm, subtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Button Label</label>
                <input type="text" value={referClientForm.buttonLabel} onChange={(e) => setReferClientForm({ ...referClientForm, buttonLabel: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setReferClientModal({ show: false, mode: "add", data: null })} className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#6340b2] text-white rounded-xl font-bold text-xs uppercase cursor-pointer">{referClientModal.mode === "add" ? "Add Card" : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {majorClientModal.show && createPortal(
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setMajorClientModal({ show: false, mode: "add", data: null })} className="absolute top-6 right-6 text-slate-400 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">{majorClientModal.mode === "add" ? "Add Client" : "Edit Client"}</h3>
            <form onSubmit={handleMajorClientSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Client Name</label>
                <input type="text" value={majorClientForm.name} onChange={(e) => setMajorClientForm({ ...majorClientForm, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Short Description</label>
                <textarea rows={3} value={majorClientForm.description} onChange={(e) => setMajorClientForm({ ...majorClientForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2] resize-none" required />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase">Image URL / Path</label>
                  <div className="flex gap-1.5 bg-slate-100 p-0.5 rounded-lg">
                    <button type="button" onClick={() => setMajorClientImageMode("link")} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${majorClientImageMode === "link" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Link / Path</button>
                    <button type="button" onClick={() => setMajorClientImageMode("upload")} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${majorClientImageMode === "upload" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Upload File</button>
                  </div>
                </div>
                {majorClientImageMode === "link" ? (
                  <input type="text" value={majorClientForm.image} onChange={(e) => setMajorClientForm({ ...majorClientForm, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. src/assets/architects.png" />
                ) : (
                  <input type="file" accept="image/*" onChange={handleMajorClientImageUpload} className="w-full text-sm bg-white p-1.5 rounded-xl border border-slate-200 cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#6340b2] file:text-white hover:file:bg-[#5231a3] transition-all" />
                )}
                {majorClientImageMode === "upload" && majorClientForm.image && (
                  <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={majorClientForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setMajorClientModal({ show: false, mode: "add", data: null })} className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase cursor-pointer">Cancel</button>
                <button type="submit" disabled={isUploading} className="px-5 py-2.5 bg-[#6340b2] text-white rounded-xl font-bold text-xs uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{isUploading ? "Uploading..." : (majorClientModal.mode === "add" ? "Add Client" : "Save Changes")}</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {promiseModal.show && createPortal(
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-6">
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
        </div>,
        document.body
      )}
      
      {/* Service Modal removed, managed in ManageServices.jsx */}

      <DeleteConfirmModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, type: "", id: null, itemName: "" })}
        onConfirm={confirmDelete}
        itemName={deleteModal.itemName}
      />
    </div>
  );
}
