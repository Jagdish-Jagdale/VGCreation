import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const promiseIcons = [
  <svg key="1" className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>,
  <svg key="2" className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
  </svg>,
  <svg key="3" className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="4" className="w-5 h-5 text-[#1481b8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
];

export default function Promises() {
  const [promisesList, setPromisesList] = useState([]);
  const [meta, setMeta] = useState({
    title1: "",
    title2: "",
    description: "",
    buttonLabel: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "home", "ourpromises");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.meta) setMeta(data.meta);
          if (data.list) setPromisesList(data.list);
        } else {
          setPromisesList([]); // Hide if no data is present
        }
      } catch (error) {
        console.error("Error fetching Promises data:", error);
      }
    };
    fetchData();
  }, []);

  if (promisesList.length === 0) return null;

  return (
    <section id="promises" className="py-16 bg-[#f8fafc] text-slate-800 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#1481b8] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1481b8]"></span>
              Our Promises
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight text-slate-900">
              {meta.title1} <br />
              <span className="text-[#1481b8]">
                {meta.title2}
              </span>
            </h2>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
              {meta.description}
            </p>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#1481b8] hover:bg-[#116e9d] text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md shadow-[#1481b8]/10 hover:shadow-lg transition-all hover:scale-[1.02] duration-200 group"
            >
              {meta.buttonLabel}
              <svg
                className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {promisesList.slice(0, 4).map((promise, index) => (
                <div
                  key={promise.id || index}
                  className="bg-white border border-slate-100 hover:border-sky-500/20 p-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-500/5 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-50/80 flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-sky-100">
                    {promiseIcons[index % promiseIcons.length]}
                  </div>

                  <h3 className="text-base font-bold text-slate-800 mb-1.5 transition-colors duration-200 group-hover:text-[#1481b8]">
                    {promise.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {promise.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
