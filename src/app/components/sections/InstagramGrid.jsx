import { products } from "../../data/products";

export function InstagramGrid() {
  const images = products.slice(0, 4).map((p) => p.image);

  return (
    <section className="py-16 px-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontWeight: 600 }}
          >
            @denimhub
          </p>
          <h2
            className="text-white uppercase"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
            }}
          >
            WEAR IT YOUR WAY
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden cursor-pointer">
              <img
                src={img}
                alt={`Community ${i + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                style={{ filter: "brightness(0.7) saturate(0.8)" }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity tracking-widest text-xs"
                  style={{ fontWeight: 700 }}
                >
                  VIEW POST
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
