"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { VideoLightbox } from "@/components/lightbox/VideoLightbox";
import { SectionTitle } from "@/components/portfolio/SectionTitle";
import { videos } from "@/data/portfolio";

/** Filmstrip-style modules: perforations + archival frame. */
export function VideosSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = videos.find((v) => v.id === activeId) ?? null;

  return (
    <section id="videos" className="mb-28 scroll-mt-32">
      <SectionTitle id="videos-heading">Videos</SectionTitle>

      <div className="space-y-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="relative mx-auto w-full max-w-full sm:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
          >
            {/* Filmstrip outer rail */}
            <div className="relative border-y-[7px] border-black px-2 py-2 sm:px-3">
              <Image
                src="/images/filmtape.avif"
                alt="Film tape border"
                fill
                className="pointer-events-none absolute inset-0 object-cover opacity-100"
              />
              <div
                className="pointer-events-none absolute inset-y-2 left-0 w-2 bg-black opacity-90"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-2 right-0 w-2 bg-black opacity-90"
                aria-hidden
              />

              <button
                type="button"
                onClick={() => setActiveId(video.id)}
                className="relative z-10 group mx-auto block w-full border-2 border-black bg-black p-2 text-left shadow-[0_0_0_1px_rgba(254,242,242,0.06)] transition hover:border-red-900/55"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
                  <Image
                    src={video.thumb}
                    alt=""
                    fill
                    className="object-cover opacity-90 transition group-hover:opacity-100"
                    sizes="(min-width: 1024px) 42rem, 90vw"
                    unoptimized={video.thumb.startsWith("http")}
                  />
                  <span className="font-neon absolute bottom-2 left-2 rounded-sm bg-stone-950/75 px-2 py-0.5 text-[8px] uppercase tracking-[0.35em] text-red-100">
                    Play
                  </span>
                </div>
                <p className="font-body mt-2 text-center text-[11px] text-stone-200">
                  {video.title}
                </p>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <VideoLightbox
        open={!!active}
        title={active?.title ?? ""}
        embedUrl={active?.embedUrl ?? null}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
