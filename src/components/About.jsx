export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#1481b8] text-center mb-4">About Us</h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Get to know who we are and what drives us.
        </p>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Illustration placeholder */}
          <div className="flex-1 bg-[#1481b8]/10 rounded-2xl h-64 flex items-center justify-center">
            <svg
              className="w-24 h-24 text-[#1481b8]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          {/* Text content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Who We Are</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              VGCreation is a creative studio focused on delivering high-quality design and
              development solutions. We work closely with clients to understand their vision
              and translate it into stunning digital products.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team brings together creativity and technology to build brands that stand
              out in a competitive market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
