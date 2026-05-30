import logo from "../assets/vision_glass_creation_logo.png";

export default function Footer() {
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.google.com/?q=Vision+Glass+Creation+Plot+No.+595+Ganganagar+Nigdi+Pimpri-Chinchwad+411044&color=ffffff&bgcolor=0c1c30";
  const mapsSearchUrl = "https://maps.google.com/?q=Vision+Glass+Creation+Plot+No.+595+Ganganagar+Nigdi+Pimpri-Chinchwad+411044";
  const whatsappUrl = "https://wa.me/919921917083";

  return (
    <>
      <footer id="contact" className="relative bg-[#051120] text-gray-400 border-t-4 border-[#1481b8] pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

            {/* Column 1: Brand Info */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Vision Glass Creation"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Expert in Window & Glass Solutions for commercial, residential and industrial spaces across Pune.
              </p>
              <div className="text-xs font-semibold text-gray-500 uppercase mt-2">
                Proprietor: Pratap Bhagwanrao Kathare
              </div>
            </div>

            {/* Column 2: Scan to Visit */}
            <div className="lg:col-span-2 flex flex-col gap-4 items-start">
              <h4 className="text-sm font-extrabold text-white tracking-widest uppercase">
                Scan to Visit
              </h4>
              <div className="bg-[#0c1c30] p-2.5 rounded-xl border border-white/10 shadow-lg inline-block">
                <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={qrCodeUrl}
                    alt="Scan to visit on Google Maps"
                    className="w-28 h-28 object-contain"
                  />
                </a>
              </div>
              <div className="text-xs text-gray-400 leading-tight">
                <span className="block font-medium">Scan to visit on Google Maps</span>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 hover:underline font-bold mt-1 inline-flex items-center gap-1 transition-colors"
                >
                  Opens Google Maps
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 3: Navigate */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-sm font-extrabold text-white tracking-widest uppercase">
                Navigate
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li>
                  <a href="/" className="hover:text-sky-400 transition-colors duration-200">Home</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-sky-400 transition-colors duration-200">About</a>
                </li>
                <li>
                  <a href="/services" className="hover:text-sky-400 transition-colors duration-200">Services</a>
                </li>
                <li>
                  <a href="/gallery" className="hover:text-sky-400 transition-colors duration-200">Gallery</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-sky-400 transition-colors duration-200">Contact</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Our Services */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-sm font-extrabold text-white tracking-widest uppercase">
                Our Services
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li>
                  <a href="#services" className="hover:text-sky-400 transition-colors duration-200">Glass Partitions</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-sky-400 transition-colors duration-200">Aluminium & UPVC Windows</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-sky-400 transition-colors duration-200">Structural Facade</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-sky-400 transition-colors duration-200">Glass Glazing</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-sky-400 transition-colors duration-200">Interior Solutions</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-sky-400 transition-colors duration-200">Decorative Mirrors</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-sky-400 transition-colors duration-200">LED Mirror Work</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-sky-400 transition-colors duration-200">PVC Fiber Doors</a>
                </li>
              </ul>
            </div>

            {/* Column 5: Contact */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <h4 className="text-sm font-extrabold text-white tracking-widest uppercase">
                Contact
              </h4>
              <div className="flex flex-col gap-3 text-sm">
                <a href="tel:+919921917083" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <svg className="w-4 h-4 text-[#1481b8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 99219 17083
                </a>
                <a href="tel:+917840917083" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <svg className="w-4 h-4 text-[#1481b8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 78409 17083
                </a>
                <a href="mailto:visionglasscreation1@gmail.com" className="flex items-center gap-2.5 hover:text-white transition-colors break-all">
                  <svg className="w-4 h-4 text-[#1481b8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  visionglasscreation1@gmail.com
                </a>
                <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-white transition-colors">
                  <svg className="w-4 h-4 text-[#1481b8] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Plot No. 595, Ganganagar, Nigdi, Pimpri-Chinchwad 411044</span>
                </a>
              </div>

              {/* Chat on WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 bg-transparent hover:bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] font-semibold text-sm py-2 px-4 rounded-lg transition-all group"
              >
                <svg className="w-5 h-5 fill-[#25D366] transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.459 3.479 1.332 5.002L2 22l5.163-1.353a9.92 9.92 0 004.846 1.258c5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.059 14.18c-.248.694-1.233 1.258-1.743 1.344-.459.081-1.054.149-3.048-.682-2.548-1.062-4.171-3.664-4.295-3.832-.124-.167-1.023-1.365-1.023-2.607 0-1.242.645-1.85 0.875-2.098.23-.248.502-.309.67-.309.167 0 .334.006.477.012.149.006.347-.056.546.422.205.49.694 1.693.756 1.817.062.124.105.273.019.44-.087.174-.13.279-.26.434-.13.155-.273.347-.39.465-.13.13-.266.273-.112.533.155.26.694 1.135 1.488 1.836.986.874 1.817 1.147 2.078 1.277.26.13.409.112.564-.062.155-.174.67-.775.85-.1041.174-.267.353-.223.589-.136.236.087 1.488.701 1.91.62.422.26.701.39.831.52.13.13.26.39.136.694z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

          </div>

          <hr className="border-white/10 my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              Pune's Trusted Glass & Window Solutions Since 2009
            </div>
            <div className="flex items-center gap-6">
              <a href="/admin/login" className="hover:text-white transition-colors duration-200">Admin</a>
              <span>© 2026 Vision Glass Creation. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
