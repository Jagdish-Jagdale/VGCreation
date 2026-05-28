import { useState, useEffect } from "react";

export default function ManageServices({ triggerToast }) {
  const [services, setServices] = useState([]);
  const [serviceModal, setServiceModal] = useState({ show: false, mode: "add", data: null });
  const [serviceForm, setServiceForm] = useState({ title: "", category: "", description: "", features: "", image: "" });

  useEffect(() => {
    const savedServices = localStorage.getItem("vg_services");
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, []);

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

  return (
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
  );
}
