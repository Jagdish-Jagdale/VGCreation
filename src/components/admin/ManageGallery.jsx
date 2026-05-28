import { useState, useEffect } from "react";

export default function ManageGallery({ triggerToast }) {
  const [gallery, setGallery] = useState([]);
  const [galleryModal, setGalleryModal] = useState({ show: false, data: null });
  const [galleryForm, setGalleryForm] = useState({ title: "", category: "", image: "", isTall: false });

  useEffect(() => {
    const savedGallery = localStorage.getItem("vg_gallery");
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    }
  }, []);

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

  return (
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
  );
}
