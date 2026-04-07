import { useMemo, useState, useEffect, useCallback } from "react";

const SpaceBackground = () => {
  const stars = useMemo(() =>
    Array.from({ length: 200 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const glowSize = size * 4;
      return {
        width: size,
        height: size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
        borderRadius: "50%",
        background: `radial-gradient(circle, hsla(210, 100%, 90%, 1) 0%, hsla(210, 100%, 70%, 0.6) 40%, transparent 70%)`,
        boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px hsla(210, 100%, 70%, ${0.3 + Math.random() * 0.4})`,
        animation: `twinkle ${2 + Math.random() * 4}s ${Math.random() * 3}s ease-in-out infinite alternate`,
      };
    }), []);

  const shootingStars = useMemo(() =>
    Array.from({ length: 4 }).map((_, i) => ({
      top: `${Math.random() * 60}%`,
      left: `${Math.random() * 80}%`,
      delay: i * 5,
    })), []);

  const [bolts, setBolts] = useState([]);

  const createBolt = useCallback(() => {
    const id = Date.now() + Math.random();
    const left = 10 + Math.random() * 80;
    // Generate a jagged lightning path
    const segments = 5 + Math.floor(Math.random() * 4);
    let path = `M ${50} 0`;
    let x = 50;
    for (let i = 1; i <= segments; i++) {
      x += (Math.random() - 0.5) * 40;
      path += ` L ${Math.max(10, Math.min(90, x))} ${(i / segments) * 100}`;
    }

    setBolts(prev => [...prev, { id, left, path }]);
    setTimeout(() => setBolts(prev => prev.filter(b => b.id !== id)), 600);
  }, []);

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      createBolt();
      const interval = setInterval(createBolt, 3000);
      return () => clearInterval(interval);
    }, 3000);

    const interval = setInterval(createBolt, 3000);
    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [createBolt]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(220,30%,8%)_0%,_hsl(220,20%,3%)_40%,_hsl(0,0%,0%)_100%)]" />

      {/* Nebula glows */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px]" style={{ background: "hsl(210, 100%, 55%)" }} />
      <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px]" style={{ background: "hsl(270, 60%, 55%)" }} />
      <div className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[140px]" style={{ background: "hsl(240, 80%, 50%)" }} />
      <div className="absolute top-[70%] right-[30%] w-[350px] h-[350px] rounded-full opacity-[0.06] blur-[100px]" style={{ background: "hsl(190, 100%, 50%)" }} />

      {/* Stars */}
      {stars.map((s, i) => (
        <div key={i} className="absolute" style={s} />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s, i) => (
        <div
          key={`shoot-${i}`}
          className="absolute h-[1px] w-[100px] rotate-[-35deg]"
          style={{
            top: s.top,
            left: s.left,
            background: "linear-gradient(90deg, transparent, hsla(210, 100%, 80%, 0.8), transparent)",
            animation: `shootingStar 4s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Thunder / Lightning bolts */}
      {bolts.map(bolt => (
        <div
          key={bolt.id}
          className="absolute top-0"
          style={{ left: `${bolt.left}%`, width: "200px", height: "60vh" }}
        >
          {/* Screen flash */}
          <div className="fixed inset-0 animate-[thunderFlash_0.6s_ease-out_forwards] bg-white/5 pointer-events-none" />
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full animate-[thunderBolt_0.6s_ease-out_forwards]"
          >
            <path
              d={bolt.path}
              fill="none"
              stroke="hsla(210, 100%, 90%, 0.9)"
              strokeWidth="1.5"
              filter="url(#thunderGlow)"
            />
            <path
              d={bolt.path}
              fill="none"
              stroke="hsla(220, 100%, 95%, 1)"
              strokeWidth="0.5"
            />
            <defs>
              <filter id="thunderGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default SpaceBackground;
