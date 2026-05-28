import { useState, useEffect } from "react";

const defaultContact = {
  phone1: "+91 99219 17083",
  phone2: "+91 78409 17083",
  email: "visionglasscreation1@gmail.com",
  address: "Plot No. 595, Ganganagar, Nigdi, Pimpri-Chinchwad 411044",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM"
};

export default function ContactSettings({ triggerToast }) {
  const [contactData, setContactData] = useState(defaultContact);

  useEffect(() => {
    const savedContact = localStorage.getItem("vg_contact");
    if (savedContact) setContactData(JSON.parse(savedContact));
    else localStorage.setItem("vg_contact", JSON.stringify(defaultContact));
  }, []);

  const handleContactSave = (e) => {
    e.preventDefault();
    localStorage.setItem("vg_contact", JSON.stringify(contactData));
    triggerToast("Contact Us settings saved successfully!");
  };

  return (
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
  );
}
