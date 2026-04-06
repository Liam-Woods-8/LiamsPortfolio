"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";

const LogoCanvas = dynamic(
  () => import("./LogoCanvas").then((m) => m.LogoCanvas),
  { ssr: false },
);

const PAPER_BG = "/images/paper-texture.jpg";

/**
 * Full-screen landing: paper texture, centered R3F logo, neon-style “Access Archive”.
 * Logo (3D) and CTA button enter the archive.
 */
export function LandingScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Full-bleed paper + dark vignette frame (archive margins) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#d6cfc4]"
        style={{
          backgroundImage: `url(${PAPER_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
        <div className="flex w-full flex-col items-center">
          <div className="h-[min(66vh,640px)] w-full max-w-[760px]">
            <LogoCanvas onEnter={onEnter} />
          </div>
          <button
            type="button"
            onClick={onEnter}
            className="group mt-6 flex cursor-pointer flex-col items-center border-0 bg-transparent p-2 transition-transform select-none hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-900/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#d6cfc4]"
            aria-label="Access archive — open portfolio"
          >
            <NeonAccessLabel />
          </button>
        </div>
      </div>
    </section>
  );
}

const neonLabelClass =
  "font-neon block text-center text-4xl tracking-[0.28em] text-red-800 sm:text-5xl md:text-6xl";

/** Old neon flicker on load, then continuous soft red neon pulse (hover intensifies via group). */
function NeonAccessLabel() {
  const [flickerDone, setFlickerDone] = useState(false);

  const pulseGlow = [
    "0 0 10px rgba(254,202,202,0.55), 0 0 20px rgba(185,28,28,0.42), 0 0 34px rgba(127,29,29,0.22)",
    "0 0 16px rgba(254,202,202,0.95), 0 0 30px rgba(220,38,38,0.55), 0 0 52px rgba(153,27,27,0.4)",
    "0 0 10px rgba(254,202,202,0.55), 0 0 20px rgba(185,28,28,0.42), 0 0 34px rgba(127,29,29,0.22)",
  ];

  if (!flickerDone) {
    return (
      <motion.span
        className={neonLabelClass}
        initial={{
          opacity: 0.15,
          filter: "brightness(0.4)",
        }}
        animate={{
          opacity: [0.15, 1, 0.2, 0.9, 0.35, 1, 0.5, 1],
          filter: [
            "brightness(0.35)",
            "brightness(1.25)",
            "brightness(0.5)",
            "brightness(1.1)",
            "brightness(0.55)",
            "brightness(1.2)",
            "brightness(0.85)",
            "brightness(1)",
          ],
          textShadow: [
            "0 0 4px rgba(127,29,29,0.2)",
            "0 0 16px rgba(127,29,29,0.65)",
            "0 0 6px rgba(127,29,29,0.35)",
            "0 0 20px rgba(153,27,27,0.5)",
            "0 0 8px rgba(127,29,29,0.4)",
            "0 0 18px rgba(185,28,28,0.55)",
            "0 0 10px rgba(127,29,29,0.45)",
            "0 0 14px rgba(254,202,202,0.55), 0 0 26px rgba(185,28,28,0.45), 0 0 42px rgba(127,29,29,0.25)",
          ],
        }}
        transition={{
          duration: 1.9,
          times: [0, 0.12, 0.22, 0.35, 0.48, 0.62, 0.78, 1],
          ease: "easeOut",
        }}
        onAnimationComplete={() => setFlickerDone(true)}
      >
        Access Archive
      </motion.span>
    );
  }

  return (
    <motion.span
      className={`${neonLabelClass} group-hover:text-red-700 group-hover:drop-shadow-[0_0_14px_rgba(248,113,113,0.9)]`}
      animate={{
        textShadow: pulseGlow,
        opacity: [0.94, 1, 0.94],
      }}
      transition={{
        repeat: Infinity,
        duration: 2.6,
        ease: "easeInOut",
      }}
    >
      Access Archive
    </motion.span>
  );
}
