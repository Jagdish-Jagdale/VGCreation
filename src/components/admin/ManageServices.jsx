import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AdminLoader from "./AdminLoader";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function ManageServices({ triggerToast }) {
  const [services, setServices] = useState([]);
  const [serviceModal, setServiceModal] = useState({ show: false, mode: "add", data: null });
  const [serviceForm, setServiceForm] = useState({ name: "", description: "", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imageMode, setImageMode] = useState("link");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, itemName: "" });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("ALL"); // ALL, FEATURED, UNFEATURED

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsFetching(true);
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      const servicesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by some logic if needed, currently leaving as fetched order
      setServices(servicesList);
    } catch (error) {
      console.error("Error fetching services:", error);
      triggerToast("Failed to fetch services from database", "error");
    } finally {
      setIsFetching(false);
    }
  };

  const openServiceModal = (mode, data = null) => {
    setServiceModal({ show: true, mode, data });
    setImageFile(null);
    if (mode === "edit" && data) {
      setServiceForm({
        name: data.name || data.title || "",
        description: data.description || "",
        image: data.image || ""
      });
      setImageMode(data.image && data.image.includes("firebasestorage") ? "upload" : "link");
    } else {
      setServiceForm({ name: "", description: "", image: "" });
      setImageMode("link");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        triggerToast("Image is too large (max 2MB). Please compress it.", "error");
        return;
      }
      setImageFile(file);
      setServiceForm(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleServiceFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageUrl = serviceForm.image;

      if (imageMode === "upload" && imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `services/service_${Date.now()}.${fileExt}`;
        const storageRef = ref(storage, fileName);
        
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      const serviceId = serviceModal.mode === "add" ? Date.now().toString() : serviceModal.data.id.toString();

      // If adding, set featured to false by default. If editing, preserve old state.
      const isFeatured = serviceModal.mode === "add" ? false : (serviceModal.data.featured || false);

      const serviceData = {
        id: serviceId,
        name: serviceForm.name,
        description: serviceForm.description,
        image: finalImageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        featured: isFeatured,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, "services", serviceId), serviceData, { merge: true });

      triggerToast(serviceModal.mode === "add" ? "Service added successfully!" : "Service updated successfully!");
      setServiceModal({ show: false, mode: "add", data: null });
      fetchServices();

    } catch (error) {
      console.error("Error saving service:", error);
      triggerToast("Failed to save service.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteService = async () => {
    if (!deleteModal.id) return;
    try {
      await deleteDoc(doc(db, "services", deleteModal.id.toString()));
      triggerToast("Service deleted!", "error");
      setDeleteModal({ show: false, id: null, itemName: "" });
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      triggerToast("Failed to delete service", "error");
    }
  };

  const handleToggleFeatured = async (service) => {
    try {
      const newStatus = !service.featured;
      
      // If trying to feature, check if already 6 are featured
      if (newStatus) {
        const featuredCount = services.filter(s => s.featured).length;
        if (featuredCount >= 6) {
          triggerToast("You can only feature up to 6 services on the home page.", "error");
          return;
        }
      }

      await setDoc(doc(db, "services", service.id.toString()), { featured: newStatus }, { merge: true });
      triggerToast(`Service is ${newStatus ? 'now featured' : 'no longer featured'}.`);
      fetchServices();
    } catch (error) {
      console.error("Error toggling featured:", error);
      triggerToast("Failed to update featured status", "error");
    }
  };

  // Filter & Search Logic
  const filteredServices = services.filter((s) => {
    const matchesSearch = (s.name || s.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    let matchesFilter = true;
    if (filterType === "FEATURED") matchesFilter = s.featured === true;
    if (filterType === "UNFEATURED") matchesFilter = s.featured !== true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#1a144b] tracking-tight">Manage Services</h2>
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

      {/* Controls Bar (Search & Filter) */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-violet-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6340b2] focus:bg-white transition-colors text-slate-800"
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6340b2] focus:bg-white text-slate-700 font-medium"
          >
            <option value="ALL">All Services</option>
            <option value="FEATURED">Featured Only</option>
            <option value="UNFEATURED">Not Featured</option>
          </select>
        </div>
      </div>

      {/* Services Table List */}
      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-3 px-5 text-[10px] font-extrabold text-[#1a144b] uppercase tracking-widest whitespace-nowrap">Sr No</th>
              <th className="py-3 px-5 text-[10px] font-extrabold text-[#1a144b] uppercase tracking-widest">Image</th>
              <th className="py-3 px-5 text-[10px] font-extrabold text-[#1a144b] uppercase tracking-widest">Service Name</th>
              <th className="py-3 px-5 text-[10px] font-extrabold text-[#1a144b] uppercase tracking-widest">Description</th>
              <th className="py-3 px-5 text-[10px] font-extrabold text-[#1a144b] uppercase tracking-widest">Featured</th>
              <th className="py-3 px-5 text-[10px] font-extrabold text-[#1a144b] uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isFetching ? (
              <AdminLoader asTableRow={true} colSpan={6} />
            ) : filteredServices.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400 text-sm font-medium">No services found.</td>
              </tr>
            ) : (
              filteredServices.map((service, index) => (
                <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-5 align-middle text-xs font-bold text-slate-400 w-16">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="py-3 px-5 align-middle w-24">
                    <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex-shrink-0">
                      <img src={service.image} alt={service.name || service.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-5 align-middle">
                    <h4 className="text-sm font-extrabold text-[#1a144b] leading-tight">{service.name || service.title}</h4>
                  </td>
                  <td className="py-3 px-5 align-middle max-w-xs">
                    <p className="text-xs text-slate-500 truncate" title={service.description}>{service.description}</p>
                  </td>
                  <td className="py-3 px-5 align-middle">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={service.featured || false} 
                        onChange={() => handleToggleFeatured(service)}
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1481b8]"></div>
                    </label>
                  </td>
                  <td className="py-3 px-5 align-middle text-right w-32">
                    <div className="flex items-center justify-end gap-3 text-[11px] font-bold">
                      <button onClick={() => openServiceModal("edit", service)} className="text-[#6340b2] hover:text-[#5231a3] transition-colors cursor-pointer uppercase tracking-wider">Edit</button>
                      <span className="text-slate-300">|</span>
                      <button onClick={() => setDeleteModal({ show: true, id: service.id, itemName: service.name || service.title })} className="text-red-500 hover:text-red-700 transition-colors cursor-pointer uppercase tracking-wider">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Service Modal Form */}
      {serviceModal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative">
            <button
              onClick={() => setServiceModal({ show: false, mode: "add", data: null })}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
              {serviceModal.mode === "add" ? "Create New Service Card" : "Edit Service Details"}
            </h3>

            <form onSubmit={handleServiceFormSubmit} className="space-y-5">
              
              {/* Image Input Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase">Image</label>
                  <div className="flex gap-1 bg-slate-100 p-0.5 rounded-md">
                    <button type="button" onClick={() => setImageMode("link")} className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${imageMode === "link" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Link URL</button>
                    <button type="button" onClick={() => setImageMode("upload")} className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${imageMode === "upload" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Upload File</button>
                  </div>
                </div>
                {imageMode === "link" ? (
                  <input
                    type="text"
                    value={serviceForm.image}
                    onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6340b2]"
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    required={serviceModal.mode === "add" && !imageFile}
                    disabled={isLoading}
                  />
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-sm bg-white p-2 rounded-xl border border-slate-200 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#6340b2] file:text-white hover:file:bg-[#5231a3] file:cursor-pointer transition-colors"
                      required={serviceModal.mode === "add" && !serviceForm.image}
                      disabled={isLoading}
                    />
                    {imageFile && <p className="text-[10px] text-green-600 font-bold mt-2 pl-1">Selected: {imageFile.name}</p>}
                  </div>
                )}
                
                {/* Image Preview Area */}
                {serviceForm.image && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 h-32 w-48 relative bg-slate-50 flex items-center justify-center">
                    <img src={serviceForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Service Name</label>
                <input
                  type="text"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2]"
                  placeholder="e.g. Acoustic Glass Windows"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows={4}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#6340b2] resize-none"
                  placeholder="Brief description of the service..."
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-4 justify-end pt-5 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setServiceModal({ show: false, mode: "add", data: null })}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase text-slate-500 hover:bg-slate-50 transition-colors border border-slate-200 cursor-pointer disabled:opacity-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase text-white bg-[#6340b2] hover:bg-[#5231a3] transition-colors shadow-md shadow-violet-500/20 cursor-pointer disabled:opacity-70 flex items-center gap-2"
                >
                  {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isLoading ? "Saving..." : (serviceModal.mode === "add" ? "Create Service" : "Save Changes")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, id: null, itemName: "" })}
        onConfirm={confirmDeleteService}
        itemName={deleteModal.itemName}
      />
    </div>
  );
}
