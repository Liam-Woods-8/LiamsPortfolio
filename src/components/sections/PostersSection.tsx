"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/lightbox/ImageLightbox";
import { SectionTitle } from "@/components/portfolio/SectionTitle";
import { posters } from "@/data/portfolio";

export function PostersSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = posters.find((p) => p.id === activeId) ?? null;

  return (
    <section id="posters" className="mb-28 scroll-mt-32">
      <SectionTitle id="posters-heading">Posters</SectionTitle>

      {/* 2×2 grid; total width ~ a single photos row (slightly under main max-w-6xl) */}
      <div className="mx-auto grid w-full max-w-[52rem] grid-cols-2 gap-4 sm:max-w-5xl sm:gap-6">
        {posters.map((poster, index) => (
          <motion.button
            type="button"
            key={poster.id}
            onClick={() => setActiveId(poster.id)}
            className="group w-full text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <div className="relative border-2 border-black bg-[#f4eee4] p-2 shadow-[6px_8px_0_#000] transition group-hover:shadow-[8px_10px_0_#000] sm:p-2.5">
              <div className="relative aspect-[2/3] w-full bg-black">
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 36vw, 42vw"
                  unoptimized={
                    poster.src.startsWith("http") ||
                    /\.gif(\?|$)/i.test(poster.src)
                  }
                />
              </div>
              {poster.title ? (
                <p className="font-body border-t-2 border-black bg-black px-2 py-2 text-center text-[10px] uppercase tracking-[0.2em] text-white sm:text-[11px]">
                  {poster.title}
                </p>
              ) : null}
            </div>
          </motion.button>
        ))}
      </div>

      <ImageLightbox
        open={!!active}
        src={active?.src ?? null}
        alt={active?.alt}
        caption={active?.title}
        onClose={() => setActiveId(null)}
        presentation="poster"
      />
    </section>
  );
}
