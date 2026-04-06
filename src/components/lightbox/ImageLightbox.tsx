"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export function ImageLightbox({
  open,
  src,
  alt,
  caption,
  onClose,
}: {
  open: boolean;
  src: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && src ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-stone-950/82 backdrop-blur-[2px]"
            aria-label="Close lightbox"
            onClick={onClose}
          />
          <motion.figure
            className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden border border-stone-900/40 bg-[#f4eee4] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-4"
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-auto max-h-[78vh] w-full overflow-hidden bg-stone-900/5">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1200}
                className="h-auto w-full object-contain"
                unoptimized={src.startsWith("http")}
                priority
              />
            </div>
            {caption ? (
              <figcaption className="font-body mt-3 text-center text-sm tracking-wide text-stone-700">
                {caption}
              </figcaption>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="font-neon absolute right-3 top-3 border border-stone-900/30 bg-[#e8e0d4]/95 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-stone-900 transition hover:border-red-900/50 hover:text-red-900"
            >
              Close
            </button>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
