import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function CampaignBanner() {
  return (
    <section className="relative overflow-hidden mb-1" style={{ minHeight: "70vh" }}>
      <img
        src="https://images.unsplash.com/photo-1771012266254-9e58941dbb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbiUyMGRhcmslMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzc1MzA5MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Campaign"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.4)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 100%)",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#e31837", fontWeight: 700 }}
          >
            — Limited Edition
          </p>
          <h2
            className="text-white uppercase mb-6 max-w-2xl"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 0.92,
            }}
          >
            HUB ESSENTIALS
            <br />
            COLLECTION
          </h2>
          <p className="text-white/50 text-sm max-w-md mb-10 leading-relaxed">
            Seven iconic silhouettes. Unbleached, unsanforized denim that tells the story
            of your life as it ages and fades with you.
          </p>
          <Link
            to="/shop/collections"
            className="inline-flex items-center gap-3 text-white px-10 py-4 text-xs tracking-widest border border-white/30 hover:bg-white hover:text-black transition-all"
            style={{ fontWeight: 700 }}
          >
            EXPLORE COLLECTION <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
