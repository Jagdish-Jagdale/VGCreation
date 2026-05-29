import { useState, useEffect } from "react";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    phone1: "+91 99219 17083",
    phone2: "+91 78409 17083",
    email: "visionglasscreation1@gmail.com",
    address: "Plot No. 595, Ganganagar, Nigdi, Pimpri-Chinchwad 411044"
  });

  useEffect(() => {
    const saved = localStorage.getItem("vg_contact");
    if (saved) {
      setContactInfo(JSON.parse(saved));
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.google.com/?q=Vision+Glass+Creation+Plot+No.+595+Ganganagar+Nigdi+Pimpri-Chinchwad+411044&color=051120&bgcolor=ffffff";
  const mapsSearchUrl = "https://maps.google.com/?q=Vision+Glass+Creation+Plot+No.+595+Ganganagar+Nigdi+Pimpri-Chinchwad+411044";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.name.trim().length < 2) {
      setErrorMessage("Full Name must be at least 2 characters.");
      setStatus("error");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage("Contact Number must be exactly 10 digits (numbers only).");
      setStatus("error");
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!formData.requirement) {
      setErrorMessage("Please select a Requirement.");
      setStatus("error");
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage("Please tell us about your project.");
      setStatus("error");
      return;
    }

    // Store in enquiries
    const savedEnquiries = localStorage.getItem("vg_enquiries");
    const enquiries = savedEnquiries ? JSON.parse(savedEnquiries) : [];
    enquiries.unshift({
      id: Date.now(),
      name: formData.name.trim(),
      phone: formData.phone,
      email: formData.email.trim(),
      requirement: formData.requirement,
      message: formData.message.trim(),
      date: new Date().toLocaleString(),
      status: "unread"
    });
    localStorage.setItem("vg_enquiries", JSON.stringify(enquiries));

    // Simulate API call
    setStatus("success");
    setFormData({
      name: "",
      phone: "",
      email: "",
      requirement: "",
      message: "",
    });
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800">

      {/* Hero Banner with Office Glass Walkway Background */}
      <div
        className="relative py-28 text-white overflow-hidden text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(12, 28, 48, 0.88), rgba(4, 14, 26, 0.93)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')`
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-400 mb-4">
            <a href="/" className="hover:underline">Home</a>
            <span>•</span>
            <span className="text-white/60">Contact</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase">
            Contact Us
          </h1>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 max-w-xl mx-auto">
            <span className="h-px flex-1 bg-sky-400/30" />
            <p className="text-xs md:text-sm font-extrabold tracking-widest uppercase text-sky-300">
              Get in touch for expert glass and window solutions
            </p>
            <span className="h-px flex-1 bg-sky-400/30" />
          </div>
        </div>
      </div>

      {/* Content Form and details container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Form Card with blue top accent border */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 shadow-sm border-t-4 border-t-[#1481b8] border-x border-b border-slate-100 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-[#1481b8]" />
              <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
                Reach Out
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Send a Quotation Request
            </h2>
            <p className="text-slate-500 text-sm mb-8">
              We'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-between gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-[#1481b8] focus:ring-1 focus:ring-[#1481b8]/30 transition-all text-sm"
                  />
                </div>

                {/* Contact Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-[#1481b8] focus:ring-1 focus:ring-[#1481b8]/30 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-[#1481b8] focus:ring-1 focus:ring-[#1481b8]/30 transition-all text-sm"
                  />
                </div>

                {/* Service Title Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="requirement" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Service Title *
                  </label>
                  <select
                    id="requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-[#1481b8] focus:ring-1 focus:ring-[#1481b8]/30 transition-all text-sm"
                  >
                    <option value="">Select Service Type</option>
                    <option value="Home">Home</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Office">Office</option>
                    <option value="Fasad Work">Fasad Work</option>
                    <option value="IT Park">IT Park</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tell us about your project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide site location and specific details..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-[#1481b8] focus:ring-1 focus:ring-[#1481b8]/30 transition-all text-sm resize-none"
                ></textarea>
              </div>

              {/* Status Message */}
              {status === "success" && (
                <div className="p-3 bg-green-50 text-green-700 text-sm font-semibold rounded-xl">
                  Thank you! Your quotation request has been sent successfully.
                </div>
              )}
              {status === "error" && (
                <div className="p-3 bg-red-50 text-red-700 text-sm font-semibold rounded-xl">
                  {errorMessage || "Please fill out all required fields."}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#1481b8] hover:bg-[#116e9d] text-white font-bold text-sm uppercase rounded-xl transition-all shadow-md shadow-[#1481b8]/10 cursor-pointer"
              >
                Send Request
              </button>
            </form>
          </div>

          {/* Right Column: Stacked Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-4">

            {/* Card 1: Contact Details Card with blue top accent border */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-t-4 border-t-[#1481b8] border-x border-b border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-0.5 bg-[#1481b8]" />
                <span className="text-[#1481b8] text-xs font-bold tracking-widest uppercase">
                  Contact
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                Our Details
              </h2>

              <div className="space-y-6">
                {/* Mobile */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#1481b8] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Mobile</span>
                    <a href={`tel:${contactInfo.phone1.replace(/\s+/g, '')}`} className="text-slate-800 font-extrabold hover:text-[#1481b8] transition-colors text-sm">
                      {contactInfo.phone1}
                    </a>
                  </div>
                </div>

                {/* Office */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#1481b8] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Office</span>
                    <a href={`tel:${contactInfo.phone2.replace(/\s+/g, '')}`} className="text-slate-800 font-extrabold hover:text-[#1481b8] transition-colors text-sm">
                      {contactInfo.phone2}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#1481b8] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Email</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-slate-800 font-extrabold hover:text-[#1481b8] transition-colors break-all text-sm">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#1481b8] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Visit Factory / Office</span>
                    <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="text-slate-800 font-extrabold hover:text-[#1481b8] transition-colors leading-relaxed text-sm">
                      {contactInfo.address}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: WhatsApp Banner Card */}
            <a
              href="https://wa.me/919921917083"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.459 3.479 1.332 5.002L2 22l5.163-1.353a9.92 9.92 0 004.846 1.258c5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.059 14.18c-.248.694-1.233 1.258-1.743 1.344-.459.081-1.054.149-3.048-.682-2.548-1.062-4.171-3.664-4.295-3.832-.124-.167-1.023-1.365-1.023-2.607 0-1.242.645-1.85 0.875-2.098.23-.248.502-.309.67-.309.167 0 .334.006.477.012.149.006.347-.056.546.422.205.49.694 1.693.756 1.817.062.124.105.273.019.44-.087.174-.13.279-.26.434-.13.155-.273.347-.39.465-.13.13-.266.273-.112.533.155.26.694 1.135 1.488 1.836.986.874 1.817 1.147 2.078 1.277.26.13.409.112.564-.062.155-.174.67-.775.85-.1041.174-.267.353-.223.589-.136.236.087 1.488.701 1.91.62.422.26.701.39.831.52.13.13.26.39.136.694z" />
                  </svg>
                </div>
                <div>
                  <span className="text-white/80 text-[10px] font-bold tracking-widest uppercase block">Chat on WhatsApp</span>
                  <span className="font-extrabold text-base leading-none block mt-1">+91 99219 17083</span>
                </div>
              </div>
            </a>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
                  <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={qrCodeUrl}
                      alt="Scan to visit on Google Maps"
                      className="w-20 h-20 object-contain"
                    />
                  </a>
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Google Maps QR</span>
                  <h4 className="text-slate-800 font-bold text-sm mt-1">Scan to Open Location</h4>
                  <p className="text-slate-400 text-[11px] leading-snug mt-1.5 max-w-[200px]">
                    Scan this QR code with your phone camera to view our location on maps instantly.
                  </p>
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#1481b8] hover:underline font-extrabold inline-flex items-center gap-1 mt-2.5"
                  >
                    Open in Google Maps
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Full Width Google Map Section */}
      <div className="w-full h-[450px] shadow-inner border-t border-slate-100 mt-4">
        <iframe
          title="Vision Glass Creation Location Map"
          src="https://maps.google.com/maps?q=Vision%20Glass%20Creation%20Plot%20No.%20595%20Ganganagar%20Nigdi%20Pimpri-Chinchwad%20411044&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale-[8%] contrast-[105%]"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
}
