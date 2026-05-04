"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/portfolio/SectionTitle";

const WAX = "/images/wax-seal.png";
const LETTER_TEX = "/images/letterTex.jpg";

/** Typed letter / archival document block with wax seal accent. */
export function AboutSection() {
  return (
    <section id="about" className="mb-28 scroll-mt-32">
      <SectionTitle id="about-heading">About Me</SectionTitle>

      <motion.article
        className="relative mx-auto w-full max-w-full sm:max-w-xl border border-stone-900/35 p-5 pb-14 shadow-[8px_10px_0_rgba(12,10,9,0.08)] sm:p-6 sm:pb-18"
        style={{
          backgroundImage: `linear-gradient(rgba(242,235,226,0.95), rgba(242,235,226,0.95)), url('${LETTER_TEX}')`,
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(242,235,226,0.95)',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.55 }}
      >
        <div className="pointer-events-none absolute left-6 top-6 h-16 w-16 opacity-[0.07]">
          <div
            className="h-full w-full border border-stone-900"
            style={{ borderRadius: "50%" }}
            aria-hidden
          />
        </div>

        {/* Wax seal accent (bottom-right of the letter) */}
        <div className="pointer-events-none absolute bottom-3 right-5 h-14 w-14 opacity-90 sm:bottom-4 sm:right-6 sm:h-16 sm:w-16">
          <div className="relative h-full w-full mix-blend-multiply">
            <Image
              src={WAX}
              alt=""
              fill
              className="object-contain drop-shadow-md"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        <div className="font-body space-y-4 pb-[15px] text-left text-sm leading-relaxed text-black sm:text-sm">
          <p className="mb-1 font-body text-lg text-black sm:text-xl">
            Liam Woods
          </p>
          <p className="font-body text-lg text-black sm:text-xl">
            Syracuse NY, 13244
          </p>
          <p>
            I&apos;m a graphic designer studying Innovation, Society and Technology at Syracuse
            University. I will graduate in May 2027 with a Bachelor of Science.
          </p>
          <p>
            I&apos;m experienced with Adobe Photoshop, Illustrator, and After Effects, as well as
            tools like TouchDesigner and Figma. I also have a background in front-end development,
            including HTML, CSS, JavaScript, and React.
          </p>
          <p>
            For the past two years, I&apos;ve managed the Syracuse University Skate Club&apos;s
            social media, where I currently also serve as President. This role has helped me build
            skills in content creation, branding, and audience engagement in a real-world setting.
          </p>
          <p>
            My work is heavily inspired by skateboarding and surf culture, music, films, and
            real-world moments.
          </p>
        </div>
      </motion.article>
    </section>
  );
}
