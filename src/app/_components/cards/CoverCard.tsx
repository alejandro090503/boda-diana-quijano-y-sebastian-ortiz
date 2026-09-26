"use client";

import { motion } from "framer-motion";
import { DIA, MES, ANIO } from "../../_data/fecha";

/**
 * Portada a pantalla completa con la foto que eligio el cliente, al estilo de
 * la invitacion que mando de referencia: foto de fondo, velo degradado hacia
 * el papel y los nombres en caligrafia encima.
 */
export default function CoverCard() {
  return (
    <section
      className="relative w-full"
      style={{ height: "100dvh", overflow: "hidden" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/portada.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 34%",
        }}
      />

      {/* Velo: arriba casi limpio para que se vea la foto, abajo se funde con
          el marfil del papel para que la portada entregue a la primera tarjeta. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom," +
            "rgba(22,50,92,0.10) 0%," +
            "rgba(22,50,92,0.05) 34%," +
            "rgba(22,50,92,0.40) 64%," +
            "rgba(22,50,92,0.82) 84%," +
            "rgba(248,244,236,0.96) 97%," +
            "#F8F4EC 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 px-7 pb-[6.5vh] text-center">
        <motion.p
          className="font-sans-label"
          style={{ color: "#F7E7CE", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.34em" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
        >
          NUESTRA BODA
        </motion.p>

        <motion.h1
          className="font-script"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(3.4rem, 17vw, 4.6rem)",
            lineHeight: 1.02,
            margin: "0.5rem 0 0",
            textShadow: "0 3px 26px rgba(12,28,52,0.55)",
          }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1.1, ease: "easeOut" }}
        >
          Sebasti&aacute;n
        </motion.h1>

        <motion.p
          className="font-script foil"
          style={{ fontSize: "2.3rem", lineHeight: 1, margin: "0.1rem 0" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          &amp;
        </motion.p>

        <motion.h1
          className="font-script"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(3.4rem, 17vw, 4.6rem)",
            lineHeight: 1.02,
            marginBottom: "1.35rem",
            textShadow: "0 3px 26px rgba(12,28,52,0.55)",
          }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }}
        >
          Diana
        </motion.h1>

        <motion.div
          className="inline-flex items-center gap-3 px-6 py-2.5"
          style={{
            border: "1px solid rgba(247,231,206,0.55)",
            borderRadius: 999,
            background: "rgba(22,50,92,0.32)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: "easeOut" }}
        >
          <span
            className="font-sans-label"
            style={{ color: "#F7E7CE", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.26em" }}
          >
            {DIA} &middot; {MES} &middot; {ANIO}
          </span>
        </motion.div>

        <motion.p
          className="font-serif italic"
          style={{ color: "rgba(255,255,255,0.92)", fontSize: "1.15rem", marginTop: "0.85rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.9 }}
        >
          M&eacute;rida, Yucat&aacute;n
        </motion.p>
      </div>
    </section>
  );
}
