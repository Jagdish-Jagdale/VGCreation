import { useState, useEffect } from "react";
import logo from "../assets/vision_glass_creation_logo.png";
import symbol from "../assets/vision_glass_creation_symbol.png";

import HomeSettings from "../components/admin/HomeSettings";
import AboutSettings from "../components/admin/AboutSettings";
import ManageServices from "../components/admin/ManageServices";
import ManageGallery from "../components/admin/ManageGallery";
import ContactSettings from "../components/admin/ContactSettings";
import EnquiriesLog from "../components/admin/EnquiriesLog";

export default function AdminPanel() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    document.title = "Admin Panel | Vision Glass Creation";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    window.location.href = "/admin/login";
  };

  const navItems = [
    { id: "home", label: "Home Page", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { id: "about", label: "About Page", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { id: "services", label: "Manage Services", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
    { id: "gallery", label: "Manage Gallery", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
    { id: "contact", label: "Contact Settings", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
    { id: "enquiries", label: "Enquiry", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /> }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-violet-200">
      
      {/* Toast Notification */}
      <div className={`fixed top-6 right-6 z-[9999] transition-all duration-300 transform ${toast.show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}`}>
        <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border ${toast.type === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-white text-slate-800 border-slate-200"}`}>
          {toast.type === "error" ? (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          ) : (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          <span className="text-sm font-bold tracking-tight">{toast.message}</span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? "w-[90px]" : "w-[260px]"} ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Brand Header */}
        <div className="h-[80px] flex items-center justify-between px-5 border-b border-slate-50">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={isSidebarCollapsed ? symbol : logo} alt="Vision Glass Creation" className={`transition-all ${isSidebarCollapsed ? "w-10 h-10 object-contain mx-auto" : "h-11 object-contain"}`} />
          </div>
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:flex bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0 border border-slate-200/50">
            <svg className={`w-4 h-4 transition-transform duration-300 ${isSidebarCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeTab === item.id ? "bg-[#6340b2] text-white shadow-lg shadow-violet-500/20" : "text-slate-500 hover:bg-violet-50 hover:text-[#6340b2]"}`}
              title={isSidebarCollapsed ? item.label : ""}
            >
              <svg className={`w-5 h-5 shrink-0 ${activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-[#6340b2]"}`} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                {item.icon}
              </svg>
              {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-100/60 bg-slate-50/50">
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
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-600 focus:outline-none p-2 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative">
          <main className="p-4 md:p-6 lg:p-10 pb-24 md:pb-10 max-w-7xl mx-auto w-full transition-all duration-300">
            <div className="bg-white/80 border border-white/40 shadow-xl shadow-slate-200/40 rounded-[2rem] p-6 lg:p-8 min-h-[calc(100vh-5rem)]">
              {activeTab === "home" && <HomeSettings triggerToast={triggerToast} setActiveTab={setActiveTab} />}
              {activeTab === "about" && <AboutSettings triggerToast={triggerToast} />}
              {activeTab === "services" && <ManageServices triggerToast={triggerToast} />}
              {activeTab === "gallery" && <ManageGallery triggerToast={triggerToast} />}
              {activeTab === "contact" && <ContactSettings triggerToast={triggerToast} />}
              {activeTab === "enquiries" && <EnquiriesLog triggerToast={triggerToast} />}
            </div>
          </main>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1.5px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-[500px] w-full shadow-2xl relative border border-slate-100/50 transition-all duration-300">
            <button onClick={() => setShowLogoutModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100/50">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Confirm Logout</h3>
                <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed">Are you sure you want to exit your administrative session?</p>
                <p className="text-xs text-slate-400 mt-1.5 font-medium leading-normal">You will need to sign in again to access the dashboard.</p>
                <div className="flex justify-end items-center gap-3 mt-6">
                  <button onClick={() => setShowLogoutModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer">Cancel</button>
                  <button onClick={handleLogout} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/10 cursor-pointer">Yes, Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
