import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

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

const Globe = () => {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mesh = meshRef.current;
      /* @ts-ignore */
      mesh.rotation.y = clock.getElapsedTime() * 0.3;
      /* @ts-ignore */
      mesh.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Main globe sphere */}
        <Sphere args={[1.8, 64, 64]}>
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.15}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.7}
          />
        </Sphere>

        {/* Wireframe overlay */}
        <Sphere args={[1.85, 32, 32]}>
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.3}
          />
        </Sphere>

        {/* Outer glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
        </mesh>

        {/* Second ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </mesh>

        {/* Dots on surface */}
        {Array.from({ length: 40 }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 40);
          const theta = Math.sqrt(40 * Math.PI) * phi;
          const x = 1.82 * Math.cos(theta) * Math.sin(phi);
          const y = 1.82 * Math.sin(theta) * Math.sin(phi);
          const z = 1.82 * Math.cos(phi);
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color="#60a5fa" />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

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

        {/* 3D Globe */}
        <motion.div
          className="glass-card p-4 mb-16 overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="h-[350px] md:h-[400px] w-full">
            <Suspense fallback={
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
                <Globe />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </Suspense>
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
