import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { fitCategories } from "../../data/products";

export function ShopByFit() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontWeight: 600 }}
            >
              Find Your Perfect Pair
            </p>
            <h2
              className="text-white uppercase"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
              }}
            >
              SHOP BY FIT
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-widest transition-colors"
            style={{ fontWeight: 700 }}
          >
            VIEW ALL FITS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {fitCategories.map((fit, i) => (
            <motion.div
              key={fit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={fit.href}
                className="group block relative overflow-hidden"
                style={{ aspectRatio: "3/5" }}
              >
                <img
                  src={fit.image}
                  alt={fit.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.7)" }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p
                    className="text-white/50 text-xs tracking-widest uppercase mb-2"
                    style={{ fontWeight: 600 }}
                  >
                    {fit.description}
                  </p>
                  <h3
                    className="text-white uppercase"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {fit.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-white/70 text-xs tracking-widest"
                      style={{ fontWeight: 600 }}
                    >
                      EXPLORE
                    </span>
                    <ArrowRight className="w-3 h-3 text-white/70" />
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
