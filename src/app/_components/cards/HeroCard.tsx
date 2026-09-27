"use client";

import { motion } from "framer-motion";
import { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { hayFecha, DIA, MES, ANIO, FECHA_BODA } from "../../_data/fecha";
import { useLang } from "../../_data/idioma";


export default function HeroCard() {
  const { t } = useLang();
  const mes = FECHA_BODA ? t.mes(FECHA_BODA.getMonth(), MES) : MES;
  return (
    <motion.section
      className="relative w-[92vw] max-w-[400px] mx-auto mb-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Flat-lay: envelope with embossed liner behind the card */}
      <div className="relative pt-10 pb-6">
        {/* Envelope body */}
        <div
          className="absolute inset-x-2 top-0 bottom-6 rounded-[3px] overflow-hidden"
          style={{
            backgroundColor: "var(--bg-cream)",
            backgroundImage: "url('/paper-emboss.jpg')",
            backgroundBlendMode: "luminosity",
            backgroundSize: "cover",
            boxShadow: "0 14px 40px rgba(31,28,25,0.18)",
          }}
        >
          {/* Botanical liner peeking at top */}
          <div
            className="absolute inset-x-0 top-0 h-[38%]"
            style={{
              backgroundImage: "url('/liner-band.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              clipPath: "polygon(0 0, 100% 0, 100% 55%, 50% 100%, 0 55%)",
            }}
          />
        </div>

        {/* The invitation card on top, ornate frame */}
        <motion.div
          className="relative mx-4 mt-8 mb-2"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="ornate-card text-center px-6 py-9"
            style={{
              backgroundColor: "var(--bg-cream)",
              backgroundImage: "url('/paper-linen.jpg')",
              backgroundBlendMode: "luminosity",
              backgroundSize: "cover",
              boxShadow: "0 8px 24px rgba(31,28,25,0.18)",
            }}
          >
            <Stagger>
              <p className="font-serif italic text-2xl" style={{ color: "var(--ink-dark)" }}>
                {t.heroAmor1}
              </p>
            </Stagger>
            <Stagger>
              <p className="font-serif italic text-2xl mb-4" style={{ color: "var(--ink-dark)" }}>
                {t.heroAmor2}
              </p>
            </Stagger>

            <Stagger>
              <div className="flex gap-2 mb-6" style={{ margin: "0 -0.75rem" }}>
                {/* Columna izquierda: padres del novio */}
                <div className="flex-1 text-center">
                  <p
                    className="font-sans-label"
                    style={{ color: "var(--olive-soft)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", marginBottom: "0.4rem" }}
                  >
                    {t.padresNovio}
                  </p>
                  <p className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "0.92rem", lineHeight: 1.55 }}>
                    Sebastián Ortiz Hernández
                  </p>
                  <p className="font-script my-0.5" style={{ color: "var(--gold-antique)", fontSize: "1.15rem", lineHeight: 1 }}>&amp;</p>
                  <p className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "0.92rem", lineHeight: 1.55 }}>
                    Lorena del Carmen Vera Estañol
                  </p>
                </div>
                <div className="flex items-center">
                  <span style={{ width: 1, height: 72, background: "linear-gradient(to bottom, transparent, var(--gold-antique), transparent)", opacity: 0.6, display: "block" }} />
                </div>
                {/* Columna derecha: padres de la novia */}
                <div className="flex-1 text-center">
                  <p
                    className="font-sans-label"
                    style={{ color: "var(--olive-soft)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", marginBottom: "0.4rem" }}
                  >
                    {t.padresNovia}
                  </p>
                  <p className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "0.92rem", lineHeight: 1.55 }}>
                    Juan Carlos Quijano Quintal
                  </p>
                  <p className="font-script my-0.5" style={{ color: "var(--gold-antique)", fontSize: "1.15rem", lineHeight: 1 }}>&amp;</p>
                  <p className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "0.92rem", lineHeight: 1.55 }}>
                    Rosa Eugenia Brito Quijano
                  </p>
                </div>
              </div>
            </Stagger>

            <Stagger>
              <div className="fleuron mb-1">
                <span style={{ color: "var(--rose-deco)" }}>&#10086;</span>
              </div>
            </Stagger>

            <Stagger>
              <h1 className="font-script px-2" style={{ color: "var(--olive-primary)", fontSize: "3.6rem", lineHeight: 1 }}>
                Sebastián
              </h1>

            </Stagger>
            <Stagger>
              <p className="font-script my-2 foil" style={{ fontSize: "3.4rem", lineHeight: 1 }}>
                &amp;
              </p>
            </Stagger>
            <Stagger>
              <h1 className="font-script px-2" style={{ color: "var(--olive-primary)", fontSize: "3.6rem", lineHeight: 1 }}>
                Diana
              </h1>

              <div className="mb-3" />
            </Stagger>

            <Stagger>
              <div className="fleuron">
                <span style={{ color: "var(--rose-deco)" }}>&#10086;</span>
              </div>
            </Stagger>

            <Stagger>
              <p className="font-serif italic text-xl mt-2" style={{ color: "var(--ink-dark)" }}>
                {t.heroInvita}{" "}
                <span className="font-bold" style={{ fontSize: "1.35em" }}>
                  {t.heroBoda}
                </span>
              </p>
            </Stagger>

            <Stagger>
              {hayFecha ? (
                <div className="flex flex-nowrap items-center justify-center gap-2 mt-4 text-center">
                  <span className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "2.1rem" }}>{DIA}</span>
                  <span className="font-serif" style={{ color: "var(--rose-deco)", fontSize: "1.3rem" }}>·</span>
                  <span className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.28rem", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{mes}</span>
                  <span className="font-serif" style={{ color: "var(--rose-deco)", fontSize: "1.3rem" }}>·</span>
                  <span className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "2.1rem" }}>{ANIO}</span>
                </div>
              ) : (
                /* PENDIENTE: fecha del evento. En cuanto la confirmen se pone en
                   src/app/_data/fecha.ts y este bloque muestra el día real. */
                <div className="mt-4 text-center">
                  <p
                    className="font-serif font-semibold"
                    style={{ color: "var(--ink-dark)", fontSize: "1.5rem", letterSpacing: "0.06em" }}
                  >
                    FECHA POR CONFIRMAR
                  </p>
                  <p className="font-serif italic" style={{ color: "var(--ink-dark)", fontSize: "1.2rem" }}>
                    muy pronto les compartiremos el día
                  </p>
                </div>
              )}
            </Stagger>

            <Stagger>
              <p className="font-script mt-2" style={{ color: "var(--ink-dark)", fontSize: "1.5rem" }}>
                {t.ciudadLarga}
              </p>
            </Stagger>

            <Stagger>
              <div className="flex justify-center mt-3">
                <OliveBranch width={112} color="var(--green-line)" />
              </div>
            </Stagger>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
