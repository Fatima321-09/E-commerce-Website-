import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const timeline = [
  { year: "1984", event: "Founded in Amsterdam with a single obsession: the perfect pair of jeans." },
  { year: "1992", event: "Introduced our signature raw selvedge denim construction." },
  { year: "2001", event: "Launched the iconic 3301 silhouette — still our best-seller today." },
  { year: "2010", event: "Opened our first standalone stores across Europe and North America." },
  { year: "2018", event: "Introduced our sustainable Hub for the Oceans denim program." },
  { year: "2026", event: "New chapter: SS26 collection redefines what raw denim can be." },
];

const values = [
  {
    title: "CRAFT FIRST",
    description:
      "Every pair starts with the finest export materials sourced from Japanese and American mills. No shortcuts. Ever.",
  },
  {
    title: "BUILT TO LAST",
    description:
      "We engineer jeans to outlive trends. Reinforced construction, premium hardware, and lifetime repair guarantee.",
  },
  {
    title: "RAW HONESTY",
    description:
      "We tell you exactly what your jeans are made of, where they were made, and how to care for them.",
  },
  {
    title: "EVOLVING DESIGN",
    description:
      "Fashion moves. We move with it — but we never lose sight of what made us: the raw denim ethos.",
  },
];

export default function About() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "80vh" }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1770795945741-80b6f482f812?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBkZW5pbSUyMHN0cmVldHdlYXIlMjBtb2RlbCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3NTMwOTIzMHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="About"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4) contrast(1.2) saturate(0.7)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)",
            }}
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 flex items-center" style={{ minHeight: "80vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-white/50 text-xs tracking-[0.4em] uppercase mb-4"
              style={{ fontWeight: 600 }}
            >
              Since 1984
            </p>
            <h1
              className="text-white uppercase"
              style={{
                fontSize: "clamp(3rem, 10vw, 9rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 0.85,
              }}
            >
              WE LIVE
              <br />
              <span style={{ color: "#e31837" }}>IN DENIM.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6"
              style={{ fontWeight: 600 }}
            >
              Our Mission
            </p>
            <h2
              className="text-white uppercase"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
              }}
            >
              DENIM IS NOT
              <br />
              JUST CLOTHING.
              <br />
              IT'S A CANVAS.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-end h-full"
          >
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              We started Denim Hub because we were tired of jeans that fell apart, that
              looked the same on everyone, that had no story. We wanted denim that aged
              like leather — that showed where you'd been, what you'd done.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Four decades later, we still believe the best pair of jeans is one you've
              lived in. Raw selvedge denim doesn't just fit your body — it remembers it.
              Every fade, every crease, every worn-down edge is earned. That's the Denim Hub promise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 px-6 border-t border-b border-[#1a1a1a]" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3" style={{ fontWeight: 600 }}>
              What We Stand For
            </p>
            <h2
              className="text-white uppercase"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.01em" }}
            >
              OUR VALUES
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "#1a1a1a" }}>
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 group hover:bg-[#111] transition-colors"
                style={{ backgroundColor: "#0f0f0f" }}
              >
                <div
                  className="w-8 h-1 mb-6 transition-all duration-300 group-hover:w-16"
                  style={{ backgroundColor: "#e31837" }}
                />
                <h3
                  className="text-white uppercase mb-4 text-sm tracking-widest"
                  style={{ fontWeight: 800 }}
                >
                  {value.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3" style={{ fontWeight: 600 }}>
              40 Years of Raw
            </p>
            <h2
              className="text-white uppercase"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.01em" }}
            >
              OUR HISTORY
            </h2>
          </div>
          <div className="relative">
            <div
              className="absolute left-24 top-0 bottom-0 w-px hidden md:block"
              style={{ backgroundColor: "#1a1a1a" }}
            />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-8 md:gap-12 py-8 border-b border-[#1a1a1a] group"
                >
                  <div className="relative shrink-0 w-16 md:w-24">
                    <span className="text-white" style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: "0.05em" }}>
                      {item.year}
                    </span>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full hidden md:block transition-all duration-300 group-hover:scale-150"
                      style={{ backgroundColor: "#e31837" }}
                    />
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed flex-1 group-hover:text-white/70 transition-colors">
                    {item.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24 px-6 border-t border-[#1a1a1a]" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontWeight: 600 }}>
              Sustainability
            </p>
            <h2
              className="text-white uppercase mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 0.95 }}
            >
              HUB FOR
              <br />
              THE PLANET
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              We believe denim that lasts is sustainable denim. Our lifetime repair program,
              take-back initiative, and commitment to ethical manufacturing mean every pair
              is made with the next generation in mind.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { value: "100%", label: "Traceable Supply Chain" },
                { value: "0", label: "Planned Obsolescence" },
                { value: "60%", label: "Less Water Used" },
                { value: "∞", label: "Repair Program" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white mb-1" style={{ fontSize: "2rem", fontWeight: 900 }}>
                    {stat.value}
                  </p>
                  <p className="text-white/30 text-xs tracking-widest">{stat.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 text-white text-xs tracking-widest border-b border-white pb-1 hover:text-white/60 transition-colors"
              style={{ fontWeight: 700 }}
            >
              SHOP RESPONSIBLY <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5]"
          >
            <img
              src="https://images.unsplash.com/photo-1651513777027-2d8c4240f0a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGRlbmltJTIwZmFzaGlvbiUyMGNhbXBhaWduJTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTc3NTMwOTIzOHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sustainability"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.7) saturate(0.8)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-white uppercase mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 0.9,
              }}
            >
              READY TO FIND
              <br />
              YOUR FIT?
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Explore our full collection and find the raw denim that becomes yours.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 text-white px-12 py-5 text-xs tracking-widest transition-all hover:gap-5"
              style={{ backgroundColor: "#e31837", fontWeight: 700 }}
            >
              SHOP THE COLLECTION <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
