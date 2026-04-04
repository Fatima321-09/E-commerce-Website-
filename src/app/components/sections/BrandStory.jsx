import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function BrandStory() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontWeight: 600 }}
          >
            Since 1984
          </p>
          <h2
            className="text-white uppercase mb-8"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
              lineHeight: 0.95,
            }}
          >
            DENIM IS
            <br />
            NOT A TREND.
            <br />
            IT'S A LANGUAGE.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            We started with one obsession: to make the perfect pair of jeans.
            Four decades later, that obsession hasn't changed — it's only deepened.
          </p>
          <p className="text-white/50 text-sm leading-relaxed mb-10">
            Every stitch, every fade, every worn-in crease tells a story.
            Raw denim doesn't just clothe you — it remembers you.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 text-white text-xs tracking-widest border-b border-white pb-1 hover:text-white/70 transition-colors"
            style={{ fontWeight: 700 }}
          >
            READ OUR STORY <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#111" }}>
            <img
              src="https://images.unsplash.com/photo-1673173044976-1f49df814171?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcHJvZHVjdCUyMGplYW5zJTIwY2xvc2V1cCUyMHRleHR1cmV8ZW58MXx8fHwxNzc1MzA5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Brand Story"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.8) contrast(1.1)" }}
            />
          </div>
          <div
            className="absolute -bottom-6 -left-6 w-32 h-32 flex items-center justify-center flex-col"
            style={{ backgroundColor: "#e31837" }}
          >
            <p className="text-white text-3xl" style={{ fontWeight: 900 }}>40</p>
            <p className="text-white/80 text-xs tracking-widest">YEARS</p>
            <p className="text-white/80 text-xs tracking-widest">OF RAW</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
