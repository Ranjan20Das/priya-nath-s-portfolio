import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const SKILLS = [
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
];

const SKILL_ROWS = [
  [
    {
      title: "Programming Languages",
      items: [
        { name: "Python", level: 80 },
        { name: "C++", level: 70 },
        { name: "Java", level: 65 },
        { name: "JavaScript", level: 75 },
      ],
    },
    {
      title: "Web Technologies",
      items: [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "React", level: 70 },
      ],
    },
  ],
  [
    {
      title: "Databases & Tools",
      items: [
        { name: "MySQL", level: 75 },
        { name: "MongoDB", level: 65 },
        { name: "Git", level: 80 },
      ],
    },
    {
      title: "Soft Skills",
      items: [
        { name: "Teamwork", level: 90 },
        { name: "Problem Solving", level: 85 },
        { name: "Communication", level: 88 },
        { name: "Adaptability", level: 85 },
      ],
    },
  ],
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-primary mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ✨ Technical expertise blended with creativity — explore my core competencies below.
          </p>
        </motion.div>

        {/* Floating skill icons */}
        <motion.div
          ref={ref}
          className="flex flex-wrap justify-center gap-6 mb-16"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {SKILLS.map((s) => (
            <motion.div
              key={s.name}
              className="glass-card glow-border w-20 h-20 flex flex-col items-center justify-center gap-1 hover:scale-110 transition-transform cursor-pointer animate-float"
              variants={fadeUp}
              style={{ animationDelay: `${Math.random() * 3}s` }}
            >
              <img src={s.logo} className="w-8 h-8" alt={s.name} />
              <span className="text-[10px] text-muted-foreground font-medium">{s.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill bars */}
        <div className="space-y-8">
          {SKILL_ROWS.map((row, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-6">
              {row.map((col) => (
                <motion.div
                  key={col.title}
                  className="glass-card p-6"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">{col.title}</h3>
                  <ul className="space-y-4">
                    {col.items.map((item, j) => (
                      <li key={j}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{item.name}</span>
                          <span className="text-primary font-semibold">{item.level}%</span>
                        </div>
                        <div className="skill-progress-bar">
                          <div className="skill-progress-fill" style={{ width: `${item.level}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
