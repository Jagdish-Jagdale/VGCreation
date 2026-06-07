import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AdminLoader from "./AdminLoader";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function AboutSettings({ triggerToast }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  // 1. Header
  const [headerMeta, setHeaderMeta] = useState({ title: "About Us", subtitle: "Discover our journey and values" });

  // 2. Overview
  const [overviewData, setOverviewData] = useState({
    image: "",
    title: "Who We Are",
    subtitle: "Leading glass solutions provider",
    description: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
    buttonLabel: "Read More"
  });
  const [overviewImageMode, setOverviewImageMode] = useState("link");

  // 3. Why Us
  const [whyUsMeta, setWhyUsMeta] = useState({ title: "Why Choose Us" });
  const [whyUsCards, setWhyUsCards] = useState([]);
  const [whyUsModal, setWhyUsModal] = useState({ show: false, mode: "add", data: null });
  const [whyUsForm, setWhyUsForm] = useState({ title: "", description: "" });

  // 4. Points
  const [pointsMeta, setPointsMeta] = useState({ title: "Our Core Values" });
  const [pointsList, setPointsList] = useState([]);
  const [pointModal, setPointModal] = useState({ show: false, mode: "add", data: null });
  const [pointForm, setPointForm] = useState({ title: "", subpoints: [""] });

  // 5. Partners
  const [partnersMeta, setPartnersMeta] = useState({ title: "Our Trusted Partners" });
  const [partnersList, setPartnersList] = useState([]);
  const [partnerModal, setPartnerModal] = useState({ show: false, mode: "add", data: null });
  const [partnerForm, setPartnerForm] = useState({ name: "" });

  const [deleteModal, setDeleteModal] = useState({ show: false, type: "", id: null, itemName: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Main Header
        const headerDoc = await getDoc(doc(db, "about", "mainheader"));
        if (headerDoc.exists()) setHeaderMeta(headerDoc.data());

        // About Overview
        const overviewDoc = await getDoc(doc(db, "about", "aboutoverview"));
        if (overviewDoc.exists()) setOverviewData(overviewDoc.data());

        // Why Us
        const whyUsDoc = await getDoc(doc(db, "about", "whyus"));
        if (whyUsDoc.exists()) {
          const data = whyUsDoc.data();
          if (data.meta) setWhyUsMeta(data.meta);
          if (data.cards) setWhyUsCards(data.cards);
        }

        // Points
        const pointsDoc = await getDoc(doc(db, "about", "pointsandsubpoints"));
        if (pointsDoc.exists()) {
          const data = pointsDoc.data();
          if (data.meta) setPointsMeta(data.meta);
          if (data.list) setPointsList(data.list);
        }

        // Partners
        const partnersDoc = await getDoc(doc(db, "about", "partners"));
        if (partnersDoc.exists()) {
          const data = partnersDoc.data();
          if (data.meta) setPartnersMeta(data.meta);
          if (data.list) setPartnersList(data.list);
        }
      } catch (error) {
        console.error("Error fetching about settings:", error);
        triggerToast("Failed to load settings from database", "error");
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleAboutSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await setDoc(doc(db, "about", "mainheader"), headerMeta);
      await setDoc(doc(db, "about", "aboutoverview"), overviewData);
      await setDoc(doc(db, "about", "whyus"), { meta: whyUsMeta, cards: whyUsCards });
      await setDoc(doc(db, "about", "pointsandsubpoints"), { meta: pointsMeta, list: pointsList });
      await setDoc(doc(db, "about", "partners"), { meta: partnersMeta, list: partnersList });

      triggerToast("All About Page settings saved to database successfully!");
    } catch (error) {
      console.error("Error saving to database:", error);
      triggerToast("Failed to save settings to database.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Generic List Handlers
  const handleGenericSubmit = (e, modalState, setModalState, listState, setListState, formState, setFormState, limit = null) => {
    if (e) e.preventDefault();
    if (modalState.mode === "add") {
      if (limit && listState.length >= limit) {
        triggerToast(`You can only add up to ${limit} items here.`, "error");
        return;
      }
      const newItem = { id: Date.now(), ...formState };
      setListState([...listState, newItem]);
      triggerToast("Item added successfully!");
    } else {
      const updated = listState.map((item) => (item.id === modalState.data.id ? { ...item, ...formState } : item));
      setListState(updated);
      triggerToast("Item updated successfully!");
    }
    setModalState({ show: false, mode: "add", data: null });
    // Reset form relies on the caller or we can do it via a generic empty object if we knew the keys, 
    // but the caller will handle resetting via openModal.
  };

  const confirmDelete = () => {
    const { type, id } = deleteModal;
    if (!id) return;

    if (type === "whyUsCards") {
      setWhyUsCards(prev => prev.filter(item => item.id !== id));
    } else if (type === "pointsList") {
      setPointsList(prev => prev.filter(item => item.id !== id));
    } else if (type === "partnersList") {
      setPartnersList(prev => prev.filter(item => item.id !== id));
    }
    triggerToast("Item deleted!", "error");
    setDeleteModal({ show: false, type: "", id: null, itemName: "" });
  };

  // Why Us
  const openWhyUsModal = (mode, data = null) => {
    setWhyUsModal({ show: true, mode, data });
    setWhyUsForm(mode === "edit" ? { title: data.title, description: data.description } : { title: "", description: "" });
  };

  // Points
  const openPointModal = (mode, data = null) => {
    setPointModal({ show: true, mode, data });
    if (mode === "edit") {
      const subpts = data.subpoints ? [...data.subpoints] : (data.subpoint ? [data.subpoint] : [""]);
      setPointForm({ title: data.title, subpoints: subpts });
    } else {
      setPointForm({ title: "", subpoints: [""] });
    }
  };

  // Partners
  const openPartnerModal = (mode, data = null) => {
    setPartnerModal({ show: true, mode, data });
    setPartnerForm(mode === "edit" ? { name: data.name } : { name: "" });
  };

  const handleOverviewImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        triggerToast("Image is too large (max 1.5MB). Please compress it first.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setOverviewData(prev => ({ ...prev, image: reader.result }));
        triggerToast("Image loaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  if (isFetching) {
    return <AdminLoader />;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">About Page Settings</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Configure all sections of the About Page here.</p>
        </div>
        <button
          onClick={handleAboutSave}
          disabled={isSaving}
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
          ) : "Save All Settings"}
        </button>
      </div>

      {/* 1. Header Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">Main Header Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Title</label>
            <input type="text" value={headerMeta.title} onChange={(e) => setHeaderMeta({ ...headerMeta, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Subtitle</label>
            <input type="text" value={headerMeta.subtitle} onChange={(e) => setHeaderMeta({ ...headerMeta, subtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
          </div>
        </div>
      </div>

      {/* 2. Overview Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">About Overview (Card) Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Title</label>
            <input type="text" value={overviewData.title} onChange={(e) => setOverviewData({ ...overviewData, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Subtitle</label>
            <input type="text" value={overviewData.subtitle} onChange={(e) => setOverviewData({ ...overviewData, subtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">About Description</label>
            <textarea rows={4} value={overviewData.description} onChange={(e) => setOverviewData({ ...overviewData, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2] resize-none" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Button Label</label>
            <input type="text" value={overviewData.buttonLabel} onChange={(e) => setOverviewData({ ...overviewData, buttonLabel: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-600 uppercase">Image URL / Path</label>
              <div className="flex gap-1.5 bg-slate-100 p-0.5 rounded-lg">
                <button type="button" onClick={() => setOverviewImageMode("link")} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${overviewImageMode === "link" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Link / Path</button>
                <button type="button" onClick={() => setOverviewImageMode("upload")} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${overviewImageMode === "upload" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>Upload File</button>
              </div>
            </div>
            {overviewImageMode === "link" ? (
              <input type="text" value={overviewData.image} onChange={(e) => setOverviewData({ ...overviewData, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" placeholder="e.g. src/assets/about.jpeg" />
            ) : (
              <input type="file" accept="image/*" onChange={handleOverviewImageUpload} className="w-full text-sm bg-white p-1.5 rounded-xl border border-slate-200 cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#6340b2] file:text-white hover:file:bg-[#5231a3] transition-all" />
            )}
            {overviewImageMode === "upload" && overviewData.image && overviewData.image.startsWith("data:") && (
              <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <img src={overviewData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Why Us Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Why Us Settings</h3>
          </div>
          <button type="button" onClick={() => openWhyUsModal("add")} className="inline-flex items-center gap-1 bg-violet-50 text-[#6340b2] px-3.5 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer border border-violet-100">
            Add Card
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Title</label>
          <input type="text" value={whyUsMeta.title} onChange={(e) => setWhyUsMeta({ ...whyUsMeta, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
        </div>
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Current Cards (Max 4)</h4>
        {whyUsCards.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium py-3">No cards added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyUsCards.map((c, index) => (
              <div key={c.id || index} className="p-4 bg-slate-50/40 rounded-xl border border-slate-100/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400">Card #{index + 1}</span>
                    <div className="flex gap-2 text-xs font-bold">
                      <button type="button" onClick={() => openWhyUsModal("edit", c)} className="text-[#6340b2] cursor-pointer">Edit</button>
                      <span className="text-slate-300">|</span>
                      <button type="button" onClick={() => setDeleteModal({ show: true, type: "whyUsCards", id: c.id, itemName: c.title || "Card" })} className="text-red-600 cursor-pointer">Delete</button>
                    </div>
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 mb-1">{c.title}</h5>
                  <p className="text-xs text-slate-500 mb-2">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Points Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Points & Subpoints Settings</h3>
          </div>
          <button type="button" onClick={() => openPointModal("add")} className="inline-flex items-center gap-1 bg-violet-50 text-[#6340b2] px-3.5 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer border border-violet-100">
            Add Point
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Title</label>
          <input type="text" value={pointsMeta.title} onChange={(e) => setPointsMeta({ ...pointsMeta, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
        </div>
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Current Points</h4>
        {pointsList.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium py-3">No points added yet.</p>
        ) : (
          <div className="space-y-3">
            {pointsList.map((p, index) => (
              <div key={p.id || index} className="p-4 bg-slate-50/40 rounded-xl border border-slate-100/50 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-bold text-slate-800">{p.title}</h5>
                  <div className="flex gap-2 text-xs font-bold">
                    <button type="button" onClick={() => openPointModal("edit", p)} className="text-[#6340b2] cursor-pointer">Edit</button>
                    <span className="text-slate-300">|</span>
                    <button type="button" onClick={() => setDeleteModal({ show: true, type: "pointsList", id: p.id, itemName: p.title || "Point" })} className="text-red-600 cursor-pointer">Delete</button>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {p.subpoints && p.subpoints.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {p.subpoints.map((sp, i) => <li key={i}>{sp}</li>)}
                    </ul>
                  ) : (
                    <span className="whitespace-pre-wrap">{p.subpoint}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Partners Settings */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-violet-100/60 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Partners Settings</h3>
          </div>
          <button type="button" onClick={() => openPartnerModal("add")} className="inline-flex items-center gap-1 bg-violet-50 text-[#6340b2] px-3.5 py-2 rounded-xl font-bold text-xs uppercase cursor-pointer border border-violet-100">
            Add Partner Point
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Section Title</label>
          <input type="text" value={partnersMeta.title} onChange={(e) => setPartnersMeta({ ...partnersMeta, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
        </div>
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Current Partners</h4>
        {partnersList.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium py-3">No partners added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {partnersList.map((p, index) => (
              <div key={p.id || index} className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                <span className="text-sm font-bold text-slate-700">{p.name}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openPartnerModal("edit", p)} className="text-[#6340b2] cursor-pointer hover:underline text-xs">Edit</button>
                  <button type="button" onClick={() => setDeleteModal({ show: true, type: "partnersList", id: p.id, itemName: p.name || "Partner" })} className="text-red-600 cursor-pointer hover:underline text-xs">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      {/* Why Us Modal */}
      {whyUsModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setWhyUsModal({ show: false, mode: "add", data: null })} className="absolute top-6 right-6 text-slate-400 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">{whyUsModal.mode === "add" ? "Add Why Us Card" : "Edit Why Us Card"}</h3>
            <form onSubmit={(e) => handleGenericSubmit(e, whyUsModal, setWhyUsModal, whyUsCards, setWhyUsCards, whyUsForm, setWhyUsForm, 4)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Card Title</label>
                <input type="text" value={whyUsForm.title} onChange={(e) => setWhyUsForm({ ...whyUsForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Description</label>
                <textarea rows={3} value={whyUsForm.description} onChange={(e) => setWhyUsForm({ ...whyUsForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2] resize-none" required />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setWhyUsModal({ show: false, mode: "add", data: null })} className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#6340b2] text-white rounded-xl font-bold text-xs uppercase cursor-pointer">{whyUsModal.mode === "add" ? "Add Card" : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Point Modal */}
      {pointModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setPointModal({ show: false, mode: "add", data: null })} className="absolute top-6 right-6 text-slate-400 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">{pointModal.mode === "add" ? "Add Point" : "Edit Point"}</h3>
            <form onSubmit={(e) => handleGenericSubmit(e, pointModal, setPointModal, pointsList, setPointsList, pointForm, setPointForm)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Title (Point)</label>
                <input type="text" value={pointForm.title} onChange={(e) => setPointForm({ ...pointForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Subpoints</label>
                {pointForm.subpoints.map((sp, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={sp}
                      onChange={(e) => {
                        const newSubpoints = [...pointForm.subpoints];
                        newSubpoints[idx] = e.target.value;
                        setPointForm({ ...pointForm, subpoints: newSubpoints });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]"
                      required
                    />
                    {pointForm.subpoints.length > 1 && (
                      <button type="button" onClick={() => {
                        const newSubpoints = pointForm.subpoints.filter((_, i) => i !== idx);
                        setPointForm({ ...pointForm, subpoints: newSubpoints });
                      }} className="text-red-500 font-bold px-2 hover:bg-red-50 rounded-lg">X</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => setPointForm({ ...pointForm, subpoints: [...pointForm.subpoints, ""] })} className="text-xs font-bold text-[#6340b2] mt-1">+ Add Subpoint</button>
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setPointModal({ show: false, mode: "add", data: null })} className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#6340b2] text-white rounded-xl font-bold text-xs uppercase cursor-pointer">{pointModal.mode === "add" ? "Add Point" : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Partner Modal */}
      {partnerModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setPartnerModal({ show: false, mode: "add", data: null })} className="absolute top-6 right-6 text-slate-400 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">{partnerModal.mode === "add" ? "Add Partner Point" : "Edit Partner Point"}</h3>
            <form onSubmit={(e) => handleGenericSubmit(e, partnerModal, setPartnerModal, partnersList, setPartnersList, partnerForm, setPartnerForm)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Partner Point Label</label>
                <input type="text" value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]" required />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setPartnerModal({ show: false, mode: "add", data: null })} className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#6340b2] text-white rounded-xl font-bold text-xs uppercase cursor-pointer">{partnerModal.mode === "add" ? "Add Partner" : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, type: "", id: null, itemName: "" })}
        onConfirm={confirmDelete}
        itemName={deleteModal.itemName}
      />
    </div>
  );
}
