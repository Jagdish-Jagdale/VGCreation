import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AdminLoader from "./AdminLoader";

const defaultContact = {
  phone1: "+91 99219 17083",
  phone2: "+91 78409 17083",
  email: "visionglasscreation1@gmail.com",
  address: "Plot No. 595, Ganganagar, Nigdi, Pimpri-Chinchwad 411044",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
  whatsapp: "+91 99219 17083",
  mapsUrl: "https://maps.google.com/?q=Vision+Glass+Creation+Plot+No.+595+Ganganagar+Nigdi+Pimpri-Chinchwad+411044"
};

export default function ContactSettings({ triggerToast }) {
  const [contactData, setContactData] = useState(defaultContact);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docSnap = await getDoc(doc(db, "settings", "contact"));
        if (docSnap.exists()) {
          setContactData({ ...defaultContact, ...docSnap.data() });
        } else {
          const savedContact = localStorage.getItem("vg_contact");
          if (savedContact) {
            const parsed = JSON.parse(savedContact);
            setContactData({ ...defaultContact, ...parsed });
          } else {
            localStorage.setItem("vg_contact", JSON.stringify(defaultContact));
          }
        }
      } catch (error) {
        console.error("Failed to fetch contact settings:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchContact();
  }, []);

  const handleContactSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await setDoc(doc(db, "settings", "contact"), contactData);
      localStorage.setItem("vg_contact", JSON.stringify(contactData));
      triggerToast("Contact Us settings saved to database successfully!");
    } catch (error) {
      console.error("Failed to save contact settings:", error);
      triggerToast("Failed to save settings.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isFetching) {
    return <AdminLoader />;
  }

  return (
    <div className="space-y-8">
      {/* Page Headercc */}
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Contact Settings</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Modify physical address locations, phone numbers, email, WhatsApp, and Google Maps.</p>
        </div>
        <button
          type="submit"
          form="contact-form"
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
          ) : "Save Changes"}
        </button>
      </div>

      <form id="contact-form" onSubmit={handleContactSave} className="space-y-6 max-w-4xl">

        {/* Card 1: Our Details */}
        <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-8">
          <h3 className="text-sm font-extrabold text-[#1481b8] tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-[#1481b8] rounded-full"></span>
            Our Details
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Primary Phone (Mobile)</label>
                <input
                  type="text"
                  value={contactData.phone1}
                  onChange={(e) => setContactData({ ...contactData, phone1: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#1481b8] focus:ring-4 focus:ring-[#1481b8]/10 transition-all font-medium text-sm"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#1481b8] focus:ring-4 focus:ring-[#1481b8]/10 transition-all font-medium text-sm"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#1481b8] focus:ring-4 focus:ring-[#1481b8]/10 transition-all font-medium text-sm"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#1481b8] focus:ring-4 focus:ring-[#1481b8]/10 transition-all font-medium text-sm"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#1481b8] focus:ring-4 focus:ring-[#1481b8]/10 transition-all font-medium text-sm"
                placeholder="Enter full physical address..."
                required
              />
            </div>
          </div>
        </div>

        {/* Card 2: Chat on WhatsApp */}
        <div className="bg-[#25d366] rounded-2xl shadow-sm p-8 text-white relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-white/80 text-[10px] font-bold tracking-widest uppercase mb-2">Chat on WhatsApp</label>
              <input
                type="text"
                value={contactData.whatsapp}
                onChange={(e) => setContactData({ ...contactData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/40 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/20 transition-all font-extrabold text-lg"
                placeholder="e.g. +91 99219 17083"
                required
              />
            </div>
          </div>
        </div>

        {/* Card 3: Google Maps Location */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-inner shrink-0">
              <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div className="flex-1 w-full space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Google Maps QR Link</span>
              <h4 className="text-slate-800 font-bold text-sm">Scan to Open Location</h4>
              <p className="text-slate-400 text-xs leading-snug">
                Provide the exact Google Maps sharing link. The frontend will automatically generate a scannable QR code for visitors.
              </p>
              <div className="pt-2">
                <input
                  type="url"
                  value={contactData.mapsUrl}
                  onChange={(e) => setContactData({ ...contactData, mapsUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#1481b8] focus:ring-4 focus:ring-[#1481b8]/10 transition-all font-medium text-sm bg-slate-50"
                  placeholder="https://maps.google.com/?q=..."
                  required
                />
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
