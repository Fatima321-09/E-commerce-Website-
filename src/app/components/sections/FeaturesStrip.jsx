export function FeaturesStrip() {
  const features = [
    { icon: "🧵", title: "RAW SELVEDGE", desc: "Japanese & USA selvedge denim mills" },
    { icon: "✦", title: "FREE SHIPPING", desc: "On all orders over $150" },
    { icon: "↩", title: "FREE RETURNS", desc: "60-day hassle-free returns" },
    { icon: "⬡", title: "LIFETIME REPAIR", desc: "We repair what we make" },
  ];

  return (
    <section
      className="border-t border-b border-[#1a1a1a] py-12 px-6"
      style={{ backgroundColor: "#111" }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center gap-3">
            <span className="text-2xl">{feature.icon}</span>
            <p className="text-white text-xs tracking-widest" style={{ fontWeight: 700 }}>
              {feature.title}
            </p>
            <p className="text-white/40 text-xs leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
