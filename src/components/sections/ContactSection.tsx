"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { SectionTitle } from "@/components/portfolio/SectionTitle";

const LETTER_TEX = "/images/letterTex.jpg";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdaberej";

type Feedback =
  | { type: "success"; message: string }
  | { type: "error"; message: string };

/** Archival paper form — submits to Formspree. */
export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      const data: { ok?: boolean; error?: string; errors?: Record<string, string> } =
        await res.json().catch(() => ({}));

      if (res.ok) {
        setFeedback({
          type: "success",
          message: "Thank you — your message was sent.",
        });
        form.reset();
      } else {
        const fromFields =
          data.errors &&
          Object.values(data.errors).filter(Boolean).join(" ");
        const message =
          (typeof data.error === "string" && data.error) ||
          fromFields ||
          "Something went wrong. Please try again.";
        setFeedback({ type: "error", message });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Network error. Check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="mb-16 scroll-mt-32">
      <SectionTitle id="contact-heading">Contact</SectionTitle>

      <motion.div
        className="mx-auto max-w-xl border border-stone-900/35 p-8 text-black shadow-[8px_10px_0_rgba(12,10,9,0.08)] sm:p-10"
        style={{
          backgroundImage: `linear-gradient(rgba(242,235,226,0.95), rgba(242,235,226,0.95)), url('${LETTER_TEX}')`,
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundColor: "rgba(242,235,226,0.95)",
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-body mb-8 text-center text-sm text-black">
          Leave a Message
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="font-neon mb-1 block text-[10px] uppercase tracking-[0.28em] text-black">
              Name
            </span>
            <input
              name="name"
              required
              disabled={submitting}
              className="font-body w-full border-b border-stone-900/40 bg-transparent px-0 py-2 text-black outline-none ring-0 transition placeholder:text-stone-500 focus:border-black/55 disabled:opacity-50"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="font-neon mb-1 block text-[10px] uppercase tracking-[0.28em] text-black">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              disabled={submitting}
              className="font-body w-full border-b border-stone-900/40 bg-transparent px-0 py-2 text-black outline-none placeholder:text-stone-500 focus:border-black/55 disabled:opacity-50"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="font-neon mb-1 block text-[10px] uppercase tracking-[0.28em] text-black">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={5}
              disabled={submitting}
              className="font-body w-full resize-y border border-stone-900/25 bg-transparent p-3 text-black outline-none ring-0 focus:border-black/45 disabled:opacity-50"
              placeholder="Write your message..."
            />
          </label>
          <motion.button
            type="submit"
            disabled={submitting}
            className="font-neon w-full border border-stone-900/50 bg-transparent px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-black transition hover:bg-stone-900/10 disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={submitting ? undefined : { scale: 1.01 }}
            whileTap={submitting ? undefined : { scale: 0.99 }}
          >
            {submitting ? "Sending…" : "Send"}
          </motion.button>
        </form>
        {feedback ? (
          <p
            className={`font-body mt-4 text-center text-sm ${
              feedback.type === "success" ? "text-green-900" : "text-red-900"
            }`}
            role="status"
            aria-live="polite"
          >
            {feedback.message}
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}
