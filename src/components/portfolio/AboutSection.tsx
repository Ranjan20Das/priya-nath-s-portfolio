import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const EDUCATION = [
  {
    degree: "Bachelor's Degree",
    institution: "University Name",
    year: "2021 – 2025",
    description: "Pursuing degree with focus on academics and extracurricular activities.",
    icon: GraduationCap,
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "School Name",
    year: "2019 – 2021",
    description: "Completed higher secondary education with strong academic performance.",
    icon: BookOpen,
  },
  {
    degree: "Secondary (10th)",
    institution: "School Name",
    year: "2019",
    description: "Completed secondary education with excellent grades.",
    icon: Award,
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-primary mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A dedicated and enthusiastic individual with a passion for learning new things and
            contributing to meaningful projects.
          </p>
        </motion.div>

        {/* About content */}
        <motion.div
          className="glass-card p-8 mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm Priya Nath, a motivated individual who believes in continuous learning and
                self-improvement. I enjoy taking on new challenges and working collaboratively
                with others.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm passionate about building my skills and preparing for a successful career.
                My goal is to contribute positively to any team I'm a part of.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Name", value: "Priya Nath" },
                { label: "Location", value: "India" },
                { label: "Email", value: "priyanath@email.com" },
                { label: "Languages", value: "English, Hindi" },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-10">
            My <span className="gradient-text">Education</span>
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {EDUCATION.map((edu, i) => {
                const Icon = edu.icon;
                return (
                  <motion.div
                    key={i}
                    className={`flex flex-col md:flex-row items-center gap-6 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="glass-card glow-border p-6 hover:scale-[1.02] transition-transform">
                        <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/20">
                            <Icon size={20} className="text-primary" />
                          </div>
                          <span className="text-sm text-primary font-semibold">{edu.year}</span>
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex w-4 h-4 rounded-full bg-primary animate-pulse-glow flex-shrink-0" />

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
