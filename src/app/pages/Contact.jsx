import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Youtube, ArrowRight, CheckCircle } from "lucide-react";

const stores = [
  {
    city: "NEW YORK",
    address: "212 SoHo Blvd, New York, NY 10013",
    phone: "+1 212 555 0198",
    hours: "Mon–Sat: 10am–8pm | Sun: 11am–6pm",
  },
  {
    city: "LOS ANGELES",
    address: "840 Melrose Ave, Los Angeles, CA 90046",
    phone: "+1 323 555 0174",
    hours: "Mon–Sat: 10am–8pm | Sun: 12pm–6pm",
  },
  {
    city: "LONDON",
    address: "55 Carnaby St, London W1F 9QU",
    phone: "+44 20 7946 0958",
    hours: "Mon–Sat: 10am–7pm | Sun: 12pm–5pm",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const subjects = [
    "General Inquiry",
    "Order Support",
    "Returns & Exchanges",
    "Size & Fit Help",
    "Wholesale",
    "Press & Collaborations",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <div className="relative pt-44 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1631033098520-3b614c7f4cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGZhc2hpb24lMjBzdG9yZSUyMGludGVyaW9yJTIwZGFyayUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzc1MzEwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.2) saturate(0.4)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,1) 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4"
              style={{ fontWeight: 600 }}
            >
              Get In Touch
            </p>
            <h1
              className="text-white uppercase"
              style={{
                fontSize: "clamp(3rem, 9vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 0.88,
              }}
            >
              LET'S
              <br />
              <span style={{ color: "#e31837" }}>TALK.</span>
            </h1>
            <p className="text-white/40 text-sm max-w-md mt-6 leading-relaxed">
              Whether you need help with sizing, want to collaborate, or just want to talk
              denim — we're here for it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[1fr_460px] gap-16">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start py-20"
              >
                <CheckCircle className="w-12 h-12 mb-6" style={{ color: "#4ade80" }} />
                <h2
                  className="text-white uppercase mb-4"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.01em" }}
                >
                  MESSAGE SENT.
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm">
                  Thanks for reaching out, {formData.name}! Our team will get back to you
                  within 24–48 hours at{" "}
                  <span className="text-white">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                  }}
                  className="text-white text-xs tracking-widest border-b border-white pb-1 hover:text-white/60 transition-colors"
                  style={{ fontWeight: 700 }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <p
                    className="text-white/30 text-xs tracking-[0.4em] uppercase mb-8"
                    style={{ fontWeight: 600 }}
                  >
                    Send Us A Message
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontWeight: 600 }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-[#111] text-white placeholder-white/20 px-5 py-4 text-sm tracking-wide outline-none border transition-colors"
                      style={{
                        borderColor: errors.name ? "#e31837" : "#222",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#555")}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? "#e31837" : "#222")}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1.5" style={{ color: "#e31837" }}>{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontWeight: 600 }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-[#111] text-white placeholder-white/20 px-5 py-4 text-sm tracking-wide outline-none border transition-colors"
                      style={{ borderColor: errors.email ? "#e31837" : "#222" }}
                      onFocus={(e) => (e.target.style.borderColor = "#555")}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? "#e31837" : "#222")}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1.5" style={{ color: "#e31837" }}>{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontWeight: 600 }}>
                      PHONE (OPTIONAL)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#111] text-white placeholder-white/20 px-5 py-4 text-sm tracking-wide outline-none border border-[#222] transition-colors"
                      onFocus={(e) => (e.target.style.borderColor = "#555")}
                      onBlur={(e) => (e.target.style.borderColor = "#222")}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontWeight: 600 }}>
                      SUBJECT
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#111] text-white px-5 py-4 text-sm tracking-wide outline-none border border-[#222] transition-colors appearance-none cursor-pointer"
                      style={{ fontWeight: 500 }}
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s} style={{ backgroundColor: "#111" }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/40 text-xs tracking-widest uppercase mb-2" style={{ fontWeight: 600 }}>
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="w-full bg-[#111] text-white placeholder-white/20 px-5 py-4 text-sm tracking-wide outline-none border transition-colors resize-none"
                    style={{ borderColor: errors.message ? "#e31837" : "#222" }}
                    onFocus={(e) => (e.target.style.borderColor = "#555")}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? "#e31837" : "#222")}
                  />
                  {errors.message && (
                    <p className="text-xs mt-1.5" style={{ color: "#e31837" }}>{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 text-white px-12 py-4 text-xs tracking-widest transition-all hover:gap-5"
                  style={{ backgroundColor: "#e31837", fontWeight: 700 }}
                >
                  SEND MESSAGE <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="space-y-8"
          >
            {/* Quick contact */}
            <div className="p-8 border border-[#1a1a1a]" style={{ backgroundColor: "#0f0f0f" }}>
              <p
                className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6"
                style={{ fontWeight: 600 }}
              >
                Direct Contact
              </p>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: "EMAIL", value: "hello@denimhub.com" },
                  { icon: Phone, label: "PHONE", value: "+1 800 DENIM HUB" },
                  {
                    icon: Clock,
                    label: "RESPONSE TIME",
                    value: "Within 24–48 hours",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      <Icon className="w-4 h-4 text-white/40" />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs tracking-widest uppercase mb-0.5" style={{ fontWeight: 600 }}>
                        {label}
                      </p>
                      <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="p-8 border border-[#1a1a1a]" style={{ backgroundColor: "#0f0f0f" }}>
              <p
                className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6"
                style={{ fontWeight: 600 }}
              >
                Follow Us
              </p>
              <div className="space-y-4">
                {[
                  { icon: Instagram, handle: "@denimhub", platform: "INSTAGRAM" },
                  { icon: Twitter, handle: "@denimhub", platform: "TWITTER / X" },
                  { icon: Youtube, handle: "Denim Hub Official", platform: "YOUTUBE" },
                ].map(({ icon: Icon, handle, platform }) => (
                  <a
                    key={platform}
                    href="#"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center transition-colors group-hover:bg-[#e31837]"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      <Icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs tracking-widest uppercase" style={{ fontWeight: 600 }}>
                        {platform}
                      </p>
                      <p className="text-white/60 text-xs group-hover:text-white transition-colors" style={{ fontWeight: 500 }}>
                        {handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Store Locations */}
        <div className="mt-24 pt-16 border-t border-[#1a1a1a]">
          <div className="mb-12">
            <p
              className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontWeight: 600 }}
            >
              Find Us In Person
            </p>
            <h2
              className="text-white uppercase"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
              }}
            >
              OUR STORES
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "#1a1a1a" }}>
            {stores.map((store, i) => (
              <motion.div
                key={store.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 group hover:bg-[#111] transition-colors cursor-pointer"
                style={{ backgroundColor: "#0f0f0f" }}
              >
                <div className="w-8 h-1 mb-6 transition-all duration-300 group-hover:w-16" style={{ backgroundColor: "#e31837" }} />
                <h3
                  className="text-white uppercase mb-5"
                  style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "0.05em" }}
                >
                  {store.city}
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: MapPin, text: store.address },
                    { icon: Phone, text: store.phone },
                    { icon: Clock, text: store.hours },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <Icon className="w-3.5 h-3.5 text-white/20 shrink-0 mt-0.5" />
                      <p className="text-white/40 text-xs leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
