import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Home />
      <About />
      <Services />
      <Gallery />

      {/* Footer */}
      <footer className="bg-[#1481b8] text-white text-center py-6">
        <p className="text-sm">© 2024 VGCreation. All rights reserved.</p>
      </footer>
    </div>
  );
}
