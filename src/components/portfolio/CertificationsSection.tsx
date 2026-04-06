import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const CERTIFICATES = [
  {
    title: "Web Development Fundamentals",
    issuer: "Online Learning Platform",
    date: "2024",
    description: "Comprehensive course covering HTML, CSS, JavaScript and modern web development practices.",
  },
  {
    title: "Python Programming",
    issuer: "Online Learning Platform",
    date: "2024",
    description: "In-depth Python programming course covering data structures, algorithms and OOP concepts.",
  },
  {
    title: "Data Science Basics",
    issuer: "Online Learning Platform",
    date: "2023",
    description: "Introduction to data science, data analysis, and visualization techniques.",
  },
  {
    title: "Communication Skills",
    issuer: "Professional Development",
    date: "2023",
    description: "Professional communication and presentation skills certification.",
  },
];

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            My <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-primary mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            📜 Continuous learning through professional certifications and courses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={i}
              className="glass-card glow-border p-6 group hover:scale-[1.02] transition-all duration-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/20 flex-shrink-0">
                  <Award size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </div>
                  <p className="text-sm text-primary font-medium mt-1">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                  <p className="text-sm text-muted-foreground mt-3">{cert.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
