import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Linkedin, Github } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-primary mb-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left - Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">Let's Connect</h3>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out! I'd love to hear from you and discuss any opportunities.
            </p>

            {/* Quick links */}
            <div className="flex gap-3 mb-8">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "mailto:priyanath@email.com" },
              ].map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    href={link.href}
                    className="w-12 h-12 rounded-xl glass-card glow-border flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Icon size={20} className="text-primary" />
                  </a>
                );
              })}
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "priyanath@email.com" },
                { icon: Phone, label: "Phone", value: "+91 XXXXX XXXXX" },
                { icon: MapPin, label: "Location", value: "India" },
              ].map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={i}
                    className="glass-card glow-border flex items-center gap-4 p-4 hover:translate-x-2 transition-transform"
                    whileHover={{ x: 8 }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/20">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-semibold text-foreground">{info.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card p-8 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <label className="text-sm text-foreground block mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-sm text-foreground block mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-foreground block mb-1">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary transition-colors"
                placeholder="Subject"
              />
            </div>
            <div>
              <label className="text-sm text-foreground block mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send size={16} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
