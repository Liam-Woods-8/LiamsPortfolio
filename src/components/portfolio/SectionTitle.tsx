"use client";

import { motion } from "framer-motion";

/** Centered archive-style section heading (Black Casper). */
export function SectionTitle({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.h2
      id={id}
      className="font-heading mb-10 w-full text-center text-3xl uppercase tracking-[0.08em] text-stone-900 sm:text-4xl md:text-5xl"
      style={{
        textShadow: "2px 2px 0 rgba(254,242,242,0.35), 0 0 1px rgba(12,10,9,0.5)",
      }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h2>
  );
}
