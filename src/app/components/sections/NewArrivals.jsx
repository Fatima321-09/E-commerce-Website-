import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { products } from "../../data/products";
import { ProductCard } from "../ProductCard";

export function NewArrivals() {
  const newArrivals = products.filter((p) => p.isNew || !p.isSale).slice(0, 4);

  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontWeight: 600 }}
            >
              Just Dropped
            </p>
            <h2
              className="text-white uppercase"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
              }}
            >
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-widest transition-colors"
            style={{ fontWeight: 700 }}
          >
            VIEW ALL <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
