import { useState, useEffect } from "react";

const defaultAbout = {
  description: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
  yearsOfExperience: "12",
  satisfiedClients: "1500+",
  completedProjects: "2400+"
};

export default function AboutSettings({ triggerToast }) {
  const [aboutData, setAboutData] = useState(defaultAbout);

  useEffect(() => {
    const savedAbout = localStorage.getItem("vg_about");
    if (savedAbout) setAboutData(JSON.parse(savedAbout));
    else localStorage.setItem("vg_about", JSON.stringify(defaultAbout));
  }, []);

  const handleAboutSave = (e) => {
    e.preventDefault();
    localStorage.setItem("vg_about", JSON.stringify(aboutData));
    triggerToast("About Page settings saved successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-violet-100/50">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">About Page Settings</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Modify the company profile details, tagline descriptions, and experience stats.</p>
        </div>
        <button
          type="submit"
          form="about-form"
          className="bg-[#6340b2] hover:bg-[#5231a3] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-violet-500/10 cursor-pointer"
        >
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-8 max-w-3xl">
        <form id="about-form" onSubmit={handleAboutSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Company Tagline / Hero Description</label>
            <textarea
              rows={4}
              value={aboutData.description}
              onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm resize-none"
              placeholder="Enter main description for home/about page..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Years of Experience</label>
              <input
                type="text"
                value={aboutData.yearsOfExperience}
                onChange={(e) => setAboutData({ ...aboutData, yearsOfExperience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                placeholder="e.g. 12"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Satisfied Clients</label>
              <input
                type="text"
                value={aboutData.satisfiedClients}
                onChange={(e) => setAboutData({ ...aboutData, satisfiedClients: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                placeholder="e.g. 1500+"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Completed Projects</label>
              <input
                type="text"
                value={aboutData.completedProjects}
                onChange={(e) => setAboutData({ ...aboutData, completedProjects: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-sm"
                placeholder="e.g. 2400+"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
