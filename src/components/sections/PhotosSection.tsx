"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/lightbox/ImageLightbox";
import { SectionTitle } from "@/components/portfolio/SectionTitle";
import { photos } from "@/data/portfolio";

/** Print wall: pinned / taped treatment, editorial grid inspired by wireframe. */
export function PhotosSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = photos.find((p) => p.id === activeId) ?? null;

  return (
    <section id="photos" className="mb-28 scroll-mt-32">
      <SectionTitle id="photos-heading">Photos</SectionTitle>

      {/* Keep at most 4 per row; cards are intentionally sized to avoid overflow. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {photos.map((photo, index) => {
          const rotations = [
            "-rotate-[0.6deg]",
            "rotate-[0.6deg]",
            "-rotate-[0.2deg]",
            "rotate-[0.2deg]",
          ];
          const rot = rotations[index % rotations.length];
          const title = photo.caption ?? photo.alt;

          return (
            <motion.button
              type="button"
              key={photo.id}
              onClick={() => setActiveId(photo.id)}
              className="relative w-full cursor-pointer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
              title={title}
            >
              <span
                className={`relative block overflow-visible bg-transparent p-1.5 ${rot}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 22vw, 45vw"
                    unoptimized={photo.src.startsWith("http")}
                  />
                  <Image
                    src="/images/photoFrame.png"
                    alt="picture frame overlay"
                    fill
                    className="pointer-events-none absolute inset-0 object-cover"
                  />
                </div>

                <span className="font-body mt-2 block text-center text-[10px] uppercase tracking-[0.2em] text-stone-800 sm:text-[11px]">
                  {title}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <ImageLightbox
        open={!!active}
        src={active?.src ?? null}
        alt={active?.alt ?? ""}
        caption={active?.caption}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
