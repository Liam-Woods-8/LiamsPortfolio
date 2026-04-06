"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps landing vs. main portfolio with a cinematic dissolve / reveal.
 */
export function ArchiveTransition({
  showLanding,
  landing,
  portfolio,
}: {
  showLanding: boolean;
  landing: ReactNode;
  portfolio: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <motion.div
          key="landing"
          className="min-h-screen w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {landing}
        </motion.div>
      ) : (
        <motion.div
          key="portfolio"
          className="min-h-screen w-full"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {portfolio}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
