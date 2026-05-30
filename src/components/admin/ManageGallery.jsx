import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { collection, doc, getDocs, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AdminLoader from "./AdminLoader";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function ManageGallery({ triggerToast }) {
  const [gallery, setGallery] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [galleryModal, setGalleryModal] = useState({ show: false });
  const [galleryForm, setGalleryForm] = useState({ title: "", serviceId: "", image: "", isTall: false });
  const [imageMode, setImageMode] = useState("link");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, itemName: "", serviceId: "" });

  useEffect(() => {
    const loadData = async () => {
      setIsFetching(true);
      await Promise.all([fetchServices(), fetchGallery()]);
      setIsFetching(false);
    };
    loadData();
  }, []);

  const fetchServices = async () => {
    try {
      const snap = await getDocs(collection(db, "services"));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServicesList(list);
    } catch (e) {
      console.error(e);
      triggerToast("Failed to fetch services", "error");
    }
  };

  const fetchGallery = async () => {
    try {
      const snap = await getDocs(collection(db, "gallery"));
      let allImages = [];
      snap.docs.forEach(docSnap => {
        const data = docSnap.data();
        const serviceId = docSnap.id;
        const serviceName = data.serviceName || "Unknown";
        if (data.images && Array.isArray(data.images)) {
          data.images.forEach(img => {
            allImages.push({ ...img, serviceId, serviceName });
          });
        }
      });
      // Sort by newest first
      allImages.sort((a, b) => b.id - a.id);
      setGallery(allImages);
    } catch (e) {
      console.error(e);
      triggerToast("Failed to fetch gallery images", "error");
    }
  };

  const openGalleryModal = () => {
    setGalleryModal({ show: true });
    setGalleryForm({ title: "", serviceId: servicesList.length > 0 ? servicesList[0].id : "", image: "", isTall: false });
    setImageMode("link");
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        triggerToast("Image is too large (max 2MB). Please compress it.", "error");
        return;
      }
      setImageFile(file);
      setGalleryForm(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.serviceId) {
      triggerToast("Please select a service", "error");
      return;
    }
    if (imageMode === "upload" && !imageFile && !galleryForm.image) {
      triggerToast("Please upload an image", "error");
      return;
    }
    if (imageMode === "link" && !galleryForm.image) {
      triggerToast("Please enter an image URL", "error");
      return;
    }

    setIsLoading(true);
    try {
      let finalImageUrl = galleryForm.image;

      if (imageMode === "upload" && imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `gallery/gallery_${Date.now()}.${fileExt}`;
        const storageRef = ref(storage, fileName);
        
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      const newImage = {
        id: Date.now().toString(),
        title: galleryForm.title,
        image: finalImageUrl,
        isTall: galleryForm.isTall
      };

      const serviceDoc = doc(db, "gallery", galleryForm.serviceId);
      const selectedService = servicesList.find(s => s.id === galleryForm.serviceId);
      const serviceName = selectedService ? (selectedService.name || selectedService.title) : "Unknown";

      const docSnap = await getDoc(serviceDoc);
      if (docSnap.exists()) {
        const currentImages = docSnap.data().images || [];
        await updateDoc(serviceDoc, { images: [newImage, ...currentImages] });
      } else {
        await setDoc(serviceDoc, { serviceId: galleryForm.serviceId, serviceName, images: [newImage] });
      }

      triggerToast("Gallery image added!");
      setGalleryModal({ show: false });
      fetchGallery();
    } catch (e) {
      console.error(e);
      triggerToast("Failed to save gallery image", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteGallery = async () => {
    if (!deleteModal.id || !deleteModal.serviceId) return;
    try {
      const serviceDoc = doc(db, "gallery", deleteModal.serviceId);
      const docSnap = await getDoc(serviceDoc);
      if (docSnap.exists()) {
        const currentImages = docSnap.data().images || [];
        const updatedImages = currentImages.filter(img => img.id !== deleteModal.id);
        await updateDoc(serviceDoc, { images: updatedImages });
        triggerToast("Gallery item removed!", "error");
        fetchGallery();
      }
    } catch (e) {
      console.error(e);
      triggerToast("Failed to delete gallery image", "error");
    } finally {
      setDeleteModal({ show: false, id: null, itemName: "", serviceId: "" });
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
          disabled={isLoading}
          className="bg-[#6340b2] hover:bg-[#5231a3] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Image
        </button>
      </div>

      {/* Gallery List Grid */}
      {isFetching ? (
        <AdminLoader />
      ) : (
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
                onClick={() => setDeleteModal({ show: true, id: item.id, itemName: item.title, serviceId: item.serviceId })}
                className="absolute top-2.5 right-2.5 bg-white/95 hover:bg-red-50 text-red-600 hover:text-red-700 p-1.5 rounded-lg shadow transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div className="p-3">
              <span className="text-[10px] font-bold text-violet-600 uppercase block tracking-wider mb-1 line-clamp-1" title={item.serviceName}>{item.serviceName}</span>
              <h4 className="text-slate-800 text-xs font-bold leading-tight line-clamp-1">{item.title}</h4>
            </div>
          </div>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 text-sm font-medium">
            No gallery images found.
          </div>
        )}
      </div>
      )}

      {/* Gallery Image Add Modal */}
      {galleryModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setGalleryModal({ show: false })}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">Add Portfolio Photo</h3>

            <form onSubmit={handleGallerySubmit} className="space-y-5">
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
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Select Service</label>
                {servicesList.length === 0 ? (
                  <p className="text-sm text-red-500 font-medium">Please add a service first.</p>
                ) : (
                  <select
                    value={galleryForm.serviceId}
                    onChange={(e) => setGalleryForm({ ...galleryForm, serviceId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                    required
                  >
                    <option value="" disabled>Select a service...</option>
                    {servicesList.map(s => (
                      <option key={s.id} value={s.id}>{s.name || s.title}</option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Image Source</label>
                  <div className="flex gap-1.5 bg-slate-100 p-0.5 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setImageMode("link")}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${imageMode === "link" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      Link URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode("upload")}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${imageMode === "upload" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {imageMode === "link" ? (
                  <input
                    type="text"
                    value={galleryForm.image}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                    placeholder="https://images.unsplash.com/..."
                    required={imageMode === "link"}
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm bg-white p-1.5 rounded-xl border border-slate-200 cursor-pointer file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#6340b2] file:text-white hover:file:bg-[#5231a3] transition-all"
                    required={imageMode === "upload" && !galleryForm.image}
                  />
                )}
                {imageMode === "upload" && galleryForm.image && galleryForm.image.startsWith("blob:") && (
                  <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={galleryForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setGalleryModal({ show: false })}
                  disabled={isLoading}
                  className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-50 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || servicesList.length === 0}
                  className="px-5 py-2.5 bg-[#6340b2] hover:bg-[#5231a3] text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-violet-500/20 disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                >
                  {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isLoading ? "Saving..." : "Add Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, id: null, itemName: "", serviceId: "" })}
        onConfirm={confirmDeleteGallery}
        itemName={deleteModal.itemName}
      />
    </div>
  );
}
