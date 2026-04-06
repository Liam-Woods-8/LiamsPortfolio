"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const nav = [
  { href: "#photos", label: "Photos" },
  { href: "#videos", label: "Videos" },
  { href: "#posters", label: "Posters" },
  { href: "#about", label: "About Me" },
  { href: "#contact", label: "Contact" },
];

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function HeaderBar() {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-900/25 bg-[#e8e0d4]/90 backdrop-blur-md">
      {/* Row 1: three equal columns — date | name | time */}
      <div className="font-body grid grid-cols-1 gap-2 bg-white border-2 border-black px-4 py-3 text-xs uppercase tracking-[0.12em] text-stone-800 sm:grid-cols-3 sm:items-center sm:px-8 sm:text-sm">
        <p className="justify-self-center text-center font-body font-bold tabular-nums tracking-[0.04em] sm:justify-self-start sm:text-left sm:px-3">
          {formatDate(now)}
        </p>
        <p className="justify-self-center text-center font-bold sm:px-3">
          Liam Woods
        </p>
        <p className="justify-self-center text-center font-body font-bold tabular-nums tracking-[0.04em] sm:justify-self-end sm:text-right sm:px-3">
          {formatTime(now)}
        </p>
      </div>

      {/* Row 2: centered section navigation */}
      <nav
        className="font-body flex flex-wrap w-full items-center justify-between gap-y-2 bg-white border-2 border-black px-4 py-3 text-left text-[11px] uppercase tracking-[0.28em] text-stone-800 sm:flex-nowrap sm:px-8 sm:text-xs"
        aria-label="Archive sections"
      >
        {nav.map((item, index) => (
          <motion.a
            key={item.href}
            href={item.href}
            className={`group relative text-stone-800 font-bold transition-colors hover:text-red-900 ${item.label === "Posters" ? "left-[15px]" : ""} px-3`}
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <span className="relative z-10">{item.label}</span>
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-red-900/70 transition-transform duration-300 group-hover:scale-x-100" />
          </motion.a>
        ))}
      </nav>
    </header>
  );
}
