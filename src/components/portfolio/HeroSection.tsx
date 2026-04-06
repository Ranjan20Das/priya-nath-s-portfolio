import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};

const ROLES_TEXT = "Portfolio | Creative Professional";
const ROLE_TAGS = ["Creative Thinker", "Problem Solver", "Strategy Builder", "Quick Learner", "Teaching", "Dancer"];

export const HeroSection = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(ROLES_TEXT.slice(0, i + 1));
      i++;
      if (i === ROLES_TEXT.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

      <motion.div
        className="relative z-10 section-container text-center py-24"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4" variants={item}>
          Hi! I'm <br />
          <span className="gradient-text">PRIYA NATH</span>
        </motion.h1>

        <motion.div className="w-24 h-1 mx-auto rounded-full bg-primary mb-6" variants={item} />

        <motion.p className="text-lg md:text-xl text-muted-foreground font-mono mb-4" variants={item}>
          {typed}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.p className="text-muted-foreground max-w-2xl mx-auto mb-8" variants={item}>
          Passionate about learning and growth. Building a strong foundation for a successful career.
        </motion.p>

        {/* Role tags */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-10" variants={item}>
          {ROLE_TAGS.map((r, i) => (
            <motion.span
              key={i}
              className="px-4 py-2 rounded-full text-sm font-medium glass-card glow-border text-foreground"
              variants={item}
            >
              {r}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          className="text-muted-foreground"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={28} className="mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
};
