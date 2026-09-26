"use client";

import { motion } from "framer-motion";

export default function VerseCard() {
  return (
    <motion.section
      className="w-[88vw] max-w-[380px] mx-auto text-center mb-12 px-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex justify-center mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/sobre-motivo-chico.png" alt="" style={{ width: 120, opacity: 0.75 }} />
      </div>
      <p
        className="font-sans-label"
        style={{ color: "var(--rose-ink)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.9rem" }}
      >
        Génesis 2:24
      </p>
      <p
        className="font-serif italic"
        style={{ color: "var(--ink-dark)", fontSize: "1.3rem", lineHeight: 1.75 }}
      >
        &ldquo;Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su
        mujer, y serán una sola carne.&rdquo;
      </p>
    </motion.section>
  );
}
