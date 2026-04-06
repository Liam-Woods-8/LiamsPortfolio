"use client";

import { HeaderBar } from "./HeaderBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PhotosSection } from "@/components/sections/PhotosSection";
import { PostersSection } from "@/components/sections/PostersSection";
import { VideosSection } from "@/components/sections/VideosSection";

const PAPER_BG = "/images/paper-texture.jpg";

/** Wireframe-inspired archival layout; paper persists behind all modular blocks. */
export function MainPortfolioLayout() {
  return (
    <div className="relative min-h-screen text-stone-900">
      <div
        className="fixed inset-0 -z-10 bg-[#d6cfc4]"
        style={{
          backgroundImage: `url(${PAPER_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden
      />

      <HeaderBar />

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-28 pt-12 sm:px-8 lg:px-10">
        <PhotosSection />
        <VideosSection />
        <PostersSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
