import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroTagsImg from "@/assets/hero-tags.png";
import priyaPhoto from "@/assets/priya-photo.png";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};

const ROLES_TEXT = "Portfolio | Creative Professional";

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

        <motion.div className="w-full max-w-3xl mx-auto mb-10" variants={item}>
          <img
            src={heroTagsImg}
            alt="Creative Thinker, Problem Solver, Strategy Builder, Quick Learner, Teaching, Dancer"
            className="w-full h-auto object-contain"
          />
        </motion.div>

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
