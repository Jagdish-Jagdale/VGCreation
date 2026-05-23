const items = [
  "Glass Partitions",
  "Structural Facade",
  "Aluminium Windows",
  "LED Mirrors",
  "UPVC Windows",
  "Glass Glazing",
  "Interior Solutions",
  "Curtain Wall",
  "PVC Doors",
  "Decorative Glass",
  "Acid Etching",
  "Bend Glass",
  "Glass Partitions",
];

// Diamond separator between items
const Dot = () => (
  <span className="mx-4 text-[#1481b8] text-lg select-none">◆</span>
);

export default function ServicesTicker() {
  // Duplicate the list to create seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <div className="bg-white border-y border-gray-100 py-4 overflow-hidden">
      {/* Track */}
      <div className="flex animate-marquee whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-gray-700 font-medium text-sm tracking-wide hover:text-[#1481b8] transition-colors cursor-default">
              {item}
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
