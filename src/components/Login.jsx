import { useState, useEffect } from "react";
import logo from "../assets/vision_glass_creation_logo.png";
import bgImage from "../assets/gallery10.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "error" });

  useEffect(() => {
    document.title = "Admin Login | Vision Glass Creation";
  }, []);

  // Auto-dismiss toast after 3.5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const triggerToast = (message, type = "error") => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Mandatory check
    if (!email.trim() || !password.trim()) {
      triggerToast("Email and password are mandatory fields.", "error");
      return;
    }

    // 2. Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      triggerToast("Please enter a valid email address.", "error");
      return;
    }

    // 3. Credentials check
    if (email === "admin@gmail.com" && password === "Admin@123") {
      triggerToast("Login successful! Redirecting...", "success");
      localStorage.setItem("isAdmin", "true");
      setTimeout(() => {
        window.history.pushState(null, "", "/admin");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }, 1500);
    } else {
      triggerToast("Invalid email or password.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#051120] flex flex-col lg:flex-row overflow-hidden relative">

      {/* Toast Notification Card */}
      <div
        className={`fixed top-6 right-6 z-50 flex items-center gap-3.5 px-5 py-4 rounded-xl shadow-2xl transition-all duration-300 border-l-4 max-w-sm ${toast.show ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0 pointer-events-none"
          } ${toast.type === "success"
            ? "bg-white text-slate-800 border-green-500"
            : "bg-white text-slate-800 border-red-500"
          }`}
      >
        {toast.type === "success" ? (
          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )}

        <p className="text-xs font-bold leading-normal tracking-wide text-slate-700">
          {toast.message}
        </p>

        <button
          onClick={() => setToast((prev) => ({ ...prev, show: false }))}
          className="text-slate-400 hover:text-slate-600 transition-colors ml-2 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Left Column: Image (Hidden on mobile) */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 lg:w-[calc(50%+50px)] bg-slate-900 select-none z-0">
        <img
          src={bgImage}
          alt="Premium Glass Facade"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/65 z-0"></div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-16 z-10 text-white">
          <a href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm tracking-wider uppercase">
            <span>←</span> Back to Home
          </a>

          <div className="max-w-md">
            <h2 className="text-4xl font-black leading-tight mb-4 uppercase tracking-wide">
              Crafting Elegance<br />
              With Precision
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              Explore premium commercial facades, structural glazing, acoustic window solutions, and designer mirrors tailored for modern architecture.
            </p>
          </div>

          <div className="text-xs text-white/40 font-semibold tracking-widest uppercase">
            © 2026 Vision Glass Creation
          </div>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white relative lg:rounded-l-[40px] z-10 lg:ml-auto">
        <div className="w-full max-w-md">
          {/* Logo / Header for mobile */}
          <div className="flex flex-col items-start mb-10">
            <a href="/" className="lg:hidden mb-6 text-slate-500 hover:text-slate-800 transition-colors font-semibold text-xs flex items-center gap-1.5">
              <span>←</span> Home
            </a>

            <img
              src={logo}
              alt="Vision Glass Creation"
              className="h-16 w-auto object-contain mb-8"
            />

            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Please enter your admin details to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-[#6340b2]/10 transition-all font-medium"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6340b2] focus:ring-4 focus:ring-[#6340b2]/10 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#6340b2] hover:bg-[#5231a3] text-white font-bold rounded-full text-sm uppercase tracking-wider shadow-md shadow-[#6340b2]/10 hover:shadow-lg transition-all cursor-pointer text-center"
            >
              Sign in
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
