import { useState, useEffect } from "react";

const defaultItems = [];

export default function ServicesTicker() {
  const [tickerItems, setTickerItems] = useState(defaultItems);

  useEffect(() => {
    const savedItems = localStorage.getItem("vg_ticker_items");
    if (savedItems) {
      try {
        setTickerItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse vg_ticker_items", e);
      }
    }
  }, []);

  // Duplicate to create seamless infinite loop
  const doubled = [...tickerItems, ...tickerItems];

  if (tickerItems.length === 0) return null;

  return (
    <div className="bg-white border-y border-slate-100 py-3 overflow-hidden">
      {/* Single Row: Scrolling Right to Left */}
      <div className="flex animate-marquee whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={`ticker-${i}`} className="inline-flex items-center">
            <span className="text-slate-700 font-semibold text-[13px] tracking-wider hover:text-[#1481b8] transition-colors cursor-default uppercase">
              {item}
            </span>
            <span className="mx-6 text-[#1481b8] text-base select-none">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
