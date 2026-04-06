import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};

const ROLES_TEXT = "Portfolio | Creative Professional";

const Star = ({ style }) => (
  <div
    className="absolute rounded-full bg-foreground"
    style={style}
  />
);

const ShootingStar = ({ delay }) => (
  <div
    className="absolute h-[1px] w-[80px] rotate-[-35deg]"
    style={{
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
      background: "linear-gradient(90deg, transparent, hsl(210, 100%, 55%), transparent)",
      animation: `shootingStar 3s ${delay}s ease-in-out infinite`,
    }}
  />
);

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

  const stars = useMemo(() =>
    Array.from({ length: 120 }).map((_, i) => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.8 + 0.2,
      animation: `twinkle ${2 + Math.random() * 4}s ${Math.random() * 3}s ease-in-out infinite alternate`,
    })), []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Space background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(220,30%,8%)_0%,_hsl(220,20%,2%)_70%,_hsl(0,0%,0%)_100%)]" />

      {/* Stars */}
      {stars.map((s, i) => <Star key={i} style={s} />)}

      {/* Shooting stars */}
      <ShootingStar delay={0} />
      <ShootingStar delay={4} />
      <ShootingStar delay={8} />

      {/* Nebula glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(210, 100%, 55%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(270, 60%, 55%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-[120px]" style={{ background: "hsl(240, 80%, 50%)" }} />

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

        <motion.p className="text-muted-foreground max-w-2xl mx-auto mb-10" variants={item}>
          Passionate about learning and growth. Building a strong foundation for a successful career.
        </motion.p>

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
