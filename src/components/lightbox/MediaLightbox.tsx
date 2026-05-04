"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const PANEL_CLASS =
  "relative z-10 mx-auto flex w-full max-w-5xl max-h-[min(calc(100svh-2rem),calc(100dvh-2rem))] flex-col overflow-y-auto overflow-x-hidden border border-stone-900/40 bg-[#f4eee4] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:max-h-[min(calc(100svh-3.5rem),calc(100dvh-3.5rem))]";

const POSTER_PANEL_CLASS =
  "relative z-10 mx-auto flex w-full max-w-[min(96vw,72rem)] max-h-[min(calc(100svh-1rem),calc(100dvh-1rem))] flex-col overflow-visible border-0 bg-transparent shadow-none sm:max-h-[min(calc(100svh-2rem),calc(100dvh-2rem))]";

const PANEL_MOTION = {
  initial: { scale: 0.96, opacity: 0, y: 12 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.98, opacity: 0, y: 8 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const POSTER_MOTION = {
  initial: { scale: 0.92, opacity: 0, rotate: -4, y: 24 },
  animate: { scale: 1, opacity: 1, rotate: -2, y: 0 },
  exit: { scale: 0.96, opacity: 0, rotate: 1, y: 12 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

function useLightboxEffects(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose]);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

function isEmbedPlayerUrl(url: string) {
  return /youtube\.com\/embed|youtube-nocookie|youtu\.be|vimeo\.com\/video/i.test(
    url,
  );
}

export type MediaLightboxProps =
  | {
      variant: "image";
      open: boolean;
      onClose: () => void;
      src: string | null;
      alt: string;
      caption?: string;
      presentation?: "default" | "poster";
    }
  | {
      variant: "video";
      open: boolean;
      onClose: () => void;
      embedUrl: string | null;
      title: string;
    };

/** Shared overlay, motion, scroll lock, and close control for photos, posters, and video embeds. */
export function MediaLightbox(props: MediaLightboxProps) {
  const { open, onClose, variant } = props;
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const visible =
    open &&
    (variant === "image" ? !!props.src : !!props.embedUrl);

  useLayoutEffect(() => {
    // One-time: attach to body after mount (SSR/hydration-safe); avoids fixed inside filtered motion ancestors.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional single paint after mount
    setPortalRoot(document.body);
  }, []);

  useLightboxEffects(visible, onClose);

  const presenceKey =
    variant === "image" ? `img-${props.src ?? ""}` : `vid-${props.embedUrl ?? ""}`;

  const isPoster =
    variant === "image" && (props.presentation ?? "default") === "poster";

  const overlay = (
    <AnimatePresence mode="sync">
      {visible ? (
        <motion.div
          key={presenceKey}
          className="fixed inset-0 z-[200] box-border flex items-center justify-center overflow-hidden p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-stone-950/82 backdrop-blur-[2px]"
            aria-label="Close"
            onClick={onClose}
          />
          {variant === "image" ? (
            <motion.figure
              className={isPoster ? POSTER_PANEL_CLASS : PANEL_CLASS}
              {...(isPoster ? POSTER_MOTION : PANEL_MOTION)}
              onClick={(e) => e.stopPropagation()}
            >
              {isPoster ? (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
                    aria-hidden
                  >
                    <div className="absolute left-[-12%] top-[8%] h-[70%] w-[55%] -rotate-12 rounded-2xl bg-red-900/12 blur-md" />
                    <div
                      className="absolute right-[-8%] bottom-[5%] h-[45%] w-[70%] rotate-6 rounded-sm bg-amber-100/35 opacity-90"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(-32deg, transparent, transparent 14px, rgba(12,10,9,0.06) 14px, rgba(12,10,9,0.06) 28px)",
                      }}
                    />
                    <div className="absolute right-[6%] top-[18%] h-36 w-36 rounded-full border-2 border-dashed border-stone-800/30" />
                    <div className="absolute bottom-[12%] left-[4%] h-24 w-40 -rotate-[18deg] border border-stone-900/25 bg-stone-200/20" />
                    <div className="absolute left-1/2 top-1/2 h-[130%] w-[40%] -translate-x-1/2 -translate-y-1/2 rotate-[72deg] bg-gradient-to-b from-transparent via-stone-400/10 to-transparent" />
                  </div>
                  <div className="relative z-10 flex w-full items-center justify-center px-4 py-6 sm:px-10 sm:py-10">
                    <div className="relative max-w-[min(92vw,52rem)] rotate-[-1.25deg] shadow-[0_36px_100px_rgba(0,0,0,0.42)] ring-1 ring-stone-900/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={props.src!}
                        alt={props.alt}
                        className="h-auto w-auto max-h-[min(calc(100svh-3.5rem),calc(100dvh-3.5rem))] max-w-full bg-[#f4eee4] object-contain"
                        decoding="async"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-full items-center justify-center bg-stone-900/5 p-2 sm:p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={props.src!}
                      alt={props.alt}
                      className="h-auto w-auto max-h-[min(calc(100svh-7rem),calc(100dvh-7rem))] max-w-full object-contain"
                      decoding="async"
                    />
                  </div>
                </>
              )}
              {props.caption ? (
                <figcaption
                  className={`font-body relative z-20 mx-auto mt-2 max-w-xl shrink-0 rounded-sm px-4 pb-3 pt-1 text-center text-sm tracking-wide sm:pb-4 ${
                    isPoster
                      ? "bg-[#f4eee4]/90 text-stone-900 ring-1 ring-stone-900/15"
                      : "text-stone-700"
                  }`}
                >
                  {props.caption}
                </figcaption>
              ) : null}
              <CloseButton onClose={onClose} />
            </motion.figure>
          ) : (
            <motion.div
              className={PANEL_CLASS}
              {...PANEL_MOTION}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={props.title || "Video"}
            >
              <div className="flex w-full flex-col px-2 pb-2 pt-2 sm:p-3">
                {props.title ? (
                  <p className="font-neon mb-3 shrink-0 text-center text-xs uppercase tracking-[0.28em] text-stone-800">
                    {props.title}
                  </p>
                ) : null}
                <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
                  {props.embedUrl && isEmbedPlayerUrl(props.embedUrl) ? (
                    <iframe
                      src={props.embedUrl}
                      title={props.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element -- local GIF / raster “video” slots */
                    <img
                      src={props.embedUrl!}
                      alt={props.title}
                      className="absolute inset-0 h-full w-full object-contain"
                      decoding="async"
                    />
                  )}
                </div>
              </div>
              <CloseButton onClose={onClose} />
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (!portalRoot) return null;
  return createPortal(overlay, portalRoot);
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="font-neon absolute right-2 top-2 z-20 border border-stone-900/30 bg-[#e8e0d4]/95 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-stone-900 transition hover:border-red-900/50 hover:text-red-900 sm:right-3 sm:top-3"
    >
      Close
    </button>
  );
}
