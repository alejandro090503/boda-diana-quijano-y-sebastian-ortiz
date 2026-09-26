"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";

const NOMBRE_IGLESIA = "Parroquia de San Francisco de Asís";
const DIRECCION_IGLESIA = "Umán, Yucatán";
const MAPS_IGLESIA = "https://maps.app.goo.gl/cc4PH4R2o13ND8Zf6";

export default function CeremonyCard() {
  return (
    <AnimatedCard className="card-mini-envelope flap-terracotta text-center" anim="slideLeft">
      <div className="mini-flap" />
      <img
        src="/assets/sobre-motivo-chico.png"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: 130, height: "auto", bottom: -6, right: -34, opacity: 0.95 }}
      />

      <Stagger>
        <div className="flex justify-center mt-2 mb-3">
          <OliveBranch width={118} color="var(--green-line)" />
        </div>
      </Stagger>

      <Stagger>
        <div className="py-4">
          <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "3.2rem", lineHeight: 1.1 }}>
            Ceremonia Religiosa
          </p>
          <p className="font-serif font-semibold mt-2" style={{ color: "var(--ink-dark)", fontSize: "2.6rem" }}>
            11:00 AM
          </p>

          <p
            className="font-serif font-semibold px-4 mx-auto"
            style={{ color: "var(--olive-primary)", fontSize: "1.5rem", lineHeight: 1.4, maxWidth: "255px", marginTop: "1.5rem", marginBottom: "3rem", textAlign: "center" }}
          >
            {NOMBRE_IGLESIA}
          </p>

          <p
            className="font-serif italic mx-auto"
            style={{ color: "var(--terracotta)", fontSize: "1.2rem", lineHeight: 1.4, marginTop: "-2.4rem", marginBottom: "2.6rem" }}
          >
            {DIRECCION_IGLESIA}
          </p>

          <p
            className="font-serif italic px-4 mx-auto mb-8"
            style={{ color: "var(--terracotta)", fontSize: "1.15rem", lineHeight: 1.6, maxWidth: "330px" }}
          >
            &ldquo;Todo tiene su tiempo, y todo lo que se quiere debajo del
            cielo tiene su hora.&rdquo;
            <br />
            <span className="font-sans-label" style={{ fontSize: "0.85rem", letterSpacing: "0.15em", fontWeight: 600 }}>
              Eclesiastés 3:1
            </span>
          </p>

          <a
            href={MAPS_IGLESIA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-map"
            style={{ marginTop: "0.5rem" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            IR A UBICACIÓN
          </a>
        </div>
      </Stagger>
    </AnimatedCard>
  );
}
