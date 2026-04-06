"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { PosterLightbox } from "@/components/lightbox/PosterLightbox";
import { SectionTitle } from "@/components/portfolio/SectionTitle";
import { posters } from "@/data/portfolio";

export function PostersSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = posters.find((p) => p.id === activeId) ?? null;

  return (
    <section id="posters" className="mb-28 scroll-mt-32">
      <SectionTitle id="posters-heading">Posters</SectionTitle>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {posters.map((poster, index) => (
          <motion.button
            type="button"
            key={poster.id}
            onClick={() => setActiveId(poster.id)}
            className="group text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <div className="relative border border-stone-900/30 bg-[#f4eee4] p-2 pb-10 shadow-[6px_8px_0_rgba(12,10,9,0.12)] ring-1 ring-stone-900/10 transition group-hover:shadow-[8px_12px_0_rgba(12,10,9,0.18)]">
              <div className="relative aspect-[2/3] w-full bg-stone-800/10">
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 20vw, 45vw"
                  unoptimized={poster.src.startsWith("http")}
                />
              </div>
              {poster.title ? (
                <p className="font-body absolute bottom-2 left-0 right-0 px-2 text-center text-xs tracking-wide text-stone-700">
                  {poster.title}
                </p>
              ) : null}
            </div>
          </motion.button>
        ))}
      </div>

      <PosterLightbox
        open={!!active}
        src={active?.src ?? null}
        alt={active?.alt ?? ""}
        caption={active?.title}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
