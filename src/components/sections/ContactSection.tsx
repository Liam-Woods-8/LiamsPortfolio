"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { SectionTitle } from "@/components/portfolio/SectionTitle";

/** Archival paper form — submit is UI-only until a backend is wired. */
export function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="mb-16 scroll-mt-32">
      <SectionTitle id="contact-heading">Contact</SectionTitle>

      <motion.div
        className="mx-auto max-w-xl border border-dashed border-stone-900/40 p-8 shadow-inner text-red-700 sm:p-10"
        style={{
          backgroundImage: "linear-gradient(rgba(244,238,228,0.95), rgba(244,238,228,0.95)), url('/images/letterPaper.jpg')",
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(244,238,228,0.95)',
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-body mb-8 text-center text-sm text-red-700">
          Leave a Message
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="font-neon mb-1 block text-[10px] uppercase tracking-[0.28em] text-red-700">
              Name
            </span>
            <input
              name="name"
              required
              className="font-body w-full border-b border-stone-900/40 bg-transparent px-0 py-2 text-stone-900 outline-none ring-0 transition placeholder:text-stone-500 focus:border-red-900/60"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="font-neon mb-1 block text-[10px] uppercase tracking-[0.28em] text-red-700">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className="font-body w-full border-b border-stone-900/40 bg-transparent px-0 py-2 text-stone-900 outline-none placeholder:text-stone-500 focus:border-red-900/60"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="font-neon mb-1 block text-[10px] uppercase tracking-[0.28em] text-red-700">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={5}
              className="font-body w-full resize-y border border-stone-900/25 p-3 text-stone-900 outline-none ring-0 focus:border-red-900/45"
              style={{
                backgroundImage: "linear-gradient(rgba(244,238,228,0.9), rgba(244,238,228,0.9)), url('/images/letterPaper.jpg')",
                backgroundBlendMode: 'multiply',
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
              }}
              placeholder="Write your message..."
            />
          </label>
          <motion.button
            type="submit"
            className="font-neon w-full border border-stone-900/50 bg-stone-900 px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-[#f4eee4] transition hover:bg-red-900 hover:text-red-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Send
          </motion.button>
        </form>
        {sent ? (
          <p className="font-body mt-4 text-center text-sm text-red-700" role="status">
            Thank you — this demo records locally only; connect an API route when ready.
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}
