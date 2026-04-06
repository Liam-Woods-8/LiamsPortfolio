"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function VideoLightbox({
  open,
  title,
  embedUrl,
  onClose,
}: {
  open: boolean;
  title: string;
  embedUrl: string | null;
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
      {open && embedUrl ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-stone-950/85 backdrop-blur-[2px]"
            aria-label="Close video"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-4xl border border-stone-900/45 bg-[#f4eee4] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:p-5"
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-neon mb-3 text-center text-xs uppercase tracking-[0.28em] text-stone-800">
              {title}
            </p>
            <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
              <iframe
                src={embedUrl}
                title={title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="font-neon mt-4 w-full border border-stone-900/30 bg-transparent py-2 text-[10px] uppercase tracking-[0.25em] text-stone-900 transition hover:border-red-900/50 hover:text-red-900 sm:w-auto sm:px-6"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
