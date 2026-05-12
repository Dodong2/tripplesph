import { useMemo } from "react";

interface DecorativeCirclesProps {
  seed?: number;
  circles?: number;
  mobileCircles?: number;
}

// ✅ number lang, hindi interface
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const DecorativeCircles = ({ seed = 1, circles = 6, mobileCircles = 4 }: DecorativeCirclesProps) => {
  const items = useMemo(() => {
    // ✅ random per refresh — Date.now() + seed para unique per section
    const rand = seededRandom(Date.now() + seed);

    return Array.from({ length: circles }, (_, i) => {
      const size = Math.floor(rand() * 200) + 40;
      const top = Math.floor(rand() * 100);
      const left = Math.floor(rand() * 100);
      const opacity = parseFloat((rand() * 0.2 + 0.05).toFixed(2));
      const filled = rand() > 0.5;
      return { size, top, left, opacity, filled, isMobileVisible: i < mobileCircles };
    });
  }, []); // ✅ empty deps — computed once lang, hindi nagbabago sa re-renders

  return (
    <>
      {items.map((c, i) => (
        <div
          key={i}
          className={c.isMobileVisible ? "block absolute rounded-full pointer-events-none" : "hidden lg:block absolute rounded-full pointer-events-none"}
          style={{
            width: c.size,
            height: c.size,
            top: `${c.top}%`,
            left: `${c.left}%`,
            background: c.filled ? `rgba(255,255,255,${c.opacity})` : "transparent",
            border: !c.filled ? `1px solid rgba(255,255,255,${c.opacity})` : "none",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </>
  );
};