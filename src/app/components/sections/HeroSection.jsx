import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
          poster="https://images.unsplash.com/photo-1770795945741-80b6f482f812?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBkZW5pbSUyMHN0cmVldHdlYXIlMjBtb2RlbCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3NTMwOTIzMHww&ixlib=rb-4.1.0&q=80&w=1080"
        >
          {/* Replace with your own hosted video URL */}
          <source
            src="https://cdn.coverr.co/videos/coverr-man-wearing-a-denim-jacket-3404/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.2) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full pt-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/50 text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontWeight: 600 }}
          >
            New Collection — SS26
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white mb-6 uppercase leading-none"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
            }}
          >
            BEST
            <br />
            <span style={{ color: "#e31837" }}>DEALS.</span>
            <br />
            REAL
            <br />
            FITS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-sm max-w-sm mb-10 leading-relaxed"
          >
            Premium style. Global export denim at
            factory rates. Each unit is A Grade stock, sourced for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 text-white px-10 py-4 text-xs tracking-widest transition-all hover:gap-5"
              style={{ backgroundColor: "#e31837", fontWeight: 700 }}
            >
              SHOP NOW
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-white px-10 py-4 text-xs tracking-widest border border-white/30 hover:border-white transition-all"
              style={{ fontWeight: 700 }}
            >
              OUR STORY
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-white/30 animate-bounce" />
      </div>

      {/* Stats strip */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10"
        style={{
          backgroundColor: "rgba(10,10,10,0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-white/10">
          {[
            { value: "12oz", label: "Export Grade" },
            { value: "100%", label: "Global Spec" },
            { value: "50+", label: "Styles Available" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <p
                className="text-white"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                }}
              >
                {stat.value}
              </p>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
